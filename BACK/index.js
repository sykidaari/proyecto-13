import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/db.js';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import mainRouter from './src/api/routes/index.router.js';
import { Server as SocketServer } from 'socket.io';
import { createServer as createHttpServer } from 'http';
import { setupSocket } from './src/config/socket.js';
import cookieParser from 'cookie-parser';

const app = express();

// necessary for rate limiting to work correctly in build (deploy)
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

// Once front is deployed, add it to deployed backs process.env, and only front will be able to access
app.use(
  cors(
    process.env.FRONTEND_URL
      ? {
          origin: process.env.FRONTEND_URL,
          credentials: true
        }
      : {
          origin: '*'
        }
  )
);

connectDB();

app.use('/api/v1', mainRouter);

app.use((req, res) => {
  return res.status(404).json('route not found');
});

// error middleware
// https://expressjs.com/en/guide/error-handling.html
app.use([errorHandler]);

const server = createHttpServer(app);

const io = new SocketServer(server, {
  cors: { origin: '*' }
});

setupSocket(io);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${port}/`
      : `port ${port}`;

  console.log(`server connected on ${url}`);
});
