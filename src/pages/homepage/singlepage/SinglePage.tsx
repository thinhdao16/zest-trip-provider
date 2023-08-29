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
  Tab,
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
import Header from "../../../components/header/Header";
import { useDispatch } from "react-redux";
import { fetchTourDetail } from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";
function SinglePage() {
  const [value, setValue] = React.useState("1");
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams();

  const tourDetail = useSelector((state: any) => state.tour.tourGetDetail);
  console.log(tourDetail)
  // console.log(tourDetail);
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  // Add an event listener to handle browser back navigation
  useEffect(() => {
    dispatch(fetchTourDetail(index));
  }, [index]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Header />
      <BannerContainer>
        <BannerContent>
          <BannerHomePageListFirst>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                <Link
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center" }}
                  color="inherit"
                  href="/"
                >
                  <AiFillHome sx={{ mr: 0.5 }} fontSize="inherit" />
                  MUI
                </Link>
                <Link
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center" }}
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  <AiFillHome sx={{ mr: 0.5 }} fontSize="inherit" />
                  Core
                </Link>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  color="text.primary"
                >
                  <AiFillHome sx={{ mr: 0.5 }} fontSize="inherit" />
                  Breadcrumb
                </Typography>
              </Breadcrumbs>
            </div>

            <Grid container spacing={0} style={{ maxHeight: "30vư" }}>
              <Grid item xs={5}>
                <img
                  src={tourDetail?.tour_images[0]}
                  alt="alt"
                  style={{
                    width: "34vw",
                    height: "34vw",
                    objectFit: "cover",
                    borderRadius: "25px",
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <BannerHomePageListFirst>
                  <BannerTitle>{tourDetail?.name} </BannerTitle>
                  <BannerTitleExtra>
                    <AiFillStar />
                    <Typography>5,0</Typography> ·{" "}
                    <Typography> 5 rate </Typography>.
                    <Typography>{tourDetail?.location}</Typography>
                  </BannerTitleExtra>
                </BannerHomePageListFirst>{" "}
                <Box
                  style={{
                    display: "flex",
                    margin: "5px 0 10px 0",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  <Typography>${tourDetail?.price}</Typography>
                  <Typography>/adults</Typography>
                </Box>
                <Box style={{ margin: "5px 0 10px 0" }}>
                  <BannerDescription>
                    {tourDetail?.description}
                  </BannerDescription>
                </Box>
                <Box style={{ display: "flex", margin: "5px 0 15px 0 " }}>
                  <Typography>abc</Typography>
                  <Typography>bcd</Typography>
                </Box>
                <Box>
                  <TabContext value={value}>
                    <Box>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        className="tab-list-mui"
                      >
                        <BannerHomePageButtonListTab
                          label="Item One"
                          value="1"
                        />
                        <BannerHomePageButtonListTab
                          label="Duration"
                          value="2"
                        />
                        <BannerHomePageButtonListTab label="Review" value="3" />
                      </TabList>
                    </Box>
                    <Box className="tab-list-data-mui">
                      <TabPanel value="1"></TabPanel>
                      <TabPanel value="2">
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <FiSun />
                          <Typography>
                            Duration_day: {tourDetail?.duration_day}
                          </Typography>
                        </Box>
                        <Box style={{ display: "flex" }}>
                          <FiMoon />
                          <Typography>
                            Duration_night: {tourDetail?.duration_night}
                          </Typography>
                        </Box>
                      </TabPanel>
                      <TabPanel
                        value="3"
                        style={{ maxHeight: "250px", overflowY: "auto" }}
                      >
                        <Card className="mb-1">
                          <CardContent>
                            <Grid container>
                              <Grid item xs={1}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%", // Ensures the div takes the full height of the Grid item
                                  }}
                                >
                                  <img
                                    style={{
                                      borderRadius: "50%",
                                      width: "30px",
                                      height: "30px",
                                    }}
                                    src="https://subscripciones.mylagro.com/hubfs/Imported_Blog_Media/basket-lowres-219x300.jpg"
                                    alt=""
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={9}>
                                <Box style={{ display: "block" }}>
                                  <Typography>dao duc thinh</Typography>
                                  <Rating />
                                </Box>
                              </Grid>
                              <Grid xs={2}>
                                {" "}
                                <Typography style={{ textAlign: "right" }}>
                                  1 day ago
                                </Typography>
                              </Grid>
                            </Grid>
                            <Typography>
                              đặc biệt để khám phá khu vực nông thôn miền Bắc
                              Thái Lan. Ở nơi hoang dã, giữa cánh đồng lúa và
                              cách xa các địa điểm du lịch.
                            </Typography>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent>
                            <Grid container>
                              <Grid xs={1}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%", // Ensures the div takes the full height of the Grid item
                                  }}
                                >
                                  <img
                                    style={{
                                      borderRadius: "50%",
                                      width: "30px",
                                      height: "30px",
                                    }}
                                    src="https://subscripciones.mylagro.com/hubfs/Imported_Blog_Media/basket-lowres-219x300.jpg"
                                    alt=""
                                  />
                                </div>
                              </Grid>
                              <Grid xs={9}>
                                <Box style={{ display: "block" }}>
                                  <Typography>dao duc thinh</Typography>
                                  <Rating />
                                </Box>
                              </Grid>
                              <Grid xs={2}>
                                {" "}
                                <Typography style={{ textAlign: "right" }}>
                                  1 day ago
                                </Typography>
                              </Grid>
                            </Grid>
                            <Typography>
                              đặc biệt để khám phá khu vực nông thôn miền Bắc
                              Thái Lan. Ở nơi hoang dã, giữa cánh đồng lúa và
                              cách xa các địa điểm du lịch.
                            </Typography>
                          </CardContent>
                        </Card>
                      </TabPanel>
                    </Box>
                  </TabContext>
                </Box>
              </Grid>
            </Grid>
          </BannerHomePageListFirst>
        </BannerContent>
      </BannerContainer>
    </>
  );
}

SinglePage.propTypes = {};

export default SinglePage;
