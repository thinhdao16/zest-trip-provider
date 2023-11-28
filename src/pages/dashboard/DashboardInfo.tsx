import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { getAllTours } from "../../store/redux/silce/tourSlice";
import { getProviderTourBoost } from "../../store/redux/silce/promotion";
import "dayjs/locale/en";
import dayjs from "dayjs";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import Logout from "@mui/icons-material/Logout";
import SliceEmailToName from "../../utils/SliceEmailToName";
function DashboardInfo() {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  const { allTours } = useSelector((state: any) => state.tour);
  const { providerTourBoost, loadingPromotion } = useSelector(
    (state: any) => state.promotion
  );

  const email = personalInfo?.email;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigation("/login");
    setAnchorEl(null);
  };
  const handleAccount = () => {
    setAnchorEl(null);
    navigation("/account-settings");
  };
  const filteredTours = allTours?.tours?.filter(
    (tour: { id: string; status: string }) => {
      const isDuplicate = providerTourBoost.includes(tour.id);
      return tour.status === "PUBLISHED" && isDuplicate;
    }
  );
  React.useEffect(() => {
    dispatch(getAllTours());
    dispatch(getProviderTourBoost());
  }, [dispatch]);

  return (
    <>
      {loadingPromotion ? (
        <LoadingFullScreen loading={loadingPromotion} />
      ) : (
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
                    {personalInfo?.full_name || (
                      <SliceEmailToName email={email} />
                    )}
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
                <MenuItem onClick={handleAccount}>
                  <Avatar /> Profile
                </MenuItem>

                <Divider />
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem> */}
                <MenuItem onClick={handleLogOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Log Out
                </MenuItem>
              </Menu>
            </Box>
            <hr />
          </div>
          {/* <div className="mt-5">
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
  </div> */}
          <div className="mt-5">
            <p className="font-medium text-xl mb-4">Tour Promotion</p>
            <div
              className="grid gap-3 global-scrollbar"
              style={{ maxHeight: "70vh", overflow: "auto" }}
            >
              {filteredTours && filteredTours.length > 0 ? (
                filteredTours.map(
                  (
                    promotion: {
                      tour_images: string[];
                      address_district: string;
                      updated_at: string;
                    },
                    index: number
                  ) => (
                    <div
                      className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3"
                      key={index}
                    >
                      <img
                        src={promotion?.tour_images[0]}
                        alt="error"
                        className="object-cover w-16 h-16 rounded-xl"
                      />
                      <div className="flex flex-col justify-center py-2">
                        <span className="font-medium">
                          {promotion?.address_district}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {dayjs(promotion?.updated_at)
                            .locale("en")
                            .format("D MMMM YYYY")}
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="text-gray-700 flex items-center justify-center">
                  <span className=" bg-zinc-300 p-2 rounded-lg">
                    No promotion
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardInfo;
