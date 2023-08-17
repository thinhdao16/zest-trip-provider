import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BannerContainer,
  BannerContent,
  BannerTitle,
} from "../../../styles/homepage/banner/banner";
import {
  BannerDescription,
  BannerHomePageListFirst,
  BannerTitleExtra,
  BannerTitleList,
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

function SinglePage() {
  const [value, setValue] = React.useState("1");
  const { index } = useParams();

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  // Add an event listener to handle browser back navigation
  useEffect(() => {
    const handleBackNavigation = (event: any) => {
      console.log("Navigated back from SinglePage");
      // You can add your custom action here
    };

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <BannerContainer>
      <BannerContent>
        <BannerHomePageListFirst>
        <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb:1}}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <AiFillHome sx={{ mr: 0.5 }} fontSize="inherit" />
          MUI
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <AiFillHome sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <AiFillHome sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
      
    </div>
  
          <Grid container spacing={0} style={{ maxHeight: "30vư" }}>
            {/* Add spacing prop here */}
            <Grid item xs={5}>
              {/* Add item prop here */}
              <img
                src="https://a0.muscache.com/im/pictures/ae441b77-ba8a-4cb3-b4b1-647b6376d776.jpg?im_w=1200"
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
                <BannerTitle>
                  Thưởng thức thiên nhiên trong nhà chứa/nhà tre độc đáo
                </BannerTitle>
                <BannerTitleExtra>
                  <AiFillStar />
                  <Typography>5,0</Typography>·<Typography>5 rate</Typography>.
                  <Typography>Vietnam</Typography>
                </BannerTitleExtra>
              </BannerHomePageListFirst>{" "}
              <Box style={{ display: "flex" , margin:"5px 0 10px 0"}}>
                <Typography>$120</Typography>
                <Typography>/adults</Typography>
              </Box>
              <Box>
                <BannerDescription>
                  Một cơ hội đặc biệt để khám phá khu vực nông thôn miền Bắc
                  Thái Lan. Ở nơi hoang dã, giữa cánh đồng lúa và cách xa các
                  địa điểm du lịch. Chỗ ở này nằm ở vị trí lý tưởng giữa hai địa
                  điểm tham quan phổ biến, Chiang Mai và Pai.f
                  </BannerDescription>
              </Box>
              <Box style={{ display: "flex" }}>
                <Typography>abc</Typography>
                <Typography>bcd</Typography>
              </Box>
              <Box>
                <TabContext value={value}>
                  <Box>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Item One" value="1" />
                      <Tab label="Item Two" value="2" />
                      <Tab label="Review" value="3" />
                    </TabList>
                  </Box>
                  <Box>
                    <TabPanel value="1"></TabPanel>
                    <TabPanel value="2">
                      {/* <TransitionGroup component={Grid} container spacing={2}> */}

                      {/* Add more Grid items for content under TabPanel value="2" */}
                      {/* </TransitionGroup> */}
                    </TabPanel>
                    <TabPanel value="3" style={{maxHeight:"250px", overflowY:"auto"}}>
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
                            đặc biệt để khám phá khu vực nông thôn miền Bắc Thái
                            Lan. Ở nơi hoang dã, giữa cánh đồng lúa và cách xa
                            các địa điểm du lịch.
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
                            đặc biệt để khám phá khu vực nông thôn miền Bắc Thái
                            Lan. Ở nơi hoang dã, giữa cánh đồng lúa và cách xa
                            các địa điểm du lịch.
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
                            đặc biệt để khám phá khu vực nông thôn miền Bắc Thái
                            Lan. Ở nơi hoang dã, giữa cánh đồng lúa và cách xa
                            các địa điểm du lịch.
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
  );
}

SinglePage.propTypes = {};

export default SinglePage;
