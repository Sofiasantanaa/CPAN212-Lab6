import Client from '../models/Client.js';

function buildQuery({ riskCategory, q }) {
  const filter = {};

  if (riskCategory) {
    filter.riskCategory = riskCategory;
  }

  if (q) {
    // Prefer the text index if you switch to $text search later; for now use regex OR.
    filter.$or = [
      { fullName: new RegExp(q, 'i') },
      { email: new RegExp(q, 'i') },
      { clientRef: new RegExp(q, 'i') },
      { advisor: new RegExp(q, 'i') }
    ];
  }

  return filter;
}

export const list = async (req, res) => {
  try {
    const { riskCategory, q } = req.query;
    const filter = buildQuery({ riskCategory, q });
    const clients = await Client.find(filter).sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clients', error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: 'Invalid client id', error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const created = await Client.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    // Duplicate key (e.g., clientRef unique)
    if (err?.code === 11000) {
      return res.status(409).json({ message: 'Client reference already exists', error: err.message });
    }
    res.status(400).json({ message: 'Failed to create client', error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Client not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update client', error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Client not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete client', error: err.message });
  }
};
