import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRefund, getBooking } from "../../../store/redux/silce/booking";
import { AppDispatch } from "../../../store/redux/store";

function ScreenMain() {
  const dispatch: AppDispatch = useDispatch();

  const { booking } = useSelector((state: any) => state.booking);
  useEffect(() => {
    dispatch(getBooking());
  }, [dispatch]);
  const { index } = useParams<{ index: string | undefined }>();
  const filteredData = booking.filter(
    (item: { id: string }) => item.id === index
  );
  console.log(filteredData);
  const handleAcceptRefund = () => {
    dispatch(acceptRefund(index));
  };
  return (
    <div className="  bg-main rounded-xl p-8 h-full overflow-y-auto global-scrollbar ">
      <div className="">
        <div className="  pb-7 flex flex-col justify-center items-center">
          <div className="mb-5">
            <p className=" text-xl font-medium">Booking Detail</p>
          </div>
          <div className="border border-solid border-gray-300 rounded-lg shadow-custom-card-mui w-2/3 bg-white">
            <div className=" p-6 relative">
              <button
                type="button"
                className="bg-navy-blue-opacity-5  rounded-md p-1 text-sm flex gap-1 items-center text-navy-blue absolute top-6 right-6"
              >
                <GoDotFill />
                {filteredData[0]?.status}
              </button>
              <div className="pb-3">
                <span className="font-medium">Pricing detail</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">Name </span>
                    <span className=" ">{filteredData[0]?.booker_name}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">Email </span>
                    <span className=" ">{filteredData[0]?.booker_email}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">Phone </span>
                    <span className=" ">{filteredData[0]?.booker_phone}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">Time </span>
                    <span className=" ">
                      {dayjs(filteredData[0]?.booked_date).format("YYYY-MM-DD")}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">
                      Time slot{" "}
                    </span>
                    <span className=" ">{filteredData[0]?.time_slot}</span>
                  </div>
                </div>
              </div>
              <span className="font-medium">Pricing detail</span>
              <hr />
              <div className="grid grid-cols-4 py-3">
                <span className=" font-medium text-gray-700">Ticket type</span>
                <span className="  font-medium text-gray-700 text-center">
                  Quantity
                </span>
                <span className=" font-medium text-gray-700 text-center">
                  Original price
                </span>
                <span className=" font-medium text-gray-700 text-end">
                  Paid price
                </span>
              </div>
              <hr className="pb-3" />

              <div className="flex flex-col gap-3">
                {filteredData[0]?.TicketOnBooking?.map(
                  (ticketQuantity: any, index: number) => (
                    <div key={index} className=" grid grid-cols-4 ">
                      <span className="">
                        {ticketQuantity?.ticket_type_id === 1
                          ? "Adult"
                          : "Children"}
                      </span>
                      <span className=" text-center ">
                        {ticketQuantity?.quantity}
                      </span>
                      <span className="  text-center">
                        {ticketQuantity?.original_price}
                      </span>{" "}
                      <span className="  text-end">
                        {ticketQuantity?.paid_price}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-gray-200 p-6 rounded-b-lg flex justify-between ">
              <div className="flex flex-col">
                <span className=" text-gray-600">Total paid</span>
                <span className=" text-xl pb-2">
                  ₫&nbsp;{filteredData[0]?.paid_price}
                </span>
                <span className="text-xs   text-gray-600">
                  All taxes and fees included
                </span>
              </div>
              <div className="flex items-center ">
                <button
                  type="button"
                  className="bg-navy-blue px-3 py-2 rounded-lg text-white "
                  onClick={handleAcceptRefund}
                >
                  Accept refund
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ScreenMain.propTypes = {};

export default ScreenMain;
