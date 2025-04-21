import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST a new item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedItem);
  } catch (err) {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Item not found' });
  }
});

export default router;
