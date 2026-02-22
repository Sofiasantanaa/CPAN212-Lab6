import Client from '../models/Client.js';

export const renderClientsPage = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.render('clients', { clients });
  } catch (err) {
    res.status(500).send('Failed to load clients: ' + err.message);
  }
};