import { Link, useParams } from "react-router-dom";
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
import { DatePicker } from "antd";
import { fetchTourDetail } from "../../../store/redux/silce/tourSlice";
import { IoHomeOutline } from "react-icons/io5";
import TruncatedText from "../../../utils/TruncatedText";

function CancelBooking() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();

  const { bookingDetail } = useSelector((detail: any) => detail?.booking);
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);
  console.log(tourDetail);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filteredBookings, setFilteredBookings] = useState(bookingDetail);
  const [selectedStatus, setSelectedStatus] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [dateChoose, setDateChoose] = useState([]);
  console.log(dateChoose);
  const [openField, setOpenField] = useState(false);

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

  console.log(bookingDetail);
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
    if (dateChoose) {
      filtered = filtered?.filter(
        (booking: any) =>
          dayjs(booking.booked_date).format("YYYY-MM-DD") === dateChoose
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
    setDateChoose(selectedDate?.format("YYYY-MM-DD"));
  };

  function disabledDate(current: any) {
    return !dateAvailability.some((date: any) =>
      dayjs(date).isSame(current, "day")
    );
  }
  const handleDateChange = (dates: any, dateStrings: any) => {
    // Thêm ngày mới vào mảng
    const newDateChoose: any = [...dateChoose, ...dateStrings];

    // Lưu mảng ngày đã chọn
    setDateChoose(newDateChoose);
  };

  const handleAddNewDate = () => {
    // Thêm ngày mới vào mảng (ví dụ: ngày hiện tại)
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const newDateChoose: any = [...dateChoose, formattedDate];

    // Lưu mảng ngày đã chọn
    setDateChoose(newDateChoose);
  };
  return (
    <div className="bg-main rounded-xl p-8 h-full overflow-y-auto global-scrollbar">
      <div className="mb-6" id="booking">
        <div className="flex justify-between px-4 items-start">
          <div className="flex gap-1 items-center">
            <Link to="/">
              <IoHomeOutline />
            </Link>
            /
            <Link to={`/booking`}>
              <button className="font-medium text-lg">List booking</button>
            </Link>{" "}
            /
            <Link to={`/booking/many/${index}`}>
              <div className="font-medium text-lg">
                <TruncatedText text={tourDetail?.name} maxLength={20} />
              </div>
            </Link>
            /
            <Link to="">
              <div className="font-medium text-lg">Cancel</div>
            </Link>
          </div>

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
                // mode={["date", "date"]}
              />
              <div>
                <DatePicker.RangePicker
                  format="YYYY-MM-DD" // Định dạng ngày
                  onChange={handleDateChange}
                />

                <button onClick={handleAddNewDate}>Thêm ngày mới</button>

                {/* Hiển thị danh sách ngày đã chọn */}
                <ul>
                  {dateChoose.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ul>
              </div>
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
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 " id="information_basic">
        <div className="font-medium text-xl pb-4"> Tour detail</div>

        <div className="bg-white p-4 rounded-lg shadow-custom-card-mui">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <Carousel className="createTourReviewImg">
                {tourDetail?.tour_images?.map((data: string, index: number) => (
                  <div key={index}>
                    <img src={data} alt={`Image ${index}`} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="col-span-7">
              <div className="flex flex-col gap-2 pt-5">
                <div className="grid grid-cols-12"></div>
                <div className="flex justify-between">
                  <span className="font-medium text-xl">
                    {tourDetail?.name}
                  </span>
                  <div>
                    <StatusTour>{tourDetail?.status}</StatusTour>
                  </div>
                </div>

                <span className="mb-2">{tourDetail?.description}</span>
                <div className="flex items-center gap-1">
                  <FaRegNoteSticky />
                  <div>
                    <p className="font-medium">Foot note</p>
                    <span className="">{tourDetail?.footnote}</span>
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <FaLocationDot />
                  <div>
                    <p className="font-medium">Location</p>
                    <span>
                      {tourDetail?.address_name}, {tourDetail?.address_ward},{" "}
                      {tourDetail?.address_district},{" "}
                      {tourDetail?.address_province},{" "}
                      {tourDetail?.address_country}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex items-center gap-1">
                    <GrCapacity />
                    <div>
                      <p className="font-medium">Duration</p>
                      <span>{tourDetail?.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsBookmarkCheck />
                    <div>
                      <p className="font-medium">Book before</p>
                      <span>{tourDetail?.book_before}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <RiRefundFill />
                    <div>
                      <p className="font-medium">Refund before</p>
                      <span>{tourDetail?.refund_before}</span>
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

export default CancelBooking;
