import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";
import { LuMoveRight } from "react-icons/lu";
import ModalTicketAdult from "./Modal/ModalTicketAdult";
import ModalAvailability from "./Modal/ModalAvailability";
import dayjs from "dayjs";
function ScreenSP() {
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  const [ticketPricing, setTicketPricing] = useState([]);
  const [availability, setAvailability] = useState([]);
  const duration = useMemo(() => {
    return tourDetail.duration;
  }, [tourDetail]);
  useEffect(() => {
    if (tourDetail && tourDetail.TicketPricing) {
      setTicketPricing(tourDetail.TicketPricing);
    }
    setAvailability(tourDetail?.TourAvailability);
  }, [tourDetail]);
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  function getDayName(day: number) {
    switch (day) {
      case 1:
        return "Sun";
      case 2:
        return "Mon";
      case 3:
        return "Tue";
      case 4:
        return "Wed";
      case 5:
        return "Thu";
      case 6:
        return "Fri";
      case 7:
        return "Sat";
      default:
        return "Unknown";
    }
  }

  return (
    <div>
      <div className="mb-4">
        <span className="font-medium text-xl">Infomation basic</span>
      </div>
      <div className="p-1 flex flex-col gap-3">
        <div>
          <div className="flex gap-3">
            <span className="font-medium text-lg"> Ticket</span>

            <ModalTicketAdult
              dataTicket={{ ticketPricing, setTicketPricing, duration }}
            />
          </div>
          <div className="flex flex-col gap-4">
            {ticketPricing?.map((ticket: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-4 bg-white p-4 rounded-xl">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAvA_FsxqcMCXeY45MS5XigIi9f42Klg2GN87qbMQUTDHsr4wb1N_uIu279cLo1yB0-OA&usqp=CAU"
                        alt="dont find"
                      />
                      <div className="flex flex-col ">
                        <div className="flex font-medium">
                          <span className="">
                            {ticket?.PricingType?.name}
                            <span className="">-</span>
                            <span className="">{ticket?.Ticket?.name}</span>
                          </span>
                        </div>

                        <div className="flex text-gray-500 gap-1">
                          <span className="">
                            Max: {ticket?.maximum_booking_quantity}
                          </span>
                          •<span>Min: {ticket?.minimum_booking_quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <>
                      {ticket?.price_range?.map(
                        (
                          price: {
                            from_amount: number;
                            to_amount: number;
                            price: number;
                          },
                          index: number
                        ) => (
                          <div
                            className="flex items-center border border-solid border-gray-300 justify-evenly text-sm  text-gray-500 py-1 rounded-md"
                            key={index}
                          >
                            <div>{price?.from_amount}</div>
                            <LuMoveRight />
                            <div>{price?.to_amount}</div>
                            <div>vnđ {price?.price}</div>
                          </div>
                        )
                      )}
                    </>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <div className="flex">
            <span className="font-medium text-lg">Avalibility</span>
            <ModalAvailability
              dataAvailability={{ availability, setAvailability }}
            />
          </div>
          <div className="flex flex-col gap-4">
            {availability?.map((data: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-4 bg-white p-4 rounded-xl">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 rounded-full"
                        src="https://d1.awsstatic.com/Marketplace/solutions-center/icons/AWSMP-high-availability.3abd1f520a30ab4d2bf64fad5e34d3bd13f411b0.png"
                        alt="dont find"
                      />
                      <div className="flex flex-col ">
                        <div className="flex font-medium">
                          <span className="">{data?.name}</span>
                        </div>

                        <div className="flex text-gray-500 gap-1 text-xs">
                          <span className="">{data?.status}</span>
                        </div>
                      </div>
                    </div>
                    <button className="h-7 border-solid border border-navy-blue p-0 px-2 font-medium text-navy-blue rounded-md  flex items-center">
                      Edit
                    </button>
                  </div>
                  <div className="flex justify-between  font-medium text-sm">
                    <div className="flex flex-col">
                      <span>From</span>
                      <span className="text-navy-blue">
                        {data
                          ? formatDate(data.validity_date_range_from)
                          : null}
                      </span>
                    </div>
                    <div className="flex flex-col text-end">
                      <span>To</span>
                      <span className="text-navy-blue">
                        {data ? formatDate(data.validity_date_range_to) : null}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-wrap gap-3">
                    {data?.weekdays?.map(
                      (
                        weekday: { day: number; timeSlot: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="flex gap-1 border border-solid border-gray-300 rounded-md text-sm px-2 py-1 text-gray-500"
                        >
                          <span>{getDayName(weekday?.day)}</span>
                          <span>{weekday?.timeSlot}</span>
                        </div>
                      )
                    )}
                  </div>
                  {data?.special_dates.length > 0 && (
                    <>
                      <hr />
                      <div className="flex flex-wrap gap-3">
                        {data?.special_dates?.map(
                          (
                            special: { date: any; timeSlot: string },
                            index: number
                          ) => (
                            <div
                              key={index}
                              className="flex gap-1  border border-solid border-gray-300 rounded-md text-sm px-2 py-1 text-gray-500"
                            >
                              {special.date && dayjs.isDayjs(special.date) ? (
                                <span className="font-medium">
                                  {special.date.format("DD/MM/YYYY")}:
                                </span>
                              ) : (
                                <span className="font-medium">
                                  {special.date}:
                                </span>
                              )}

                              <span>{special?.timeSlot}</span>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ScreenSP.propTypes = {};

export default ScreenSP;
