import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";
import { LuMoveRight } from "react-icons/lu";
import ModalTicketAdult from "./Modal/ModalTicketAdult";
import ModalAvailability from "./Modal/ModalAvailability";
import dayjs from "dayjs";
import { useEditContext } from "./Context/useEditContext";
function ScreenSP() {
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  const { ticketPricing, setTicketPricing, availability, setAvailability } =
    useEditContext();
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
      <div className="mb-4 first-letter" id="ticket">
        <span className="font-medium text-xl">Ticket Pricing</span>
      </div>
      <div className="p-1 flex flex-col gap-3">
        <div className=" grid grid-cols-12 gap-3">
          <div className="flex gap-3 col-span-2 justify-end">
            <span className="font-medium text-lg"> Ticket</span>
            <ModalTicketAdult
              dataTicket={{ ticketPricing, setTicketPricing, duration }}
            />
          </div>
          <div className="flex flex-col col-span-10">
            <div className="bg-white shadow-custom-card-mui p-6 rounded-lg flex flex-col gap-4">
              {ticketPricing?.map((ticket: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col gap-4 border border-solid border-gray-300 p-4 rounded-xl shadow-custom-card-mui pr-10">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-medium">
                          Ticket intended for:
                        </span>
                        <span className=" text-sm text-gray-500">
                          {ticket?.Ticket?.name}
                        </span>
                      </div>
                      <span className="text-2xl text-gray-500">•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-medium">
                          Ticket type:
                        </span>
                        <span className=" text-sm text-gray-500">
                          <span className="">{ticket?.PricingType?.name}</span>
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <span className="font-medium">Min quantity</span>
                        <span className="text-gray-500">
                          {ticket?.minimum_ticket_count}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Max quantity</span>
                        <span className="text-gray-500">
                          {ticket?.maximum_ticket_count}
                        </span>
                      </div>{" "}
                      <div className="flex flex-col">
                        <span className="font-medium">From age</span>
                        <span className="text-gray-500">
                          {ticket?.from_age}
                        </span>
                      </div>{" "}
                      <div className="flex flex-col">
                        <span className="font-medium">To age</span>
                        <span className="text-gray-500">{ticket?.to_age}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <hr className="flex-1 border-b border-gray-300 mr-2" />
                      <span className="font-medium">Ticket pricing</span>
                      <hr className="flex-1 border-b border-gray-300 ml-2" />
                    </div>

                    <div className="grid grid-cols-4 gap-3">
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
        </div>
      </div>
      <div className="mb-4" id="availability">
        <span className="font-medium text-xl">Availability</span>
      </div>
      <div className="grid grid-cols-12">
        <div className="flex gap-3 justify-end col-span-2">
          <span className="font-medium text-lg">Avalibility</span>
          <ModalAvailability
            dataAvailability={{ availability, setAvailability }}
          />
        </div>
        <div className="flex flex-col gap-4 col-span-10">
          <div className="bg-white p-4 rounded-lg flex flex-col gap-3">
            {availability?.map((data: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-4 bg-white border border-solid border-gray-300 p-4 rounded-xl shadow-custom-card-mui">
                  <div className="">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">From:</span>
                      <span className="text-navy-blue">
                        {data
                          ? formatDate(data.validity_date_range_from)
                          : null}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="font-medium">to:</span>

                      <span className="text-navy-blue">
                        {data ? formatDate(data.validity_date_range_to) : null}
                      </span>
                    </div>
                  </div>
                  <div className="w-1 h-full bg-gray-300 rounded-full"></div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 flex flex-col gap-4 ">
                      <div className="flex font-medium">
                        <span className="">{data?.name}</span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className=" text-navy-blue font-medium   text-xs bg-navy-blue-opacity-5 px-1 py-0.5 rounded-sm"
                        >
                          {data?.status}
                        </button>
                      </div>
                    </div>

                    <div className="col-span-5 flex flex-col gap-4">
                      <span className="font-medium">Weekdays</span>
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
                    </div>
                    {data?.special_dates.length > 0 && (
                      <div className="col-span-4 flex flex-col gap-4">
                        <span className="font-medium">Special dates</span>
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
                      </div>
                    )}
                  </div>
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
