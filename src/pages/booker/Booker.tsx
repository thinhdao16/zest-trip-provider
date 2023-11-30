import dayjs from "dayjs";
import Navbar from "../../components/Navbar/Index";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataContext } from "../../store/dataContext/DataContext";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../store/redux/store";
import { StatusBooking } from "../../styles/status/booking";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import { Pagination } from "antd";
import { formatNumber } from "../../utils/formatNumber";

function Booker() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { refeshTour } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours, loading } = useSelector((state: any) => state.tour);
  console.log(tours);
  const dataTours = tours?.tours;
  const countTours = tours?.total_count;
  React.useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
  }, [dispatch, refeshTour, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    console.log(current);
    setPageSize(size);
    setCurrentPage(current);
  };
  return (
    <>
      {loading ? (
        <LoadingFullScreen loading={loading} />
      ) : (
        <>
          <Navbar />
          <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
            <div className="container mx-auto px-8 py-4">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold ">List of Booking</h1>
                  <span className="text-gray-500">
                    When provider have booking new, they open here
                  </span>
                </div>
                {/* <div className="flex items-center gap-3">
                  <div className="relative">
                    <RiSearchLine className="absolute top-2 left-2" />
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Search"
                      className="border border-gray-300 pl-8 py-1 w-24 rounded-md"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="relative border border-gray-300 pl-0 py-1 w-24 rounded-md"
                    >
                      <AiFillFilter className="absolute top-2 left-2" />
                      Filter
                    </button>
                  </div>
                </div> */}
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white p-3 rounded-lg shadow-custom-card-mui">
                  <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-1">
                      <span className="font-medium">Booker</span>
                    </div>

                    <div className="col-span-1">
                      <span className="font-medium">Book time</span>
                    </div>
                    <div className="col-span-1">
                      <span className="font-medium">Refund amount</span>
                    </div>
                    <div className="col-span-1">
                      <span className="font-medium">Payment</span>
                    </div>
                    <div className="col-span-1">
                      <span className="font-medium"> Status</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shadow-custom-card-mui">
                  {dataTours?.map((dataManyBook: any, index: number) => (
                    <div
                      className="bg-white  relative shadow-custom-card-mui rounded-lg flex flex-col"
                      key={index}
                    >
                      <div className="bg-white flex items-center gap-2 p-4 rounded-lg">
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
                      {dataManyBook?.Booking?.length > 0 ? (
                        <Link
                          to={`/booking/many/${dataManyBook?.id}`}
                          key={dataManyBook?.id}
                        >
                          <AiFillEye className="absolute top-2 right-2 w-5 h-5" />
                        </Link>
                      ) : (
                        <Link
                          to={`/detail-tour/${dataManyBook?.id}`}
                          key={dataManyBook?.id}
                          target="_blank"
                        >
                          <AiFillEye className="absolute top-2 right-2 w-5 h-5" />
                        </Link>
                      )}

                      <div className="max-h-48 overflow-auto global-scrollbar">
                        {dataManyBook?.Booking?.length > 0 ? (
                          dataManyBook?.Booking?.map(
                            (dataBook: any, index: number) => (
                              <div>
                                <div className="p-4 relative" key={index}>
                                  <Link
                                    to={`/booking/${dataBook?.id}`}
                                    key={dataBook?.id}
                                  >
                                    <AiFillEye className="absolute top-2 right-2 w-5 h-5" />
                                  </Link>
                                  <div className="grid grid-cols-5 gap-2">
                                    <div className="col-span-1">
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

                                    <div className="col-span-1">
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
                                    <div className="col-span-1 flex items-center">
                                      <span>
                                        {formatNumber(
                                          parseInt(dataBook?.refund_ammount)
                                        )}
                                      </span>
                                    </div>
                                    <div className="col-span-1 flex">
                                      <div className="flex flex-col">
                                        <div className="flex gap-1">
                                          <span>Original price:</span>
                                          <span className="text-gray-500">
                                            {formatNumber(
                                              parseInt(dataBook?.original_price)
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex gap-1">
                                          <span>Paid price:</span>
                                          <span className="text-gray-500">
                                            {formatNumber(
                                              parseInt(dataBook?.paid_price)
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-span-1 flex items-center ">
                                      <StatusBooking>
                                        {dataBook?.status}
                                      </StatusBooking>
                                    </div>
                                  </div>
                                </div>
                                {index < dataManyBook?.Booking.length - 1 && (
                                  <hr className="mt-2" />
                                )}
                              </div>
                            )
                          )
                        ) : (
                          <div className=" flex items-center justify-center p-6">
                            <span className="bg-main border border-solid border-gray-300 p-2 rounded-lg shadow-custom-card-mui">
                              No one has booking this tour yet
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    {dataTours?.length > 0 && (
                      <Pagination
                        current={currentPage}
                        total={countTours}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 30, 40]}
                        showSizeChanger
                        onChange={handlePageChange}
                        onShowSizeChange={(current, size) =>
                          handlePageSizeChange(current, size)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Booker;
