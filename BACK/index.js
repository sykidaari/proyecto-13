import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/db.js';

const app = express();

app.use(express.json());

connectDB();

app.use((req, res) => {
  return res.status(404).json('route not found');
});

app.listen(3000, () => {
  console.log('server connected at http://localhost:3000/');
});
