import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashboardInfo() {
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAccount = () => {
    setAnchorEl(null);
    navigation("/account-settings");
  };
  const updateInfo = "Thinh dao";
  return (
    <div className="px-4">
      <div className="grid gap-3">
        <div className="flex items-center justify-between pr-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-14 h-14 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-lg">
                {personalInfo?.full_name || updateInfo}
              </span>
              <div className="flex text-gray-500 gap-1 text-sm">
                Provider <span className="text-navy-blue">Pro +</span>
              </div>
            </div>
          </div>
          <button>
            <AiOutlineDown
              style={{ fontWeight: "800" }}
              onClick={handleClick}
            />
          </button>
        </div>
        <div className="text-gray-500 flex gap-1 text-sm">
          Please, Finish your profile !
          <p className="text-navy-blue">Edit now</p>
        </div>
        <Box sx={{ flexGrow: 1, textAlign: "right", color: "black" }}>
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
          </Menu>
        </Box>
        <hr />
      </div>
      <div className="mt-5">
        <p className="font-medium text-xl mb-4">Agenda</p>
        <div className="border border-solid border-gray-200 rounded-xl p-3">
          <div className="mb-3">
            <span className="text-gray-500 ">10 september 2023</span>
          </div>
          <div
            className="gap-2 grid   h-[20vh] overflow-y-scroll global-scrollbar "
            // style={{ height: "20vh ", overflow: "auto" }}
          >
            <div className="flex items-baseline gap-3">
              <div className="w-2.5 h-2.5 bg-navy-blue rounded-sm"></div>
              <div className="flex flex-col">
                <span className="font-medium">Call with tao</span>
                <span className="text-gray-500 text-sm">9:30</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <div className="w-2.5 h-2.5 bg-navy-blue rounded-sm"></div>
              <div className="flex flex-col">
                <span className="font-medium">Call with tao</span>
                <span className="text-gray-500 text-sm">9:30</span>
              </div>
            </div>{" "}
            <div className="flex items-baseline gap-3">
              <div className="w-2.5 h-2.5 bg-navy-blue rounded-sm"></div>
              <div className="flex flex-col">
                <span className="font-medium">Call with tao</span>
                <span className="text-gray-500 text-sm">9:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-medium text-xl mb-4">Done Tour</p>
        <div
          className="grid gap-3 global-scrollbar"
          style={{ maxHeight: "30vh", overflow: "auto" }}
        >
          <div className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3 ">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col justify-center py-2">
              <span className="font-medium">Sai gon</span>
              <span className="text-gray-500 text-sm">
                {" "}
                08- 14 september 2023
              </span>
            </div>
          </div>
          <div className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3 ">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col justify-center py-2">
              <span className="font-medium">Sai gon</span>
              <span className="text-gray-500 text-sm">
                {" "}
                08- 14 september 2023
              </span>
            </div>
          </div>
          <div className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3 ">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col justify-center py-2">
              <span className="font-medium">Sai gon</span>
              <span className="text-gray-500 text-sm">
                {" "}
                08- 14 september 2023
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
