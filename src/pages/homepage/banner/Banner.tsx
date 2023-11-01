import { Box, Card, Grid, Skeleton } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTours } from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";

import { BannerHomePageButtonListTab } from "../../../styles/global/StyleGlobal";
import { DontHaveTour } from "../../../components/donthave/DontHaveTour";
import { DataContext } from "../../../store/dataContext/DataContext";

export default function Banner() {
  const [value, setValue] = React.useState("1");
  const { refeshTour } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  const apiCalledRef = React.useRef(false);
  React.useEffect(() => {
    if (!apiCalledRef.current) {
      dispatch(fetchTours());
      apiCalledRef.current = true;
    }
  }, [dispatch, refeshTour]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <div className="mt-8">
      <div className="  p-6 mainCard bg-main container-dashboard rounded-3xl global-scrollbar">
        <div>
          {/* <TitlePage
            title="Welcome back"
            titleList="All tour of you"
            rest={`All tour bookings (${tours.length})`}
          /> */}
          <Box
            justifyContent="center"
            alignItems="center"
            gap={2}
            marginBottom={1}
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
                    {tours.length > 0 ? (
                      Array.isArray(tours) &&
                      [...tours]
                        .sort((a, b) => {
                          return (
                            new Date(b?.updated_at).getTime() -
                            new Date(a?.updated_at).getTime()
                          );
                        })
                        .map((data: any, index: number) => (
                          <Grid item xs={12} sm={6} lg={4} key={index}>
                            <Link to={`/${data?.id}`} key={data?.id}>
                              <Card
                                style={{
                                  boxShadow: "none",
                                  background: "#f8fafc",
                                }}
                              >
                                {data?.tour_images[0] ? (
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "25px",
                                      objectFit: "cover",
                                      height: "235px",
                                    }}
                                    src={data?.tour_images[0]}
                                    alt="nothing"
                                  />
                                ) : (
                                  <Skeleton
                                    variant="rectangular"
                                    height={200}
                                    animation="wave"
                                  />
                                )}
                                <Box style={{ margin: "10px 0 40px" }}>
                                  <div>
                                    <p className="font-medium text-xl">
                                      {data ? (
                                        data.name
                                      ) : (
                                        <Skeleton width={200} />
                                      )}
                                    </p>
                                  </div>
                                  <p>
                                    {data ? (
                                      data.description
                                    ) : (
                                      <Skeleton
                                        variant="rectangular"
                                        height={200}
                                        animation="wave"
                                      />
                                    )}
                                  </p>
                                  <div>
                                    {data ? (
                                      // `vnđ ${data.price}`
                                      <p className="font-medium flex items-center">
                                        <span className="text-gray-600">
                                          vnđ
                                        </span>
                                        <span className="text-lg">250.000</span>
                                      </p>
                                    ) : (
                                      <Skeleton width={60} />
                                    )}
                                  </div>
                                  {data?.tag_id?.map(
                                    (
                                      dataTag: { name: string },
                                      index: string
                                    ) => (
                                      <button
                                        key={index}
                                        className="  text-navy-blue hover:text-black font-medium rounded-lg mr-2"
                                      >
                                        <p>#{dataTag?.name}</p>
                                      </button>
                                    )
                                  )}
                                </Box>
                              </Card>
                            </Link>
                          </Grid>
                        ))
                    ) : (
                      <Grid item xs={12} sm={6} lg={4}>
                        <Card style={{ boxShadow: "none" }}>
                          <Skeleton
                            variant="rectangular"
                            height={200}
                            animation="wave"
                            className="rounded-3xl"
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
                              <Skeleton width={100} />
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
                                <Skeleton width={200} className="rounded-2xl" />
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
                              <Skeleton
                                variant="rectangular"
                                height={50}
                                animation="wave"
                                className="rounded-lg"
                              />
                            </p>
                            <Box>
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 300,
                                }}
                              >
                                <Skeleton width={60} className="rounded-3xl" />
                              </p>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    )}
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
        </div>
      </div>
    </div>
  );
}
