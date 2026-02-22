import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data', 'clients.json');

export const loadClientsFromFile = () => {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
};

export const saveClientsToFile = (clients) => {
  fs.writeFileSync(dataPath, JSON.stringify(clients, null, 2));
};