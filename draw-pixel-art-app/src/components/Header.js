import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="third" elevation={1}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color="secondary"
          >
            Pixel Art
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
