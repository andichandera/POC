import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const io = new Server(3000, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
  socket.emit("greeting", "Hello World ! (ALL)");
  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});

io.of("/service-a").on("connection", (socket) => {
  socket.emit("greeting", "Hello World !");

  io.emit("global greeting", "Jalan Kok !");

  socket.on("update item", (arg1, arg2, callback) => {
    console.log(arg1); // 1
    console.log(arg2); // { name: "updated" }
    callback({
      status: "ok",
      content: "you've done it Andi !",
    });
  });
});
