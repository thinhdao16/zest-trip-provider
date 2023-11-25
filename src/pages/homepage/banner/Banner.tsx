import { Rating, Skeleton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTours } from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";

import { DataContext } from "../../../store/dataContext/DataContext";
import { AiFillEdit, AiFillFilter } from "react-icons/ai";
import { FaMobile } from "react-icons/fa6";
import { LuMoreHorizontal } from "react-icons/lu";
import { TourTag, VehicleTag } from "../../../components/icon/tour/tag";
import { Pagination } from "antd";
import Navbar from "../../../components/Navbar/Index";
import { RiSearchLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import LoadingFullScreen from "../../../styles/loading/LoadingFullScreen";
export default function Banner() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
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
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendToServer(searchValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const sendToServer = (valueSearch: string) => {
    console.log("Gửi giá trị lên server:", valueSearch);
    const pagination = { pageSize, currentPage, valueSearch };
    dispatch(fetchTours(pagination)).then((response) => {
      if (fetchTours.fulfilled.match(response)) {
        // setRefeshTour((prev) => !prev);
      }
    });
  };
  return (
    <>
      {loading ? (
        <LoadingFullScreen loading={loading} />
      ) : (
        <>
          <Navbar />

          <div className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
            <div className="container mx-auto py-4 px-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold ">List of Tour</h1>
                  <span className="text-gray-500">
                    When provider have availability new, they open here
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <RiSearchLine className="absolute top-2 left-2" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="border border-gray-300 pl-8 py-1 w-24 rounded-md"
                      value={searchValue}
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
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
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {dataTours?.length > 0 ? (
                  Array.isArray(dataTours) &&
                  [...dataTours]
                    .sort((a, b) => {
                      return (
                        new Date(b?.updated_at).getTime() -
                        new Date(a?.updated_at).getTime()
                      );
                    })
                    .map((data: any, index: number) => (
                      <div key={index}>
                        <div className="bg-white shadow-custom-card-mui grid grid-cols-12 p-4 gap-3 ">
                          <div className="col-span-1">
                            <img
                              style={{
                                width: "75px",
                                borderRadius: "5px",
                                objectFit: "cover",
                                height: "75px",
                              }}
                              src={data?.tour_images[0]}
                              alt="nothing"
                            />
                          </div>

                          <div className="col-span-9 grid gap-2  content-between">
                            <div>
                              <p className="font-medium ">{data.name}</p>
                            </div>
                            <Rating
                              name="half-rating-read"
                              value={data?.rate}
                              precision={0.5}
                              readOnly
                            />
                            <div className="flex items-center flex-wrap gap-3 text-sm">
                              {data?.tag_id?.map(
                                (dataTag: { name: string }, index: string) => (
                                  <button
                                    key={index}
                                    className=" border px-1 rounded-md shadow-custom-card-mui text-navy-blue hover:text-black   flex items-center gap-1"
                                  >
                                    <TourTag
                                      field={dataTag?.name}
                                      style="w-4 h-4"
                                    />
                                    <p>{dataTag?.name}</p>
                                  </button>
                                )
                              )}
                              <span className="w-0.5 h-5 bg-gray-300 rounded-full"></span>
                              {data?.vehicle_id?.map(
                                (
                                  dataVehicle: { name: string },
                                  index: string
                                ) => (
                                  <button
                                    key={index}
                                    className=" border px-1 rounded-md shadow-custom-card-mui text-navy-blue hover:text-black  flex items-center gap-1"
                                  >
                                    <VehicleTag
                                      field={dataVehicle?.name}
                                      style="w-4 h-4"
                                    />
                                    <p>{dataVehicle?.name}</p>
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex gap-2 justify-between">
                              <div>
                                <button
                                  type="button"
                                  className={`text-sm flex gap-1 items-center p-1 rounded-md ${
                                    data?.status === "PUBLISHED"
                                      ? "bg-navy-blue-opacity-5 text-navy-blue" // Màu xanh cho Published
                                      : data?.status === "HIDDEN"
                                      ? "bg-red-300 text-red-900" // Màu đỏ cho Hidden
                                      : data?.status === "DRAFT"
                                      ? "bg-yellow-300 text-yellow-900" // Màu vàng cho Draft
                                      : ""
                                  }`}
                                >
                                  <GoDotFill />
                                  {data?.status}
                                </button>
                              </div>

                              <div className="flex flex-col gap-3 ">
                                <button>
                                  <LuMoreHorizontal />
                                </button>
                                <button>
                                  <Link to={`/${data?.id}`} key={data?.id}>
                                    <AiFillEdit />
                                  </Link>
                                </button>
                                <button>
                                  <FaMobile />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <>
                    <div></div>
                    <div>
                      <p
                        style={{
                          color: "#091f44",
                          fontSize: "24px",
                          lineHeight: "1.5",
                          margin: "8px 0 16px 0",
                        }}
                      >
                        <Skeleton width={200} className="rounded-2xl" />
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: 300,
                        opacity: "0.8",
                        paddingBottom: "8px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={50}
                        animation="wave"
                        className="rounded-lg"
                      />
                    </p>
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 300,
                        }}
                      >
                        <Skeleton width={60} className="rounded-3xl" />
                      </p>
                    </div>
                  </>
                )}
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
        </>
      )}
    </>
  );
}
