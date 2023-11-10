import { Box, Rating } from "@mui/material";
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
import { AiFillEdit } from "react-icons/ai";
import { FaMobile } from "react-icons/fa6";
import { LuMoreHorizontal } from "react-icons/lu";
import { TourTag, VehicleTag } from "../../../components/icon/tour/tag";

export default function Banner() {
  const [value, setValue] = React.useState("1");
  const { refeshTour } = React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const { tours } = useSelector((state: any) => state.tour);
  console.log(tours);
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
      <div className="p-6 mainCard bg-main container-dashboard rounded-3xl global-scrollbar">
        <div>
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
                  <div className="flex flex-col gap-4">
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
                          <div
                            key={index}
                            className="bg-white shadow-custom-card-mui grid grid-cols-12 p-4 gap-3 "
                          >
                            <div className="col-span-1">
                              <img
                                style={{
                                  width: "75px",
                                  borderRadius: "5px",
                                  objectFit: "cover",
                                  height: "75px",
                                }}
                                src={data?.tour_images[0]}
                                alt="nothing"
                              />
                            </div>

                            <div className="col-span-9 grid gap-2  content-between">
                              <div>
                                <p className="font-medium ">{data.name}</p>
                              </div>
                              <Rating
                                name="half-rating-read"
                                defaultValue={2.5}
                                precision={0.5}
                                readOnly
                              />
                              <div className="flex items-center flex-wrap gap-3 text-sm">
                                {data?.tag_id?.map(
                                  (
                                    dataTag: { name: string },
                                    index: string
                                  ) => (
                                    <button
                                      key={index}
                                      className=" border px-1 rounded-md shadow-custom-card-mui text-navy-blue hover:text-black   flex items-center gap-1"
                                    >
                                      <TourTag
                                        field={dataTag?.name}
                                        style="w-4 h-4"
                                      />
                                      <p>{dataTag?.name}</p>
                                    </button>
                                  )
                                )}
                                <span className="w-0.5 h-5 bg-gray-300 rounded-full"></span>
                                {data?.vehicle_id?.map(
                                  (
                                    dataVehicle: { name: string },
                                    index: string
                                  ) => (
                                    <button
                                      key={index}
                                      className=" border px-1 rounded-md shadow-custom-card-mui text-navy-blue hover:text-black  flex items-center gap-1"
                                    >
                                      <VehicleTag
                                        field={dataVehicle?.name}
                                        style="w-4 h-4"
                                      />
                                      <p>{dataVehicle?.name}</p>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="flex gap-2 justify-between">
                                <div>
                                  <button
                                    type="button"
                                    className={`text-sm px-1 rounded-sm ${
                                      data?.status === "PUBLISHED"
                                        ? "bg-green-300 text-green-900"
                                        : "bg-red-300 text-red-900"
                                    }`}
                                  >
                                    {data?.status}
                                  </button>
                                </div>

                                <div className="flex flex-col gap-3 ">
                                  <button>
                                    <LuMoreHorizontal />
                                  </button>
                                  <button>
                                    <Link to={`/${data?.id}`} key={data?.id}>
                                      <AiFillEdit />
                                    </Link>
                                  </button>
                                  <button>
                                    <FaMobile />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <></>
                    )}
                  </div>
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
