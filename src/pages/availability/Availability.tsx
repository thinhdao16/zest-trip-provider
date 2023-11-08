import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Index";
import { AppDispatch } from "../../store/redux/store";
import { useEffect, useState } from "react";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { FaRegPenToSquare } from "react-icons/fa6";
import AddAvailability from "./Modal/AddAvailability";
import EditAvailability from "./Modal/EditAvailability";

function Availability() {
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch, loading]);
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
    <>
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        {/* Main Content */}

        <div className="container mx-auto p-4 flex flex-col gap-3">
          <h1 className="text-2xl font-semibold mb-4">List of Items</h1>

          {tours?.map((dataTour: any, index: number) => (
            <>
              <div
                key={index}
                className="shadow-custom-card-mui mb-4 bg-white rounded-lg pt-6 relative"
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <EditAvailability
                    dataAvailability={dataTour?.TourAvailability}
                  />
                  <AddAvailability
                    dataDetailTour={dataTour}
                    setLoading={setLoading}
                  />
                </div>
                {dataTour?.TourAvailability?.length > 0 ? (
                  dataTour?.TourAvailability?.map(
                    (
                      _availability: {
                        name: string;
                        status: string;
                        validity_date_range_from: string;
                        validity_date_range_to: string;
                        weekdays: { day: number; timeSlot: string }[];
                        special_dates: { date: string; timeSlot: string }[];
                      },
                      index: number
                    ) => (
                      <div className=" px-4  mb-2  relative " key={index}>
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-1 flex items-center">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {dayjs(
                                  _availability?.validity_date_range_from
                                ).format("YYYY-MM-DD")}
                              </span>
                              <span className="font-medium text-gray-600 ">
                                {dayjs(
                                  _availability?.validity_date_range_to
                                ).format("YYYY-MM-DD")}
                              </span>
                            </div>
                          </div>

                          <div className="col-span-4 flex gap-3 ">
                            <div
                              className={`w-0.5 h-auto rounded-full ${
                                _availability?.status === "ACTIVE"
                                  ? "bg-green-tag"
                                  : "bg-red-900"
                              }`}
                            ></div>
                            <div className="flex flex-col gap-2 ">
                              <span className="font-medium">
                                {_availability?.name}
                              </span>
                              <div>
                                <button
                                  type="button"
                                  className={`text-sm px-1 rounded-sm ${
                                    _availability?.status === "ACTIVE"
                                      ? "bg-green-tag-opa text-green-tag"
                                      : "bg-red-300 text-red-900"
                                  }`}
                                >
                                  {_availability?.status}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-4 grid gap-2 content-between">
                            <span className="font-medium">weekdayss</span>
                            <div className="flex flex-wrap gap-3">
                              {" "}
                              {_availability?.weekdays?.map(
                                (weekdayItem, index: number) => (
                                  <div
                                    key={index}
                                    className="border border-solid border-gray-300 bg-gray-100 rounded-md px-1 text-sm flex gap-1 text-gray-500"
                                  >
                                    <span className="font-medium">
                                      {getDayName(weekdayItem?.day)}
                                    </span>
                                    <span>{weekdayItem?.timeSlot}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="col-span-3">
                            <span className="font-medium">Special date</span>
                            <div className="flex flex-wrap gap-3">
                              {" "}
                              {_availability?.special_dates?.map(
                                (specialItem, index: number) => (
                                  <div
                                    key={index}
                                    className="border border-solid border-gray-300 bg-gray-100 rounded-md px-1 text-sm gap-1 flex text-gray-500"
                                  >
                                    <span className="font-medium">
                                      {specialItem?.date}
                                    </span>
                                    <span>{specialItem?.timeSlot}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {index < dataTour?.TourAvailability?.length - 1 && (
                          <hr className="mt-2" />
                        )}
                      </div>
                    )
                  )
                ) : (
                  <div className="flex justify-center p-8">
                    <button
                      type="button"
                      className="bg-main rounded-md py-1 px-2 shadow-custom-card-mui font-medium"
                    >
                      This tour does not have availability
                    </button>
                  </div>
                )}
                <div className="bg-white border-t border-solid flex flex-col p-4 rounded-b-lg">
                  <span className="font-medium">{dataTour?.name}</span>
                  <span className="text-gray-800">
                    {dataTour?.address_district},{dataTour?.address_province},{" "}
                    {dataTour?.address_country}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      </main>
    </>
  );
}

Availability.propTypes = {};

export default Availability;
