import { IoAirplaneOutline, IoLocationOutline } from "react-icons/io5";
import { DataBook } from "../../pages/booker/dataBook";
import dayjs from "dayjs";
import {
  AiFillIdcard,
  AiFillMail,
  AiOutlineDown,
  AiOutlineFieldNumber,
  AiOutlineFieldTime,
  AiOutlinePhone,
  AiOutlineUp,
} from "react-icons/ai";
import { useState } from "react";
import { Fade } from "@mui/material";
import { LuSubtitles } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { FaMoneyBill, FaMoneyBills, FaTicket } from "react-icons/fa6";
function DashBoardBooker() {
  const dataFake = DataBook;
  console.log(dataFake);

  const [expandedItems, setExpandedItems] = useState<any>({});
  const toggleContentVisibility = (index: any) => {
    const newExpandedItems = { ...expandedItems };
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };
  return (
    <div className="mt-3 flex flex-col gap-4 ">
      <p className="text-xl font-medium text-black">Booking history</p>
      <div className="flex flex-col gap-3 bg-white shadow-custom-card-mui rounded-lg p-3">
        <div className="flex justify-between">
          <span>nothing</span>
          <span>filter</span>
        </div>
        <div className="flex flex-col gap-2">
          {DataBook?.map((item, index: number) => {
            return (
              <div key={index} className="py-2 relative">
                <div className="text-xs bg-navy-blue-opacity-5 border border-solid border-navy-blue rounded-md p-1 absolute top-0 right-2 text-navy-blue">
                  {item?.status}
                </div>
                <div className="shadow-custom-0">
                  <div
                    className={`grid grid-cols-12 p-4 rounded-lg  items-center gap-2 relative`}
                  >
                    {!expandedItems[index] ? (
                      <div className="absolute bottom-2 right-2 text-xs flex items-center gap-1">
                        <span onClick={() => toggleContentVisibility(index)}>
                          See more
                        </span>
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

                    <div className="col-span-1 flex justify-start">
                      <img
                        src={item?.BookingOnTour?.tour_images[0]}
                        alt="image"
                        className="rounded-lg h-14"
                      />
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <div>
                        <span className="font-medium">{item?.booker_name}</span>
                        <div className="flex items-center text-sm gap-1 text-gray-500">
                          <IoLocationOutline />
                          <span>{item?.BookingOnTour?.address_province},</span>
                          <span>{item?.BookingOnTour?.address_country}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span>{item?.BookingOnTour?.duration} Night</span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <div className="flex items-center gap-1">
                        <IoAirplaneOutline className="text-navy-blue" />
                        <span>
                          {dayjs(item?.updated_at).format("YYYY-MM-DD")}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-between">
                      <span>6</span>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-black">
                          {item?.paid_price}
                        </span>
                        <span className="font-medium text-xs text-gray-500">
                          P/D
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedItems[index] && (
                    <Fade in={expandedItems[index]} timeout={700}>
                      <div className="rounded-b-lg bg-gray-200 p-4 flex flex-col gap-1">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-1">
                            <FaTicket />
                            <span className="font-medium">Ticket: </span>
                          </div>
                          <div className="flex flex-col">
                            {item?.TicketOnBooking?.map(
                              (_ticket, index: number) => (
                                <div key={index} className="flex gap-3">
                                  <div className="flex gap-1 items-center">
                                    <FaMoneyBills />
                                    <span className="font-medium text-gray-600">
                                      Price original:
                                    </span>
                                    <span>{_ticket?.original_price}</span>
                                  </div>
                                  <div className="flex gap-1 items-center">
                                    <FaMoneyBill />
                                    <span className="font-medium text-gray-600">
                                      Price paid:
                                    </span>
                                    <span>{_ticket?.paid_price}</span>
                                  </div>{" "}
                                  <div className="flex gap-1 items-center">
                                    <AiOutlineFieldNumber />
                                    <span className="font-medium text-gray-600">
                                      Quantity:
                                    </span>
                                    <span>{_ticket?.original_price}</span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1 items-center">
                            <AiFillIdcard />
                            <span className="font-medium">Name:</span>
                            <span>{item?.booker_name}</span>
                          </div>
                          <div className="flex gap-1 items-center">
                            <AiFillMail />
                            <span className="font-medium">Email:</span>
                            <span>{item?.booker_email}</span>
                          </div>
                          <div className="flex gap-1 items-center">
                            <AiOutlinePhone />
                            <span className="font-medium">Phone:</span>
                            <span>{item?.booker_phone}</span>
                          </div>
                          <div className="flex gap-1 items-center">
                            <AiOutlineFieldTime />
                            <span className="font-medium">Time:</span>
                            <span>{item?.time_slot}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <LuSubtitles />
                          <span className="font-medium">Title:</span>
                          <span>{item?.BookingOnTour?.name}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <GrLocation />
                          <span className="font-medium">Location tour:</span>
                          <span>
                            {item?.BookingOnTour?.address_name},{" "}
                            {item?.BookingOnTour?.address_ward},
                            {item?.BookingOnTour?.address_name},
                            {item?.BookingOnTour?.address_province}
                            {item?.BookingOnTour?.address_country}
                          </span>
                        </div>
                      </div>
                    </Fade>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

DashBoardBooker.propTypes = {};

export default DashBoardBooker;
