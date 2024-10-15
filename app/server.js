const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your React app
    methods: ['GET', 'POST'], // Specify allowed methods
  })
);

// Serve static files (optional)
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for content sent from clients
  socket.on('send_content', (content) => {
    // Broadcast the content to all other clients
    socket.broadcast.emit('receive_content', content);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
