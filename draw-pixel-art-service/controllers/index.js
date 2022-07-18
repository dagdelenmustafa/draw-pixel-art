import express from "express";
const router = express.Router();
import { set, hGetAll, get } from "../redis.js";
import { draw } from "../canvas/draw.js";

router.get("/", function (req, res, next) {
  res.send({ title: "Hello from drawing app" });
});

router.post("/init", async function (req, res, next) {
  const canvasId = req.body.canvasId;
  if (!canvasId) {
    res.status(400).json({ error: "'canvasId' is required." });
  }
  const canvasSize = req.body.canvasSize || 16;
  await set(`size_${canvasId}`, canvasSize);
  res
    .status(200)
    .json({ message: `Canvas(${canvasId}) initialized succesfully` });
});

router.get("/init", async function (req, res, next) {
  const canvasId = req.query.canvasId;
  if (!canvasId) {
    res.status(400).json({ error: "'canvasId' is required." });
  }
  const points = await hGetAll(canvasId);
  const canvasSize = await get(`size_${canvasId}`);
  res.status(200).json({ points, canvasSize });
});

router.get("/canvas/create", async function (req, res, next) {
  const canvasId = req.query.canvasId.toString();
  if (!canvasId) {
    res.status(400).json({ error: "'canvasId' is required." });
  }
  const points = await hGetAll(canvasId);
  const canvasSize = await get(`size_${canvasId}`);
  const buffer = draw(points, canvasSize).toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", buffer.length);
  res.end(buffer);
});

export default router;
