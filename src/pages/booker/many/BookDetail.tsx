import { Link, useParams } from "react-router-dom";
import { FcPaid } from "react-icons/fc";
import { GiPriceTag } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import dayjs from "dayjs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingDetail } from "../../../store/redux/silce/booking";
import { StatusBooking } from "../../../styles/status/booking";
import { Rating } from "@mui/material";
import { formatNumber } from "../../../utils/formatNumber";
import { StatusTour } from "../../../styles/status/tour";
import { fetchTourDetail } from "../../../store/redux/silce/tourSlice";
import { IoHomeOutline } from "react-icons/io5";
import TruncatedText from "../../../utils/TruncatedText";
import { Calendar } from "react-multi-date-picker";
import ModalCancelBooking from "./ModalCancelBooking";
import ModalBlockBooking from "./ModalBlockBooking";
import { Select, Tooltip, message } from "antd";
import ModalUnBlockBooking from "./ModalUnBlockBooking";
import Navbar from "../../../components/Navbar/Index";
import { TiLockOpenOutline } from "react-icons/ti";
import { DataContext } from "../../../store/dataContext/DataContext";
import { GoDotFill } from "react-icons/go";
function BookDetail() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();
  const { loading, reloadStatus } = useContext(DataContext);
  const { bookingDetail } = useSelector((detail: any) => detail?.booking);
  const bookingDontReject = bookingDetail?.filter(
    (booking: any) => booking?.status !== "REJECT"
  );
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);
  const [filteredBookings, setFilteredBookings] = useState(bookingDontReject);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateChoose, setDateChoose] = useState<any>([]);
  const [openField, setOpenField] = useState(false);
  const [fieldBlock, setFieldBlock] = useState("normal");
  const [fieldCancel, setFieldCancel] = useState("normal");
  const [fieldBlockTour, setFieldBlockTour] = useState("normal");

  const [dateChooseUnclock, setDateChooseUnclock] = useState([]);

  const [openModalUnBlock, setOpenModalUnblock] = useState(false);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [openModalBlock, setOpenModalBlock] = useState(false);

  const [valueSelectCalendar, setValueSelectCalendar] = useState<any>();

  const [dateBookDontAvai, setDateBookDontAvai] = useState<any>([]);

  const uniqueDates = new Set();

  const filteredBookingDetails: any = [];
  bookingDontReject?.forEach((booking: any) => {
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

  const handleStatusClick = (status: any) => {
    setSelectedStatus(status);
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

  const allDates = bookingDontReject?.flatMap((tour: any) => {
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
  const availabilityDates = tourDetail?.TourAvailability
    ? tourDetail.TourAvailability.flatMap((availability: any) => {
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
      })
    : [];

  const allSingleDates = bookingDontReject
    ?.flatMap((tour: any) =>
      tour?.BookingOnTour?.TourAvailability?.flatMap((availability: any) =>
        availability?.special_dates?.map((specialDate: any) => specialDate.date)
      )
    )
    ?.filter((date: any) => date !== undefined);

  const bookedDates =
    bookingDontReject?.map((book: { booked_date: string }) =>
      dayjs(book.booked_date).format("YYYY-MM-DD")
    ) || [];
  const availableBookedDates = bookedDates?.filter(
    (bookedDate: any) => !availabilityDates?.includes(bookedDate)
  );
  const [dateAvailability, setDateAvailability] = useState([
    ...allDates,
    ...allSingleDates,
    ...availabilityDates,
  ]);

  const handleBookingHave = () => {
    const commonDates = dateAvailability.filter((date) =>
      book_date_fil.includes(date)
    );
    setDateAvailability([...commonDates, ...availableBookedDates]);
    setOpenField(true);
    setFieldBlock("normal");
    message.info("This is the booking");
  };
  const handleAvailabilityHave = () => {
    setDateAvailability([...allDates, ...allSingleDates, ...availabilityDates]);
    setOpenField(false);
    setFieldBlock("normal");
    message.info("This is the availability");
  };
  useEffect(() => {
    let filtered = bookingDontReject?.filter((booking: any) =>
      selectedStatus === "" ? true : booking.status === selectedStatus
    );

    if (dateChoose.length > 0) {
      filtered = filtered?.filter((booking: any) =>
        dateChoose.includes(dayjs(booking.booked_date).format("YYYY-MM-DD"))
      );
    }
    setFilteredBookings(filtered);
    setDateBookDontAvai(availableBookedDates);
  }, [bookingDetail, selectedStatus, dateChoose, loading]);

  useEffect(() => {
    setDateAvailability([...allDates, ...allSingleDates, ...availabilityDates]);
  }, [bookingDetail]);

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
      dispatch(fetchTourDetail(index));
    }
  }, [dispatch, index, loading, reloadStatus]);
  useEffect(() => {
    // Code xử lý sau khi reloadStatus thay đổi
    console.log("reloadStatus changed:", reloadStatus);
  }, [reloadStatus]);
  const availabilityIndex = 0;

  const handleAddSingleDate = (_index: number, selectedDate: any) => {
    const formattedDates = selectedDate?.map((date: any) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    setValueSelectCalendar(formattedDates);
    if (fieldBlock === "normal") {
      setDateChoose(formattedDates);
    }
    if (fieldBlock === "unBlock") {
      setDateChooseUnclock(formattedDates);
    }
  };

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

  const calculateTotalProviderRecevie = (bookings: any): number => {
    return bookings
      .filter((booking: any) => booking.status !== "REJECT")
      .reduce((total: any, booking: any) => {
        const refundAmount = parseFloat(booking.provider_receive) || 0;
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

  const uniqueBookings = Array.from(uniqueDatesMap.values());
  const handleUnClock = () => {
    setValueSelectCalendar(undefined);

    setDateAvailability(tourDetail?.blocked_dates);

    setFieldBlock("unBlock");
  };
  const handleContinueUnBlock = () => {
    const currentDate = new Date();
    const isAnyDateBeforeCurrent = dateChooseUnclock?.some(
      (selectedDate: any) => {
        const chosenDate = new Date(selectedDate);
        return chosenDate < currentDate;
      }
    );

    if (isAnyDateBeforeCurrent) {
      message.warning("There is at least one date before the current date");
    } else {
      if (dateChooseUnclock.length > 0) {
        setOpenModalUnblock(true);
      } else {
        message.warning("Please choose day to unblock");
      }
    }
  };
  const handleClock = () => {
    setDateAvailability([...allDates, ...allSingleDates, ...availabilityDates]);
    setFieldBlock("normal");
  };

  const handleCancel = () => {
    setFieldCancel("cancel");
  };
  const handleContinueCancel = () => {
    const currentDate = new Date();
    const isAnyDateBeforeCurrent = dateChoose.some((selectedDate: any) => {
      const chosenDate = new Date(selectedDate);
      return chosenDate < currentDate;
    });
    const formattedBlockedDates = tourDetail?.blocked_dates.map((date: any) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    const isDateBlocked = dateChoose?.some((date: any) =>
      formattedBlockedDates.includes(date)
    );
    if (isAnyDateBeforeCurrent) {
      message.warning("There is at least one date before the current date");
    } else {
      if (dateChoose.length === 1 && !isDateBlocked) {
        setOpenModalCancel(true);
      } else {
        message.warning(
          "Please choose 1 day for cancel and dont choose date blocked"
        );
      }
    }
  };
  const handleCancalCancel = () => {
    setFieldCancel("normal");
  };

  const handleBlockTour = () => {
    setFieldBlockTour("blockTour");
  };
  const handleContinueBlockTour = () => {
    const currentDate = new Date();
    const isAnyDateBeforeCurrent = dateChoose.some((selectedDate: any) => {
      const chosenDate = new Date(selectedDate);
      return chosenDate < currentDate;
    });

    const formattedBlockedDates = tourDetail?.blocked_dates.map((date: any) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    const isDateBlocked = dateChoose?.some((date: any) =>
      formattedBlockedDates.includes(date)
    );

    if (isAnyDateBeforeCurrent) {
      message.warning("There is at least one date before the current date");
    } else {
      if (dateChoose.length > 0 && !isDateBlocked) {
        setOpenModalBlock(true);
      } else {
        message.warning("Please choose day and dont choose  date blocked");
      }
    }
  };
  const handleCanelBlockTour = () => {
    setFieldBlockTour("normal");
  };

  const handleClearDate = () => {
    setValueSelectCalendar(undefined);
    setDateAvailability([...allDates, ...allSingleDates, ...availabilityDates]);
    setDateChoose([]);
    setDateChooseUnclock([]);
    setFieldBlock("normal");
    setFieldCancel("normal");
    setFieldBlockTour("normal");
    setFieldCancel("normal");
    setFieldBlock("normal");
    setOpenField(false);
  };
  const handleToday = () => {
    setValueSelectCalendar(new Date());
    setFieldBlock("normal");
  };

  return (
    <>
      <Navbar />
      <div className="bg-main rounded-xl px-8 py-2 h-screen overflow-y-auto global-scrollbar">
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
          <div className="grid grid-cols-12 p-4">
            <div className="col-span-8">
              <div className="flex items-center gap-4 bg-white  p-4 shadow-custom-card-mui rounded-lg relative">
                <div className="absolute top-2 right-2">
                  <StatusTour idtour={tourDetail?.id}>
                    {tourDetail?.status}
                  </StatusTour>
                </div>
                <div className="">
                  <img
                    src={tourDetail?.tour_images?.[0]}
                    alt={`Image ${index}`}
                    className="rounded-lg h-20 w-20 "
                  />
                </div>
                <div className="">
                  <div className="flex flex-col ">
                    <div className="flex justify-between">
                      <span className="font-medium text-lg">
                        <TruncatedText text={tourDetail?.name} maxLength={50} />
                      </span>
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
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue="Filter"
                    onChange={handleStatusClick}
                    style={{ width: 120 }}
                    allowClear
                    options={[
                      { value: "", label: "Filter" },
                      { value: "PENDING", label: "Pending" },
                      { value: "ACCEPTED", label: "Accepted" },
                      { value: "REFUNDED", label: "Refund" },
                      {
                        value: "USER_REQUEST_REFUND",
                        label: "User request refund",
                      },
                      { value: "PROVIDER_REFUNDED", label: "Provider refund" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 p-4 ">
              <div className="col-span-5 ">
                <div className="bg-white rounded-lg shadow-custom-card-mui p-4 flex flex-col gap-2 h-80">
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
                        {formatNumber(
                          calculateTotalPaidPrice(filteredBookings)
                        )}
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
                      <span className="font-medium">Provider receive</span>
                    </div>
                    <div className="col-span-4">
                      <span>
                        {formatNumber(
                          calculateTotalProviderRecevie(filteredBookings)
                        )}
                      </span>
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

                    <div className="col-span-4 h-12  overflow-auto global-scrollbar">
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
                            <span>{choose}, </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <hr />

                  <div className="mt-2  grid grid-cols-2 gap-4">
                    <div className="text-end">
                      {fieldCancel === "cancel" ? (
                        <div className="text-sm flex gap-2 items-center justify-end">
                          <button
                            type="button"
                            className=""
                            onClick={handleCancalCancel}
                          >
                            {" "}
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="text-green-700"
                            onClick={handleContinueCancel}
                          >
                            {" "}
                            Continue
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handleCancel}
                          type="button"
                          className="bg-red-700 px-2 py-1 text-white rounded-md text-sm"
                        >
                          Cancel trip
                        </button>
                      )}
                    </div>
                    <div>
                      {fieldBlockTour === "blockTour" ? (
                        <div className="text-sm flex gap-2 items-center">
                          <button
                            type="button"
                            className=""
                            onClick={handleCanelBlockTour}
                          >
                            {" "}
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="text-green-700"
                            onClick={handleContinueBlockTour}
                          >
                            {" "}
                            Continue
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handleBlockTour}
                          type="button"
                          className="bg-yellow-600 px-2 py-1 text-white rounded-md text-sm"
                        >
                          Block trip
                        </button>
                      )}
                    </div>
                  </div>

                  {dateChoose?.length < 2 && (
                    <ModalCancelBooking
                      dataDate={dateChoose}
                      openModal={openModalCancel}
                      setOpenMoal={setOpenModalCancel}
                    />
                  )}
                  <ModalUnBlockBooking
                    dataDate={dateChooseUnclock}
                    openModal={openModalUnBlock}
                    setOpenMoal={setOpenModalUnblock}
                  />
                </div>
              </div>
              <div className="col-span-7 flex ">
                <Calendar
                  value={valueSelectCalendar}
                  className=" px-4 relative pt-8 h-80  calendar-book-detail"
                  multiple
                  numberOfMonths={2}
                  mapDays={({ date }) => {
                    const formattedDate = date.format("YYYY-MM-DD");
                    const formattedDateDisable = dateAvailability?.map(
                      (disableDate: any) =>
                        dayjs(disableDate).format("YYYY-MM-DD")
                    );
                    const isDisabled =
                      formattedDateDisable.includes(formattedDate);

                    const formattedBlockedDates =
                      tourDetail?.blocked_dates?.map((blockedDate: any) =>
                        dayjs(blockedDate).format("YYYY-MM-DD")
                      );
                    const isBlocked = formattedBlockedDates?.includes(
                      dayjs(formattedDate).format("YYYY-MM-DD")
                    );

                    const dateDont = dateBookDontAvai?.includes(formattedDate);
                    const dateChooseColor =
                      valueSelectCalendar?.includes(formattedDate);
                    const style = {
                      backgroundColor: dateChooseColor
                        ? "#0074d9"
                        : isBlocked && dateDont
                        ? "#4b0082"
                        : isBlocked
                        ? "#ff6384"
                        : dateDont
                        ? "#ffc148"
                        : "",
                    };

                    return {
                      disabled: !isDisabled,
                      style: style,
                    };
                  }}
                  onChange={(date: any) =>
                    handleAddSingleDate(availabilityIndex, date)
                  }
                >
                  <div className="mb-2 flex flex-col items-center justify-end gap-2 ">
                    <div className=" top-2 left-8 absolute flex  ">
                      {fieldBlock === "normal" && (
                        <Tooltip title="Unblock tour">
                          <button
                            type="button"
                            className=""
                            onClick={handleUnClock}
                          >
                            <TiLockOpenOutline className="w-5 h-5 text-green-700" />
                          </button>
                        </Tooltip>
                      )}
                      {fieldBlock === "unBlock" && (
                        <div className="text-sm flex gap-2 items-center">
                          <button
                            type="button"
                            className=""
                            onClick={handleClock}
                          >
                            {" "}
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="text-green-700"
                            onClick={handleContinueUnBlock}
                          >
                            {" "}
                            Continue
                          </button>
                        </div>
                      )}
                    </div>

                    {!openField && (
                      <div className=" top-2 right-6  absolute flex justify-center">
                        <div className=" w-36">
                          <button
                            type="button"
                            className="bg-navy-blue py-1 px-2 text-white rounded-md text-sm w-36 "
                            onClick={handleBookingHave}
                          >
                            Check booking
                          </button>
                        </div>
                      </div>
                    )}
                    {openField && (
                      <div className="top-2 right-6  absolute flex justify-center">
                        <div className=" w-36">
                          <button
                            className="bg-navy-blue py-1 px-2 text-white rounded-md text-sm w-36 "
                            onClick={handleAvailabilityHave}
                          >
                            Check availability
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-1 absolute top-2 inset-x-1/2 justify-center">
                      <button
                        className="bg-gray-100 shadow-custom-card-mui p-1 rounded-md text-sm"
                        onClick={() => handleToday()}
                      >
                        Today
                      </button>
                      <button
                        className="bg-gray-100 shadow-custom-card-mui p-1 rounded-md text-sm"
                        onClick={() => handleClearDate()}
                      >
                        Deselect
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-6">
                      <ModalBlockBooking
                        dataDate={dateChoose}
                        openModal={openModalBlock}
                        setOpenMoal={setOpenModalBlock}
                      />
                    </div>
                  </div>
                </Calendar>
                <div className="h-80 bg-white shadow-custom-card-mui rounded-lg pl-4 py-4 pr-2 flex flex-col gap-4 justify-center">
                  <div className="flex items-center ">
                    <GoDotFill
                      className="w-5 h-5"
                      style={{ color: "#ff6384" }}
                    />
                    <span className="text-sm">Blocked date</span>
                  </div>
                  <div className="flex items-start ">
                    <GoDotFill
                      className="w-5 h-5"
                      style={{ color: "#ffc148" }}
                    />
                    <span className="text-sm">Orphan date</span>
                  </div>
                  <div className="flex items-start ">
                    <GoDotFill
                      className="w-5 h-5"
                      style={{ color: "#0074d9" }}
                    />
                    <span className="text-sm">Pick date</span>
                  </div>
                  <div className="grid grid-cols-12 ">
                    <div className="col-span-2">
                      <GoDotFill
                        className="w-5 h-5"
                        style={{ color: " #4b0082" }}
                      />
                    </div>
                    <div className="col-span-10">
                      <span className="text-sm flex-wrap flex">
                        Orphan & block date
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" p-4 flex flex-col gap-3">
            {filteredBookings && filteredBookings.length > 0 ? (
              filteredBookings.map((booking: any, index: number) => (
                <Link to={`/booking/${booking?.id}`} key={booking?.id}>
                  <div
                    className="transition-effect-hover bg-white grid grid-cols-5 gap-2 items-center shadow-custom-card-mui p-4 border border-solid border-gray-300 rounded-lg"
                    key={index}
                  >
                    <div className="">
                      <div className="flex gap-2">
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
                                <Tooltip title="Original price">
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
                    <div className="text-center">
                      <Tooltip title="Tour start" placement="top">
                        <div className="flex items-center gap-1">
                          <MdCreateNewFolder />
                          <span className="font-medium">
                            {dayjs(booking?.booked_date)?.format("YYYY-MM-DD")}:
                          </span>
                          <span className="">{booking?.time_slot}</span>
                        </div>
                      </Tooltip>
                      <div className="">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Total original:</span>
                          <span className="">
                            {formatNumber(parseInt(booking?.original_price))}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Total Paid:</span>
                          <span className=" ">
                            {formatNumber(parseInt(booking?.paid_price))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <span className="font-medium">Departure location:</span>
                      <span className="block">
                        <TruncatedText
                          maxLength={60}
                          text={booking?.departure_location}
                        />
                      </span>
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
                </Link>
              ))
            ) : (
              <div className="text-gray-500 text-center">No one booking.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
