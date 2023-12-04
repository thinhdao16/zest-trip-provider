import { Link, useParams } from "react-router-dom";
import { FcPaid } from "react-icons/fc";
import { GiPriceTag } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import dayjs from "dayjs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillFilter } from "react-icons/ai";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingDetail } from "../../../store/redux/silce/booking";
import { StatusBooking } from "../../../styles/status/booking";
import { Menu, MenuItem, Rating } from "@mui/material";
import { formatNumber } from "../../../utils/formatNumber";
import Tooltip from "@mui/material/Tooltip";
import { StatusTour } from "../../../styles/status/tour";
import { DatePicker } from "antd";
import { fetchTourDetail } from "../../../store/redux/silce/tourSlice";
import { IoHomeOutline } from "react-icons/io5";
import TruncatedText from "../../../utils/TruncatedText";
import { Calendar } from "react-multi-date-picker";
import ModalCancelBooking from "./ModalCancelBooking";
import ModalBlockBooking from "./ModalBlockBooking";

function BookDetailScreenMain() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();

  const { bookingDetail } = useSelector((detail: any) => detail?.booking);
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);
  console.log(tourDetail);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filteredBookings, setFilteredBookings] = useState(bookingDetail);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [dateChoose, setDateChoose] = useState<any>([]);
  const [openField, setOpenField] = useState(false);
  console.log(dateChoose);
  const uniqueDates = new Set();
  const filteredBookingDetails: any = [];
  bookingDetail?.forEach((booking: any) => {
    const bookedDate = dayjs(booking?.booked_date).format("YYYY-MM-DD");

    if (!uniqueDates.has(bookedDate)) {
      uniqueDates.add(bookedDate);
      filteredBookingDetails.push(booking);
    }
  });
  const book_date_fil = filteredBookingDetails?.map(
    (data: { booked_date: string }) =>
      dayjs(data?.booked_date)?.format("YYYY-MM-DD")
  );
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

  const generateDatesForWeekday = (weekday: any, from: any, to: any) => {
    const formatFrom = dayjs(from).format("YYYY-MM-DD");
    const formatTo = dayjs(to).format("YYYY-MM-DD");
    const dates = [];
    const currentDate = new Date(formatFrom);
    const toDate = new Date(formatTo);

    while (currentDate <= toDate) {
      if (currentDate.getUTCDay() + 1 === weekday) {
        dates.push(new Date(currentDate).toISOString().split("T")[0]);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const allDates = bookingDetail?.flatMap((tour: any) => {
    const availabilityDates = tour?.BookingOnTour?.TourAvailability?.flatMap(
      (availability: any) => {
        const weekdays = availability?.weekdays?.map(
          (weekday: any) => weekday.day
        );

        return weekdays.flatMap((item: any) =>
          generateDatesForWeekday(
            item,
            availability.validity_date_range_from,
            availability.validity_date_range_to
          )
        );
      }
    );

    return availabilityDates;
  });

  const allSingleDates = bookingDetail
    ?.flatMap((tour: any) =>
      tour?.BookingOnTour?.TourAvailability?.flatMap((availability: any) =>
        availability?.special_dates?.map((specialDate: any) => specialDate.date)
      )
    )
    ?.filter((date: any) => date !== undefined);
  const [dateAvailability, setDateAvailability] = useState([
    ...allDates,
    ...allSingleDates,
  ]);

  const handleBookingHave = () => {
    const commonDates = dateAvailability.filter((date) =>
      book_date_fil.includes(date)
    );
    setDateAvailability(commonDates);
    setOpenField(true);
  };
  const handleAvailabilityHave = () => {
    setDateAvailability([...allDates, ...allSingleDates]);
    setOpenField(false);
  };
  useEffect(() => {
    let filtered = bookingDetail?.filter((booking: any) =>
      selectedStatus === "" ? true : booking.status === selectedStatus
    );

    if (dateChoose.length > 0) {
      filtered = filtered?.filter((booking: any) =>
        dateChoose.includes(dayjs(booking.booked_date).format("YYYY-MM-DD"))
      );
    }
    setDateAvailability([...allDates, ...allSingleDates]);
    setFilteredBookings(filtered);
  }, [bookingDetail, selectedStatus, dateChoose]);

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
      dispatch(fetchTourDetail(index));
    }
  }, [dispatch, index]);

  const availabilityIndex = 0;

  const handleAddSingleDate = (_index: number, selectedDate: any) => {
    const format = selectedDate?.map((date: any) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    setDateChoose(format);
  };

  function disabledDate(current: any) {
    return dateAvailability.some((date: any) =>
      dayjs(date).isSame(current, "day")
    );
  }

  const calculateTotalPaidPrice = (bookings: any): number => {
    return bookings
      .filter((booking: any) => booking.status !== "REJECT")
      .reduce((total: any, booking: any) => {
        const paidPrice = parseFloat(booking.paid_price) || 0;
        return total + paidPrice;
      }, 0);
  };

  const calculateTotalRefundAmount = (bookings: any): number => {
    return bookings
      .filter((booking: any) => booking.status !== "REJECT")
      .reduce((total: any, booking: any) => {
        const refundAmount = parseFloat(booking.refund_ammount) || 0;
        return total + refundAmount;
      }, 0);
  };

  const calculateTotalOriginalPrice = (bookings: any): number => {
    return bookings
      .filter((booking: any) => booking.status !== "REJECT")
      .reduce((total: any, booking: any) => {
        const originalPrice = parseFloat(booking.original_price) || 0;
        return total + originalPrice;
      }, 0);
  };
  const uniqueDatesMap = new Map();
  filteredBookings.forEach((booking: any) => {
    const bookedDate = dayjs(booking.booked_date).format("YYYY-MM-DD");
    if (!uniqueDatesMap.has(bookedDate)) {
      uniqueDatesMap.set(bookedDate, booking);
    }
  });

  // Chuyển kết quả từ Map thành mảng các booking objects duy nhất
  const uniqueBookings = Array.from(uniqueDatesMap.values());
  return (
    <div className="bg-main rounded-xl px-8 py-2 h-full overflow-y-auto global-scrollbar">
      <div className="mb-6" id="booking">
        <div className="flex justify-between px-4 items-start">
          <div className="flex gap-1 items-center">
            <Link to="/">
              <IoHomeOutline />
            </Link>
            /
            <Link to="/booking">
              <button className="font-medium text-lg">List booking</button>
            </Link>{" "}
            /
            <Link to="">
              <div className="font-medium text-lg">
                <TruncatedText text={tourDetail?.name} maxLength={20} />
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <div className="flex items-center gap-4 bg-white  p-4 shadow-custom-card-mui rounded-lg">
              <div className="">
                <img
                  src={tourDetail?.tour_images?.[0]}
                  alt={`Image ${index}`}
                  className="rounded-lg h-20 w-20 "
                />
              </div>
              <div className="">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="font-medium text-lg">
                      {tourDetail?.name}
                    </span>
                    <div>
                      <StatusTour>{tourDetail?.status}</StatusTour>
                    </div>
                  </div>

                  <span>
                    {tourDetail?.address_name}, {tourDetail?.address_ward},{" "}
                    {tourDetail?.address_district},{" "}
                    {tourDetail?.address_province},{" "}
                    {tourDetail?.address_country}
                  </span>

                  <div className="grid grid-cols-3">
                    <span>
                      <span className="font-medium">
                        {tourDetail?.duration_day}
                      </span>
                      /day
                    </span>
                    <span>
                      <span className="font-medium">
                        {tourDetail?.duration_night}
                      </span>
                      /night
                    </span>
                    <Rating
                      name="half-rating-read"
                      defaultValue={tourDetail?.avgRating}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="text-end flex flex-col justify-end items-end">
              <div className="mb-2 flex items-center gap-1">
                {!openField && (
                  <button
                    className="bg-navy-blue py-1.5 px-2 text-white rounded-md text-sm "
                    onClick={handleBookingHave}
                  >
                    Check booking
                  </button>
                )}
                {openField && (
                  <button
                    className="bg-navy-blue py-1.5 px-2 text-white rounded-md text-sm "
                    onClick={handleAvailabilityHave}
                  >
                    Check availability
                  </button>
                )}

                <DatePicker
                  disabledDate={disabledDate}
                  onChange={(date: any) =>
                    handleAddSingleDate(availabilityIndex, date)
                  }
                />
              </div>
              <div className="flex items-center gap-2">
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
                    <MenuItem onClick={() => handleStatusClick("")}>
                      All
                    </MenuItem>
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
                    <MenuItem
                      onClick={() => handleStatusClick("PROVIDER_REFUND")}
                    >
                      Provider_refund
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusClick("REFUNDED")}>
                      Refunded
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-12 gap-4 p-4 ">
            <div className="col-span-5">
              <div className="bg-white rounded-lg shadow-custom-card-mui p-4 flex flex-col gap-2">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <span className="font-medium">Total booking</span>
                  </div>
                  <div className="col-span-4">
                    <span>{filteredBookings?.length}</span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <span className="font-medium">Paid price</span>
                  </div>
                  <div className="col-span-4">
                    <span>
                      {formatNumber(calculateTotalPaidPrice(filteredBookings))}
                    </span>{" "}
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <span className="font-medium">Original price</span>
                  </div>
                  <div className="col-span-4">
                    <span>
                      {formatNumber(
                        calculateTotalOriginalPrice(filteredBookings)
                      )}
                    </span>{" "}
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <span className="font-medium">Refund amount</span>
                  </div>
                  <div className="col-span-4">
                    <span>
                      {formatNumber(
                        calculateTotalRefundAmount(filteredBookings)
                      )}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <span className="font-medium">Time slot</span>
                  </div>

                  <div className="col-span-4">
                    {dateChoose?.length === 0 ? (
                      <span>
                        {dateChoose?.length === 0 && (
                          <span className="font-medium text-gray-500 text-xs">
                            (All Booked),{" "}
                          </span>
                        )}
                        {uniqueBookings?.map((time) => (
                          <span>
                            {dayjs(time?.booked_date)?.format("YYYY-MM-DD")},{" "}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <>
                        {dateChoose?.map((choose: string) => (
                          <span>{choose}</span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <hr />

                <div className="mt-2  flex items-center justify-end gap-4">
                  <ModalBlockBooking dateDate={dateChoose} />
                  {dateChoose?.length < 2 && (
                    <ModalCancelBooking dateDate={dateChoose} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-7">
              <Calendar
                className="px-8"
                multiple
                numberOfMonths={2}
                mapDays={({ date }) => {
                  const formattedDate = date.format("YYYY-MM-DD");
                  const isDisabled = dateAvailability.includes(formattedDate);
                  return { disabled: !isDisabled };
                }}
                onChange={(date: any) =>
                  handleAddSingleDate(availabilityIndex, date)
                }
              />
            </div>
          </div>
        </div>

        <div className=" p-4 flex flex-col gap-3">
          {filteredBookings && filteredBookings.length > 0 ? (
            filteredBookings.map((booking: any, index: number) => (
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
                      <span className="font-medium">
                        {booking?.booker_name}
                      </span>
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
                    <Link to={`/booking/${booking?.id}`} key={booking?.id}>
                      <HiOutlineDotsVertical />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">No one booking.</div>
          )}
        </div>
      </div>
    </div>
  );
}

BookDetailScreenMain.propTypes = {};

export default BookDetailScreenMain;
