import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function Headers() {
  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
      <AppBar
        position="fixed"
        style={{ background: "white", boxShadow: "none" }}
      >
        <Toolbar style={{ padding: "32px 48px 0" }}>
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
