let items = [];
let id = 1;

const getItems = (req, res) => {
  res.json(items);
};

const addItem = (req, res) => {
  const newItem = { id: id++, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
};

const updateItem = (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.map(item =>
    item.id === itemId ? { ...item, ...req.body } : item
  );
  res.json({ message: 'Item updated' });
};

const deleteItem = (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.json({ message: 'Item deleted' });
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem
};
