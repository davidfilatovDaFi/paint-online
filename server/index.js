import express from "express";
import expressWs from "express-ws";

const app = express();
const WsServer = expressWs(app);
const PORT = process.env.PORT || 5000;
const aWss = WsServer.getWss();

const drawHandler = (msg) => {
  aWss.clients.forEach((client) => client.send(JSON.stringify(msg)));
};

app.listen(PORT, () => {
  console.log(`сервер запустился на порту ${PORT}`);
});

app.ws("/", (ws, req) => {
  console.log("connection is done");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "draw":
        drawHandler(msg);
      default:
        break;
    }
  });
});
