import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  console.log(args[0]);
  // ...
});

socket.on("global greeting", (...args) => {
  console.log(`Hi Global, I'm Client 1 : ${args[0]}`);
});
