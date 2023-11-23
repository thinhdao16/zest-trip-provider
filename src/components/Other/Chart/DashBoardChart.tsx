import dayjs from "dayjs";
import AppWebsiteVisits from "./app-website-visits";
import { useSelector } from "react-redux";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";

interface Booking {
  updated_at: string;
  paid_price: string;
  original_price: string;
  refund_ammount: string;
  [key: string]: string | undefined; // Index signature
  // Add other properties as needed
}

function DashboardChart() {
  const { booking } = useSelector((state: any) => state.booking);

  const labelWeeks = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("ddd")
  ).reverse();

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
        const propertyValue = parseInt(booking[propertyName] || "0");
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
  return (
    <>
      <main className="h-full">
        {/* Main Content */}
        <div className="text-xl font-medium check mb-4">Revenue analytics</div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-10">
            <AppWebsiteVisits
              title="Weekly Activity"
              chart={{
                labels: labelWeeks,
                series: [
                  // {
                  //   name: "Paid price",
                  //   type: "column",
                  //   fill: "solid",
                  //   data: labelWeeks.map((day) =>
                  //     calculateTotalByDay(
                  //       booking,
                  //       day,
                  //       "paid_price",
                  //       "chart_day",
                  //       "0",
                  //       "0"
                  //     )
                  //   ),
                  // },
                  {
                    name: "Paid price",
                    type: "area",
                    fill: "gradient",
                    data: labelWeeks.map((day) =>
                      calculateTotalByDay(
                        booking,
                        day,
                        "paid_price",
                        "chart_day",
                        "0",
                        "0"
                      )
                    ),
                  },
                  // {
                  //   name: "Refund amount",
                  //   type: "line",
                  //   fill: "solid",
                  //   data: labelWeeks.map((day) =>
                  //     calculateTotalByDay(
                  //       booking,
                  //       day,
                  //       "refund_ammount",
                  //       "chart_day",
                  //       "0",
                  //       "0"
                  //     )
                  //   ),
                  // },
                ],
              }}
            />
          </div>
          <div className="col-span-2">
            <div className="">
              <div className="bg-white shadow-custom-card-mui rounded-t-xl p-4 pb-12 pt-6">
                <div className="flex gap-3 items-end">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-2xl">40</span>
                    <p className="font-medium text-sm">Payment</p>
                  </div>
                  <div>
                    <RiMoneyDollarCircleLine className="w-12 h-12 text-navy-blue" />
                  </div>
                </div>
              </div>
              <hr className=" h-h-2" />
              <div className="bg-white shadow-custom-card-mui rounded-b-xl p-4 pb-14 pt-6">
                <div className="flex gap-3 items-end">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-2xl">40</span>
                    <p className="font-medium text-sm">Person</p>
                  </div>
                  <div>
                    <IoMdPerson className="w-12 h-12 text-navy-blue" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardChart;
