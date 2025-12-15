import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/db.js';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import mainRouter from './src/api/routes/index.router.js';
import { Server as SocketServer } from 'socket.io';
import { createServer as createHttpServer } from 'http';
import { setupSocket } from './src/config/socket.js';

const app = express();

app.set('trust proxy', 1);

app.use(express.json());

app.use(cors());

connectDB();

app.use('/api/v1', mainRouter);

app.use((req, res) => {
  return res.status(404).json('route not found');
});

app.use(errorHandler);

const server = createHttpServer(app);

const io = new SocketServer(server, {
  cors: { origin: '*' }
});

setupSocket(io);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server connected on port ${port}`);
});
