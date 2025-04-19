// Example: server/routes/itemRoutes.js
import express from 'express';
const router = express.Router();

let items = [];

// GET /api/items
router.get('/', (req, res) => {
  res.json(items);
});

// POST /api/items
router.post('/', (req, res) => {
  const item = req.body;
  item.id = Date.now(); // simple ID
  items.push(item);
  res.status(201).json(item);
});

// PUT /api/items/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id == id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE /api/items/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(i => i.id != id);
  res.status(204).end();
});

export default router;
