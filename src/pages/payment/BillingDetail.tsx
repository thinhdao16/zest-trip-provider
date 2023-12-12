import { formatNumber } from "../../utils/formatNumber";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext, useState } from "react";
import { DataContext } from "../../store/dataContext/DataContext";
import DatePicker from "react-multi-date-picker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface Booking {
  updated_at: string;
  paid_price: string;
  original_price: string;
  refund_ammount: string;
  [key: string]: string | undefined; // Index signature
  // Add other properties as needed
}

function BillingDetail() {
  const { booking } = useSelector((state: any) => state.booking);
  const filteredBookings = booking?.filter(
    (booking: { status: string }) =>
      booking.status !== "REJECT" &&
      booking.status !== "PENDING" &&
      booking.status !== "0"
  );
  const { setSaveDateChartChoose, setFieldSaveDateChartChoose } =
    useContext(DataContext);
  const [selectedDateRange, setSelectedDateRange] = useState<any>([null, null]);
  console.log(selectedDateRange);
  function sumField(
    bookings: { [key: string]: string }[],
    field: string
  ): number {
    return bookings.reduce((total, booking) => {
      return total + parseInt(booking[field] || "0");
    }, 0);
  }

  // Sử dụng hàm sumField
  const resultPaidPrice = sumField(filteredBookings, "paid_price");
  const resultOriginalPrice = sumField(filteredBookings, "original_price");
  const resultRefundAmount = sumField(filteredBookings, "refund_ammount");
  const resultProviderRecieve = sumField(filteredBookings, "provider_receive");

  function calculateTotalByDay(
    bookings: Booking[],
    targetDay: string,
    propertyName: string,
    field: string,
    startDate: string,
    endDate: string
  ) {
    const totalByDay: Record<string, number> = {};
    const totalByMonth: Record<string, number> = {};
    const totalByWeek: Record<string, number> = {};
    if (field === "chart_day") {
      const recentBookings = bookings?.filter((booking) => {
        const bookedDates = dayjs(booking.updated_at);
        const today = dayjs();
        const diffInDays = today.diff(bookedDates, "day");
        return diffInDays >= 0 && diffInDays < 7;
      });
      recentBookings?.forEach((booking) => {
        const dayOfWeek = dayjs(booking.updated_at).format("ddd");
        const propertyValue = parseInt(booking[propertyName] || "0");

        if (dayOfWeek === targetDay) {
          totalByDay[targetDay] = (totalByDay[targetDay] || 0) + propertyValue;
        }
      });

      return totalByDay[targetDay] || 0;
    }

    if (field === "chart_month") {
      const recentBookings = bookings?.filter((booking) => {
        const bookedDates = dayjs(booking.updated_at);
        const tomonth = dayjs();
        const diffInMonths = tomonth.diff(bookedDates, "month");
        return diffInMonths >= 0 && diffInMonths < 3;
      });

      recentBookings?.forEach((booking) => {
        const monthOfYear = dayjs(booking.updated_at).format("MMM");
        const propertyValue = parseInt(booking[propertyName] || "0");

        if (monthOfYear === targetDay) {
          totalByMonth[targetDay] =
            (totalByMonth[targetDay] || 0) + propertyValue;
        }
      });

      return totalByMonth[targetDay] || 0;
    }
    if (field === "chart_week") {
      const recentBookings = bookings?.filter((booking) => {
        const bookedDate = dayjs(booking.updated_at);
        const startDateObj = dayjs(startDate).subtract(1, "day");
        const endDateObj = dayjs(endDate).add(1, "day");
        return (
          bookedDate.isAfter(startDateObj, "day") &&
          bookedDate.isBefore(endDateObj, "day")
        );
      });

      recentBookings?.forEach((booking) => {
        const dayOfMonth = dayjs(booking.updated_at).format("D");
        const propertyValue = parseInt(booking[propertyName] || "0", 10);
        totalByWeek[dayOfMonth] =
          (totalByWeek[dayOfMonth] || 0) + propertyValue;
      });
      const total = Object.values(totalByWeek).reduce(
        (acc, value) => acc + value,
        0
      );
      return total;
    }
    return 0;
  }

  const labelMonths = Array.from({ length: 3 }, (_, i) =>
    dayjs().subtract(i, "month").format("MMM")
  ).reverse();
  function calculateWeeks() {
    const currentDate = dayjs();
    const currentDayOfWeek = currentDate.day();

    const thisSunday = currentDate.subtract(currentDayOfWeek, "day");

    const weeks = Array.from({ length: 7 }, (_, weekIndex) => {
      const weekStart = thisSunday.subtract(weekIndex, "week");
      const weekEnd = weekStart.add(6, "day");
      const endOfThisWeek = currentDate.isBefore(weekEnd)
        ? currentDate
        : weekEnd;
      return { start: weekStart, end: endOfThisWeek };
    });

    return weeks.reverse();
  }
  const lableWeeks = calculateWeeks();

  const formattedLabels = lableWeeks.map((week) => {
    const formattedStart = dayjs(week.start).format("YYYY-MM-DD");
    const formattedEnd = dayjs(week.end).format("YYYY-MM-DD");
    return { start: formattedStart, end: formattedEnd };
  });
  const [saveFormattedLabels, setSaveFormattedLabels] = useState(
    formattedLabels || []
  );

  const formattedLabelDayMonth = formattedLabels.map((week) => {
    const startFormatted = dayjs(week.start).format("MM/DD");
    const endFormatted = dayjs(week.end).format("MM/DD");
    return `${startFormatted} - ${endFormatted}`;
  });
  const [saveFormattedLabelDayMonth, setSaveFormattedLabelDayMonth] = useState(
    formattedLabelDayMonth || []
  );

  const handleDateChange = (newDateRange: any) => {
    const formattedDateRange = newDateRange.map((date: string) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    console.log(formattedDateRange);
    const [start, end] = formattedDateRange;
    setSelectedDateRange(newDateRange);
    setSaveFormattedLabels([{ start, end }]);
    setSaveFormattedLabelDayMonth([formattedDateRange]);

    setSaveDateChartChoose([{ start, end }]);
    setFieldSaveDateChartChoose("filter");
  };
  const handleChartAll = () => {
    setSaveFormattedLabels([...formattedLabels]);
    setSaveFormattedLabelDayMonth([...formattedLabelDayMonth]);
    setFieldSaveDateChartChoose("normal");
    setSelectedDateRange([null, null]);
  };
  const dataMonth = {
    labels: labelMonths,
    datasets: [
      {
        label: "Provider recevied",
        data: labelMonths.map((day) =>
          calculateTotalByDay(
            filteredBookings,
            day,
            "provider_receive",
            "chart_month",
            "0",
            "0"
          )
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Original Price",
        data: labelMonths.map((day) =>
          calculateTotalByDay(
            filteredBookings,
            day,
            "original_price",
            "chart_month",
            "0",
            "0"
          )
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Refund Amount",
        data: labelMonths.map((day) =>
          calculateTotalByDay(
            filteredBookings,
            day,
            "refund_ammount",
            "chart_month",
            "0",
            "0"
          )
        ),
        backgroundColor: "black",
      },
    ],
  };
  const optionMonths = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart Month",
      },
    },
  };
  const dataWeek = {
    labels: saveFormattedLabelDayMonth,
    datasets: [
      {
        label: "Provider received",
        data: saveFormattedLabels.map((day) => {
          return calculateTotalByDay(
            filteredBookings,
            "",
            "provider_receive",
            "chart_week",
            day?.start,
            day?.end
          );
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Original Price",
        data: saveFormattedLabels.map((day) =>
          calculateTotalByDay(
            filteredBookings,
            "",
            "original_price",
            "chart_week",
            day?.start,
            day?.end
          )
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Refund Amount",
        data: saveFormattedLabels.map((day) =>
          calculateTotalByDay(
            filteredBookings,
            "",
            "refund_ammount",
            "chart_week",
            day?.start,
            day?.end
          )
        ),
        backgroundColor: "black",
      },
    ],
  };
  const optionWeeks = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart Month",
      },
    },
  };
  const totalPaidWeeks = formattedLabels
    .map((day) => {
      return calculateTotalByDay(
        filteredBookings,
        "",
        "paid_price",
        "chart_week",
        day?.start,
        day?.end
      );
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className="my-8">
      <div className="grid grid-cols-12 gap-8">
        <div className=" col-span-6">
          <p className=" text-lg font-medium pb-2">Billing Details</p>

          <div className="p-4 bg-white rounded-lg shadow-custom-card-mui">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="font-medium block">Paid price</span>
                <span>{formatNumber(resultPaidPrice)}</span>
              </div>
              <div>
                <span className="font-medium block">Original price</span>
                <span>{formatNumber(resultOriginalPrice)}</span>
              </div>{" "}
              <div>
                <span className="font-medium block">Refund amount</span>
                <span className="">{formatNumber(resultRefundAmount)}</span>
              </div>
              <div>
                <span className="font-medium block">Recive amount paid</span>
                <span className="">{formatNumber(resultProviderRecieve)}</span>
              </div>
            </div>
            <div className="mt-4">
              <Bar options={optionMonths} data={dataMonth} />
            </div>
          </div>
        </div>
        <div className=" col-span-6">
          <p className=" text-lg font-medium pb-2">Overview</p>
          <div className="p-4 bg-white rounded-lg shadow-custom-card-mui flex flex-col gap-3 pb-9">
            {selectedDateRange?.every((date: string) => date === null) && (
              <div>
                <div className="flex justify-between">
                  <span className="font-medium"> Paid within 7 weeks</span>
                  <span>{formatNumber(totalPaidWeeks)}</span>
                </div>
                <hr className="mb-2 mt-4" />
              </div>
            )}

            <div className="flex justify-between">
              <span className="font-medium">Time period statistics</span>
              <div>
                <DatePicker
                  id="filter-date-pick-payment"
                  value={selectedDateRange}
                  onChange={handleDateChange}
                  range
                  rangeHover
                >
                  <button type="button" onClick={handleChartAll}>
                    Clear
                  </button>
                </DatePicker>
                <label
                  htmlFor="filter-date-pick-payment"
                  className="bg-gray-100 py-1.5 text-sm px-2 rounded-md ml-1"
                >
                  Open
                </label>
              </div>
            </div>
            <Bar options={optionWeeks} data={dataWeek} />
          </div>
        </div>
      </div>
    </div>
  );
}

BillingDetail.propTypes = {};

export default BillingDetail;
