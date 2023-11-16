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
  AiOutlineSwapRight,
} from "react-icons/ai";
import {
  FaCalendarCheck,
  FaLocationDot,
  FaMoneyBillWave,
  FaRegCalendar,
} from "react-icons/fa6";
import { TourTag, VehicleTag } from "../../../components/icon/tour/tag";
import "../styles/createtour.css";

const Review: React.FC = () => {
  const { currentStep, formValues } = useStepContext();
  if (currentStep !== 12) {
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
                <div className="flex flex-col gap-4">
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
                  <hr />
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                      <FaRegCalendar />
                      <span className="font-medium text-lg">Availability</span>
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
                          <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                            <span className="font-medium ">Mon</span>
                            <span>{formValues[5]?.Capacity?.Mon}</span>
                          </div>
                        </Grid>
                      )}

                      {formValues[5]?.Capacity?.Tue && (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                            <span className="font-medium ">Tue</span>
                            <span>{formValues[5]?.Capacity?.Tue}</span>
                          </div>
                        </Grid>
                      )}
                      {formValues[5]?.Capacity?.Wed && (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                            <span className="font-medium ">Wed</span>
                            <span>{formValues[5]?.Capacity?.Wed}</span>
                          </div>
                        </Grid>
                      )}

                      {formValues[5]?.Capacity?.Thu && (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                            <span className="font-medium ">Thu</span>
                            <span>{formValues[5]?.Capacity?.Thu}</span>
                          </div>
                        </Grid>
                      )}

                      {formValues[5]?.Capacity?.Fri && (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                            <span className="font-medium ">Fri</span>
                            <span>{formValues[5]?.Capacity?.Fri}</span>
                          </div>
                        </Grid>
                      )}
                      {formValues[5]?.Capacity?.Sat && (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                            <span className="font-medium ">Sat</span>
                            <span>{formValues[5]?.Capacity?.Sat}</span>
                          </div>
                        </Grid>
                      )}
                      {formValues[5]?.Capacity?.Sun && (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                            <span className="font-medium ">Sun</span>
                            <span>{formValues[5]?.Capacity?.Sun}</span>
                          </div>
                        </Grid>
                      )}
                    </Grid>
                    {formValues[5]?.Capacity?.SingleTime && (
                      <>
                        <span className="font-medium mb-0">Single time</span>
                        <div className="grid grid-cols-3 gap-4">
                          {formValues[5]?.Capacity?.SingleTime?.map(
                            (singleTime: { day: string; time: string }) => (
                              <div className="border bg-white border-solid border-gray-300 rounded-lg  shadow-custom-card-mui p-3 flex items-center gap-2">
                                <span className="font-medium ">
                                  {singleTime?.day}
                                </span>
                                <span>{singleTime?.time}</span>
                              </div>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <hr />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 ">
                      <FaCalendarCheck />
                      <span className="font-medium text-lg">
                        Duration CheckIn
                      </span>
                    </div>
                    <div className="relative overflow-x-auto rounded-lg  shadow-custom-card-mui border border-solid border-gray-300">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                          <tr className="border-b border-solid border-gray-200 normal-case font-medium text-black text-base">
                            <th scope="col" className="px-6 py-3 ">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                              Title
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
                                day: number;
                                title: string;
                                boxes: {
                                  data: string;
                                  fromTime: string;
                                  toTime: string;
                                }[];
                              },
                              index: number
                            ) => (
                              <React.Fragment key={index}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    rowSpan={step.boxes.length}
                                  >
                                    Day {step?.day}
                                  </th>
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                                    rowSpan={step.boxes.length}
                                  >
                                    {step?.title}
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
              <Grid item xs={12} sm={6}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-2xl border-l border-gray-300 border-solid bg-white shadow-custom-card-mui p-2 rounded-lg ">
                      {formValues?.[8]?.Title?.[0]}
                    </p>
                    <div className="block ext-2xl border-l border-gray-300 border-solid bg-white shadow-custom-card-mui p-2 rounded-lg  ">
                      <p>{formValues?.[8]?.Title?.[1]}</p>
                    </div>
                    <div className="flex items-center border-l border-solid border-gray-300 bg-white rounded-lg p-2 shadow-custom-card-mui">
                      <AiOutlineFieldTime className="mr-2 " />
                      <div>
                        <p className="font-medium mb-1 text-lg">Duration</p>
                        <p>{formValues?.[4]?.DurationCheckIn?.[0]?.[0]?.no}</p>
                      </div>
                    </div>
                    <div className="flex items-center  border-l border-solid border-gray-300 bg-white rounded-lg p-2 shadow-custom-card-mui">
                      <FaLocationDot className="mr-2" />
                      <div className="block">
                        <p className="font-medium mb-1 text-lg"> location</p>
                        <span className="flex flex-wrap">
                          {formValues[3].Location.address_name},{" "}
                          {formValues[3].Location.address_ward?.full_name},{" "}
                          {formValues[3].Location.address_district?.full_name},{" "}
                          {formValues[3].Location.address_province?.full_name},{" "}
                          {formValues[3].Location.address_country}
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="">
                    <div className="flex items-center mb-3 border-l border-solid border-gray-300 bg-white rounded-lg p-2 shadow-custom-card-mui">
                      <AiOutlineSelect className="mr-2" />
                      <div className="block">
                        <p className="font-medium mb-1 text-lg">Typetour</p>
                        <p>{formValues?.[0]?.TypeTour?.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center border-l border-solid border-gray-300 bg-white rounded-lg p-2 shadow-custom-card-mui">
                      <AiOutlineFileText className="mr-2 w-8" />
                      <div className="block">
                        <p className="font-medium mb-1 text-lg">AccomType</p>
                        <p>{formValues?.[0]?.TypeTour?.description}</p>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div>
                    <div className="mb-3">
                      <div className="flex items-center">
                        <AiFillBulb className="mr-2" />
                        <p className="font-medium mb-1 text-lg">Trans</p>
                      </div>
                      <Grid container spacing={2}>
                        {formValues?.[1]?.TransportType?.map(
                          (trans: { id: number; name: string }, index: any) => (
                            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                              <div
                                key={trans?.id}
                                className="flex items-center bg-white gap-2 border border-gray-300 border-solid rounded-lg p-3 shadow-custom-card-mui"
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
                        <p className="font-medium  mb-1 text-lg">Accom</p>
                      </div>
                      <Grid container spacing={2}>
                        {formValues?.[2]?.AccomType?.map(
                          (accom: { id: number; name: string }, index: any) => (
                            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                              <div
                                key={accom?.id}
                                className="flex bg-white items-center gap-2 border border-gray-300 border-solid rounded-lg p-3 shadow-custom-card-mui"
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

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 ">
                      <FaMoneyBillWave />
                      <span className="font-medium text-lg">Ticket</span>
                    </div>
                    {formValues?.[6]?.ticket?.map(
                      (
                        ticket: {
                          max: number;
                          min: number;
                          type: string;
                          role: string;
                          ageStart: number;
                          ageEnd: number;
                          price_range: {
                            id: number;
                            numberOfPeople: number;
                            numberOfPeopleAfter: number;
                            payoutPerPerson: number;
                            retailPrice: number;
                          }[];
                        },
                        index: number
                      ) => (
                        <div
                          className="flex flex-col gap-2 p-4 shadow-custom-card-mui border border-solid border-gray-300 bg-white rounded-lg "
                          key={index}
                        >
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">
                                {ticket?.type}
                              </span>
                              <div className="flex justify-between text-gray-500 gap-1 text-sm">
                                <span>Min: {ticket?.min}</span>•
                                <span>Max: {ticket?.max}</span>
                              </div>
                            </div>
                            <button className=" text-sm font-medium flex items-center rounded-lg text-navy-blue border  px-1 border-navy-blue h-8">
                              {ticket?.role}
                            </button>
                          </div>
                          <div className="flex justify-between font-medium">
                            <div className="flex flex-col">
                              <span className="text-gray-500">From Age</span>
                              <span className="text-navy-blue">
                                {ticket?.ageStart}
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-gray-500">To Age</span>
                              <span className="text-navy-blue">
                                {ticket?.ageEnd}
                              </span>
                            </div>
                          </div>
                          <hr />
                          <div className="flex flex-wrap gap-2">
                            {ticket?.price_range?.map((price) => (
                              <div className="flex items-center gap-1 px-1 border border-solid border-gray-300 text-sm text-gray-500 rounded-md">
                                <span>From: {price?.numberOfPeople}</span>•
                                <span>to: {price?.numberOfPeopleAfter}</span>
                                <AiOutlineSwapRight />
                                <span>{price?.retailPrice}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
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
