import dayjs from "dayjs";
import Navbar from "../../components/Navbar/Index";
import { DataManyBook } from "./dataManyBook";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

function Booker() {
  console.log(DataManyBook);
  return (
    <>
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        {/* Main Content */}
        <div className="mainCard"></div>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">List of Booking</h1>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-3 rounded-lg shadow-custom-card-mui">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-2">
                  <span className="font-medium">Booker</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Period time</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Time book</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Ticket type</span>
                </div>
                <div className="col-span-3">
                  <span className="font-medium">Payment</span>
                </div>
                <div className="col-span-1">
                  <span className="font-medium"> Status</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 shadow-custom-card-mui">
              {DataManyBook?.map((dataManyBook, index: number) => (
                <div
                  className="bg-white  relative shadow-custom-card-mui rounded-lg flex flex-col"
                  key={index}
                >
                  <div className="bg-white flex items-center gap-2 p-4 rounded-t-lg">
                    <img
                      src={dataManyBook?.tour_images[0]}
                      className="w-12 h-12 rounded-lg"
                      alt="wait"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium">{dataManyBook?.name}</p>
                      <span className="text-gray-500 font-medium">
                        {dataManyBook?.address_district},{" "}
                        {dataManyBook?.address_province},{" "}
                        {dataManyBook?.address_country}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <Link
                    to={`/booker/many/${dataManyBook?.id}`}
                    key={dataManyBook?.id}
                  >
                    <AiFillEye className="absolute top-2 right-2 w-5 h-5" />
                  </Link>
                  {dataManyBook?.Booking?.map((dataBook, index: number) => (
                    <div>
                      <div className="p-4 relative" key={index}>
                        <Link to={`/booker/${dataBook?.id}`} key={dataBook?.id}>
                          <AiFillEye className="absolute top-2 right-2 w-5 h-5" />
                        </Link>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-2">
                            <div className="flex flex-col ">
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {dataBook?.booker_name}
                                </span>
                                <span className="font-medium">
                                  {dataBook?.booker_email}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className=" block">
                              {dayjs(dataBook?.booked_date)?.format(
                                "YYYY-MM-DD"
                              )}
                            </span>
                            <span className="text-gray-500">
                              {dataManyBook?.duration} Night
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="block">
                              {dayjs(dataBook?.booked_date).format(
                                "YYYY-MM-DD"
                              )}
                            </span>{" "}
                            <span className="text-gray-500">
                              {" "}
                              {dataBook?.time_slot}
                            </span>
                          </div>
                          <div className="col-span-2">
                            {dataBook?.TicketOnBooking?.map(
                              (ticketQuantity, index: number) => (
                                <div key={index} className="">
                                  <span className="">
                                    {ticketQuantity?.ticket_type_id === 1
                                      ? "Adult"
                                      : "Children"}
                                    {": "}
                                  </span>
                                  <span className="text-gray-500">
                                    {ticketQuantity?.quantity}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                          <div className="col-span-3 flex">
                            <div className="flex flex-col">
                              <div className="flex gap-1">
                                <span>Original price:</span>
                                <span className="text-gray-500">
                                  {dataBook?.original_price}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                <span>Paid price:</span>
                                <span className="text-gray-500">
                                  {dataBook?.paid_price}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1 flex items-center ">
                            <div>
                              <button
                                type="button"
                                className="px-1 text-sm border border-solid border-gray-300 rounded-md"
                              >
                                {dataBook?.status}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < dataManyBook?.Booking.length - 1 && (
                        <hr className="mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Booker;
