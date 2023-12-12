import dayjs from "dayjs";
import AppWebsiteVisits from "./app-website-visits";
import { useSelector } from "react-redux";

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
  const dataBooking = booking?.filter(
    (bookingItem: { status: string }) => bookingItem.status !== "REJECT"
  );
  // function calculateAverage(arr: number[]) {
  //   const sum = arr.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue,
  //     0
  //   );
  //   const average = sum / arr.length;
  //   return average;
  // }
  const labelWeeks = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("ddd")
  ).reverse();
  // const totalPayments = calculateAverage(
  //   labelWeeks.map((day) =>
  //     calculateTotalByDay(
  //       dataBooking,
  //       day,
  //       "refund_ammount",
  //       "chart_day_length"
  //     )
  //   )
  // );
  // const totalPersonPayments = calculateAverage(
  //   labelWeeks.map((day) =>
  //     calculateTotalByDay(
  //       dataBooking,
  //       day,
  //       "refund_ammount",
  //       "chart_day_person_length"
  //     )
  //   )
  // );
  function calculateTotalByDay(
    bookings: Booking[],
    targetDay: string,
    propertyName: string,
    field: string
  ) {
    const totalByDay: Record<string, number> = {};
    let totalByDayLength = 0;
    let totalByDayPersonLength = 0;

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
    if (field === "chart_day_length") {
      const recentBookings = bookings?.filter((booking) => {
        const bookedDates = dayjs(booking.updated_at);
        const today = dayjs();
        const diffInDays = today.diff(bookedDates, "day");
        return diffInDays >= 0 && diffInDays < 7;
      });
      totalByDayLength = recentBookings.length;
      return totalByDayLength;
    }
    if (field === "chart_day_person_length") {
      const recentBookings = bookings?.filter((booking) => {
        const bookedDates = dayjs(booking.updated_at);
        const today = dayjs();
        const diffInDays = today.diff(bookedDates, "day");
        return diffInDays >= 0 && diffInDays < 7;
      });
      const userIds = recentBookings?.map((item) => item?.user_id);
      const validUserIds = userIds?.filter((userId) => userId !== undefined);
      const uniqueUserIds = [...new Set(validUserIds)];
      const numberOfUniqueUsers = uniqueUserIds?.length || 0;
      totalByDayPersonLength = numberOfUniqueUsers;
      return totalByDayPersonLength;
    }

    return 0;
  }

  return (
    <>
      <main className="h-full">
        <div className="text-xl font-medium check mb-4">Revenue analytics</div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-4">
            <div className="pb-8">
              <AppWebsiteVisits
                title="Weekly Activity"
                chart={{
                  labels: labelWeeks,
                  series: [
                    {
                      name: "Paid price",
                      type: "area",
                      fill: "gradient",
                      data: labelWeeks.map((day) =>
                        calculateTotalByDay(
                          dataBooking,
                          day,
                          "paid_price",
                          "chart_day"
                        )
                      ),
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardChart;
