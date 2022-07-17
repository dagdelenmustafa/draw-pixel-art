import express from "express";
const router = express.Router();
import { set, hGetAll, get } from "../redis.js";

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

export default router;
