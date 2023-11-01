import { IoAirplaneOutline, IoLocationOutline } from "react-icons/io5";
import { DataBook } from "../../pages/booker/dataBook";
import dayjs from "dayjs";
import { AiOutlineDown } from "react-icons/ai";

function DashBoardBooker() {
  const dataFake = DataBook;
  console.log(dataFake);
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
                <div className="grid grid-cols-12 p-2 rounded-lg shadow-custom-0 items-center gap-2 relative">
                  <div className="absolute bottom-1 right-1 text-xs flex items-center gap-1">
                    <span>See more</span>
                    <AiOutlineDown />
                  </div>
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
