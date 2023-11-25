import { IoAirplaneOutline, IoLocationOutline } from "react-icons/io5";
import dayjs from "dayjs";
import {
  AiFillIdcard,
  AiFillMail,
  AiOutlineDown,
  AiOutlineFieldNumber,
  AiOutlineFieldTime,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineUp,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { Fade } from "@mui/material";
import { LuSubtitles } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import {
  FaMoneyBill,
  FaMoneyBills,
  FaSliders,
  FaTicket,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../store/redux/silce/booking";
import { AppDispatch } from "../../store/redux/store";
import { StatusBooking } from "../../styles/status/booking";

interface Ticket {
  ticket_type_id: number;
  original_price: number;
  paid_price: number;
  quantity: number;
  // Các trường khác nếu có
}

interface Booking {
  status: string;
  booker_name: string;
  booker_email: string;
  booker_phone: string;
  time_slot: string;
  updated_at: string; // hoặc bạn có thể sử dụng kiểu dữ liệu ngày tháng nếu cần
  paid_price: number;
  booked_date: string;
  BookingOnTour: {
    tour_images: string[];
    address_province: string;
    address_country: string;
    duration: number;
    name: string;
    address_name: string;
    address_ward: string;
    // Các trường khác nếu có
  };
  TicketOnBooking: Ticket[];
  // Các trường khác nếu có
}
function DashBoardBooker() {
  const dispatch: AppDispatch = useDispatch();

  const { booking } = useSelector((state: any) => state.booking);
  useEffect(() => {
    dispatch(getBooking());
  }, [dispatch]);
  const [expandedItems, setExpandedItems] = useState<any>({});
  const toggleContentVisibility = (index: number) => {
    const newExpandedItems = { ...expandedItems };
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };
  return (
    <div className="mt-3 flex flex-col gap-4 ">
      <p className="text-xl font-medium text-black">Booking history</p>
      <div className="flex flex-col gap-3 bg-white shadow-custom-card-mui rounded-lg p-4">
        <div className="flex justify-between">
          <span className="text-gray-500">6 Destination</span>
          <div className="flex gap-5">
            <AiOutlineSearch />
            <FaSliders />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {booking?.map((item: Booking, index: number) => {
            return (
              <div key={index} className="py-2 relative">
                <div className="absolute top-0 right-2 ">
                  <StatusBooking>{item?.status}</StatusBooking>
                </div>

                <div className="shadow-custom-0 rounded-lg">
                  <div
                    className={`grid grid-cols-12 p-4  items-center gap-2 relative`}
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
                    <div className="col-span-1 flex justify-center gap-1">
                      <span>{item?.BookingOnTour?.duration} </span>
                      <div className="font-medium text-gray-700">Night</div>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <div className="flex items-center gap-1">
                        <IoAirplaneOutline className="text-navy-blue" />
                        <span>
                          {dayjs(item?.booked_date).format("YYYY-MM-DD")}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-between">
                      {item?.TicketOnBooking?.map(
                        (ticketQuantity, index: number) => (
                          <div key={index}>
                            <span className="font-medium">
                              {ticketQuantity?.ticket_type_id === 1
                                ? "Adult"
                                : "Children"}
                              {": "}
                            </span>
                            <span>{ticketQuantity?.quantity}</span>
                          </div>
                        )
                      )}
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
                              (_ticket, index: number) => {
                                return (
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
                                      <span>{_ticket?.quantity}</span>
                                    </div>
                                  </div>
                                );
                              }
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
                        <div>
                          <span>{item?.updated_at}</span>
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
