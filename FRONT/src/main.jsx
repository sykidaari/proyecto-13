import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { io } from 'socket.io-client';

// SOCKET TEST FOR BACKEND
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('connected:', socket.id);
});

socket.emit('ping');
socket.on('pong', () => console.log('PONG'));
//
//
//

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
