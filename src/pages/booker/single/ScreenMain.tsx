import { useParams } from "react-router-dom";
import { DataBook } from "../dataBook";
import dayjs from "dayjs";

function ScreenMain() {
  const { index } = useParams<{ index: string }>();
  const filteredData = DataBook.filter((item) => item.id === index);
  console.log(filteredData);
  return (
    <div className="  rounded-xl p-8 h-full ">
      <div className="flex justify-center">
        <div className=" w-2/3 pb-20">
          <div className="mb-5">
            <p className="font-medium text-xl">Booking Detail</p>
          </div>
          <div className="border border-solid border-gray-300 rounded-lg shadow-custom-card-mui">
            <div className="flex flex-col gap-3 p-6">
              <div className="flex justify-between">
                <span className="font-medium">Name book</span>
                <span className="font-medium text-gray-600">
                  {filteredData[0]?.booker_name}
                </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Email book</span>
                <span className="font-medium text-gray-600">
                  {filteredData[0]?.booker_email}
                </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Phone book</span>
                <span className="font-medium text-gray-600">
                  {filteredData[0]?.booker_phone}
                </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Name book</span>
                <span className="font-medium text-gray-600">
                  {filteredData[0]?.booker_name}
                </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Time book</span>
                <span className="font-medium text-gray-600">
                  {dayjs(filteredData[0]?.booked_date).format("YYYY-MM-DD")}
                </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Time slot book</span>
                <span className="font-medium text-gray-600">
                  {filteredData[0]?.time_slot}
                </span>
              </div>
              <hr />
              <div className="flex flex-col gap-1 ">
                {filteredData[0]?.TicketOnBooking?.map(
                  (ticketQuantity, index: number) => (
                    <div key={index} className=" flex justify-between">
                      <div className="flex gap-1">
                        <span className="font-medium">
                          {ticketQuantity?.ticket_type_id === 1
                            ? "Adult"
                            : "Children"}
                        </span>
                        <span className="font-medium text-gray-600">
                          {ticketQuantity?.quantity}
                        </span>
                      </div>

                      <span className="font-medium text-gray-600">
                        {ticketQuantity?.original_price}
                      </span>
                    </div>
                  )
                )}
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Cost book</span>
                <span className="font-medium text-gray-600">
                  {filteredData[0]?.original_price}
                </span>
              </div>
              <hr />
            </div>
            <div className="bg-main p-6 rounded-b-lg flex justify-between ">
              <div className="flex flex-col">
                <span className="font-medium text-gray-600">Total paid</span>
                <span className="font-medium text-xl pb-2">
                  ₫&nbsp;{filteredData[0]?.paid_price}
                </span>
                <span className="text-xs font-medium  text-gray-600">
                  All taxes and fees included
                </span>
              </div>
              <div className="flex items-center ">
                <button
                  type="button"
                  className="bg-navy-blue px-3 py-2 rounded-lg text-white font-medium"
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
