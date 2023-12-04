import Navbar from "../../components/Navbar/Index";
import { AiFillFilter, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import BillingDetail from "./BillingDetail";
import { getBooking } from "../../store/redux/silce/booking";
import { formatNumber } from "../../utils/formatNumber";
import { Fade } from "@mui/material";

function Payment() {
  const dispatch: AppDispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState<any>({});

  const { booking } = useSelector((state: any) => state.booking);

  const toggleContentVisibility = (index: number) => {
    const newExpandedItems = { ...expandedItems };
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };
  useEffect(() => {
    dispatch(getBooking()).then((response) => {
      if (getBooking.fulfilled.match(response)) {
        // toast.success("This is payment!");
      }
    });
  }, [dispatch]);

  function calculateTotalByDay(
    bookings: any,
    propertyName: string,
    startDate: string,
    endDate: string
  ) {
    const totalByDay: any = {};

    const recentBookings = bookings?.filter(
      (booking: { updated_at: string }) => {
        const bookedDate = dayjs(booking.updated_at);
        return (
          bookedDate.isAfter(dayjs(startDate).subtract(1, "day"), "day") &&
          bookedDate.isBefore(dayjs(endDate).add(1, "day"), "day")
        );
      }
    );

    recentBookings?.forEach((booking: any) => {
      const dayOfMonth: any = dayjs(booking.updated_at).format("YYYY-MM-DD");
      const propertyValue: any = parseInt(booking[propertyName] || "0", 10);
      totalByDay[dayOfMonth] = (totalByDay[dayOfMonth] || 0) + propertyValue;
    });

    return totalByDay;
  }

  function calculateWeeks() {
    const currentDate = dayjs();
    const currentDayOfWeek = currentDate.day();

    const thisSunday = currentDate.subtract(currentDayOfWeek, "day");

    const weeks = Array.from({ length: 7 }, (_, weekIndex) => {
      const weekStart = thisSunday.subtract(weekIndex, "week");
      const weekEnd = weekStart.add(6, "day");
      return {
        start: weekStart.format("YYYY-MM-DD"),
        end: weekEnd.format("YYYY-MM-DD"),
      };
    });

    return weeks;
  }

  const lableWeeks = calculateWeeks();

  const calculateChartData = (
    chart: any,
    paidField: string,
    originalField: string,
    refundField: string
  ) =>
    lableWeeks.map((week) => {
      const paid = calculateTotalByDay(chart, paidField, week.start, week.end);
      const original = calculateTotalByDay(
        chart,
        originalField,
        week.start,
        week.end
      );
      const refund = calculateTotalByDay(
        chart,
        refundField,
        week.start,
        week.end
      );

      const formatLableTime = {
        start: week.start,
        end: week.end,
      };
      return {
        label: formatLableTime,
        paid,
        original,
        refund,
      };
    });
  const dataBooking = calculateChartData(
    booking,
    "paid_price",
    "original_price",
    "refund_ammount"
  );
  const sumAllValues = (data: any) => {
    if (typeof data === "object" && data !== null) {
      const values = Object.values(data || {});
      return values.reduce((sum: any, value: any) => sum + value, 0);
    }
    return 0;
  };
  const sumBookingInWeek = (
    dataBookingWeek: any,
    startWeek: any,
    endWeek: any
  ) => {
    const recentBookings = dataBookingWeek?.filter((booking: any) => {
      const bookedDate = dayjs(booking.updated_at);
      return (
        bookedDate.isAfter(dayjs(startWeek).subtract(1, "day"), "day") &&
        bookedDate.isBefore(dayjs(endWeek).add(1, "day"), "day")
      );
    });
    return recentBookings;
  };
  return (
    <>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        <div className="container mx-auto py-4 px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">Payment method</h1>
              <span className="text-gray-500">
                When provider have voucher new, they open here
              </span>
            </div>
            {/* <div className="flex items-center gap-3">
              <div className="relative">
                <RiSearchLine className="absolute top-2 left-2" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  className="border border-gray-300 pl-8 py-1 w-24 rounded-md"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="relative bg-white shadow-custom-card-mui border border-gray-300 pl-0 py-1 w-24 rounded-md"
                >
                  <AiFillFilter className="absolute top-2 left-2" />
                  Filter
                </button>
              </div>
            </div> */}
          </div>
          <div>
            <BillingDetail />
          </div>
          <div className="text-lg font-medium pb-2"> Payment history</div>
          <div className="container flex flex-col gap-4">
            <div className="bg-white p-3 rounded-lg shadow-custom-card-mui">
              <div className="grid grid-cols-5 gap-3">
                <div className="">
                  <span className="font-medium">Date</span>
                </div>
                <div className="">
                  <span className="font-medium">Paid original</span>
                </div>
                <div className="">
                  <span className="font-medium">Paid price</span>
                </div>
                <div className="">
                  <span className="font-medium">Refund amount</span>
                </div>
                <div className="">
                  <span className="font-medium"> Total </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {dataBooking?.length > 0 ? (
                Array.isArray(dataBooking) &&
                dataBooking?.map((dataVoucher, index) => (
                  <div
                    key={index}
                    className="shadow-custom-card-mui bg-white rounded-lg relative"
                    onClick={() => toggleContentVisibility(index)}
                  >
                    <div className=" px-4 py-6 relative ">
                      {!expandedItems[index] ? (
                        <div
                          className="absolute bottom-2 right-2 text-xs flex items-center gap-1"
                          onClick={() => toggleContentVisibility(index)}
                        >
                          <span>See more</span>
                          <AiOutlineDown />
                        </div>
                      ) : (
                        <div className="absolute bottom-2 right-2 text-xs flex items-center gap-1">
                          <span onClick={() => toggleContentVisibility(index)}>
                            See less
                          </span>
                          <AiOutlineUp />
                        </div>
                      )}
                      <div className="grid grid-cols-5 gap-3 ">
                        <div className=" flex items-center ">
                          <div className="">
                            <span className="">
                              {dayjs(dataVoucher?.label?.start).format("DD/MM")}{" "}
                              -{" "}
                              {dayjs(dataVoucher?.label?.end).format(
                                "DD/MM/YYYY"
                              )}{" "}
                            </span>
                          </div>
                        </div>
                        <div className=" flex items-center ">
                          <span className="">
                            {formatNumber(
                              parseInt(
                                sumAllValues(
                                  dataVoucher?.original || {}
                                ) as string,
                                10
                              )
                            )}
                          </span>
                        </div>
                        <div className=" flex items-center ">
                          <div className="flex flex-wrap gap-3">
                            <span className="">
                              {formatNumber(
                                parseInt(
                                  sumAllValues(
                                    dataVoucher?.paid || {}
                                  ) as string,
                                  10
                                )
                              )}
                            </span>
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div className="flex flex-wrap gap-3">
                            <span className="">
                              {formatNumber(
                                parseInt(
                                  sumAllValues(
                                    dataVoucher?.refund || {}
                                  ) as string,
                                  10
                                )
                              )}
                            </span>
                          </div>
                        </div>
                        <div className=" flex items-center">
                          {/* <StatusBooking>{dataVoucher?.status}</StatusBooking>
                           */}
                          <span>
                            {
                              sumBookingInWeek(
                                booking,
                                dataVoucher?.label?.start,
                                dataVoucher?.label?.end
                              )?.length
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedItems[index] && (
                      <Fade in={expandedItems[index]} timeout={700}>
                        <div>
                          <hr className="mb-4" />
                          {sumBookingInWeek(
                            booking,
                            dataVoucher?.label?.start,
                            dataVoucher?.label?.end
                          )?.length > 0 ? (
                            sumBookingInWeek(
                              booking,
                              dataVoucher?.label?.start,
                              dataVoucher?.label?.end
                            )?.map((dataBookingInWeek: any, index: number) => {
                              console.log(dataBookingInWeek);
                              return (
                                <div
                                  className=" px-4  mb-4  relative "
                                  key={index}
                                >
                                  <div className="grid grid-cols-5">
                                    <div>
                                      <p className="">
                                        {dataBookingInWeek?.booker_name}
                                      </p>
                                      <span>
                                        {dayjs(
                                          dataBookingInWeek?.updated_at
                                        ).format("MM/DD/YYYY")}
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        {formatNumber(
                                          dataBookingInWeek?.original_price
                                        )}
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        {formatNumber(
                                          dataBookingInWeek?.paid_price
                                        )}
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        {formatNumber(
                                          dataBookingInWeek?.refund_ammount
                                        )}
                                      </span>
                                    </div>
                                    <div>
                                      <button type="button">
                                        {/* <StatusBooking>
                                          {dataBookingInWeek?.status}
                                        </StatusBooking> */}
                                      </button>
                                    </div>
                                  </div>

                                  {index <
                                    // eslint-disable-next-line no-unsafe-optional-chaining
                                    sumBookingInWeek(
                                      booking,
                                      dataVoucher?.label?.start,
                                      dataVoucher?.label?.end
                                    )?.length -
                                      1 && <hr className="mt-4" />}
                                </div>
                              );
                            })
                          ) : (
                            <div className="flex items-center justify-center pb-6 pt-2">
                              <p className="bg-main p-1 rounded-lg shadow-custom-card-mui border border-gray-300 border-solid font-medium">
                                No payment
                              </p>
                            </div>
                          )}
                        </div>
                      </Fade>
                    )}
                  </div>
                ))
              ) : (
                <button
                  type="button"
                  className="bg-main rounded-md py-1 px-2 shadow-custom-card-mui font-medium"
                >
                  {/* {loading ? "Loading..." : "No tours available"} */}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Payment;
