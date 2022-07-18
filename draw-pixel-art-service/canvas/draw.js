import { createCanvas } from "@napi-rs/canvas";

export const draw = (points, size) => {
  const pixelSize = parseInt(1200 / size) + 1;
  const canvasSize = pixelSize * size;
  const canvas = createCanvas(canvasSize, canvasSize);
  const ctx = canvas.getContext("2d");
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      ctx.beginPath();
      ctx.rect(column * pixelSize, row * pixelSize, pixelSize, pixelSize);
      if (points[row * size + column] !== undefined) {
        ctx.fillStyle = points[row * size + column];
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fill();
    }
  }

  return canvas;
};
