import { Menu, MenuItem, Rating, Skeleton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTours, getTours } from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";

import { DataContext } from "../../../store/dataContext/DataContext";
import { AiFillFilter } from "react-icons/ai";
import Navbar from "../../../components/Navbar/Index";
import { RiSearchLine } from "react-icons/ri";
import LoadingFullScreen from "../../../styles/loading/LoadingFullScreen";
import { StatusTour } from "../../../styles/status/tour";
import { Pagination, Slider } from "antd";
import dayjs from "dayjs";

export default function TourCancel() {
  const { refeshTour, reloadStatus } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours, loading } = useSelector((state: any) => state.tour);
  const dataTours = tours?.tours;
  const countTours = tours?.total_count;
  console.log(dataTours);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [minPrice, setMinPrice] = useState<any>(0);
  const [maxPrice, setMaxPrice] = useState<any>(20000000000);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [filterTour, setFilterTour] = useState(dataTours);
  console.log(filterTour);
  const open = Boolean(anchorEl);
  const toursWithBlockedDates = useMemo(() => {
    return filterTour?.filter(
      (tour: any) => tour?.blocked_dates && tour?.blocked_dates?.length > 0
    );
  }, [filterTour]);
  useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
  }, [dispatch, refeshTour, currentPage, pageSize, reloadStatus]);
  useEffect(() => {
    // Code xử lý sau khi reloadStatus thay đổi
    console.log("reloadStatus changed:", reloadStatus);
  }, [reloadStatus]);
  useEffect(() => {
    const filtered = dataTours?.filter((booking: any) => {
      const ticketPricings = booking?.TicketPricing;
      const prices = ticketPricings?.flatMap((ticketPricing: any) =>
        ticketPricing?.price_range?.map((range: any) => range?.price)
      );
      const isPriceMatch = prices?.some(
        (price: any) =>
          (minPrice === "" || price >= Number(minPrice)) &&
          (maxPrice === "" || price <= Number(maxPrice))
      );
      const isStatusMatch =
        selectedStatus === "" || booking.status === selectedStatus;
      const isSearchMatch =
        searchValue === "" ||
        Object.values(booking).some(
          (field: any) =>
            typeof field === "string" && field.includes(searchValue)
        );

      return isStatusMatch && isSearchMatch && isPriceMatch;
    });

    setFilterTour(filtered);
  }, [dataTours, selectedStatus, searchValue, minPrice, maxPrice]);

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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleStatusClick = (status: any) => {
    console.log(status);
    setSelectedStatus(status);
    setAnchorEl(null);
    if (status === "") {
      const pagination = { pageSize, currentPage };
      dispatch(fetchTours(pagination));
    } else {
      dispatch(getTours());
    }
  };
  const handleMinPriceChange = (value: any) => {
    console.log(value);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value: any) => {
    setMaxPrice(value);
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
                  <h1 className="text-2xl font-semibold ">
                    List of Tour Block
                  </h1>
                  <span className="text-gray-500">
                    When provider have block new, they open here
                  </span>
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <div className="flex items-center gap-5 justify-end">
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
                        className="relative border border-gray-300 pl-0 py-1 w-24 rounded-md bg-white"
                        onClick={handleClick}
                      >
                        <AiFillFilter className="absolute top-2 left-2" />
                        Filter
                      </button>
                      <div>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={() => handleStatusClick("")}>
                            All
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleStatusClick("PUBLISHED")}
                          >
                            Publish
                          </MenuItem>
                          <MenuItem onClick={() => handleStatusClick("HIDDEN")}>
                            Hidden
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span>Min Price:</span>
                      <div className="w-14">
                        <Slider
                          min={0}
                          max={1000000}
                          onChange={handleMinPriceChange}
                          value={minPrice}
                        />
                      </div>
                      <input
                        type="number"
                        className="bg-white pl-3 py-1.5 w-24 border border-gray-200 rounded-md"
                        min={0}
                        max={100000000}
                        value={minPrice}
                        onChange={(e) => handleMinPriceChange(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Max Price:</span>
                      <div className="w-14">
                        <Slider
                          min={0}
                          max={100000000}
                          onChange={handleMaxPriceChange}
                          value={maxPrice}
                        />
                      </div>
                      <input
                        type="number"
                        className="bg-white pl-3 py-1.5 w-24 border border-gray-200 rounded-md"
                        min={0}
                        max={100000000}
                        value={maxPrice}
                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {toursWithBlockedDates?.length > 0 ? (
                  Array.isArray(toursWithBlockedDates) &&
                  [...toursWithBlockedDates]
                    .sort((a, b) => {
                      return (
                        new Date(b?.updated_at).getTime() -
                        new Date(a?.updated_at).getTime()
                      );
                    })
                    .map((data: any, index: number) => (
                      <div key={index} className="relative">
                        {/* <div className="absolute top-0 right-0">
                          <Select style={{ width: 200 }}>
                            <Option key={index} value={data?.status}>
                              <p>{data?.status}</p>
                            </Option>
                          </Select>
                          <StatusSelect
                            defaultValue={data?.status}
                            onChange={handleChangeStatus}
                          />
                        </div> */}
                        <Link to={`/booking/many/${data?.id}`} key={data?.id}>
                          <div className="bg-white shadow-custom-card-mui grid grid-cols-12 p-4 gap-3  rounded-lg">
                            <div className="col-span-1">
                              <Link to={`/${data?.id}`} key={data?.id}>
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
                              </Link>
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
                                {data?.blocked_dates?.map(
                                  (blockdate: string, index: number) => (
                                    <button
                                      key={index}
                                      className=" border px-1 rounded-md shadow-custom-card-mui text-navy-blue hover:text-black  flex items-center gap-1"
                                    >
                                      <p>
                                        {dayjs(blockdate).format("YYYY-MM-DD")}
                                      </p>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="flex gap-2 justify-between">
                                <div>
                                  <StatusTour idtour={data?.id}>
                                    {data?.status}
                                  </StatusTour>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
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
