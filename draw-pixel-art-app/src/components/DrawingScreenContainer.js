import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CirclePicker } from "react-color";
import { useParams } from "react-router-dom";
import { exportComponentAsPNG } from "react-component-export-image";

import {
  init,
  sendPoint,
  subscribeCanvas,
  subscribeReset,
  sendResetSignal,
} from "../SocketApi";
import axios from "axios";

import { usePoints } from "../contexts/CanvasContext";
import { useHeaderContext } from "../contexts/HeaderContext";

import Cell from "./Cell";

function DrawingScreenContainer() {
  const [canvasSize, setCanvasSize] = useState(16);
  const { canvasId } = useParams();
  const [selectedColor, setSelectedColor] = useState("#e9c46a");
  const { points, setPoints } = usePoints();
  const { setIsShareable } = useHeaderContext();
  const canvasRef = useRef();
  const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

  useEffect(() => {
    async function fetchInitialData() {
      const resp = await axios.get(`${serverURL}/init?canvasId=${canvasId}`);
      const { points, canvasSize } = resp.data;
      setCanvasSize(parseInt(canvasSize));
      setPoints(points);
    }

    setIsShareable(true);
    init(canvasId);
    fetchInitialData();
    subscribeReset(() => {
      setPoints({});
    });
    subscribeCanvas((point) => {
      setPoints((prev) => {
        return { ...prev, ...point };
      });
    });
  }, [canvasId, setPoints]);

  const changeSelectedColor = (color, event) => {
    setSelectedColor(color.hex);
  };

  const resetAll = (e) => {
    e.preventDefault();
    setPoints({});
    sendResetSignal();
  };

  function cellOnClickHandler(i) {
    return () => {
      const newObject = { [i]: selectedColor };
      setPoints({ ...points, ...newObject });
      sendPoint(newObject);
    };
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            alignItems: "left",
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="secondary"
            style={{ fontWeight: 600 }}
          >
            Pixel
          </Typography>
          <Typography component="h1" variant="h2" color="secondary" mb={5}>
            Art
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          <div ref={canvasRef} className="canvasArea">
            {[...Array(canvasSize).keys()].map((v) => (
              <Grid
                container
                direction="row"
                spacing={0}
                sx={{ display: "flex" }}
                key={v}
              >
                {[...Array(canvasSize).keys()].map((value) => (
                  <Cell
                    key={v * canvasSize + value}
                    selectedColor={selectedColor}
                    point={points[v * canvasSize + value]}
                    onClickHandler={cellOnClickHandler(v * canvasSize + value)}
                  />
                ))}
              </Grid>
            ))}
          </div>
          <CirclePicker
            circleSpacing={9}
            onChangeComplete={changeSelectedColor}
            className="color-picker"
            colors={[
              "#fff",
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
              "#00bcd4",
              "#009688",
              "#2a9d8f",
              "#4caf50",
              "#8bc34a",
              "#cddc39",
              "#ffeb3b",
              "#e9c46a",
              "#ffc107",
              "#ff9800",
              "#ff5722",
              "#795548",
              "#607d8b",
              "#000",
            ]}
          />
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={resetAll}
          >
            Reset
          </Button>
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => exportComponentAsPNG(canvasRef)}
          >
            Export
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default DrawingScreenContainer;
