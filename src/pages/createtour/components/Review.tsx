import React from "react";
import {
  BannerContainer,
  BannerContentReview,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Grid } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  AiFillBulb,
  AiOutlineFieldTime,
  AiOutlineFileText,
  AiOutlineSelect,
} from "react-icons/ai";
import { FaCalendarCheck, FaLocationDot, FaRegCalendar } from "react-icons/fa6";
import { TourTag, VehicleTag } from "../../../components/icon/tour/tag";
import "../styles/createtour.css";

const Review: React.FC = () => {
  const { currentStep, formValues } = useStepContext();

  if (currentStep !== 11) {
    return null;
  }
  return (
    <BannerContainer className="global-scrollbar">
      <div className="flex items-center justify-center w-full">
        <BannerContentReview>
          <CreateTitleNullDes>Review your tour</CreateTitleNullDes>
          <CreateDescription>
            Below is the information that we will display to guests. Make sure
            everything is okay.
          </CreateDescription>
          <Box>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Carousel className="createTourReviewImg">
                  {formValues?.[7]?.Media?.map(
                    (
                      data: { file: any; id: number; url: string },
                      index: number
                    ) => (
                      <div key={index}>
                        <img src={data?.url} alt={`Image ${index}`} />
                      </div>
                    )
                  )}
                </Carousel>
                <hr className="mb-6" />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <FaRegCalendar />
                    <span className="font-medium">Availability</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">From:</span>
                    <span>{formValues[5]?.Capacity?.DateFrom}</span>
                    <span className="font-medium">to:</span>
                    <span>{formValues[5]?.Capacity?.DateTo}</span>
                  </div>
                  <Grid container spacing={2}>
                    {formValues[5]?.Capacity?.Mon && (
                      <Grid item xs={6} sm={6} md={4} lg={3}>
                        <div className="border bg-white border-solid border-gray-500 rounded-xl shadow-custom-card-mui p-3 flex items-center gap-2">
                          <span className="font-medium text-lg">Mon</span>
                          <span>{formValues[5]?.Capacity?.Mon}</span>
                        </div>
                      </Grid>
                    )}

                    {formValues[5]?.Capacity?.Tue && (
                      <Grid item xs={6} sm={6} md={4} lg={3}>
                        <div className="border bg-white border-solid border-gray-500 rounded-xl shadow-custom-card-mui p-3 flex items-center gap-2">
                          <span className="font-medium text-lg">Tue</span>
                          <span>{formValues[5]?.Capacity?.Tue}</span>
                        </div>
                      </Grid>
                    )}
                    {formValues[5]?.Capacity?.Wed && (
                      <Grid item xs={6} sm={6} md={4} lg={3}>
                        <div className="border bg-white border-solid border-gray-500 rounded-xl shadow-custom-card-mui p-3 flex items-center gap-2">
                          <span className="font-medium text-lg">Wed</span>
                          <span>{formValues[5]?.Capacity?.Wed}</span>
                        </div>
                      </Grid>
                    )}

                    {formValues[5]?.Capacity?.Thu && (
                      <Grid item xs={6} sm={6} md={4} lg={3}>
                        <div className="border bg-white border-solid border-gray-500 rounded-xl shadow-custom-card-mui p-3 flex items-center gap-2">
                          <span className="font-medium text-lg">Thu</span>
                          <span>{formValues[5]?.Capacity?.Thu}</span>
                        </div>
                      </Grid>
                    )}

                    {formValues[5]?.Capacity?.Fri && (
                      <Grid item xs={6} sm={6} md={4} lg={3}>
                        <div className="border bg-white border-solid border-gray-500 rounded-xl shadow-custom-card-mui p-3 flex items-center gap-2">
                          <span className="font-medium text-lg">Fri</span>
                          <span>{formValues[5]?.Capacity?.Fri}</span>
                        </div>
                      </Grid>
                    )}
                    {formValues[5]?.Capacity?.Sat && (
                      <Grid item xs={6} sm={6} md={4} lg={3}>
                        <div className="border bg-white border-solid border-gray-500 rounded-xl shadow-custom-card-mui p-3 flex items-center gap-2">
                          <span className="font-medium text-lg">Sat</span>
                          <span>{formValues[5]?.Capacity?.Sat}</span>
                        </div>
                      </Grid>
                    )}
                    {formValues[5]?.Capacity?.Sun && (
                      <Grid item xs={6} sm={6} md={4} lg={3}>
                        <div className="border bg-white border-solid border-gray-500 rounded-xl shadow-custom-card-mui p-3 flex items-center gap-2">
                          <span className="font-medium text-lg">Sun</span>
                          <span>{formValues[5]?.Capacity?.Sun}</span>
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-2xl ">
                      {formValues?.[8]?.Title?.[0]}
                    </p>
                    <div className="block  ">
                      <p>{formValues?.[8]?.Title?.[1]}</p>
                    </div>
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center">
                        <AiOutlineFieldTime className="mr-2 " />
                        <div>
                          <p className="font-medium mb-1">Duration</p>
                          <p>
                            {formValues?.[4]?.DurationCheckIn?.[0]?.[0]?.no}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center ">
                        <FaLocationDot className="mr-2" />
                        <div className="block">
                          <p className="font-medium mb-1"> location</p>
                          <div>{formValues?.[3]?.Location}</div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>

                  <hr />
                  <div className="">
                    <div className="flex items-center justify-between">
                      <div className="block">
                        <p>From</p>
                        <div className="flex">
                          <p className="font-medium">₫&nbsp;</p>
                          <p className="font-bold text-xl">
                            {formValues?.[6]?.Adults}
                          </p>
                        </div>
                        <p>per adult</p>
                      </div>
                      <div className="block">
                        <p>From</p>
                        <div className="flex">
                          <p className="font-medium">₫&nbsp;</p>
                          <p className="font-bold text-xl">
                            {formValues?.[6]?.Children}
                          </p>
                        </div>
                        <p>per children</p>
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>

                  <hr />
                  <div className="">
                    <div className="flex items-center mb-3">
                      <AiOutlineSelect className="mr-2" />
                      <div className="block">
                        <p className="font-medium mb-1">Typetour</p>
                        <p>{formValues?.[0]?.TypeTour?.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <AiOutlineFileText className="mr-2" />
                      <div className="block">
                        <p className="font-medium mb-1">AccomType</p>
                        <p>{formValues?.[0]?.TypeTour?.description}</p>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div>
                    <div className="mb-3">
                      <div className="flex items-center">
                        <AiFillBulb className="mr-2" />
                        <p className="font-medium mb-1">Trans</p>
                      </div>
                      <Grid container spacing={2}>
                        {formValues?.[1]?.TransportType?.map(
                          (trans: { id: number; name: string }, index: any) => (
                            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                              <div
                                key={trans?.id}
                                className="flex items-center bg-white gap-2 border border-gray-400 border-solid rounded-lg p-3 shadow-custom-card-mui"
                              >
                                <VehicleTag
                                  field={trans?.name}
                                  style="w-8 h-8"
                                />
                                <p>{trans?.name}</p>
                              </div>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </div>
                    <div>
                      <div className="flex items-center ">
                        <AiFillBulb className="mr-2" />
                        <p className="font-medium  mb-1">Accom</p>
                      </div>
                      <Grid container spacing={2}>
                        {formValues?.[2]?.AccomType?.map(
                          (accom: { id: number; name: string }, index: any) => (
                            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                              <div
                                key={accom?.id}
                                className="flex bg-white items-center gap-2 border border-gray-400 border-solid rounded-lg p-3 shadow-custom-card-mui"
                              >
                                <TourTag field={accom?.name} style="w-8 h-8" />
                                <p>{accom?.name}</p>
                              </div>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </div>
                  </div>

                  <hr />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <FaCalendarCheck />
                      <span className="font-medium">Duration CheckIn</span>
                    </div>
                    <div className="relative overflow-x-auto rounded-xl shadow-custom-card-mui border border-solid border-gray-400">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                          <tr className="border-b border-solid border-gray-200 normal-case font-medium text-black text-base">
                            <th scope="col" className="px-6 py-3 ">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                              From Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                              To Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {formValues[4]?.DurationCheckIn?.["1"]?.map(
                            (
                              step: {
                                data: string;
                                fromTime: string;
                                toTime: string;
                                boxes: {
                                  data: string;
                                  fromTime: string;
                                  toTime: string;
                                }[];
                              },
                              index: any
                            ) => (
                              <React.Fragment key={index}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    rowSpan={step.boxes.length} // Số hàng con bên dưới
                                  >
                                    day {index + 1}
                                  </th>
                                  <td className="px-6 py-2">
                                    {step.boxes[0]?.fromTime}
                                  </td>
                                  <td className="px-6 py-2">
                                    {step.boxes[0]?.toTime}
                                  </td>
                                  <td className="px-6 py-2">
                                    {step.boxes[0]?.data}
                                  </td>
                                </tr>
                                {step.boxes.slice(1).map((box, boxIndex) => (
                                  <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={boxIndex}
                                  >
                                    <td className="px-6 py-2">
                                      {box?.fromTime}
                                    </td>
                                    <td className="px-6 py-2">{box?.toTime}</td>
                                    <td className="px-6 py-2">{box?.data}</td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </BannerContentReview>
      </div>
    </BannerContainer>
  );
};

export default Review;
