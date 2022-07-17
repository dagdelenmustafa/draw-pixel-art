import { useState, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);

  const handleClick = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setToastOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

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
            sx={{ flexGrow: 1, cursor: "pointer" }}
            color="secondary"
            onClick={() => navigate("/")}
          >
            Pixel Art
          </Typography>
          <ShareIcon
            sx={{ cursor: "pointer" }}
            color="secondary"
            onClick={handleClick}
          />
          <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Link copied to clipboard."
            action={action}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
