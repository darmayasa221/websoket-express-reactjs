import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user id: ${socket.id} is connected`);
  socket.on("send_message", (data) => {
    console.log(`message from id ${socket.id} is : ${data?.message} `);
  });
});

httpServer.listen(3001, () => {
  console.log("server runing");
});
