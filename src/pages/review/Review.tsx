/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Index";
import { DataContext } from "../../store/dataContext/DataContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import SpringModal from "./SpringModal";
import { getReview } from "../../store/redux/silce/reviewSlice";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa6";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { Input, Pagination, Select } from "antd";

const { Search } = Input;

function Review() {
  const [activeButton, setActiveButton] = useState(1);
  const [filterImg, setFilterImg] = useState(1);
  const [refeshReview, setRefeshReview] = useState(1);
  React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { review, loading } = useSelector((state: any) => state.review);

  function filterReviewsByTourId(review: any, tourId: string) {
    return review?.filter(
      (review: { tour_id: string }) => review.tour_id === tourId
    );
  }

  React.useEffect(() => {
    dispatch(getReview());
  }, [dispatch, refeshReview]);
  const renderComponent = () => {
    let content;
    switch (activeButton) {
      case 1:
        content = review;
        break;
      case 2:
        content = review?.filter(
          (review: any) => review.ReviewReplies === null
        );
        break;
      case 3:
        content = review?.filter((review: any) => review.ReviewReplies != null);
        break;
      default:
        content = null;
    }
    return content;
  };
  const renderedContent = renderComponent();

  const renderComponentStar = () => {
    let content;
    switch (filterImg) {
      case 1:
        content = renderedContent;
        break;
      case 2:
        content = renderedContent?.filter(
          (review: any) => review?.rating === 5
        );
        break;
      case 3:
        content = renderedContent?.filter(
          (review: any) => review?.rating === 4
        );
        break;
      case 4:
        content = renderedContent?.filter(
          (review: any) => review?.rating === 3
        );
        break;
      case 5:
        content = renderedContent?.filter(
          (review: any) => review?.rating === 2
        );
        break;
      case 6:
        content = renderedContent?.filter(
          (review: any) => review?.rating === 1
        );
        break;
      default:
        content = null;
    }
    return content;
  };
  const renderedContentStar = renderComponentStar();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyFilterTour, setKeyFilterTour] = useState("normal");
  const [searchTerm, setSearchTerm] = useState("");

  const [reloadSearch, setReloadSearch] = useState<any>(null);
  const { refeshTour } = React.useContext(DataContext);
  const { tours } = useSelector((state: any) => state.tour);
  const dataTours = tours?.tours;
  const [dataTourReviews, setDataTourReviews] = useState(dataTours);
  const countTours = tours?.total_count;
  console.log(dataTourReviews);
  useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
  }, [dispatch, refeshTour, currentPage, pageSize, reloadSearch]);
  useEffect(() => {
    if (keyFilterTour === "normal") {
      setDataTourReviews(dataTours);
    }
    if (keyFilterTour === "review") {
      const toursWithReviews = dataTourReviews.filter(
        (tour: any) => tour.TourReview.length > 0
      );
      setDataTourReviews(toursWithReviews);
    }
  }, [dataTourReviews, dataTours, keyFilterTour, reloadSearch]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };

  const handleFilterTour = (value: string) => {
    if (value === "review") {
      const pageSizeFil = 1000;
      const currentPageFil = 1;
      const pagination = { pageSizeFil, currentPageFil };
      setPageSize(1000);
      dispatch(fetchTours(pagination));
      setKeyFilterTour("review");
    }
    if (value?.length === 0 || value === undefined) {
      setKeyFilterTour("normal");
    }
  };

  const searchReviewByNameAndContent = (tours: any[], searchTerm: string) => {
    if (!Array.isArray(tours) || tours.length === 0) {
      return [];
    }
    const filteredTours = tours.filter((tour) => {
      console.log(tour);
      const tourReviews = tour?.TourReview || [];
      return tourReviews.some(
        (review: any) =>
          review?.content?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          (review?.user?.full_name &&
            review?.user?.full_name
              .toLowerCase()
              .includes(searchTerm?.toLowerCase()))
      );
    });

    return filteredTours;
  };

  const onSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length === 0 || value.length === undefined) {
      setKeyFilterTour("normal");
      setReloadSearch((prev: any) => !prev);
    } else {
      const filteredReviews = searchReviewByNameAndContent(
        dataTourReviews,
        value
      );
      setKeyFilterTour("search");
      setDataTourReviews(filteredReviews);
    }
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
                  <h1 className="text-2xl font-semibold ">List of Reviews</h1>
                  <span className="text-gray-500">
                    When provider have review new, they open here
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Search
                    type="text"
                    defaultValue={searchTerm}
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{ width: 200 }}
                  />
                  <Select
                    defaultValue=""
                    onChange={handleFilterTour}
                    style={{ width: 120 }}
                    allowClear
                    options={[
                      { value: "", label: "Choose value" },
                      { value: "review", label: "Review" },
                    ]}
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="flex flex-wrap mb-4">
                  <button
                    className={`button bg-white  px-4 py-3 ${
                      activeButton === 1
                        ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                        : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
                    }`}
                    onClick={() => setActiveButton(1)}
                  >
                    All
                  </button>
                  <button
                    className={`button bg-white px-4 py-3 ${
                      activeButton === 2
                        ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                        : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
                    }`}
                    onClick={() => setActiveButton(2)}
                  >
                    Not answered({" "}
                    {
                      review?.filter(
                        (review: any) => review.ReviewReplies === null
                      ).length
                    }{" "}
                    )
                  </button>
                  <button
                    className={`button bg-white px-4 py-3 ${
                      activeButton === 3
                        ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                        : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
                    }`}
                    onClick={() => setActiveButton(3)}
                  >
                    Answered({" "}
                    {
                      review?.filter(
                        (review: any) => review.ReviewReplies != null
                      ).length
                    }{" "}
                    )
                  </button>
                </div>
                <div className="flex flex-wrap">
                  <button
                    className={`button rounded-sm px-4 py-1.5 bg-white border ${
                      filterImg === 1
                        ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                        : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                    }`}
                    onClick={() => setFilterImg(1)}
                  >
                    All
                  </button>
                  <button
                    className={` flex items-center gap-1  button rounded-sm px-4 py-1.5 bg-white border ${
                      filterImg === 2
                        ? "active   border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                        : "  border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                    }`}
                    onClick={() => setFilterImg(2)}
                  >
                    5 <FaStar className="text-yellow-500" />({" "}
                    {
                      renderedContent?.filter(
                        (review: any) => review?.rating === 5
                      ).length
                    }{" "}
                    )
                  </button>
                  <button
                    className={` flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                      filterImg === 3
                        ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                        : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                    }`}
                    onClick={() => setFilterImg(3)}
                  >
                    4 <FaStar className="text-yellow-500" /> ({" "}
                    {
                      renderedContent?.filter(
                        (review: any) => review?.rating === 4
                      ).length
                    }{" "}
                    )
                  </button>
                  <button
                    className={` flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                      filterImg === 4
                        ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                        : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                    }`}
                    onClick={() => setFilterImg(4)}
                  >
                    3 <FaStar className="text-yellow-500" /> ({" "}
                    {
                      renderedContent?.filter(
                        (review: any) => review?.rating === 3
                      ).length
                    }{" "}
                    )
                  </button>{" "}
                  <button
                    className={`flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                      filterImg === 5
                        ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                        : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                    }`}
                    onClick={() => setFilterImg(5)}
                  >
                    2 <FaStar className="text-yellow-500" /> ({" "}
                    {
                      renderedContent?.filter(
                        (review: any) => review?.rating === 2
                      ).length
                    }{" "}
                    )
                  </button>{" "}
                  <button
                    className={`flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                      filterImg === 6
                        ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                        : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                    }`}
                    onClick={() => setFilterImg(6)}
                  >
                    1 <FaStar className="text-yellow-500" /> ({" "}
                    {
                      renderedContent?.filter(
                        (review: any) => review?.rating === 1
                      ).length
                    }{" "}
                    )
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white p-3 rounded-lg shadow-custom-card-mui">
                  <div className="grid grid-cols-7 gap-3">
                    <div className="col-span-1">
                      <span className="font-medium">Rating</span>
                    </div>

                    <div className="col-span-2">
                      <span className="font-medium">Review</span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Reply review</span>
                    </div>
                    <div className="col-span-1">
                      <span className="font-medium">Date</span>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <span className="font-medium"> Action</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shadow-custom-card-mui">
                  {dataTourReviews?.map((dataManyBook: any, index: number) => (
                    <div
                      className="bg-white  relative shadow-custom-card-mui rounded-lg flex flex-col"
                      key={index}
                    >
                      <div className="bg-white flex items-center gap-2 p-4 rounded-lg">
                        <img
                          src={dataManyBook?.tour_images?.[0]}
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

                      <div className="max-h-48 overflow-auto global-scrollbar">
                        {filterReviewsByTourId(
                          renderedContentStar,
                          dataManyBook?.id
                        )?.length > 0 ? (
                          filterReviewsByTourId(
                            renderedContentStar,
                            dataManyBook?.id
                          )?.map((dataReview: any, index: number) => (
                            <div>
                              <div className="p-4 relative" key={index}>
                                <div className="grid grid-cols-7 gap-2">
                                  <div className="col-span-1">
                                    <div className="flex flex-col ">
                                      <div className="flex flex-col">
                                        <Rating
                                          name="half-rating-read"
                                          value={dataReview?.rating}
                                          precision={0.5}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-span-2">
                                    <span className="block">
                                      {dataReview?.content}
                                    </span>{" "}
                                  </div>
                                  <div className="col-span-2">
                                    <span>
                                      {dataReview?.ReviewReplies?.content ? (
                                        dataReview.ReviewReplies.content
                                      ) : (
                                        <span className="p-2 bg-zinc-100 rounded-md">
                                          No reply review
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  <div className="col-span-1 flex">
                                    <div className="flex flex-col">
                                      <div className="flex gap-1">
                                        <span>
                                          {dataReview?.updated_at &&
                                            dayjs(
                                              dataReview?.updated_at
                                            ).format("HH:mm DD/MM/YYYY ")}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-1 flex items-center justify-center ">
                                    <SpringModal
                                      data={dataReview}
                                      setRefeshReview={setRefeshReview}
                                    />
                                  </div>
                                </div>
                              </div>
                              {index < dataManyBook?.Booking.length - 1 && (
                                <hr className="mt-2" />
                              )}
                            </div>
                          ))
                        ) : (
                          <div className=" flex items-center justify-center p-6">
                            <span className="bg-main border border-solid border-gray-300 p-2 rounded-lg shadow-custom-card-mui">
                              No review tour
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    {dataTourReviews?.length > 0 && (
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

          {/* <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg py-4 px-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold ">List of Reviews</h1>
                <span className="text-gray-500">
                  When provider have review new, they open here
                </span>
              </div>
              <div className="flex items-center gap-3">
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
              </div>
            </div>
            <div className="mb-6">
              <div className="flex flex-wrap mb-4">
                <button
                  className={`button bg-white  px-4 py-3 ${
                    activeButton === 1
                      ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                      : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
                  }`}
                  onClick={() => setActiveButton(1)}
                >
                  All
                </button>
                <button
                  className={`button bg-white px-4 py-3 ${
                    activeButton === 2
                      ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                      : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
                  }`}
                  onClick={() => setActiveButton(2)}
                >
                  Not answered({" "}
                  {
                    review?.filter(
                      (review: any) => review.ReviewReplies === null
                    ).length
                  }{" "}
                  )
                </button>
                <button
                  className={`button bg-white px-4 py-3 ${
                    activeButton === 3
                      ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                      : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
                  }`}
                  onClick={() => setActiveButton(3)}
                >
                  Answered({" "}
                  {
                    review?.filter(
                      (review: any) => review.ReviewReplies != null
                    ).length
                  }{" "}
                  )
                </button>
              </div>
              <div className="flex flex-wrap">
                <button
                  className={`button rounded-sm px-4 py-1.5 bg-white border ${
                    filterImg === 1
                      ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                      : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                  }`}
                  onClick={() => setFilterImg(1)}
                >
                  All
                </button>
                <button
                  className={` flex items-center gap-1  button rounded-sm px-4 py-1.5 bg-white border ${
                    filterImg === 2
                      ? "active   border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                      : "  border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                  }`}
                  onClick={() => setFilterImg(2)}
                >
                  5 <FaStar className="text-yellow-500" />({" "}
                  {
                    renderedContent?.filter(
                      (review: any) => review?.rating === 5
                    ).length
                  }{" "}
                  )
                </button>
                <button
                  className={` flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                    filterImg === 3
                      ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                      : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                  }`}
                  onClick={() => setFilterImg(3)}
                >
                  4 <FaStar className="text-yellow-500" /> ({" "}
                  {
                    renderedContent?.filter(
                      (review: any) => review?.rating === 4
                    ).length
                  }{" "}
                  )
                </button>
                <button
                  className={` flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                    filterImg === 4
                      ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                      : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                  }`}
                  onClick={() => setFilterImg(4)}
                >
                  3 <FaStar className="text-yellow-500" /> ({" "}
                  {
                    renderedContent?.filter(
                      (review: any) => review?.rating === 3
                    ).length
                  }{" "}
                  )
                </button>{" "}
                <button
                  className={`flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                    filterImg === 5
                      ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                      : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                  }`}
                  onClick={() => setFilterImg(5)}
                >
                  2 <FaStar className="text-yellow-500" /> ({" "}
                  {
                    renderedContent?.filter(
                      (review: any) => review?.rating === 2
                    ).length
                  }{" "}
                  )
                </button>{" "}
                <button
                  className={`flex items-center gap-1 button rounded-sm px-4 py-1.5 bg-white border ${
                    filterImg === 6
                      ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                      : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
                  }`}
                  onClick={() => setFilterImg(6)}
                >
                  1 <FaStar className="text-yellow-500" /> ({" "}
                  {
                    renderedContent?.filter(
                      (review: any) => review?.rating === 1
                    ).length
                  }{" "}
                  )
                </button>
              </div>
            </div>
            <div className="container mx-auto ">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-12 bg-white rounded-lg p-3 font-medium shadow-custom-card-mui">
                  <div className="col-span-4 ">Infomation product</div>
                  <div className="col-span-6 ">Rate person</div>
                  <div className="col-span-2 text-center">action</div>
                </div>
                <div className="flex flex-col gap-2">
                  {renderedContentStar?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className=" bg-white rounded-lg shadow-custom-card-mui border border-solid border-white "
                    >
                      <div className="grid grid-cols-12 gap-4 p-3 ">
                        <div className="col-span-4 ">
                          <div className="flex gap-2">
                            <img
                              className="w-12 h-12 object-cover rounded-lg"
                              alt="wait"
                              src={item?.tour?.tour_images[0]}
                            />
                            <div className="flex flex-col gap-2">
                              <span className="font-medium">
                                {item?.tour?.name}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                <span className="text-gray-500">
                                  {item?.tour?.description}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-6 ">
                          <div className="flex flex-col gap-2">
                            <Rating
                              name="half-rating-read"
                              value={item?.rating}
                              precision={0.5}
                              readOnly
                            />
                            <span className="text-gray-700">
                              {item?.content}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {item?.updated_at &&
                                dayjs(item?.updated_at).format(
                                  "HH:mm DD/MM/YYYY "
                                )}
                            </span>
                            <span>{item?.ReviewReplies?.content}</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <SpringModal
                            data={item}
                            setRefeshReview={setRefeshReview}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main> */}
        </>
      )}
    </>
  );
}

Review.propTypes = {};

export default Review;
