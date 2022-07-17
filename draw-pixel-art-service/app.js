import http from "http";
import express from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import { io } from "./socketApp.js";
import { init as redisInit } from "./redis.js";
import cors from "cors";

import indexRouter from "./controllers/index.js";

const app = express();
redisInit();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
io(server);

server.listen(3001, () => {
  console.log("We are on port 3001");
});
