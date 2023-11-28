import { useParams } from "react-router-dom";
import { FcPaid } from "react-icons/fc";
import { GiPriceTag } from "react-icons/gi";
import { MdCreateNewFolder, MdUpdate } from "react-icons/md";
import dayjs from "dayjs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillFilter } from "react-icons/ai";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingDetail } from "../../../store/redux/silce/booking";
import { StatusBooking } from "../../../styles/status/booking";
import { Menu, MenuItem } from "@mui/material";
import { formatNumber } from "../../../utils/formatNumber";
import Tooltip from "@mui/material/Tooltip";
import { Carousel } from "react-responsive-carousel";
import { FaLocationDot, FaRegNoteSticky } from "react-icons/fa6";
import { RiRefundFill } from "react-icons/ri";
import { BsBookmarkCheck } from "react-icons/bs";
import { GrCapacity } from "react-icons/gr";
import { StatusTour } from "../../../styles/status/tour";

function BookDetailScreenMain() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();

  const { bookingDetail } = useSelector((detail: any) => detail?.booking);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filteredBookings, setFilteredBookings] = useState(bookingDetail);
  console.log(filteredBookings);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = (status: any) => {
    setSelectedStatus(status);
    setAnchorEl(null);
  };

  const handleStartDateChange = (event: any) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: any) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    let filtered = bookingDetail?.filter((booking: any) =>
      selectedStatus === "" ? true : booking.status === selectedStatus
    );
    console.log(startDate);

    if (startDate && endDate) {
      filtered = filtered?.filter(
        (booking: any) =>
          dayjs(booking.updated_at).format("YYYY-MM-DD") >= startDate &&
          dayjs(booking.updated_at).format("YYYY-MM-DD") <= endDate
      );
    }

    setFilteredBookings(filtered);
  }, [bookingDetail, selectedStatus, startDate, endDate]);

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
    }
  }, [dispatch, index]);
  return (
    <div className="bg-main rounded-xl p-8 h-full overflow-y-auto global-scrollbar">
      <div className="mb-6" id="booking">
        <div className="flex justify-between px-4">
          <div className="font-medium text-xl pb-4">List booking</div>
          <div>
            <div className="flex gap-1">
              <span>From</span>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="flex gap-1">
              <span>To</span>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>

            <button
              type="button"
              className="relative border border-gray-300 pl-0 py-1 w-24 rounded-md bg-white"
              onClick={handleClick}
            >
              <AiFillFilter className="absolute top-2 left-2" />
              Filter
            </button>
            <div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleStatusClick("")}>All</MenuItem>
                <MenuItem onClick={() => handleStatusClick("PENDING")}>
                  Pending
                </MenuItem>
                <MenuItem onClick={() => handleStatusClick("REJECT")}>
                  Reject
                </MenuItem>
                <MenuItem
                  onClick={() => handleStatusClick("USER_REQUEST_REFUND")}
                >
                  User resquest refund
                </MenuItem>
                <MenuItem onClick={() => handleStatusClick("ACCEPTED")}>
                  Accept
                </MenuItem>
                <MenuItem onClick={() => handleStatusClick("PROVIDER_REFUND")}>
                  Provider_refund
                </MenuItem>
                <MenuItem onClick={() => handleStatusClick("REFUNDED")}>
                  Refunded
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        <div className=" p-4 flex flex-col gap-3">
          {filteredBookings?.map((booking: any, index: number) => (
            <div
              className="bg-white grid grid-cols-5 gap-2 items-center shadow-custom-card-mui p-4 border border-solid border-gray-300 rounded-lg"
              key={index}
            >
              {/* <div className="col-span-1 flex items-center justify-end font-medium">
                <span>{booking?.booker_name}</span>
              </div> */}
              <div className="">
                <div className="flex gap-2">
                  {/* <div className="w-w-2 rounded-full h-auto bg-gray-500"></div> */}
                  <div>
                    <span className="font-medium">{booking?.booker_name}</span>
                    <p className="font-medium">{booking?.booker_email}</p>
                    <p className="">{booking?.booker_phone}</p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex flex-col">
                  {booking?.TicketOnBooking?.map(
                    (ticketQuantity: any, index: number) => (
                      <div key={index} className="">
                        <div className="flex">
                          <span className="font-medium">
                            {ticketQuantity?.ticket_type_id === 1
                              ? "Adult"
                              : "Children"}
                            {": "}
                          </span>
                          <span>{ticketQuantity?.quantity}</span>
                        </div>
                        <div className="flex text-sm gap-2">
                          <Tooltip title="Original price" placement="top-end">
                            <div className="flex items-center gap-1">
                              <GiPriceTag />
                              <span className="text-gray-500">
                                {formatNumber(
                                  parseInt(ticketQuantity?.original_price)
                                )}
                              </span>
                            </div>
                          </Tooltip>

                          <Tooltip title="Paid price" placement="top">
                            <div className="flex items-center gap-1">
                              <FcPaid />
                              <span className="text-gray-500">
                                {formatNumber(
                                  parseInt(ticketQuantity?.paid_price)
                                )}
                              </span>
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="">
                <Tooltip title="Tour start" placement="top">
                  <div className="flex items-center gap-1">
                    <MdCreateNewFolder />
                    <span className="font-medium">
                      {dayjs(booking?.booked_date)?.format("YYYY-MM-DD")}:
                    </span>
                    <span className="font-medium text-gray-500">
                      {booking?.time_slot}
                    </span>
                  </div>
                </Tooltip>
                <Tooltip title="Booking at" placement="top">
                  <div className="flex items-center gap-1">
                    <MdUpdate />
                    <span className="font-medium text-gray-700">
                      {dayjs(booking?.updated_at)?.format("YYYY-MM-DD")}
                    </span>
                  </div>
                </Tooltip>
              </div>
              <div className="">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Total original:</span>
                    <span className="font-medium text-gray-500">
                      {formatNumber(parseInt(booking?.original_price))}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Total Paid:</span>
                    <span className="font-medium text-gray-500">
                      {formatNumber(parseInt(booking?.paid_price))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-4 justify-end">
                  <StatusBooking>{booking?.status}</StatusBooking>
                  <HiOutlineDotsVertical />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mb-6 " id="revenue">
        <div className="font-medium text-xl pb-4">Total revenue</div>

        <div className=" p-4">
          <div className="bg-white shadow-custom-card-mui p-4 border border-solid border-gray-300 rounded-lg">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-4 border-r border-solid border-gray-300 pr-3">
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex justify-between px-4">
                    <span>Total Invoice</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between px-4">
                    <span>Total Paid</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between px-4">
                    <span>Invoice Balance</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />

                  <div className="flex justify-between px-4">
                    <span>Booking Balance</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                </div>
              </div>
              <div className="col-span-4 border-r border-solid border-gray-300 pr-3">
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex justify-between px-4">
                    <span>Gross</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between px-4">
                    <span>Discount</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />

                  <div className="flex justify-between px-4">
                    <span>Delivery Charges</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />

                  <div className="flex justify-between px-4">
                    <span>Net</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                </div>
              </div>{" "}
              <div className="col-span-4 grid content-between px-4 py-2">
                <div className="flex justify-between">
                  <span></span>
                  <span className="font-medium text-3xl">₫&nbsp;400000</span>
                </div>
                <div className="flex justify-between pl-3">
                  <span>Tax</span>
                  <span className="font-medium ">₫&nbsp;400000</span>
                </div>{" "}
                <div className="flex justify-center">
                  <div className="font-medium py-2 border border-solid border-gray-300 pr-10 pl-6">
                    Margin
                  </div>
                  <div className="font-medium text-white bg-navy-blue py-2 pr-6 pl-10 relative">
                    {" "}
                    100%
                    <AiOutlineCaretRight
                      className="absolute top-3 "
                      style={{ left: "-6px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="mb-4 " id="information_basic">
        <div className="font-medium text-xl pb-4">
          {" "}
          Infomation basic tour detail
        </div>

        <div className="bg-white p-4 rounded-lg shadow-custom-card-mui">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <Carousel className="createTourReviewImg">
                {filteredBookings[0]?.BookingOnTour?.tour_images?.map(
                  (data: string, index: number) => (
                    <div key={index}>
                      <img src={data} alt={`Image ${index}`} />
                    </div>
                  )
                )}
              </Carousel>
            </div>
            <div className="col-span-7">
              <div className="flex flex-col gap-2 pt-5">
                <div className="grid grid-cols-12"></div>
                <div className="flex justify-between">
                  <span className="font-medium text-xl">
                    {filteredBookings[0]?.BookingOnTour?.name}
                  </span>
                  <div>
                    <StatusTour>
                      {filteredBookings[0]?.BookingOnTour?.status}
                    </StatusTour>
                  </div>
                </div>

                <span className="mb-2">
                  {filteredBookings[0]?.BookingOnTour?.description}
                </span>
                <div className="flex items-center gap-1">
                  <FaRegNoteSticky />
                  <div>
                    <p className="font-medium">Foot note</p>
                    <span className="">
                      {filteredBookings[0]?.BookingOnTour?.footnote}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <FaLocationDot />
                  <div>
                    <p className="font-medium">Location</p>
                    <span>
                      {filteredBookings[0]?.BookingOnTour?.address_name},{" "}
                      {filteredBookings[0]?.BookingOnTour?.address_ward},{" "}
                      {filteredBookings[0]?.BookingOnTour?.address_district},{" "}
                      {filteredBookings[0]?.BookingOnTour?.address_province},{" "}
                      {filteredBookings[0]?.BookingOnTour?.address_country}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex items-center gap-1">
                    <GrCapacity />
                    <div>
                      <p className="font-medium">Duration</p>
                      <span>
                        {filteredBookings[0]?.BookingOnTour?.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsBookmarkCheck />
                    <div>
                      <p className="font-medium">Book before</p>
                      <span>
                        {filteredBookings[0]?.BookingOnTour?.book_before}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <RiRefundFill />
                    <div>
                      <p className="font-medium">Refund before</p>
                      <span>
                        {filteredBookings[0]?.BookingOnTour?.refund_before}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BookDetailScreenMain.propTypes = {};

export default BookDetailScreenMain;
