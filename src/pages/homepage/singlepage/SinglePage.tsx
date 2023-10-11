import React, { useEffect } from "react";
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
  const [value, setValue] = React.useState("1");

  const dispatch: AppDispatch = useDispatch();

  const { index }: any = useParams();

  useEffect(() => {
    dispatch(fetchTourDetail(index));
  }, [dispatch, index]);

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  // Add an event listener to handle browser back navigation

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="h-[100vh]">
      <Header />
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
      </Grid>
    </div>
  );
}

SinglePage.propTypes = {};

export default SinglePage;
