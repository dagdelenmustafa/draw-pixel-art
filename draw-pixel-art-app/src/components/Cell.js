import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Cell({ onClickHandler, point, selectedColor }) {
  const bgColor = point ? point : "#fff";
  return (
    <Grid item sx={{ flex: 1 }}>
      <Box
        sx={{
          "&:hover": {
            backgroundColor: selectedColor,
          },
          aspectRatio: "1 / 1",
          backgroundColor: bgColor,
          border: "double 0.001em hsla(27, 87%, 67%, 0.05)",
        }}
        onClick={onClickHandler}
      />
    </Grid>
  );
}

export default Cell;
