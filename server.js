const http = require("http");
const express = require("express");
const socketio = require("socket.io");

var app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log(`New Conection ${socket.id}`);

  socket.on("joinRoom", ({ id }) => {
    socket.join(id);
    console.log(`Added ${socket.id} to room ${id}`);
  });

  socket.on("message", (data) => {
    console.log(data);
    data = JSON.parse(data);
    socket.to(data.id).emit("message", data);
  });

  socket.on("transaction", (data) => {
    data = JSON.parse(data);
    console.log(data);
    socket.to(data.id).emit("transaction", data);
  })

  socket.on("disconnect", () => {
      console.log(`Disconnected ${socket.id}`);
  })

});

const PORT = process.env.PORT || 5000;
server.listen(PORT,"0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
