import { io } from "socket.io-client";

const socket = io("ws://localhost:3000/service-a");

// receive a message from the server
socket.on("greeting", (...args) => {
  console.log(`Hi, Channel : ${args[0]}`);
  // ...
});

socket.on("global greeting", (...args) => {
  console.log(`Hi Global, I'm Client 2 : ${args[0]}`);
});

socket.emit("update item", "1", { name: "updated" }, (response) => {
  console.log(response.content); // ok
});
