import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { DataContext } from "../../store/dataContext/DataContext";
import { useSelector } from "react-redux";
import "./header.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { getPersonalInfo } from "../../store/redux/silce/authSilce";

function Header() {
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { setRefeshLogin } = useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    setRefeshLogin((prev) => !prev);
    navigation("/login");
  };
  const handleAccount = () => {
    setAnchorEl(null);
    navigation("/account-settings");
  };
  const isActive = (route: string) => {
    return location.pathname === route ? "active-link" : "";
  };
  useEffect(() => {
    dispatch(getPersonalInfo());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "white",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            padding: 0,
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
            <Box sx={{ flexGrow: 1 }}>
              <Link
                to="/listwork"
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src="src\assets\File-logo-Zest-Travel.svg"
                  className="w-16"
                />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Link to="/createtour" style={{ textDecoration: "none" }}>
                <Button color="inherit" style={{ color: "black" }}>
                  Create tour
                </Button>
              </Link>
              <Link
                to="/listtour"
                className={isActive("/listtour")}
                // style={{ textDecoration: "none" }}
              >
                <Button color="inherit" style={{ color: "black" }}>
                  list tour
                </Button>
              </Link>
              {/* <Link to="/setupprovider" style={{ textDecoration: "none" }}>
                <Button color="inherit" style={{ color: "black" }}>
                  setup
                </Button>
              </Link> */}
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "right", color: "black" }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      src={
                        personalInfo?.avatar_image_url ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="Avatar"
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleAccount}>
                  <Avatar /> Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
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
