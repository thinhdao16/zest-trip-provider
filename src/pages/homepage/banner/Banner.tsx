import { Box, Card, Fade, Grid, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BannerContainer,
  BannerContent,
  BannerHomePageList,
  BannerTitleList,
} from "../../../styles/homepage/banner/banner";
import React from "react";
import {
  DescriptionCardOptions,
  TitleCardOptions,
} from "../../../styles/createtour/createtour";
import ModalDetail from "./detail/ModalDetail";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTours } from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";

import { BannerHomePageButtonListTab } from '../../../styles/homepage/banner/banner';
export default function Banner() {
  const [value, setValue] = React.useState("1");
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  console.log(tours);
  React.useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleFormSubmit = () => {
    console.log("first");
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const SamplePrevArrow = (props: any) => (
    <div {...props} className="slick-arrow slick-prev">
      Previous
    </div>
  );

  const SampleNextArrow = (props: any) => (
    <div {...props} className="slick-arrow slick-next">
      Next
    </div>
  );

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />, // Customize or use default arrows
    nextArrow: <SampleNextArrow />, // Customize or use default arrows
  };

  const index = "abd2";
  return (
    <BannerContainer>
      <BannerContent>
        {/* <BannerHomePageListFirst>
          <BannerTitle variant="h6">Welcome back , Dao</BannerTitle>
        </BannerHomePageListFirst> */}
        <BannerHomePageList>
          <Box textAlign={"center"} mb={8}>
            <p style={{fontSize:"40px",}}>Wellcome Back</p>
            <Box style={{padding:"4px 12px" ,backgroundColor:"black", display:"inline-block" ,borderRadius:"0 0 4px 4px"}}></Box>
          </Box>
          <Box style={{ marginBottom: "36px", display:"flex" }}>
            <Box style={{ flexGrow: 1 }}>
              <BannerTitleList variant="subtitle1">
                All tour of you
              </BannerTitleList>
            </Box>
            <Box style={{ flexGrow: 1, textAlign: "right" }}>
              <Typography variant="subtitle1">all tour(0)</Typography>
            </Box>
          </Box>
          <Box
            justifyContent="center"
            alignItems="center"
            gap={2}
            marginBottom={1}
            marginTop={2}
          >
            <TabContext value={value}>
              <Box sx={{}}>
                <TabList className="tab-list-mui"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <BannerHomePageButtonListTab  label="Sap tra phong (0)" value="1" />
                  <BannerHomePageButtonListTab  label="Item Two" value="2" />
                  <BannerHomePageButtonListTab  label="Item Three" value="3" />
                
                </TabList>
              </Box>
              <Box className="tab-list-data-mui">
                <TabPanel value="1">
                  <Grid container spacing={2}>
                    <Grid item xs={3} onClick={handleModalOpen}>
                      <Card>
                        <Slider {...carouselSettings}>
                          <div>
                            <img
                              style={{ width: "100%" }}
                              src="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              style={{ width: "100%" }}
                              src="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720"
                              alt=""
                            />
                          </div>
                        </Slider>
                        <TitleCardOptions>vietnam, saigon</TitleCardOptions>
                        <DescriptionCardOptions mt={1}>
                          abc
                        </DescriptionCardOptions>
                        <DescriptionCardOptions mt={1}>
                          bcd
                        </DescriptionCardOptions>
                        <DescriptionCardOptions mt={1}>
                          bcd
                        </DescriptionCardOptions>
                      </Card>
                    </Grid>
                    <ModalDetail
                      open={modalOpen}
                      onClose={handleModalClose}
                      onSubmit={handleFormSubmit}
                    />
                    {/* Add more Grid items for content under TabPanel value="1" */}
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  {/* <TransitionGroup component={Grid} container spacing={2}> */}
                  <Grid container spacing={5}>
                    <Grid item xs={4}>
                      <Link to={`/${index}`} key={index}>
                        {/* Wrap your Card in a Fade transition */}
                        {/* <Fade in={value === index} timeout={500}> */}
                        <Card style={{ boxShadow: "none" }}>
                          <img
                            style={{ width: "100%", borderRadius: "25px" }}
                            src="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720"
                            alt=""
                          />
                          <Box style={{ margin: "32px 0 40px" }}>
                            <Box
                              style={{
                                background: "#8fcaf7",
                                padding: "4px 7px",
                                borderRadius: "12px",
                                display: "inline-block",
                                fontSize: "18px",
                                color: "#4F4F4F",
                                margin: "0 0 0.7rem 0",
                              }}
                            >
                              <p>các loại của tour</p>
                            </Box>

                            <Box>
                              <p
                                style={{
                                  color: "#091f44",
                                  fontSize: "24px",
                                  lineHeight: "1.5",
                                  margin: "8px 0 16px 0",
                                }}
                              >
                                title tour and bla bla bla bla bla bla bla bla
                              </p>
                            </Box>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: 300,
                                opacity: "0.8",
                                paddingBottom: "8px",
                              }}
                            >
                              Es una realidad que la inflación está afectando a
                              la economía global y eso no deja al sector...
                            </p>
                            <Box>
                              <p style={{ fontSize: "16px", fontWeight: 300 }}>
                                $200.000vnd
                              </p>
                            </Box>
                          </Box>
                        </Card>
                        {/* </Fade> */}
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Link to={`/${index}`} key={index}>
                        {/* Wrap your Card in a Fade transition */}
                        {/* <Fade in={value === index} timeout={500}> */}
                        <Card style={{ boxShadow: "none" }}>
                          <img
                            style={{ width: "100%", borderRadius: "25px" }}
                            src="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720"
                            alt=""
                          />
                          <Box style={{ margin: "32px 0 40px" }}>
                            <Box
                              style={{
                                background: "#8fcaf7",
                                padding: "4px 7px",
                                borderRadius: "12px",
                                display: "inline-block",
                                fontSize: "18px",
                                color: "#4F4F4F",
                                margin: "0 0 0.7rem 0",
                              }}
                            >
                              <p>các loại của tour</p>
                            </Box>

                            <Box>
                              <p
                                style={{
                                  color: "#091f44",
                                  fontSize: "24px",
                                  lineHeight: "1.5",
                                  margin: "8px 0 16px 0",
                                }}
                              >
                                title tour and bla bla bla bla bla bla bla bla
                              </p>
                            </Box>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: 300,
                                opacity: "0.8",
                                paddingBottom: "8px",
                              }}
                            >
                              Es una realidad que la inflación está afectando a
                              la economía global y eso no deja al sector...
                            </p>
                            <Box>
                              <p style={{ fontSize: "16px", fontWeight: 600 }}>
                                $200.000vnd
                              </p>
                            </Box>
                          </Box>
                        </Card>
                        {/* </Fade> */}
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Link to={`/${index}`} key={index}>
                        {/* Wrap your Card in a Fade transition */}
                        {/* <Fade in={value === index} timeout={500}> */}
                        <Card style={{ boxShadow: "none" }}>
                          <img
                            style={{ width: "100%", borderRadius: "25px" }}
                            src="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720"
                            alt=""
                          />
                          <Box style={{ margin: "32px 0 40px" }}>
                            <Box
                              style={{
                                background: "#8fcaf7",
                                padding: "4px 7px",
                                borderRadius: "12px",
                                display: "inline-block",
                                fontSize: "18px",
                                color: "#4F4F4F",
                                margin: "0 0 0.7rem 0",
                              }}
                            >
                              <p>các loại của tour</p>
                            </Box>

                            <Box>
                              <p
                                style={{
                                  color: "#091f44",
                                  fontSize: "24px",
                                  lineHeight: "1.5",
                                  margin: "8px 0 16px 0",
                                }}
                              >
                                title tour and bla bla bla bla bla bla bla bla
                              </p>
                            </Box>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: 300,
                                opacity: "0.8",
                                paddingBottom: "8px",
                              }}
                            >
                              Es una realidad que la inflación está afectando a
                              la economía global y eso no deja al sector...
                            </p>
                            <Box>
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 300,
                                  opacity: 0.4,
                                }}
                              >
                                $200.000vnd
                              </p>
                            </Box>
                          </Box>
                        </Card>
                        {/* </Fade> */}
                      </Link>
                    </Grid>
                  </Grid>
                  {/* Add more Grid items for content under TabPanel value="2" */}
                  {/* </TransitionGroup> */}
                </TabPanel>
                <TabPanel value="3">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Card>
                        <img
                          style={{ width: "100%" }}
                          src="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720"
                          alt=""
                        />
                        <Typography>Content for Tab 3</Typography>
                      </Card>
                    </Grid>
                    {/* Add more Grid items for content under TabPanel value="3" */}
                  </Grid>
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </BannerHomePageList>
      </BannerContent>
    </BannerContainer>
  );
}
