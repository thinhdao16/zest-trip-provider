import dayjs from "dayjs";
import Navbar from "../../components/Navbar/Index";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataContext } from "../../store/dataContext/DataContext";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../store/redux/store";
import { StatusBooking } from "../../styles/status/booking";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import { Input, Pagination, Select } from "antd";
import { formatNumber } from "../../utils/formatNumber";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const { Search } = Input;

function Booker() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [visibleItems, setVisibleItems] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [keyFilterTour, setKeyFilterTour] = useState("normal");

  const { refeshTour } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours, loading } = useSelector((state: any) => state.tour);

  const dataTours = tours?.tours;
  const countTours = tours?.total_count;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataTourBookingDontReject =
    dataTours?.map((tour: any) => ({
      ...tour,
      Booking:
        tour?.Booking?.filter(
          (booking: { status: string }) =>
            booking?.status !== "REJECT" && booking?.status !== "PENDING"
        ) ?? [],
    })) ?? [];
  const [dataTourBookings, setDataTourBookings] = useState(dataTours);
  console.log(dataTourBookings);
  useEffect(() => {
    if (keyFilterTour === "normal") {
      setDataTourBookings(dataTourBookingDontReject);
    } else {
      const filteredTours =
        dataTours?.map((tour: any) => ({
          ...tour,
          Booking:
            tour?.Booking?.filter(
              (booking: { status: string }) => booking?.status === keyFilterTour
            ) ?? [],
        })) ?? [];
      setDataTourBookings(filteredTours);
    }
  }, [dataTours, keyFilterTour]);

  useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
  }, [dispatch, refeshTour, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };
  const handleSeeMore = (length: number) => {
    setVisibleItems(length || 0);
    setShowAll(true);
  };

  const handleSeeLess = () => {
    setVisibleItems(3);
    setShowAll(false);
  };
  const handleFilterTour = (value: string) => {
    if (value?.length === 0 || value === undefined) {
      setKeyFilterTour("normal");
    } else {
      const pageSizeFil = 1000;
      const currentPageFil = 1;
      const pagination = { pageSizeFil, currentPageFil };
      setPageSize(1000);
      dispatch(fetchTours(pagination));
      setKeyFilterTour(value);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingFullScreen loading={loading} />
      ) : (
        <>
          <Navbar />
          <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg mt-2">
            <div className="container mx-auto px-8 py-4">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold ">List of Booking</h1>
                  <span className="text-gray-500">
                    When provider have booking new, they open here
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Search
                    type="text"
                    // defaultValue={searchTerm}
                    placeholder="input search text"
                    // onSearch={handleSearch}
                    style={{ width: 200 }}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select
                    defaultValue=""
                    onChange={handleFilterTour}
                    style={{ width: 120 }}
                    allowClear
                    options={[
                      { value: "", label: "Choose value" },
                      { value: "ACCEPTED", label: "Accepted" },
                      { value: "REFUNDED", label: "Refund" },
                      {
                        value: "USER_REQUEST_REFUND",
                        label: "User request refund",
                      },
                      { value: "PROVIDER_REFUNDED", label: "Provider refund" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-navy-blue text-white p-3 rounded-lg shadow-custom-card-mui">
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
                <div className="flex flex-col gap-3">
                  {dataTourBookings?.length > 0 &&
                    Array.isArray(dataTourBookings) &&
                    [...dataTourBookings]
                      .sort((a, b) => {
                        return (
                          new Date(b?.updated_at).getTime() -
                          new Date(a?.updated_at).getTime()
                        );
                      })
                      ?.map((dataManyBook: any, index: number) => (
                        <div
                          className="bg-white  relative shadow-custom-card-mui rounded-lg flex flex-col"
                          key={index}
                        >
                          <Link
                            to={`/booking/many/${dataManyBook?.id}`}
                            key={dataManyBook?.id}
                          >
                            <div className="bg-stone-200 flex items-center gap-2 p-4 rounded-t-lg">
                              <img
                                src={dataManyBook?.tour_images?.[0]}
                                className="w-12 h-12 rounded-lg"
                                alt="wait"
                              />
                              <div className="flex flex-col">
                                <p className="font-medium">
                                  {dataManyBook?.name}
                                </p>
                                <span className="text-gray-500 font-medium">
                                  {dataManyBook?.address_district},{" "}
                                  {dataManyBook?.address_province},{" "}
                                  {dataManyBook?.address_country}
                                </span>
                              </div>
                            </div>
                          </Link>
                          <hr />
                          {dataManyBook?.Booking?.length > 0 ? (
                            <Link
                              to={`/booking/many/${dataManyBook?.id}`}
                              key={dataManyBook?.id}
                            >
                              <IoEyeOutline className="absolute top-2 right-2 w-5 h-5" />
                            </Link>
                          ) : (
                            <Link
                              to={`/booking/many/${dataManyBook?.id}`}
                              key={dataManyBook?.id}
                            >
                              <IoEyeOutline className="absolute top-2 right-2 w-5 h-5" />
                            </Link>
                          )}

                          <div className="">
                            {dataManyBook?.Booking?.length > 0 ? (
                              dataManyBook?.Booking.slice(0, visibleItems)?.map(
                                (dataBook: any, indexdata: number) => (
                                  <div className="" key={indexdata}>
                                    <div className="p-4 relative">
                                      <Link
                                        to={`/booking/${dataBook?.id}`}
                                        key={dataBook?.id}
                                      >
                                        <IoEyeOutline className="absolute top-2 right-2 w-5 h-5" />
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
                                              {dayjs(
                                                dataBook?.booked_date
                                              ).format("YYYY-MM-DD")}
                                            </span>{" "}
                                            <span className="text-gray-500">
                                              {" "}
                                              {dataBook?.time_slot}
                                            </span>
                                          </div>
                                          <div className="col-span-1 flex items-center">
                                            <span>
                                              {formatNumber(
                                                parseInt(
                                                  dataBook?.refund_ammount
                                                )
                                              )}
                                            </span>
                                          </div>
                                          <div className="col-span-1 flex">
                                            <div className="flex flex-col">
                                              <div className="flex gap-1">
                                                <span>Original price:</span>
                                                <span className="text-gray-500">
                                                  {formatNumber(
                                                    parseInt(
                                                      dataBook?.original_price
                                                    )
                                                  )}
                                                </span>
                                              </div>
                                              <div className="flex gap-1">
                                                <span>Paid price:</span>
                                                <span className="text-gray-500">
                                                  {formatNumber(
                                                    parseInt(
                                                      dataBook?.paid_price
                                                    )
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
                                      </Link>
                                    </div>
                                    {index <
                                      dataManyBook?.Booking.length - 1 && (
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
                          {dataManyBook?.Booking?.length > 3 && (
                            <div className="my-2 text-center">
                              {showAll ? (
                                <div
                                  className=" flex flex-col items-center justify-center"
                                  onClick={() => handleSeeLess()}
                                >
                                  <FaAngleDoubleUp className="text-navy-blue" />
                                  <button className="font-semibold text-navy-blue">
                                    See Less
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="flex flex-col justify-center text-center items-center"
                                  onClick={() =>
                                    handleSeeMore(dataManyBook?.Booking?.length)
                                  }
                                >
                                  <button className="text-navy-blue font-semibold">
                                    See More
                                  </button>
                                  <FaAngleDoubleDown className="text-navy-blue" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}

                  <div className="flex justify-center">
                    {dataTourBookings?.length > 0 && (
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
