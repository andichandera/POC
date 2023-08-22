import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
  setInterval(() => {
    socket.send(
      JSON.stringify({
        type: "hello from server",
        content: [1, "2"],
      })
    );
  }, 1000);

  // send a message to the client
  // socket.send(
  //   JSON.stringify({
  //     type: "hello from server",
  //     content: [1, "2"],
  //   })
  // );

  // receive a message from the client
  socket.on("message", (data) => {
    const packet = JSON.parse(data);
    console.log(`Data : ${packet.type}`);
    switch (packet.type) {
      case "hello from client":
        // ...
        break;
    }
  });
});
