import { useParams } from "react-router-dom";
import { DataManyBook } from "./dataManyBook";
import { Carousel } from "react-responsive-carousel";
import { FaLocationDot } from "react-icons/fa6";
import { FcPaid } from "react-icons/fc";
import { GiPriceTag } from "react-icons/gi";
import { MdCreateNewFolder, MdUpdate } from "react-icons/md";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillCaretRight, AiOutlineCaretRight } from "react-icons/ai";
import { GrCaretRightFill } from "react-icons/gr";
function BookDetailScreenMain() {
  const { index } = useParams<{ index: string }>();
  const filteredData = DataManyBook.filter((item) => item.id === index);
  console.log(filteredData);
  return (
    <div className="bg-main rounded-xl p-8 h-full overflow-y-auto global-scrollbar">
      <div className="mb-6" id="booking">
        <div className="font-medium text-xl pb-4">List booking</div>
        <div className="bg-white p-4 flex flex-col gap-3">
          {filteredData[0]?.Booking?.map((booking, index: number) => (
            <div
              className="grid grid-cols-12 gap-2 items-center shadow-custom-card-mui p-4 border border-solid border-gray-300 rounded-lg"
              key={index}
            >
              {/* <div className="col-span-1 flex items-center justify-end font-medium">
                <span>{booking?.booker_name}</span>
              </div> */}
              <div className="col-span-2">
                <div className="flex gap-2">
                  {/* <div className="w-w-2 rounded-full h-auto bg-gray-500"></div> */}
                  <div>
                    <span className="font-medium">{booking?.booker_name}</span>
                    <p className="font-medium">{booking?.booker_email}</p>
                    <p className="">{booking?.booker_phone}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col items-center">
                  {booking?.TicketOnBooking?.map(
                    (ticketQuantity, index: number) => (
                      <div key={index} className="">
                        <div className="flex">
                          <span className="font-medium">
                            {ticketQuantity?.ticket_type_id === 1
                              ? "Adult"
                              : "Children"}
                            {": "}
                          </span>
                          <span>{ticketQuantity?.quantity}</span>
                        </div>
                        <div className="flex text-sm gap-2">
                          <div className="flex items-center gap-1">
                            <GiPriceTag />
                            <span className="text-gray-500">
                              {ticketQuantity?.original_price}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FcPaid />
                            <span className="text-gray-500">
                              {ticketQuantity?.paid_price}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1">
                  <MdCreateNewFolder />
                  <span className="font-medium">
                    {dayjs(booking?.booked_date)?.format("YYYY-MM-DD")}:
                  </span>
                  <span className="font-medium text-gray-500">
                    {booking?.time_slot}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MdUpdate />
                  <span className="font-medium text-gray-700">
                    {dayjs(booking?.updated_at)?.format("YYYY-MM-DD")}
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Cost:</span>
                    <span className="font-medium text-gray-500">
                      {booking?.original_price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Paid:</span>
                    <span className="font-medium text-gray-500">
                      {booking?.paid_price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-4 justify-end">
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-navy-blue-opacity-5 text-navy-blue rounded-md p-1"
                  >
                    <GoDotFill />
                    <span className="text-sm">{booking?.status}</span>
                  </button>
                  <HiOutlineDotsVertical />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 " id="revenue">
        <div className="font-medium text-xl pb-4">Total revenue</div>

        <div className="bg-white p-4 rounded-lg shadow-custom-card-mui">
          <div className="shadow-custom-card-mui p-4 border border-solid border-gray-300 rounded-lg">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-4 border-r border-solid border-gray-300 pr-3">
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex justify-between px-4">
                    <span>Total Invoice</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between px-4">
                    <span>Total Paid</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between px-4">
                    <span>Invoice Balance</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />

                  <div className="flex justify-between px-4">
                    <span>Booking Balance</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                </div>
              </div>
              <div className="col-span-4 border-r border-solid border-gray-300 pr-3">
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex justify-between px-4">
                    <span>Gross</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between px-4">
                    <span>Discount</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />

                  <div className="flex justify-between px-4">
                    <span>Delivery Charges</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                  <hr />

                  <div className="flex justify-between px-4">
                    <span>Net</span>
                    <span className="font-medium">₫&nbsp;400000</span>
                  </div>
                </div>
              </div>{" "}
              <div className="col-span-4 grid content-between px-4 py-2">
                <div className="flex justify-between">
                  <span></span>
                  <span className="font-medium text-3xl">₫&nbsp;400000</span>
                </div>
                <div className="flex justify-between pl-3">
                  <span>Tax</span>
                  <span className="font-medium ">₫&nbsp;400000</span>
                </div>{" "}
                <div className="flex justify-center">
                  <div className="font-medium py-2 border border-solid border-gray-300 pr-10 pl-6">
                    Margin
                  </div>
                  <div className="font-medium text-white bg-navy-blue py-2 pr-6 pl-10 relative">
                    {" "}
                    100%
                    <AiOutlineCaretRight
                      className="absolute top-3 "
                      style={{ left: "-6px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 " id="information_basic">
        <div className="font-medium text-xl pb-4">
          {" "}
          Infomation basic tour detail
        </div>

        <div className="bg-white p-4 rounded-lg shadow-custom-card-mui">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <Carousel className="createTourReviewImg">
                {filteredData[0]?.tour_images?.map(
                  (data: string, index: number) => (
                    <div key={index}>
                      <img src={data} alt={`Image ${index}`} />
                    </div>
                  )
                )}
              </Carousel>
            </div>
            <div className="col-span-7">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-xl">
                  {filteredData[0]?.name}
                </span>
                <span className="text-lg">{filteredData[0]?.description}</span>
                <span className="text-gray-500">
                  {filteredData[0]?.footnote}
                </span>
                <div className="flex gap-1 items-center">
                  <FaLocationDot />
                  <span>
                    {filteredData[0]?.address_name},{" "}
                    {filteredData[0]?.address_ward},{" "}
                    {filteredData[0]?.address_district},{" "}
                    {filteredData[0]?.address_province},{" "}
                    {filteredData[0]?.address_country}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BookDetailScreenMain.propTypes = {};

export default BookDetailScreenMain;
