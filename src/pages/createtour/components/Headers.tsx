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
    <div>
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar
          position="fixed"
          style={{
            background: "white",
            boxShadow: "none",
          }}
        >
          <Toolbar
            style={{
              padding: "15px 48px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              {/* <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                > */}
              <img
                className="w-16  "
                src="src\assets\File-logo-Zest-Travel.svg"
              />
              {/* </IconButton> */}
            </Link>
            <div className="flex gap-x-8">
              <button className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue ">
                Any question ?
              </button>

              <button className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue">
                Save and quit
              </button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
