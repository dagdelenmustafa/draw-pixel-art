import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useHeaderContext } from "../contexts/HeaderContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function SettingsForm() {
  const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const [canvasSize, setCanvasSize] = useState(16);
  const navigate = useNavigate();
  const { setIsShareable } = useHeaderContext();

  useEffect(() => {
    setIsShareable(false);
  }, []);
  const handleSliderChange = (event, newValue) => {
    setCanvasSize(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const canvasId = uuidv4();
    await axios.post(`${serverURL}/init`, {
      canvasId,
      canvasSize,
    });
    navigate(`/draw/${canvasId}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography component="h1" variant="h2" color="secondary">
          Select
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          color="secondary"
          style={{ fontWeight: 600 }}
        >
          Canvas
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          color="secondary"
          style={{ fontWeight: 600 }}
        >
          Size
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Slider
            aria-label="Canvas Size"
            defaultValue={16}
            step={1}
            min={2}
            max={48}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            color="third"
            sx={{
              marginTop: 3,
              "& .MuiSlider-thumb": {
                borderRadius: "1px",
              },
              "& .MuiSlider-rail": {
                color: "#e76f51",
              },
            }}
          />
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Start Drawing
          </Button>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{ marginTop: 5 }}
            color="third.main"
          >
            Canvas Simulation ({canvasSize} x {canvasSize})
          </Typography>
          <div className="canvasArea">
            {[...Array(canvasSize).keys()].map((v) => (
              <Grid
                container
                direction="row"
                spacing={0}
                sx={{ display: "flex" }}
                key={v}
              >
                {[...Array(canvasSize).keys()].map((value) => (
                  <Grid key={v * canvasSize + value} item sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        "&:hover": {
                          backgroundColor: "third.main",
                        },
                        aspectRatio: "1 / 1",
                        backgroundColor: "#fff",
                        border: "double 0.001em #f4a261",
                      }}
                      onClick={(e) => {
                        console.log(v * canvasSize + value);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default SettingsForm;
