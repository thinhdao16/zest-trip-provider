import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
function Header() {
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "white",
            boxShadow: "none",
            borderBottom: "1px solid #e4e4e4 ",
            padding: 0,
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link to="" style={{ textDecoration: "none", color: "black" }}>
                <AiFillHome style={{ color: "black " }} />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Link to="/createtour" style={{ textDecoration: "none" }}>
                <Button color="inherit" style={{ color: "black" }}>
                  Create tour
                </Button>
              </Link>
              <Link to="/listtour" style={{ textDecoration: "none" }}>
                <Button color="inherit" style={{ color: "black" }}>
                  list tour
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button color="inherit" style={{ color: "black" }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button color="inherit" style={{ color: "black" }}>
                  Login
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "right", color: "black" }}>
              3
            </Box>
            {/* <Login />
            <SignUp />
            <SetUpProvider /> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
