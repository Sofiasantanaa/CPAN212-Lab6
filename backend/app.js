import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import clientRoutes from './routes/clientRoutes.js';
import { renderClientsPage } from './controllers/ssrClientController.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/clients', clientRoutes);

// SSR Home page 
app.get(['/', '/clients'], renderClientsPage);

// Angular SPA 
app.use(express.static(path.join(__dirname, '../frontend/dist/northstar-frontend')));

// Catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/northstar-frontend/index.html'));
});

// Start server
async function start() {
  const port = process.env.PORT || 3000;
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/northstar';

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();