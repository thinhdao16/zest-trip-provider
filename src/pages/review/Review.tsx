/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Index";
import { DataContext } from "../../store/dataContext/DataContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import SpringModal from "./SpringModal";
import { getReview } from "../../store/redux/silce/reviewSlice";
import dayjs from "dayjs";

function Review() {
  const [activeButton, setActiveButton] = useState(1);
  const [filterImg, setFilterImg] = useState(1);
  const [refeshReview, setRefeshReview] = useState(1);
  React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { review } = useSelector((state: any) => state.review);
  // const apiCalledRef = React.useRef(false);

  React.useEffect(() => {
    // if (!apiCalledRef.current) {
    dispatch(getReview());
    // apiCalledRef.current = true;
    // }
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
  return (
    <>
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        {/* Main Content */}
        <div className="mainCard">
          <div className="flex flex-wrap mb-4">
            <button
              className={`button  px-4 py-3 ${
                activeButton === 1
                  ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                  : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
              }`}
              onClick={() => setActiveButton(1)}
            >
              All
              {/* ({review?.length}) */}
            </button>
            <button
              className={`button px-4 py-3 ${
                activeButton === 2
                  ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                  : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
              }`}
              onClick={() => setActiveButton(2)}
            >
              Not answered({" "}
              {
                review?.filter((review: any) => review.ReviewReplies === null)
                  .length
              }{" "}
              )
            </button>
            <button
              className={`button px-4 py-3 ${
                activeButton === 3
                  ? "active  border-b border-navy-blue text-navy-blue font-medium hover:text-black"
                  : " border-b border-gray-300 text-gray-500 font-medium hover:text-black"
              }`}
              onClick={() => setActiveButton(3)}
            >
              Answered({" "}
              {
                review?.filter((review: any) => review.ReviewReplies != null)
                  .length
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
              className={`button rounded-sm px-4 py-1.5 bg-white border ${
                filterImg === 2
                  ? "active   border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : "  border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(2)}
            >
              5 Star({" "}
              {
                renderedContent?.filter((review: any) => review?.rating === 5)
                  .length
              }{" "}
              )
            </button>
            <button
              className={`button rounded-sm px-4 py-1.5 bg-white border ${
                filterImg === 3
                  ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(3)}
            >
              4 Star({" "}
              {
                renderedContent?.filter((review: any) => review?.rating === 4)
                  .length
              }{" "}
              )
            </button>
            <button
              className={`button rounded-sm px-4 py-1.5 bg-white border ${
                filterImg === 4
                  ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(4)}
            >
              3 Star({" "}
              {
                renderedContent?.filter((review: any) => review?.rating === 3)
                  .length
              }{" "}
              )
            </button>{" "}
            <button
              className={`button rounded-sm px-4 py-1.5 bg-white border ${
                filterImg === 5
                  ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(5)}
            >
              2 Star({" "}
              {
                renderedContent?.filter((review: any) => review?.rating === 2)
                  .length
              }{" "}
              )
            </button>{" "}
            <button
              className={`button rounded-sm px-4 py-1.5 bg-white border ${
                filterImg === 6
                  ? "active  border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : " border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(6)}
            >
              1 Star({" "}
              {
                renderedContent?.filter((review: any) => review?.rating === 1)
                  .length
              }{" "}
              )
            </button>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">List of Items</h1>

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
                        <span className="text-gray-700">{item?.content}</span>
                        <span className="text-gray-500 text-sm">
                          {item?.updated_at &&
                            dayjs(item?.updated_at).format("HH:mm DD/MM/YYYY ")}
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
      </main>
    </>
  );
}

Review.propTypes = {};

export default Review;
