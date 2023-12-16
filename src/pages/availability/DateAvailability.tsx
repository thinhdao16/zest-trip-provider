import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DataContext } from "../../store/dataContext/DataContext";
import {
  getBookingDetail,
  getDateAvailabilityByTour,
  getDateAvailabilityInactiveByTour,
  getTicketDate,
  getTicketQuantity,
} from "../../store/redux/silce/booking";
import { fetchTourDetail } from "../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { Calendar } from "react-multi-date-picker";

function DateAvailability() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();
  const { loading, reloadStatus, refreshTourDetail, refeshTour } =
    useContext(DataContext);

  const { loadingCreateTour } = useSelector((state: any) => state.tour);

  const { bookingDetail, dateAvaibilityTour, dateAvaibilityInactiveTour } =
    useSelector((detail: any) => detail?.booking);
  const bookingDontReject = bookingDetail?.filter(
    (booking: any) =>
      booking?.status !== "REJECT" && booking?.status !== "PENDING"
  );
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);

  const [dateChoose, setDateChoose] = useState<any>([]);
  const [openField, setOpenField] = useState(false);
  const [fieldBlock, setFieldBlock] = useState("normal");

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
    setDateAvailability([...dateAvaibilityTour]);
    setOpenField(false);
    setFieldBlock("normal");
    message.info("This is the availability");
  };
  useEffect(() => {
    setDateBookDontAvai(availableBookedDates);
  }, [bookingDetail, dateChoose, loading]);

  useEffect(() => {
    setDateAvailability([...dateAvaibilityTour]);
  }, [bookingDetail]);

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
      dispatch(fetchTourDetail(index));
      dispatch(getDateAvailabilityByTour(index));
      dispatch(getDateAvailabilityInactiveByTour(index));
    }
  }, [
    dispatch,
    index,
    loading,
    reloadStatus,
    loadingCreateTour,
    refreshTourDetail,
    refeshTour,
  ]);
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

  const handleClearDate = () => {
    dispatch(getTicketQuantity(index));
    setValueSelectCalendar(undefined);
    setDateAvailability([...dateAvaibilityTour]);

    setDateChoose([]);
    setFieldBlock("normal");
    setFieldBlock("normal");
    setOpenField(false);
  };
  const handleToday = () => {
    setValueSelectCalendar(new Date());
    setFieldBlock("normal");
  };

  return (
    <div>
      <div className=" flex  gap-4 p-4 ">
        <Calendar
          value={valueSelectCalendar}
          className=" px-4 relative pt-14 h-96  calendar-book-detail"
          multiple
          numberOfMonths={3}
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
            const dateTicketSpecial =
              dateAvaibilityInactiveTour?.includes(formattedDate);
            const dateChooseColor =
              valueSelectCalendar?.includes(formattedDate);
            const style = {
              backgroundColor: dateChooseColor
                ? "#0074d9"
                : isBlocked && dateDont && dateTicketSpecial
                ? "black"
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
          onChange={(date: any) => handleAddSingleDate(availabilityIndex, date)}
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
        <div className="h-96 bg-white shadow-custom-card-mui rounded-lg p-4 flex flex-col gap-6 justify-center">
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
            <span className="text-sm">Availability inactive</span>
          </div>
          <div className="flex items-center">
            <GoDotFill className="w-5 h-5" style={{ color: " #918151" }} />
            <span className="text-sm flex-wrap flex">
              Orphan & Availability inactive
            </span>
          </div>

          <div className="flex items-center">
            <GoDotFill className="w-5 h-5" style={{ color: " #4b0082" }} />
            <span className="text-sm flex-wrap flex">Orphan & Block date</span>
          </div>
          <div className="flex items-center">
            <GoDotFill className="w-5 h-5" style={{ color: " #8fbc8f" }} />

            <span className="text-sm flex-wrap flex">
              Block & Availability inactive
            </span>
          </div>
          <div className="flex items-center">
            <GoDotFill className="w-5 h-5" style={{ color: " black" }} />
            <span className="text-sm flex-wrap flex">
              Orphan & Block date & Availability inactive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateAvailability;
