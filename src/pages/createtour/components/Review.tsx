import React from 'react';
import { BannerContainer, BannerContentHaveImage, BannerContentReview, CreateDescription, CreateTitleNullDes, TitleCardOptions } from '../../../styles/createtour/createtour';
import { useStepContext } from '../context/ui/useStepContext';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Review: React.FC = () => {
    const { currentStep, formValues } = useStepContext()
    console.log(formValues)



    if (currentStep !== 11) {
        return null;
    }

    return (
        <BannerContainer>
            <BannerContentReview>
                <CreateTitleNullDes>
                    Review your tour
                </CreateTitleNullDes>
                <CreateDescription>
                    Below is the information that we will display to guests. Make sure everything is okay.
                </CreateDescription>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Carousel>
                                        {formValues?.[7]?.Media?.map((data: { file: any, id: number, url: string }, index: number) => (
                                            <div key={index}>
                                                <img src={data?.url} alt={`Image ${index}`} />
                                            </div>
                                        ))}
                                    </Carousel>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <TitleCardOptions>
                                titile: {formValues?.[8]?.Title?.[0]}
                            </TitleCardOptions>
                            <Typography>
                                des: {formValues?.[8]?.Title?.[1]}
                            </Typography>
                            <hr />
                            <Typography >
                                typetour:  {formValues?.[0]?.TypeTour?.title}
                            </Typography>
                            <Typography>
                                accomType:{formValues?.[0]?.TypeTour?.description}
                            </Typography>
                            <hr />
                            <Box>
                                Trans:
                                {
                                    formValues?.[1]?.TransportType?.map((trans: { id: number, title: string, icon: any }) => (
                                        <Box>
                                            <Typography>{trans?.title}</Typography>
                                        </Box>
                                    ))
                                }
                            </Box>
                            <Box>
                                Accom: {
                                    formValues?.[2]?.AccomType?.map((accom: { id: number, title: string, icon: any }) => (
                                        <Box>
                                            <Typography>{accom?.title}</Typography>
                                        </Box>
                                    ))
                                }
                            </Box>
                            <hr />
                            <Box>
                                Location: {formValues?.[3]?.Location?.map((location: { id: number, value: string }) => (
                                    <Typography>
                                        {location?.value}
                                    </Typography>
                                ))}
                            </Box>
                            <Box>
                                Duration:
                                <Typography>
                                    total:   {formValues?.[4]?.DurationCheckIn?.[0]?.no + formValues?.[4]?.DurationCheckIn?.[1]?.no}
                                </Typography>
                                <Typography>Day {formValues?.[4]?.DurationCheckIn?.[0]?.no}</Typography>
                                <Typography> Night : {formValues?.[4]?.DurationCheckIn?.[1]?.no}</Typography>
                            </Box>
                            <hr />
                            <Box>
                                <Typography>
                                    Capacity :{formValues?.[5]?.Capacity}
                                </Typography>
                                <Typography>
                                    Adults :{formValues?.[6]?.Adults}
                                </Typography>
                                <Typography>
                                    Children : {formValues?.[6]?.Children}
                                </Typography>
                            </Box>
                            <hr />
                            <Typography>
                                Lich trinh:
                                {formValues?.[8]?.Title?.['2']?.map((step: { data: string, fromTime: string, toTime: string, boxes: { data: string, fromTime: string, toTime: string }[] }) => (
                                    <div key={step.data}>
                                        <Typography>
                                            {step.boxes.map((box) => (
                                                <div key={box.data}>
                                                    <Typography>
                                                        Data: {box.data}
                                                    </Typography>
                                                    <Typography>
                                                        From Time: {box.fromTime}
                                                    </Typography>
                                                    <Typography>
                                                        To Time: {box.toTime}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </Typography>
                                    </div>
                                ))}
                            </Typography>


                        </Grid>
                    </Grid>
                </Box>
            </BannerContentReview>
        </BannerContainer>
    )
}

export default Review;
