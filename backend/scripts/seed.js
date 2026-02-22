import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import Client from '../models/Client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/northstar';
  await mongoose.connect(uri);

  const existingCount = await Client.countDocuments();
  if (existingCount > 0) {
    console.log(`Seed skipped: database already has ${existingCount} client(s).`);
    await mongoose.disconnect();
    return;
  }

  const jsonPath = path.join(__dirname, '..', 'data', 'clients.json');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const clients = JSON.parse(raw);

  // Normalize: if older dataset had different field names, map them here.
  const normalized = clients.map((c, idx) => ({
    clientRef: c.clientRef ?? c.clientReference ?? `NS-${String(idx + 1).padStart(4, '0')}`,
    fullName: c.fullName ?? [c.firstName, c.lastName].filter(Boolean).join(' ') ?? 'Unknown',
    email: c.email ?? `unknown${idx + 1}@northstar.local`,
    phone: c.phone ?? 'N/A',
    riskCategory: c.riskCategory ?? c.risk ?? 'Medium',
    classification: c.classification ?? c.clientType ?? 'Standard',
    advisor: c.advisor ?? c.advisorName ?? 'Unassigned',
    notes: c.notes ?? ''
  }));

  await Client.insertMany(normalized);
  console.log(`Seeded ${normalized.length} client(s).`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
