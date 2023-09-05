import React, { ReactNode } from "react";
import {
  BannerContainer,
  BannerContentReview,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  AiFillBulb,
  AiOutlineFieldTime,
  AiOutlineFileText,
  AiOutlineSelect,
} from "react-icons/ai";

import { GrCapacity } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
const Review: React.FC = () => {
  const { currentStep, formValues } = useStepContext();
  if (currentStep !== 11) {
    return null;
  }
  return (
    <BannerContainer>
      <BannerContentReview>
        <CreateTitleNullDes>Review your tour</CreateTitleNullDes>
        <CreateDescription>
          Below is the information that we will display to guests. Make sure
          everything is okay.
        </CreateDescription>
        <Box>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Carousel>
                {formValues?.[7]?.Media?.map(
                  (
                    data: { file: any; id: number; url: string },
                    index: number
                  ) => (
                    <div key={index}>
                      <img
                        src={data?.url}
                        alt={`Image ${index}`}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )
                )}
              </Carousel>
            </Grid>
            <Grid item xs={6}>
              <div className="mb-5">
                <p className="font-medium text-3xl mb-3">
                  {formValues?.[8]?.Title?.[0]}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <AiOutlineFieldTime className="mr-2 " />
                    <div>
                      <p className="font-medium mb-1 text-lg">Day</p>
                      <p>{formValues?.[4]?.DurationCheckIn?.[0]?.no}</p>
                    </div>
                    <p className="font-medium m-2">-</p>
                    <div>
                      <p className="font-medium mb-1 text-lg">Night</p>
                      <p>{formValues?.[4]?.DurationCheckIn?.[1]?.no} </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <GrCapacity className="mr-2" />
                    <div className="block">
                      <p className="font-medium mb-1 text-lg">Capacity</p>
                      <p>{formValues?.[5]?.Capacity}</p>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="flex items-center ">
                  <FaLocationDot className="mr-2" />
                  <div className="block">
                    <p className="font-medium mb-1 text-lg"> location</p>
                    <div>
                      {formValues?.[3]?.Location?.map(
                        (
                          location: { id: number; value: string },
                          index: any
                        ) => (
                          <div key={index}>
                            <p>{location?.value}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="my-5">
                <div className="block font-medium text-lg mb-3">
                  <p>{formValues?.[8]?.Title?.[1]}</p>
                </div>
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
              <div className="my-5">
                <div className="flex items-center mb-3">
                  <AiOutlineSelect className="mr-2" />
                  <div className="block">
                    <p className="font-medium mb-1 text-lg">Typetour</p>
                    <p>{formValues?.[0]?.TypeTour?.title}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <AiOutlineFileText className="mr-2" />
                  <div className="block">
                    <p className="font-medium mb-1 text-lg">AccomType</p>
                    <p>{formValues?.[0]?.TypeTour?.description}</p>
                  </div>
                </div>
              </div>

              <hr />
              <div className="my-5">
                <div className="mb-3">
                  <div className="flex items-center">
                    <AiFillBulb className="mr-2" />
                    <p className="font-medium text-lg mb-1">Trans</p>
                  </div>
                  <Grid container spacing={2}>
                    {formValues?.[1]?.TransportType?.map(
                      (trans: { id: number; title: string; icon: any }, index:any) => (
                        <Grid item xs={3} key={index}>
                          <div
                            key={trans?.id}
                            className="w-fit"
                            style={{
                              padding: "12px",
                              borderRadius: "12px",
                              boxShadow:
                                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                            }}
                          >
                            {trans?.icon}
                            <p>{trans?.title}</p>
                          </div>
                        </Grid>
                      )
                    )}
                  </Grid>
                </div>
                <div>
                  <div className="flex items-center ">
                    <AiFillBulb className="mr-2" />
                    <p className="font-medium text-lg mb-1">Accom</p>
                  </div>
                  <Grid container spacing={2}>
                    {formValues?.[2]?.AccomType?.map(
                      (accom: { id: number; title: string; icon: any },index:any) => (
                        <Grid item xs={3} key={index}>
                          <div
                            className="w-fit"
                            key={accom?.id}
                            style={{
                              padding: "12px",
                              borderRadius: "12px",
                              boxShadow:
                                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                            }}
                          >
                            {accom?.icon}
                            <Typography>{accom?.title}</Typography>
                          </div>
                        </Grid>
                      )
                    )}
                  </Grid>
                </div>
              </div>

              <hr />

              <div className="relative overflow-x-auto my-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
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
                    {formValues?.[8]?.Title?.["2"]?.map(
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
                            <td className="px-6 py-2">{step.boxes[0]?.data}</td>
                          </tr>
                          {step.boxes.slice(1).map((box, boxIndex) => (
                            <tr
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                              key={boxIndex}
                            >
                              <td className="px-6 py-2">{box?.fromTime}</td>
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
            </Grid>
          </Grid>
        </Box>
      </BannerContentReview>
    </BannerContainer>
  );
};

export default Review;
