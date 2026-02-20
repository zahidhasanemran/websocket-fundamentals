import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server sent ${message}`);
      }
    });
  });

  socket.on("error", (err) => {
    console.err(`Error: ${err.message} at ${ip}`);
  });

  socket.on("close", () => console.log("Client Disconnected"));
});

console.log("WebSocket connecton is running at 8080");
