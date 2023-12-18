import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DataContext } from "../../store/dataContext/DataContext";
import {
  getBookingDetail,
  getDateAvailabilityByTour,
  getDateTicketByTour,
  getTicketDate,
  getTicketQuantity,
} from "../../store/redux/silce/booking";
import { fetchTourDetail } from "../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { Calendar } from "react-multi-date-picker";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Fade } from "@mui/material";

function DateTicket() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();
  const { loading, reloadStatus } = useContext(DataContext);
  const { loadingCreateTour } = useSelector((state: any) => state.tour);

  const { bookingDetail, dateAvaibilityTour, dateTicketTour } = useSelector(
    (detail: any) => detail?.booking
  );
  const bookingDontReject = bookingDetail?.filter(
    (booking: any) => booking?.status !== "REJECT"
  );
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);

  const { ticketQuantity } = useSelector((state: any) => state.booking);

  const [dateChoose, setDateChoose] = useState<any>([]);
  const [openField, setOpenField] = useState(false);
  const [fieldBlock, setFieldBlock] = useState("normal");

  const [valueSelectCalendar, setValueSelectCalendar] = useState<any>();
  const [dateBookDontAvai, setDateBookDontAvai] = useState<any>([]);

  const [openDataTicket, setOpenDataTicket] = useState(false);

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

  const bookedDates =
    bookingDontReject?.map((book: { booked_date: string }) =>
      dayjs(book.booked_date).format("YYYY-MM-DD")
    ) || [];
  const availableBookedDates = bookedDates?.filter(
    (bookedDate: any) => !dateAvaibilityTour?.includes(bookedDate)
  );
  const [dateAvailability, setDateAvailability] = useState([
    dateAvaibilityTour,
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
    setDateAvailability([...dateAvaibilityTour, ...dateTicketTour]);
    setOpenField(false);
    setFieldBlock("normal");
    message.info("This is the availability");
  };
  useEffect(() => {
    setDateBookDontAvai(availableBookedDates);
  }, [bookingDetail, dateChoose, loading]);

  useEffect(() => {
    setDateAvailability([...dateAvaibilityTour, ...dateTicketTour]);
  }, [bookingDetail]);

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
      dispatch(fetchTourDetail(index));
      dispatch(getDateAvailabilityByTour(index));
      dispatch(getDateTicketByTour(index));
    }
  }, [dispatch, index, loading, reloadStatus, loadingCreateTour]);
  useEffect(() => {
    console.log("reloadStatus changed:", reloadStatus);
  }, [reloadStatus]);
  const availabilityIndex = 0;

  const handleAddSingleDate = (_index: number, selectedDate: any) => {
    const formattedDates = selectedDate?.map((date: any) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    setValueSelectCalendar(formattedDates);
    if (formattedDates?.length > 0) {
      dispatch(
        getTicketDate({
          tour_id: index,
          date: formattedDates,
        })
      );
    } else {
      dispatch(getTicketQuantity(index));
    }

    if (fieldBlock === "normal") {
      setDateChoose(formattedDates);
    }
  };

  const totalAdultLeft = ticketQuantity.reduce(
    (acc: any, obj: any) => acc + obj.adult_left,
    0
  );
  const totalChildrenLeft = ticketQuantity.reduce(
    (acc: any, obj: any) => acc + obj.children_left,
    0
  );
  const totalAdultMax = ticketQuantity.reduce(
    (acc: any, obj: any) => acc + obj.adult_max,
    0
  );

  const totalChildrenMax = ticketQuantity.reduce(
    (acc: any, obj: any) => acc + obj.children_max,
    0
  );
  const totalAdultBook = ticketQuantity.reduce(
    (acc: any, obj: any) => acc + obj.booked_adult,
    0
  );
  const totalChildrenBook = ticketQuantity.reduce(
    (acc: any, obj: any) => acc + obj.booked_children,
    0
  );

  const handleClearDate = () => {
    dispatch(getTicketQuantity(index));
    setValueSelectCalendar(undefined);
    setDateAvailability([...dateAvaibilityTour, ...dateTicketTour]);

    setDateChoose([]);
    setFieldBlock("normal");
    setFieldBlock("normal");
    setOpenField(false);
  };
  const handleToday = () => {
    setValueSelectCalendar(new Date());
    setFieldBlock("normal");
  };
  const handleOpenQuantity = () => {
    setOpenDataTicket(true);
  };
  const handleCloseQuantity = () => {
    setOpenDataTicket(false);
  };
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setOpenDataTicket(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 p-4 ">
        <div className="col-span-5 ">
          <div className="bg-white rounded-lg shadow-custom-card-mui p-4 flex flex-col gap-4 pt-8 h-96">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <span className="font-medium">Total booking</span>
                </div>
                <div className="col-span-3">
                  <span>{ticketQuantity?.length}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <span className="font-medium">Adult left</span>
                </div>
                <div className="col-span-3 ">
                  <span>{totalAdultLeft}</span>{" "}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <span className="font-medium">Children left</span>
                </div>
                <div className="col-span-3">
                  <span>{totalChildrenLeft}</span>{" "}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <span className="font-medium">Adult max</span>
                </div>
                <div className="col-span-3">
                  <span>{totalAdultMax}</span>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <span className="font-medium">Children max</span>
                </div>
                <div className="col-span-3">
                  <span>{totalChildrenMax}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <span className="font-medium">Book adult</span>
                </div>
                <div className="col-span-3">
                  <span>{totalAdultBook}</span>
                </div>
              </div>{" "}
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <span className="font-medium">Book children</span>
                </div>
                <div className="col-span-3">
                  <span>{totalChildrenBook}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2">
                <span className="font-medium">Date</span>
              </div>

              <div className="col-span-4 h-16  overflow-auto global-scrollbar">
                {dateChoose?.length === 0 ? (
                  <span>
                    {dateChoose?.length === 0 && (
                      <span className="font-medium text-gray-500 text-xs">
                        (All Booked),{" "}
                      </span>
                    )}
                    {ticketQuantity?.map((time: any) => (
                      <span>{dayjs(time?.date)?.format("YYYY-MM-DD")}, </span>
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
            <hr className="my-2" />
            <div className="mt-2  text-center gap-4">
              {!openDataTicket ? (
                <button
                  type="button"
                  className="bg-navy-blue px-4 py-1.5 rounded-md text-white button-transition-effect-hover"
                  onClick={handleOpenQuantity}
                >
                  Open remaining
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-navy-blue px-4 py-1.5 rounded-md text-white button-transition-effect-hover"
                  onClick={handleCloseQuantity}
                >
                  Close remaining
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-7 flex ">
          <Calendar
            value={valueSelectCalendar}
            className=" px-4 relative pt-14 h-96  calendar-book-detail"
            multiple
            numberOfMonths={2}
            mapDays={({ date }) => {
              const formattedDate = date.format("YYYY-MM-DD");
              const formattedDateDisable = dateAvailability?.map(
                (disableDate: any) => dayjs(disableDate).format("YYYY-MM-DD")
              );
              const isDisabled = formattedDateDisable.includes(formattedDate);

              const formattedBlockedDates = tourDetail?.blocked_dates?.map(
                (blockedDate: any) => dayjs(blockedDate).format("YYYY-MM-DD")
              );
              const isBlocked = formattedBlockedDates?.includes(
                dayjs(formattedDate).format("YYYY-MM-DD")
              );

              const dateDont = dateBookDontAvai?.includes(formattedDate);
              const dateTicketSpecial = dateTicketTour?.includes(formattedDate);
              const dateChooseColor =
                valueSelectCalendar?.includes(formattedDate);
              const style = {
                backgroundColor: dateChooseColor
                  ? "#0074d9"
                  : isBlocked && dateDont && dateTicketSpecial
                  ? "#adc0c7"
                  : isBlocked && dateDont
                  ? "#4b0082"
                  : isBlocked && dateTicketSpecial
                  ? "#8fbc8f"
                  : isBlocked
                  ? "#ff6384"
                  : dateDont && dateTicketSpecial
                  ? "#918151"
                  : dateDont
                  ? "#ffc148"
                  : dateTicketSpecial
                  ? "#f77c05"
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
              {!openField && (
                <div className=" top-6 right-6  absolute flex justify-center">
                  <div className=" w-36">
                    <button
                      type="button"
                      className="bg-navy-blue py-1 px-2 text-white rounded-md text-sm w-36 button-transition-effect-hover "
                      onClick={handleBookingHave}
                    >
                      Check booking
                    </button>
                  </div>
                </div>
              )}
              {openField && (
                <div className="top-6 right-6  absolute flex justify-center">
                  <div className=" w-36">
                    <button
                      className="bg-navy-blue py-1 px-2 text-white rounded-md text-sm w-36 button-transition-effect-hover "
                      onClick={handleAvailabilityHave}
                    >
                      Check availability
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1 absolute top-6 inset-x-1/2 justify-center">
                <button
                  className="bg-gray-100 shadow-custom-card-mui p-1 rounded-md text-sm button-transition-effect-hover"
                  onClick={() => handleToday()}
                >
                  Today
                </button>
                <button
                  className="bg-gray-100 shadow-custom-card-mui p-1 rounded-md text-sm button-transition-effect-hover"
                  onClick={() => handleClearDate()}
                >
                  Deselect
                </button>
              </div>
            </div>
          </Calendar>
          <div className="h-96 bg-white shadow-custom-card-mui rounded-lg pl-4 py-4 pr-2 flex flex-col gap-4 justify-center">
            <div className="flex items-center ">
              <GoDotFill className="w-5 h-5" style={{ color: "#ff6384" }} />
              <span className="text-sm">Blocked date</span>
            </div>
            <div className="flex items-start ">
              <GoDotFill className="w-5 h-5" style={{ color: "#ffc148" }} />
              <span className="text-sm">Orphan date</span>
            </div>
            <div className="flex items-start ">
              <GoDotFill className="w-5 h-5" style={{ color: "#0074d9" }} />
              <span className="text-sm">Pick date</span>
            </div>
            <div className="flex items-start ">
              <GoDotFill className="w-5 h-5" style={{ color: " #f77c05" }} />
              <span className="text-sm">Special date</span>
            </div>
            <div className="grid grid-cols-12 ">
              <div className="col-span-2">
                <GoDotFill className="w-5 h-5" style={{ color: " #918151" }} />
              </div>
              <div className="col-span-10">
                <span className="text-sm flex-wrap flex">
                  Orphan & special date
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 ">
              <div className="col-span-2">
                <GoDotFill className="w-5 h-5" style={{ color: " #4b0082" }} />
              </div>
              <div className="col-span-10">
                <span className="text-sm flex-wrap flex">
                  Orphan & block date
                </span>
              </div>
            </div>
            <div className="grid grid-cols-12 ">
              <div className="col-span-2">
                <GoDotFill className="w-5 h-5" style={{ color: " #8fbc8f" }} />
              </div>
              <div className="col-span-10">
                <span className="text-sm flex-wrap flex">
                  Block & Special date
                </span>
              </div>
            </div>
            <div className="grid grid-cols-12 ">
              <div className="col-span-2">
                <GoDotFill className="w-5 h-5" style={{ color: "#adc0c7" }} />
              </div>
              <div className="col-span-10">
                <span className="text-sm flex-wrap flex">
                  Orphan & special & block date
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openDataTicket && (
        <Fade in={openDataTicket} timeout={700}>
          <div className="p-4 ">
            <div className="bg-white p-5 shadow-custom-card-mui rounded-lg relative transition-effect-hover">
              <button
                className="absolute top-1 right-1 "
                onClick={handleCloseQuantity}
              >
                <IoIosCloseCircleOutline className="w-5 h-5 " />
              </button>
              <div className="p-3 rounded-lg bg-navy-blue grid grid-cols-8 shadow-custom-card-mui">
                <span className="font-medium text-white">Date</span>
                <span className="font-medium text-white">Adult left</span>{" "}
                <span className="font-medium text-white">Children left</span>{" "}
                <span className="font-medium text-white">Adult max</span>{" "}
                <span className="font-medium text-white">Children max</span>{" "}
                <span className="font-medium text-white">Book adult</span>{" "}
                <span className="font-medium text-white">Book children</span>
                <span className="font-medium text-white">Type</span>
              </div>
              <div className=" mt-3 flex flex-col gap-2  ">
                {ticketQuantity && ticketQuantity.length > 0 ? (
                  ticketQuantity.map((ticket: any, index: number) => (
                    <div
                      className="grid grid-cols-8 px-3 py-6 rounded-lg bg-white shadow-custom-card-mui transition-effect-hover"
                      key={index}
                    >
                      <span>{dayjs(ticket?.date).format("YYYY-MM-DD")}</span>
                      <span>{ticket?.adult_left}</span>
                      <span>{ticket?.children_left}</span>
                      <span>{ticket?.adult_max}</span>
                      <span>{ticket?.children_max}</span>
                      <span>{ticket?.booked_adult}</span>
                      <span>{ticket?.booked_children}</span>
                      {ticket?.is_special ? (
                        <span>Special</span>
                      ) : (
                        <span>Normal</span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="px-3 py-6 rounded-lg bg-white shadow-custom-card-mui text-center">
                    No ticket information available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
}

DateTicket.propTypes = {};

export default DateTicket;
