const http = require("http");
const express = require("express");
const socketio = require("socket.io");

var app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname + "/public"))

io.on("connection", (socket) => {
    console.log(`New Conection ${socket.id}`);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
