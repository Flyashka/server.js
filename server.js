const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Используем переменную окружения PORT или 3000 для локальной разработки
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Раздаём файл index.html, когда пользователь заходит на главную страницу
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Настраиваем Socket.IO для работы с подключениями пользователей
io.on('connection', (socket) => {
  console.log('A user connected');

  // Обрабатываем сообщения от клиента и передаём их всем подключённым пользователям
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Логируем отключения пользователей
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
