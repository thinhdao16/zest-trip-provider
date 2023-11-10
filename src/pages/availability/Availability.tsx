import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Index";
import { AppDispatch } from "../../store/redux/store";
import { useEffect, useMemo, useState } from "react";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import AddAvailability from "./Modal/AddAvailability";
import EditAvailability from "./Modal/EditAvailability";
import { AiOutlineDown } from "react-icons/ai";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import {
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Box,
} from "@mui/material";
import React from "react";

function Availability() {
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  console.log(tours);
  const [loading, setLoading] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch, loading]);
  function getDayName(day: number) {
    switch (day) {
      case 1:
        return "Sun";
      case 2:
        return "Mon";
      case 3:
        return "Tue";
      case 4:
        return "Wed";
      case 5:
        return "Thu";
      case 6:
        return "Fri";
      case 7:
        return "Sat";
      default:
        return "Unknown";
    }
  }

  return (
    <>
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        {/* Main Content */}
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">List of Items</h1>
          <div className="container flex flex-col gap-4">
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
            <div className="bg-white p-3 rounded-lg shadow-custom-card-mui">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-3">
                  <span className="font-medium">Title</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Period time</span>
                </div>
                <div className="col-span-3">
                  <span className="font-medium">Weekdays</span>
                </div>
                <div className="col-span-3">
                  <span className="font-medium">Special dates</span>
                </div>
                <div className="col-span-1">
                  <span className="font-medium"> Status</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {tours?.map((dataTour: any, index: number) => {
                return (
                  <>
                    <div
                      key={index}
                      className="shadow-custom-card-mui bg-white rounded-lg relative"
                    >
                      <div className="bg-white flex items-center gap-2 p-4 rounded-t-lg">
                        <img
                          src={dataTour?.tour_images[0]}
                          className="w-12 h-12 rounded-lg"
                          alt="wait"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{dataTour?.name}</span>
                          <span className="font-medium text-gray-500">
                            {dataTour?.address_district},
                            {dataTour?.address_province},{" "}
                            {dataTour?.address_country}
                          </span>
                        </div>
                      </div>
                      <hr className="mb-2" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <EditAvailability
                          dataAvailability={dataTour?.TourAvailability}
                        />
                        <AddAvailability
                          dataDetailTour={dataTour}
                          setLoading={setLoading}
                        />
                        <AiOutlineDown
                          style={{ fontWeight: "800" }}
                          onClick={handleClick}
                        />
                      </div>
                      {dataTour?.TourAvailability?.length > 0 ? (
                        dataTour?.TourAvailability?.map(
                          (
                            _availability: {
                              name: string;
                              status: string;
                              validity_date_range_from: string;
                              validity_date_range_to: string;
                              weekdays: { day: number; timeSlot: string }[];
                              special_dates: {
                                date: string;
                                timeSlot: string;
                              }[];
                            },
                            index: number
                          ) => (
                            <div className=" px-4  mb-2  relative " key={index}>
                              <div className="grid grid-cols-12 gap-3 ">
                                <div className="col-span-3 flex items-center ">
                                  <div className="">
                                    <span className="font-medium">
                                      {_availability?.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-2 flex items-center ">
                                  <div className="flex flex-col relative gap-3">
                                    <AiOutlineDown className="absolute top-6 left-9 w-3 h-3" />
                                    <span className="">
                                      {dayjs(
                                        _availability?.validity_date_range_from
                                      ).format("YYYY-MM-DD")}
                                    </span>
                                    <span className=" text-gray-600 ">
                                      {dayjs(
                                        _availability?.validity_date_range_to
                                      ).format("YYYY-MM-DD")}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-3 flex items-center ">
                                  <div className="flex flex-wrap gap-3">
                                    {" "}
                                    {_availability?.weekdays?.map(
                                      (weekdayItem, index: number) => (
                                        <div
                                          key={index}
                                          className=" flex gap-1 "
                                        >
                                          <span className="">
                                            {getDayName(weekdayItem?.day)}
                                          </span>
                                          <span className="text-gray-500">
                                            {weekdayItem?.timeSlot}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-3 flex items-center">
                                  <div className="flex flex-wrap gap-3">
                                    {" "}
                                    {_availability?.special_dates?.map(
                                      (specialItem, index: number) => (
                                        <div
                                          key={index}
                                          className="flex gap-1 "
                                        >
                                          <span>{specialItem?.date}</span>
                                          <span className="text-gray-500">
                                            {specialItem?.timeSlot}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-1 flex items-center">
                                  <div>
                                    <button
                                      type="button"
                                      className={`text-sm px-1 rounded-sm ${
                                        _availability?.status === "ACTIVE"
                                          ? "bg-green-tag-opa text-green-tag"
                                          : "bg-red-300 text-red-900"
                                      }`}
                                    >
                                      {_availability?.status}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {index <
                                dataTour?.TourAvailability?.length - 1 && (
                                <hr className="mt-2" />
                              )}
                            </div>
                          )
                        )
                      ) : (
                        <div className="flex justify-center p-8">
                          <button
                            type="button"
                            className="bg-main rounded-md py-1 px-2 shadow-custom-card-mui font-medium"
                          >
                            This tour does not have availability
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

Availability.propTypes = {};

export default Availability;