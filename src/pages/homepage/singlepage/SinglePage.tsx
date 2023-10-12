import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BannerTitle } from "../../../styles/homepage/banner/banner";
import {
  BannerDescription,
  BannerHomePageListFirst,
  BannerTitleExtra,
} from "../../../styles/singlepage/singlepage";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import {
  BannerContainer,
  BannerContent,
  BannerHomePageButtonListTab,
} from "../../../styles/global/StyleGlobal";
import { useSelector } from "react-redux";
import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchTourDetail } from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";
import { Carousel } from "react-responsive-carousel";
import { StateTour } from "../../createtour/types/index.t";
import Header from "./Header";
import NavBar from "./NavBar";
import ScreenMain from "./ScreenMain";

// interface tourDetail{
//   tour_images:[],
//   name:string,
//   location:string,
//   price:string,
//   description:string,
//   duration_day:string,
//   duration_night:string
// }

function SinglePage() {
  const dispatch: AppDispatch = useDispatch();

  const { index }: any = useParams();

  useEffect(() => {
    dispatch(fetchTourDetail(index));
  }, [dispatch, index]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className="h-[100vh]">
      {/* <Header />
      <Grid container className="py-4  h-[87.2vh]">
        <Grid item xs={12} sm={6} md={3}>
          <NavBar />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <ScreenMain />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="bg-slate-50 rounded-xl">
          kjhgfd
        </Grid>
      </Grid> */}

      <div>
        <div
          className={`fixed h-20  w-64 z-10 ${
            isSidebarOpen ? "bg-white top-0" : " bottom-0"
          }`}
        >
          <Header />
        </div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          onClick={toggleSidebar}
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
        {isSidebarOpen && (
          <button
            onClick={closeSidebar}
            className="fixed top-0 left-0 z-40 p-3 text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M19.293 5.293a1 1 0 00-1.414-1.414L10 13.586 1.707 5.293a1 1 0 00-1.414 1.414L8.586 15 0.293 23.293a1 1 0 001.414 1.414L10 16.414l8.293 8.293a1 1 0 001.414-1.414L13.414 15l8.293-8.293a1 1 0 000-1.414z"
              />
            </svg>
          </button>
        )}
        <aside
          id="default-sidebar"
          className={`fixed left-0 z-10 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0 top-24" : "-translate-x-full top-0 "
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 global-scrollbar">
            <NavBar />
          </div>
        </aside>
        <div className={`p-4  sm:ml-64 ${isSidebarOpen ? "pt-24" : "top-0"}`}>
          <ScreenMain />
        </div>
      </div>
    </div>
  );
}

SinglePage.propTypes = {};

export default SinglePage;
