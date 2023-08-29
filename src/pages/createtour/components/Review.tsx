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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Box py={2}>
                <Typography style={{ fontSize: "25px", fontWeight: 600 }}>
                  {formValues?.[8]?.Title?.[0]}
                </Typography>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AiOutlineFieldTime />
                    <Box>
                      <p>Day</p>
                      <p>{formValues?.[4]?.DurationCheckIn?.[0]?.no}</p>
                    </Box>
                    -
                    <Box>
                      <p>Night</p>
                      <p>{formValues?.[4]?.DurationCheckIn?.[1]?.no} </p>
                    </Box>
                  </div>
                  <div className="flex items-center">
                    <GrCapacity />
                    <div className="block">
                      <p>Capacity</p>
                      <p>{formValues?.[5]?.Capacity}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaLocationDot />
                  <div className="block">
                    <p> location</p>
                    <p>
                      {formValues?.[3]?.Location?.map(
                        (location: { id: number; value: string }) => (
                          <Typography>{location?.value}</Typography>
                        )
                      )}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="block">
                  <p>{formValues?.[8]?.Title?.[1]}</p>
                </div>
                <div className="flex">
                  <div className="block">
                    <p>From</p>
                    <p>₫&nbsp;{formValues?.[6]?.Adults}</p>
                    <p>per adult</p>
                  </div>
                  <div className="block">
                    <p>From</p>
                    <p>₫&nbsp;{formValues?.[6]?.Children}</p>
                    <p>per children</p>
                  </div>
                </div>
              </Box>
              <hr />
              <div className="flex items-center">
                <AiOutlineSelect />
                <div className="block">
                  <p>typetour</p>
                  <p>{formValues?.[0]?.TypeTour?.title}</p>
                </div>
              </div>
              <div className="flex items-center">
                <AiOutlineFileText />
                <div className="block">
                  <p>accomType</p>
                  <p>{formValues?.[0]?.TypeTour?.description}</p>
                </div>
              </div>
              <hr />
              <Box>
                <p>Trans</p>
                <Grid container spacing={2}>
                  {formValues?.[1]?.TransportType?.map(
                    (trans: { id: number; title: string; icon: any }) => (
                      <Grid item xs={3}>
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
                          {(trans?.icon)}
                          <p>{trans?.title}</p>
                        </div>
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
              <Box>
                Accom:{" "}
                <Grid container spacing={2}>
                  {formValues?.[2]?.AccomType?.map(
                    (accom: { id: number; title: string; icon: any }) => (
                      <Grid item xs={3}>
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
                          {(accom?.icon)}
                          <Typography>{accom?.title}</Typography>
                        </div>
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
              <hr />
              <Typography>
                Lich trinh: tour
                {formValues?.[8]?.Title?.["2"]?.map(
                  (step: {
                    data: string;
                    fromTime: string;
                    toTime: string;
                    boxes: { data: string; fromTime: string; toTime: string }[];
                  }) => (
                    <div key={step.data}>
                      <Typography>
                        {step.boxes.map((box) => (
                          <div key={box.data}>
                            <Typography>Data: {box.data}</Typography>
                            <Typography>From Time: {box.fromTime}</Typography>
                            <Typography>To Time: {box.toTime}</Typography>
                          </div>
                        ))}
                      </Typography>
                    </div>
                  )
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </BannerContentReview>
    </BannerContainer>
  );
};

export default Review;

