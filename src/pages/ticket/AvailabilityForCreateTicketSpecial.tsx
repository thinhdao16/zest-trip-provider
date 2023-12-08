import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar } from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTourDetail } from "../../store/redux/silce/tourSlice";
import { getBookingDetail } from "../../store/redux/silce/booking";
import { DataContext } from "../../store/dataContext/DataContext";

function AvailabilityForCreateTicketSpecial() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();
  const { loading } = useContext(DataContext);
  const { bookingDetail } = useSelector((detail: any) => detail?.booking);
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);
  const [openField, setOpenField] = useState(false);

  const [valueSelectCalendar, setValueSelectCalendar] = useState<any>();
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
    ...availabilityDates,
  ]);
  const handleBookingHave = () => {
    const commonDates = dateAvailability.filter((date) =>
      book_date_fil.includes(date)
    );
    setDateAvailability(commonDates);
    setOpenField(true);
  };
  const handleAvailabilityHave = () => {
    setDateAvailability([...allDates, ...allSingleDates, ...availabilityDates]);
    setOpenField(false);
  };

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
      dispatch(fetchTourDetail(index));
    }
  }, [dispatch, index, loading]);

  const handleClearDate = () => {
    setValueSelectCalendar(undefined);
    setDateAvailability([...allDates, ...allSingleDates, ...availabilityDates]);
  };
  const handleToday = () => {
    setValueSelectCalendar(new Date());
  };

  return (
    <div>
      <Calendar
        value={valueSelectCalendar}
        className=" px-4 relative pt-8 pb-2  calendar-ticket-detail"
        multiple
        numberOfMonths={1}
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
          const style = {
            backgroundColor: isBlocked ? "#ff6384" : "",
          };
          return {
            disabled: !isDisabled,
            style: style,
          };
        }}
      >
        <div className="mb-2 flex flex-col items-center justify-end gap-2 ">
          <div className=" top-2 left-8 absolute flex  "></div>

          {!openField && (
            <div className=" flex justify-center">
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
            <div className=" flex justify-center">
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
        </div>
      </Calendar>
    </div>
  );
}

AvailabilityForCreateTicketSpecial.propTypes = {};

export default AvailabilityForCreateTicketSpecial;
