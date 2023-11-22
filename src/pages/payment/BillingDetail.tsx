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

  function sumField(
    bookings: { [key: string]: string }[],
    field: string
  ): number {
    return bookings.reduce((total, booking) => {
      return total + parseInt(booking[field] || "0");
    }, 0);
  }

  // Sử dụng hàm sumField
  const resultPaidPrice = sumField(booking, "paid_price");
  const resultOriginalPrice = sumField(booking, "original_price");
  const resultRefundAmount = sumField(booking, "refund_ammount");

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
        const startDateObj = dayjs(startDate);
        const endDateObj = dayjs(endDate);

        return (
          (bookedDate.isAfter(startDateObj, "day") ||
            bookedDate.isSame(startDateObj, "day")) &&
          (bookedDate.isBefore(endDateObj, "day") ||
            bookedDate.isSame(endDateObj, "day"))
        );
      });
      recentBookings?.forEach((booking) => {
        const dayOfMonth = dayjs(booking.updated_at).format("D");
        const propertyValue = parseInt(booking[propertyName] || "0");

        totalByWeek[dayOfMonth] =
          (totalByWeek[dayOfMonth] || 0) + propertyValue;
      });
      console.log(totalByWeek);
      return totalByWeek;
    }

    return 0;
  }

  const labelWeeks = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("ddd")
  ).reverse();
  const labelMonths = Array.from({ length: 3 }, (_, i) =>
    dayjs().subtract(i, "month").format("MMM")
  ).reverse();
  function calculateWeeks() {
    const currentDate = dayjs();
    const currentDayOfWeek = currentDate.day();

    const thisSunday = currentDate.subtract(currentDayOfWeek, "day");

    const weeks = Array.from({ length: 7 }, (_, weekIndex) => {
      const weekStart = thisSunday.subtract(weekIndex + 1, "week");
      const weekEnd = weekStart.add(6, "day");
      return { start: weekStart, end: weekEnd };
    });

    return weeks.reverse();
  }
  const lableWeeks = calculateWeeks();

  const formattedLabels = lableWeeks.map((week) => {
    const formattedStart = dayjs(week.start).format("YYYY-MM-DD");
    const formattedEnd = dayjs(week.end).format("YYYY-MM-DD");

    return { start: formattedStart, end: formattedEnd };
  });

  const data = {
    labels: labelWeeks,
    datasets: [
      {
        label: "Paid Price",
        data: labelWeeks.map((day) =>
          calculateTotalByDay(booking, day, "paid_price", "chart_day", "0", "0")
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Original Price",
        data: labelWeeks.map((day) =>
          calculateTotalByDay(
            booking,
            day,
            "original_price",
            "chart_day",
            "0",
            "0"
          )
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Refund Amount",
        data: labelWeeks.map((day) =>
          calculateTotalByDay(
            booking,
            day,
            "refund_amount",
            "chart_day",
            "0",
            "0"
          )
        ),
        backgroundColor: "black",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const dataMonth = {
    labels: labelMonths,
    datasets: [
      {
        label: "Paid Price",
        data: labelMonths.map((day) =>
          calculateTotalByDay(
            booking,
            day,
            "paid_price",
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
            booking,
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
            booking,
            day,
            "refund_amount",
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
    labels: formattedLabels,
    datasets: [
      {
        label: "Paid Price",
        data: formattedLabels.map((day) =>
          calculateTotalByDay(
            booking,
            "",
            "paid_price",
            "chart_week",
            day?.start,
            day?.end
          )
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Original Price",
        data: formattedLabels.map((day) =>
          calculateTotalByDay(
            booking,
            "",
            "original_price",
            "chart_month",
            day?.start,
            day?.end
          )
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Refund Amount",
        data: formattedLabels.map((day) =>
          calculateTotalByDay(
            booking,
            "",
            "refund_amount",
            "chart_month",
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
  // console.log(
  //   calculateTotalByDay(
  //     booking,
  //     "",
  //     "paid_price",
  //     "chart_week",
  //     "2023-11-18",
  //     "2023-11-20"
  //   )
  // );
  return (
    <div className="my-8">
      <div>
        {lableWeeks.map((week, index) => (
          <div key={index}>
            {week.start.format("YYYY-MM-DD")} to {week.end.format("YYYY-MM-DD")}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className=" col-span-6">
          <p className=" text-lg font-medium pb-2">Billing Details</p>

          <div className="p-4 bg-white rounded-lg shadow-custom-card-mui">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="font-medium block">Paid Price</span>
                <span>{formatNumber(resultPaidPrice)}</span>
              </div>
              <div>
                <span className="font-medium block">Original Price</span>
                <span>{formatNumber(resultOriginalPrice)}</span>
              </div>{" "}
              <div>
                <span className="font-medium block">Refund Amount</span>
                <span className="">{formatNumber(resultRefundAmount)}</span>
              </div>
              <div>
                <span className="font-medium block">Amount</span>
                <span className="">{formatNumber(300000)}</span>
              </div>
            </div>
            <div className="mt-4">
              <Bar options={optionMonths} data={dataMonth} />
            </div>
          </div>
        </div>
        <div className=" col-span-6">
          <p className=" text-lg font-medium pb-2">Overview</p>
          <div className="p-4 bg-white rounded-lg shadow-custom-card-mui flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-medium">Current Balance</span>
              <span>{formatNumber(9000000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Today Paid</span>
              <span>{formatNumber(9000000)}</span>
            </div>{" "}
            <div className="flex justify-between">
              <span className="font-medium">Today Deposit</span>
              <span>{formatNumber(9000000)}</span>
            </div>
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

BillingDetail.propTypes = {};

export default BillingDetail;
