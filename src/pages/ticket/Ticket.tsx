import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Index";
import { AppDispatch } from "../../store/redux/store";
import { useContext, useEffect, useState } from "react";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { useSelector } from "react-redux";
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
import { Pagination } from "antd";
import { DataContext } from "../../store/dataContext/DataContext";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import TruncatedText from "../../utils/TruncatedText";
import { StatusTour } from "../../styles/status/tour";
import { Link } from "react-router-dom";

function Ticket() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch: AppDispatch = useDispatch();
  const { tours, loading } = useSelector((state: any) => state.tour);
  const { refeshTour } = useContext(DataContext);
  const dataTours = tours?.tours;
  console.log(dataTours);
  const countTours = tours?.total_count;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
  }, [currentPage, dispatch, pageSize, refeshTour]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    console.log(current);
    setPageSize(size);
    setCurrentPage(current);
  };
  const countTickets = (bookings: any, field: string) => {
    let count = 0;
    if (field === "adult") {
      const tickets = bookings.TicketPricing.map((pricing: any) => pricing);
      tickets.forEach((ticket: any) => {
        if (ticket.is_default === true && ticket.Ticket.name === "ADULT") {
          count++;
        }
      });
      return count;
    }
    if (field === "children") {
      const tickets = bookings.TicketPricing.map((pricing: any) => pricing);
      tickets.forEach((ticket: any) => {
        if (ticket.is_default === true && ticket.Ticket.name === "CHILDREN") {
          count++;
        }
      });
      return count;
    }
    if (field === "special") {
      const tickets = bookings.TicketPricing.map((pricing: any) => pricing);
      tickets.forEach((ticket: any) => {
        if (ticket.is_default === false) {
          count++;
        }
      });
      return count;
    }
  };

  return (
    <>
      {loading ? (
        <LoadingFullScreen loading={loading} />
      ) : (
        <>
          <Navbar />

          <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
            <div className="container mx-auto py-4 px-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold ">List of Ticket</h1>
                  <span className="text-gray-500">
                    When provider have ticket new, they open here
                  </span>
                </div>
              </div>
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
                    <div className="col-span-6">
                      <span className="font-medium">Info</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-medium">Total adult</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-medium">Total children</span>
                    </div>
                    <div className="col-span-2 text-center  ">
                      <span className="font-medium">Total special</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {dataTours?.length > 0 ? (
                    Array.isArray(dataTours) &&
                    dataTours?.map((dataTour: any, index: number) => (
                      <>
                        <div
                          key={index}
                          className="shadow-custom-card-mui bg-white rounded-lg relative"
                        >
                          <Link to={`detail/${dataTour?.id}`}>
                            <div className="bg-white gap-2 p-4 rounded-lg grid grid-cols-12">
                              <div className="flex items-center col-span-6 gap-4 relative">
                                <div className="absolute right-0">
                                  <StatusTour>{dataTour?.status}</StatusTour>
                                </div>
                                <img
                                  src={dataTour?.tour_images[0]}
                                  className="w-12 h-12 rounded-lg"
                                  alt="wait"
                                />
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    <TruncatedText
                                      text={dataTour?.name}
                                      maxLength={45}
                                    />
                                  </span>
                                  <span className="font-medium text-gray-500">
                                    {dataTour?.address_district},
                                    {dataTour?.address_province},{" "}
                                    {dataTour?.address_country}
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-2 text-center ">
                                <span>{countTickets(dataTour, "adult")}</span>
                              </div>
                              <div className="col-span-2 text-center">
                                <span>
                                  {countTickets(dataTour, "children")}
                                </span>
                              </div>
                              <div className="col-span-2 text-center ">
                                <span>{countTickets(dataTour, "special")}</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))
                  ) : (
                    <button
                      type="button"
                      className="bg-main rounded-md py-1 px-2 shadow-custom-card-mui font-medium"
                    >
                      {loading ? "Loading..." : "No tours available"}
                    </button>
                  )}

                  <div className="flex justify-center">
                    {dataTours?.length > 0 && (
                      <Pagination
                        current={currentPage}
                        total={countTours}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 30, 40]}
                        showSizeChanger
                        onChange={handlePageChange}
                        onShowSizeChange={(current, size) =>
                          handlePageSizeChange(current, size)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Ticket;
