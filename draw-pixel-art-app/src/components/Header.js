import { useState, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useHeaderContext } from "../contexts/HeaderContext";

export default function Header() {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isShareable } = useHeaderContext();

  const handleClick = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setToastOpen(true);
    setAnchorElUser(null);
  };

  const handleOpenShareMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setAnchorElUser(null);
  };

  const handleShareCanvas = () => {
    window.open(
      "https://twitter.com/intent/tweet?url=",
      "_blank",
      "noopener,noreferrer"
    );
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
          {/* <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            color="secondary"
            onClick={() => navigate("/")}
          >
            Pixel Art
          </Typography>
          {isShareable && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <ShareIcon
                  sx={{ cursor: "pointer" }}
                  color="secondary"
                  onClick={handleOpenShareMenu}
                />
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseShareMenu}
              >
                <MenuItem onClick={handleClick}>
                  <Typography textAlign="center">Share Link</Typography>
                </MenuItem>
                <MenuItem onClick={handleShareCanvas}>
                  <Typography textAlign="center">Share Canvas</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {isShareable && (
            <Snackbar
              open={toastOpen}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Link copied to clipboard."
              action={action}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
