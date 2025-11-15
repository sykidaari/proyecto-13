import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/db.js';
import mainRouter from './src/api/routes/mainRouter.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.use('/api/v1', mainRouter);

app.use((req, res) => {
  return res.status(404).json('route not found');
});

app.listen(3000, () => {
  console.log('server connected at http://localhost:3000/');
});
