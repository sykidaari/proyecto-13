import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import AppProvider from '@/contexts/App/AppProvider.jsx';
import queryClient from '@/config/reactQuery.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
