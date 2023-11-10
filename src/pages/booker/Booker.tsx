import dayjs from "dayjs";
import Navbar from "../../components/Navbar/Index";
import { DataManyBook } from "./dataManyBook";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

function Booker() {
  return (
    <>
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        {/* Main Content */}
        <div className="mainCard"></div>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">List of Items</h1>
          <div className="flex flex-col gap-5 shadow-custom-card-mui">
            {DataManyBook?.map((dataManyBook, index: number) => (
              <div
                className="bg-white  relative shadow-custom-card-mui rounded-lg flex flex-col"
                key={index}
              >
                <Link
                  to={`/booker/many/${dataManyBook?.id}`}
                  key={dataManyBook?.id}
                >
                  <AiFillEye className="absolute bottom-2 right-2 w-5 h-5" />
                </Link>
                {dataManyBook?.Booking?.map((dataBook, index: number) => (
                  <div className="p-4 relative" key={index}>
                    <Link to={`/booker/${dataBook?.id}`} key={dataBook?.id}>
                      <AiFillEye className="absolute top-2 right-2 w-5 h-5" />
                    </Link>
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-1 flex items-center ">
                        <span className="font-medium">
                          {dayjs(dataBook?.updated_at)?.format("YYYY-MM-DD")}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <div className="flex gap-3">
                          <div className="w-w-2 h-auto bg-gray-300 rounded-full"></div>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {dataBook?.booker_email}
                            </span>
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
                      <div className="col-span-1">
                        <span className="font-medium block">Duration</span>
                        <span>{dataManyBook?.duration} Night</span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Time book</span>

                        <button
                          type="button"
                          className="border border-solid border-gray-300 rounded-md px-1 block text-sm text-gray-600"
                        >
                          <span className="font-medium">
                            {dayjs(dataBook?.booked_date).format("YYYY-MM-DD")}
                          </span>{" "}
                          {dataBook?.time_slot}
                        </button>
                      </div>
                      <div className="col-span-3">
                        <span className="font-medium">Ticket type</span>
                        <div className="flex gap-1">
                          {dataBook?.TicketOnBooking?.map(
                            (ticketQuantity, index: number) => (
                              <div
                                key={index}
                                className="border border-solid border-gray-300 rounded-md px-1 text-sm text-gray-700"
                              >
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
                      </div>
                      <div className="col-span-2">
                        <div className="flex flex-col">
                          <span className="font-medium"> Payment</span>
                          <span>{dataBook?.paid_price}</span>
                        </div>
                      </div>
                    </div>
                    {index < dataManyBook?.Booking.length - 1 && (
                      <hr className="mt-2" />
                    )}
                  </div>
                ))}
                <div className="bg-white border-t border-solid p-4 rounded-b-md">
                  <p className="font-medium">{dataManyBook?.name}</p>
                  <span>
                    {dataManyBook?.address_district},{" "}
                    {dataManyBook?.address_province}, ,
                    {dataManyBook?.address_country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Booker;
