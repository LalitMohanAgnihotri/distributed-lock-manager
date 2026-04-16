import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import { env } from './config/env.js';
import { Server } from 'socket.io';
import { startDeadlockJob } from './jobs/deadlockScan.job.js';

await connectDB();

const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: env.frontendUrl,
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

startDeadlockJob(); 

server.listen(env.port, () => {
  console.log(`Server running on ${env.port}`);
});