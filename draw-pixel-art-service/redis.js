import { createClient } from "redis";

let client;

export const init = async () => {
  const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
  client = createClient({
    url: REDIS_URL,
  });
  client.on("error", (err) => console.log("Redis Client Error", err));
  client.on("connect", () => console.log("Connected to Redis"));
  await client.connect();
};

export const hSet = async (key, data) => {
  await client.hSet(key, data);
};

export const hGetAll = async (key) => {
  const res = await client.hGetAll(key);
  return res ? res : {};
};

export const del = async (key) => {
  await client.del(key);
};

export const get = async (key) => {
  const res = await client.get(key);
  if (res) {
    return res;
  } else {
    await set(key, 16);
    return 16;
  }
};

export const set = async (key, data) => {
  await client.set(key, data);
};
