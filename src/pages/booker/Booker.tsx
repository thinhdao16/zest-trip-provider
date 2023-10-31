/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Index";
import { DataContext } from "../../store/dataContext/DataContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useSelector } from "react-redux";
import { fetchTours } from "../../store/redux/silce/tourSlice";
import { Rating } from "@mui/material";
import { getReview } from "../../store/redux/silce/reviewSlice";
import dayjs from "dayjs";

function Booker() {
  const sidebarToggle: any = useOutletContext() as () => void;
  const [activeButton, setActiveButton] = useState(1);
  const [filterImg, setFilterImg] = useState(1);

  const { refeshTour } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  const { review } = useSelector((state: any) => state.review);
  const apiCalledRef = React.useRef(false);

  React.useEffect(() => {
    if (!apiCalledRef.current) {
      dispatch(fetchTours());
      dispatch(getReview());
      apiCalledRef.current = true;
    }
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <Navbar />

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
              TourAvailabilitys
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
          <div className="bg-white p-4 relative">
            <button className="top-4 absolute right-4">abc</button>
            <span>búabd</span>
          </div>
        </div>
      </main>
    </>
  );
}

export default Booker;
