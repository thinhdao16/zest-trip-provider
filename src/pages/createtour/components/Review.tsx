import React from "react";
import {
  BannerContainer,
  BannerContentReview,
  CreateDescription,
  CreateTitleNullDes,
  TitleCardOptions,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiOutlineFieldTime } from "react-icons/ai";
import { GrCapacity } from "react-icons/gr";
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

                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box style={{ display: "flex" }}>
                    <AiOutlineFieldTime /> Day :{" "}
                    {formValues?.[4]?.DurationCheckIn?.[0]?.no} - Night :{" "}
                    {formValues?.[4]?.DurationCheckIn?.[1]?.no}{" "}
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <GrCapacity />{" "}
                    <Typography>
                      Capacity :{formValues?.[5]?.Capacity}
                    </Typography>
                  </Box>
                </Box>
                <Typography>des: {formValues?.[8]?.Title?.[1]}</Typography>
                <Typography>Adults :{formValues?.[6]?.Adults}</Typography>
                <Typography>Children : {formValues?.[6]?.Children}</Typography>
                <Box style={{ display: "flex" }}></Box>
              </Box>

              <hr />
              <Typography>
                typetour: {formValues?.[0]?.TypeTour?.title}
              </Typography>
              <Typography>
                accomType:{formValues?.[0]?.TypeTour?.description}
              </Typography>
              <hr />
              <Box>
                Trans:
                {formValues?.[1]?.TransportType?.map(
                  (trans: { id: number; title: string; icon: any }) => (
                    <Box>
                      <Typography>{trans?.title}</Typography>
                    </Box>
                  )
                )}
              </Box>
              <Box>
                Accom:{" "}
                {formValues?.[2]?.AccomType?.map(
                  (accom: { id: number; title: string; icon: any }) => (
                    <Box>
                      <Typography>{accom?.title}</Typography>
                    </Box>
                  )
                )}
              </Box>
              <hr />
              <Box>
                Location:{" "}
                {formValues?.[3]?.Location?.map(
                  (location: { id: number; value: string }) => (
                    <Typography>{location?.value}</Typography>
                  )
                )}
              </Box>
              <Box>
                <Typography>
                  total:{" "}
                  {formValues?.[4]?.DurationCheckIn?.[0]?.no +
                    formValues?.[4]?.DurationCheckIn?.[1]?.no}
                </Typography>
              </Box>
              <hr />
              <Box></Box>
              <hr />
              <Typography>
                Lich trinh:
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
