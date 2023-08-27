import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
var amqp = require("amqplib/callback_api");

const io = new Server(3001, {
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:3000"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "msg_queu";
    channel.assertQueue(queue, {
      durable: false,
    });

    io.on("connection", (socket) => {
      console.log("Websocket Active");

      // Socket Event

      // send a message to the client
      socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

      // receive a message from the client
      socket.on("hello from client", (...args) => {
        // ...
        console.log(`Client said : ${args[0]}`);
      });

      socket.on("chat message", (...args) => {
        channel.sendToQueue(queue, Buffer.from(`{data: ${args} }`), {
          persistent: true,
        });
        console.log(`client chat : ${args[0]}`);
      });

      socket.on("join", (...args) => {
        socket.join(args[0]);
      });
    });
  });
});
