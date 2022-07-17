import { Server } from "socket.io";
import { hSet, del } from "./redis.js";

export const io = (server) => {
  const io = new Server(server);

  io.on("connection", async (socket) => {
    const canvasId = socket.handshake.query.canvas.toString();
    console.log(`New Connection canvasId: ${canvasId}`);
    await socket.join(canvasId);

    socket.on("new-point", async (packageObj) => {
      await hSet(canvasId, packageObj);
      socket.to(canvasId).emit("receive-point", packageObj);
    });

    socket.on("reset-all", async (message) => {
      socket.to(canvasId).emit("reset-all");
      await del(canvasId);
    });
  });
};
