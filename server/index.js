import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
