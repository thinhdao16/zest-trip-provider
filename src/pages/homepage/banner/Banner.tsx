import { Box, Card, Grid } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchTours,
  updateTourDetail,
} from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";

import { TitlePage } from "../../../components/titlepage/TitlePage";
import {
  BannerContainer,
  BannerContent,
  BannerHomePageButtonListTab,
  BannerHomePageList,
} from "../../../styles/global/StyleGlobal";
import { DontHaveTour } from "../../../components/donthave/DontHaveTour";
import { DataContext } from "../../../store/dataContext/DataContext";

export default function Banner() {
  const [value, setValue] = React.useState("1");
  const { refeshTour } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  React.useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch, refeshTour]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BannerContainer>
      <BannerContent>
        {/* <BannerHomePageListFirst>
          <BannerTitle variant="h6">Welcome back , Dao</BannerTitle>
        </BannerHomePageListFirst> */}
        <BannerHomePageList>
          <TitlePage
            title="Wellcome back"
            titleList="All tour of you"
            rest="all tour (0)"
          />
          <Box
            justifyContent="center"
            alignItems="center"
            gap={2}
            marginBottom={1}
            marginTop={2}
          >
            <TabContext value={value}>
              <Box sx={{}}>
                <TabList
                  className="tab-list-mui"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <BannerHomePageButtonListTab
                    label={`listTour Draft (${tours?.length})`}
                    value="1"
                  />

                  <BannerHomePageButtonListTab label="Item Two" value="2" />
                  <BannerHomePageButtonListTab label="Item Three" value="3" />
                </TabList>
              </Box>
              <Box className="tab-list-data-mui">
                <TabPanel value="1">
                  <Grid container spacing={5}>
                    {tours?.map((data: any, index: any) => (
                      <Grid item xs={4} key={index}>
                        <Link
                          to={`/${data?.id}`}
                          key={data}
                        >
                          {/* Wrap your Card in a Fade transition */}
                          {/* <Fade in={value === index} timeout={500}> */}
                          <Card style={{ boxShadow: "none" }}>
                            <img
                              style={{ width: "100%", borderRadius: "25px" }}
                              src={data?.tour_images[0]}
                              alt="noting"
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
                                <p>Tour in country</p>
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
                                  {data?.name}
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
                                {data?.description}
                              </p>
                              <Box>
                                <p
                                  style={{ fontSize: "16px", fontWeight: 300 }}
                                >
                                  ${data?.price}
                                </p>
                              </Box>
                            </Box>
                          </Card>
                          {/* </Fade> */}
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  {/* <TransitionGroup component={Grid} container spacing={2}> */}
                  <DontHaveTour
                    description=" You don't have any tour created here, please choose another
              category"
                  />
                  {/* Add more Grid items for content under TabPanel value="2" */}
                  {/* </TransitionGroup> */}
                </TabPanel>
                <TabPanel value="3"></TabPanel>
              </Box>
            </TabContext>
          </Box>
        </BannerHomePageList>
      </BannerContent>
    </BannerContainer>
  );
}
