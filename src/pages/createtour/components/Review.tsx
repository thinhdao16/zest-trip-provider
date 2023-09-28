import React, { useState } from "react";
import {
  BannerContainer,
  BannerContentReview,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  AiFillBulb,
  AiOutlineFieldTime,
  AiOutlineFileText,
  AiOutlineSelect,
} from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { TourTag, VehicleTag } from "../../../components/icon/tour/tag";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export interface Ilist {
  id: number;
  descriptions: string;
}

export const listFrameword: Ilist[] = [
  {
    id: -1,
    descriptions: "Selects...",
  },
  {
    id: 1,
    descriptions: "React",
  },
  {
    id: 2,
    descriptions: "Angular",
  },
  {
    id: 3,
    descriptions: "Vuejs",
  },
];

const Review: React.FC = () => {
  const { currentStep, formValues } = useStepContext();

  const [dataForm, setDataForm] = useState<{
    dateFrom: Date | null;
    dateTo: Date | null;
    selected: string | number;
  }>({
    dateFrom: new Date(),
    dateTo: new Date(),
    selected: -1,
  });

  const handleFiler = () => alert(JSON.stringify(dataForm));

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
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <Card elevation={1}>
              * <div>{JSON.stringify(dataForm)}</div>
              <CardContent>
                <div className="text-start">
                  <h1>Date Picker</h1>
                </div>

                <Grid direction="row" container spacing={2} my={2.5}>
                  <Grid item xs={12} sm={12} xl={3} lg={3}>
                    <DatePicker
                      disableFuture
                      label="Date From"
                      value={dataForm.dateFrom}
                      onChange={(newValue) => {
                        setDataForm({ ...dataForm, dateFrom: newValue });
                      }}
                      renderInput={(params: any) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} xl={3} lg={3}>
                    <DatePicker
                      disableFuture
                      label="Date To"
                      minDate={dataForm.dateFrom}
                      value={dataForm.dateTo}
                      onChange={(newValue) => {
                        setDataForm({ ...dataForm, dateTo: newValue });
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} xl={3} lg={3}>
                    <Button variant="contained" fullWidth onClick={handleFiler}>
                      Filter
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    xl={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                  >
                    <h4>{dayjs(dataForm.dateFrom).format("DD/MM/YYYY")}</h4>
                    <h4>{dayjs(dataForm.dateTo).format("DD/MM/YYYY")}</h4>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </LocalizationProvider> */}
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
                <p className="font-medium text-2xl mb-3">
                  {formValues?.[8]?.Title?.[0]}
                </p>
                <div className="block  mb-3">
                  <p>{formValues?.[8]?.Title?.[1]}</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <AiOutlineFieldTime className="mr-2 " />
                    <div>
                      <p className="font-medium mb-1 text-lg">Duration</p>
                      <p>{formValues?.[4]?.DurationCheckIn?.[0]?.[0]?.no}</p>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <FaLocationDot className="mr-2" />
                    <div className="block">
                      <p className="font-medium mb-1 text-lg"> location</p>
                      <div>{formValues?.[3]?.Location}</div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>

              <hr />
              <div className="my-5">
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
                      (trans: { id: number; name: string }, index: any) => (
                        <Grid item xs={3} key={index}>
                          <div
                            key={trans?.id}
                            className="flex items-center gap-2 border border-gray-400 border-solid rounded-md p-3 shadow-custom-card-mui"
                          >
                            <VehicleTag field={trans?.name} style="w-8 h-8" />
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
                    <p className="font-medium text-lg mb-1">Accom</p>
                  </div>
                  <Grid container spacing={2}>
                    {formValues?.[2]?.AccomType?.map(
                      (accom: { id: number; name: string }, index: any) => (
                        <Grid item xs={3} key={index}>
                          <div
                            key={accom?.id}
                            className="flex items-center gap-2 border border-gray-400 border-solid rounded-md p-3 shadow-custom-card-mui"
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
