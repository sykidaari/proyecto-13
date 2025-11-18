import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/db.js';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import mainRouter from './src/api/routes/index.js';

const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.use('/api/v1', mainRouter);

app.use((req, res) => {
  return res.status(404).json('route not found');
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('server connected at http://localhost:3000/');
});
