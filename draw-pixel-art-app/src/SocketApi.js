import io from "socket.io-client";

let socket;
const serverURL = process.env.SERVER_URL || "http://localhost:3001";

export const init = (canvasId) => {
  console.log("Connecting...");

  socket = io(serverURL, {
    transports: ["websocket"],
    query: `canvas=${canvasId}`,
  });

  socket.on("connect", () => console.log("Connected to server"));
};

export const sendPoint = (point) => {
  if (socket) socket.emit("new-point", point);
};

export const subscribeCanvas = (cb) => {
  if (!socket) return;

  socket.on("receive-point", (point) => {
    cb(point);
  });
};

export const subscribeReset = (cb) => {
  if (!socket) return;

  socket.on("reset-all", () => {
    cb();
  });
};

export const sendResetSignal = () => {
  if (socket) socket.emit("reset-all", {});
};
