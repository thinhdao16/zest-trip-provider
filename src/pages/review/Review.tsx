import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Index";
import { DataContext } from "../../store/dataContext/DataContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useSelector } from "react-redux";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { Rating } from "@mui/material";
import SpringModal from "./SpringModal";

function Review() {
  const sidebarToggle = useOutletContext() as () => void;
  const [activeButton, setActiveButton] = useState(1);
  const [filterImg, setFilterImg] = useState(1);

  const { refeshTour } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  React.useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch, refeshTour]);
  const renderComponent = () => {
    let content;
    switch (activeButton) {
      case 1:
        content = tours;
        break;
      case 2:
        content = tours?.filter(
          (tour: any) => tour.TourAvailability.length > 0
        );
        break;
      case 3:
        content = tours?.filter((tour: any) => tour.TicketPricing.length > 0);
        break;
      default:
        content = null;
    }
    return content;
  };
  const renderedContent = renderComponent();
  const renderComponentChoose = () => {
    let content;
    switch (filterImg) {
      case 1:
        content = renderedContent;
        break;
      case 2:
        content = renderedContent?.filter(
          (tour: any) => tour?.tour_images?.length > 2
        );
        break;
      case 3:
        content = renderedContent?.filter(
          (tour: any) => tour?.tag_id?.length > 0
        );
        break;
      default:
        content = null;
    }
    return content;
  };
  const renderedContentChoose = renderComponentChoose();

  return (
    <>
      <Navbar toggle={sidebarToggle} />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        {/* Main Content */}
        <div className="mainCard">
          <div className="flex flex-wrap gap-2">
            <button
              className={`button ${
                activeButton === 1
                  ? "active rounded-lg px-4 py-1.5 bg-white border border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : "rounded-lg px-4 py-1.5 bg-white border border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setActiveButton(1)}
            >
              Tour ({tours?.length})
            </button>
            <button
              className={`button ${
                activeButton === 2
                  ? "active rounded-lg px-4 py-1.5 bg-white border border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : "rounded-lg px-4 py-1.5 bg-white border border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setActiveButton(2)}
            >
              TourAvailability
              {
                tours?.filter((tour: any) => tour.TourAvailability.length > 0)
                  .length
              }
            </button>
            <button
              className={`button ${
                activeButton === 3
                  ? "active rounded-lg px-4 py-1.5 bg-white border border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : "rounded-lg px-4 py-1.5 bg-white border border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setActiveButton(3)}
            >
              ticket(
              {
                tours?.filter((tour: any) => tour.TicketPricing.length > 0)
                  .length
              }
              )
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`button ${
                filterImg === 1
                  ? "active rounded-lg px-4 py-1.5 bg-white border border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : "rounded-lg px-4 py-1.5 bg-white border border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(1)}
            >
              Tour ({renderedContent?.length})
            </button>
            <button
              className={`button ${
                filterImg === 2
                  ? "active rounded-lg px-4 py-1.5 bg-white border border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : "rounded-lg px-4 py-1.5 bg-white border border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(2)}
            >
              Image ^ 2.
              {
                renderedContent?.filter(
                  (tour: any) => tour?.tour_images?.length > 2
                ).length
              }
            </button>
            <button
              className={`button ${
                filterImg === 3
                  ? "active rounded-lg px-4 py-1.5 bg-white border border-navy-blue text-navy-blue font-medium hover:bg-navy-blue hover:text-white"
                  : "rounded-lg px-4 py-1.5 bg-white border border-gray-300 text-gray-500 font-medium hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => setFilterImg(3)}
            >
              tag_id (
              {
                renderedContent?.filter((tour: any) => tour.tag_id.length > 0)
                  .length
              }
              )
            </button>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">List of Items</h1>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-12 bg-gray-300 rounded-lg p-2 font-medium">
              <div className="col-span-4 text-center">Infomation product</div>
              <div className="col-span-6 text-center">Rate person</div>
              <div className="col-span-2 text-center">action</div>
            </div>
            <div className="flex flex-col gap-3">
              {renderedContentChoose?.map((item: any, index: number) => (
                <div
                  key={index}
                  className=" bg-white rounded-lg shadow-custom-card-mui border border-solid border-gray-200 "
                >
                  <div className="flex justify-between px-4 py-2 bg-gray-200">
                    <div className="font-medium flex gap-1">
                      Buyer:{" "}
                      <img
                        className="w-6 h-6 rounded-full object-cover"
                        alt="wait"
                        src="https://png.pngtree.com/png-vector/20190413/ourmid/pngtree-img-file-document-icon-png-image_935399.png"
                      />
                      <span className="font-normal text-gray-500">
                        dao duc thinh
                      </span>
                    </div>
                    <div className="font-medium flex gap-1">
                      ID product:
                      <span className="font-normal text-gray-500">
                        {item?.id}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 ">
                    <div className="col-span-4 p-4 ">
                      <div className="flex gap-2">
                        <img
                          className="w-12 h-12 object-cover rounded-lg"
                          alt="wait"
                          src={item?.tour_images[0]}
                        />
                        <div className="flex flex-col gap-2">
                          <span className="font-medium">{item?.name}</span>
                          <div className="flex flex-wrap gap-1">
                            {item?.TicketPricing?.map(
                              (ticket: any, index: number) => (
                                <React.Fragment key={index}>
                                  {ticket?.price_range?.map(
                                    (price: any, index: number) => (
                                      <div
                                        key={index}
                                        className="border border-solid border-gray-300 px-1 rounded-md text-sm text-gray-500 flex gap-1"
                                      >
                                        <span>from: {price?.from_amount}</span>
                                        <span>to: {price?.to_amount}</span>
                                        <p>-</p>
                                        <p>{price?.price}</p>
                                      </div>
                                    )
                                  )}
                                </React.Fragment>
                              )
                            )}
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 border-l p-4 border-solid border-gray-200 rounded-bl-lg">
                      <div className="flex flex-col gap-2">
                        <Rating
                          name="half-rating-read"
                          defaultValue={4}
                          precision={0.5}
                          readOnly
                        />
                        <span>
                          đươpvpfdựnqopdvjwqjdjợpđjjợpnd jwjopd ưdj ưdị ư d ựd
                          ựd ựd
                        </span>
                        <img
                          className="w-12 h-12  rounded-lg object-cover"
                          alt="wait"
                          src="https://static.thenounproject.com/png/777906-200.png"
                        />
                        <span className="text-gray-500 text-sm">
                          18:57 18/10/2023
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 border-l p-4 border-solid border-gray-200 rounded-bl-lg text-center">
                      <SpringModal data={item} />
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
