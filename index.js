const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (message) => {
    console.log("Received message:", message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
