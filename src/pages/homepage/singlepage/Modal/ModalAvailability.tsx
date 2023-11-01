import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";
import "./modal.css";
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 0,
  background: "white",
  borderRadius: "12px",
  minWidth: "400px",
  maxWidth: "600px",
};
const avaWeekdays = [
  {
    day: 1,
  },
  {
    day: 2,
  },
  {
    day: 3,
  },
  {
    day: 4,
  },
  {
    day: 5,
  },
  {
    day: 6,
  },
  {
    day: 7,
  },
];
const ModalAvailability = ({
  dataAvailability: { availability, setAvailability },
}: {
  dataAvailability: { availability: any; setAvailability: any };
}) => {
  const [open, setOpen] = useState(false);
  const [dataWeekChoose, setDataWeekChoose] = useState<any>([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseCancel = () => {
    setOpen(false);
  };
  const handleCloseUpdate = () => {
    setOpen(false);
  };
  function getDayName(day: number) {
    switch (day) {
      case 1:
        return "Sun";
      case 2:
        return "Mon";
      case 3:
        return "Tue";
      case 4:
        return "Wed";
      case 5:
        return "Thu";
      case 6:
        return "Fri";
      case 7:
        return "Sat";
      default:
        return "Unknown";
    }
  }
  const handleUpdateDetailWeekday = (
    time: any,
    availabilityIndex: any,
    detailIndex: any
  ) => {
    const updatedAvailability = availability?.map(
      (availabilityItem: any, sIndex: any) => {
        if (sIndex !== availabilityIndex) {
          return availabilityItem;
        } else {
          return {
            ...availabilityItem,
            weekdays: availabilityItem.weekdays?.map(
              (detailItem: any, dIndex: any) => {
                if (dIndex !== detailIndex) {
                  return detailItem;
                } else {
                  return {
                    ...detailItem,
                    timeSlot: time,
                  };
                }
              }
            ),
          };
        }
      }
    );
    setAvailability(updatedAvailability);
  };
  const handleAddDetailWeekday = (weekdayIndex: any, newDetail: any) => {
    const updatedWeekday = [...availability];
    const updatedWeekdayItem = { ...updatedWeekday[weekdayIndex] };
    const updatedDetails = [...updatedWeekdayItem.weekdays];
    updatedDetails.push(newDetail);
    updatedWeekdayItem.weekdays = updatedDetails;
    updatedWeekday[weekdayIndex] = updatedWeekdayItem;
    setAvailability(updatedWeekday);
  };
  const handleDeleteWeekday = (avaibilityIndex: any, detailIndex: any) => {
    const updatedWeekday = availability?.map(
      (avaibilityItem: any, sIndex: any) => {
        if (sIndex !== avaibilityIndex) {
          return avaibilityItem;
        } else {
          return {
            ...avaibilityItem,
            weekdays: avaibilityItem.weekdays.filter(
              (_detailItem: any, dIndex: any) => dIndex !== detailIndex
            ),
          };
        }
      }
    );
    setAvailability(updatedWeekday);
  };
  const handleSingleDateChange = (
    newDate: any,
    availabilityIndex: any,
    detailIndex: any
  ) => {
    const selectedDate = dayjs(newDate);
    const updatedAvailabilitySpecialDate = availability?.map(
      (availabilityItem: any, sIndex: any) => {
        if (sIndex !== availabilityIndex) {
          return availabilityItem;
        } else {
          return {
            ...availabilityItem,
            special_dates: availabilityItem.special_dates?.map(
              (detailItem: any, dIndex: any) => {
                if (dIndex !== detailIndex) {
                  return detailItem;
                } else {
                  if (dayjs(detailItem.date).isSame(selectedDate, "day")) {
                    alert("ngày đã tồn tại");
                    return {
                      ...detailItem,
                    };
                  } else {
                    return {
                      ...detailItem,
                      date: dayjs(selectedDate).format("YYYY-MM-DD"),
                    };
                  }
                }
              }
            ),
          };
        }
      }
    );
    setAvailability(updatedAvailabilitySpecialDate);
  };
  const handleSingleDateTimeSlotChange = (
    newTime: any,
    availabilityIndex: any,
    detailIndex: any
  ) => {
    const updatedAvailabilitySpecialDate = availability?.map(
      (availabilityItem: any, sIndex: any) => {
        if (sIndex !== availabilityIndex) {
          return availabilityItem;
        } else {
          return {
            ...availabilityItem,
            special_dates: availabilityItem.special_dates?.map(
              (detailItem: any, dIndex: any) => {
                if (dIndex !== detailIndex) {
                  return detailItem;
                } else {
                  return {
                    ...detailItem,
                    timeSlot: newTime,
                  };
                }
              }
            ),
          };
        }
      }
    );
    setAvailability(updatedAvailabilitySpecialDate);
  };
  const handleAddSingleDate = (singleDateIndex: any, newDate: any) => {
    const updatedSingleDate = [...availability];
    const updatedSingleDateItem = { ...updatedSingleDate[singleDateIndex] };
    const updatedDetails = [...updatedSingleDateItem.special_dates];
    if (
      !updatedDetails.some(
        (detail) => detail.date === dayjs(newDate).format("YYYY-MM-DD")
      )
    ) {
      updatedDetails.push({
        date: dayjs(newDate).format("YYYY-MM-DD"),
        timeSlot: "10:00",
      });
      updatedSingleDateItem.special_dates = updatedDetails;
      updatedSingleDate[singleDateIndex] = updatedSingleDateItem;
      setAvailability(updatedSingleDate);
    } else {
      alert("Ngày đã tồn tại trong special_dates");
    }
  };
  const handleDeleteSingleDate = (avabilityIndex: any, detailIndex: any) => {
    console.log(detailIndex);
    const updatedAvailabilitySpecialDate = availability?.map(
      (avabilityItem: any, sIndex: any) => {
        if (sIndex !== avabilityIndex) {
          return avabilityItem;
        } else {
          return {
            ...avabilityItem,
            special_dates: avabilityItem.special_dates.filter(
              (_detailItem: any, dIndex: any) => dIndex !== detailIndex
            ),
          };
        }
      }
    );
    setAvailability(updatedAvailabilitySpecialDate);
  };
  useEffect(() => {
    if (avaWeekdays && availability) {
      const updatedDataDay = avaWeekdays.filter((dataItem) => {
        const dayExists = availability.some((item: any) => {
          return item.weekdays.some((week: any) => {
            return week.day === dataItem.day;
          });
        });
        return !dayExists;
      });

      setDataWeekChoose(updatedDataDay);
    }
  }, [avaWeekdays, availability]);

  return (
    <div>
      <button onClick={handleOpen}>edit</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="">
            <div className="relative ">
              <div
                className="absolute top-0 bg-white w-full p-4 shadow-custom-59 rounded-t-xl "
                style={{ marginTop: "-1px" }}
              >
                <div className="flex items-center justify-center">
                  <span className=" text-xl font-semibold">Avaibility</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-4 min-h-[20vh] max-h-[80vh] overflow-auto global-scrollbar py-16 p-4">
                  <div>
                    {availability?.map(
                      (availabilityItem: any, availabilityIndex: number) => (
                        <div
                          key={availabilityIndex}
                          className="flex flex-col gap-3"
                        >
                          <div className="flex flex-col gap-2">
                            <span className="font-medium">Weekdays</span>
                            <div className="flex flex-wrap gap-3">
                              {availabilityItem?.weekdays?.map(
                                (
                                  weekday: { day: number; timeSlot: string },
                                  weedayIndex: number
                                ) => (
                                  <div className="flex items-center gap-1">
                                    <div
                                      key={weedayIndex}
                                      className="flex shadow-custom-card-mui gap-1 items-center border border-solid border-gray-300 rounded-md text-sm px-2 py-1 text-gray-500"
                                    >
                                      <span>{getDayName(weekday?.day)}</span>
                                      <input
                                        type="time"
                                        defaultValue={weekday?.timeSlot}
                                        onChange={(e) =>
                                          handleUpdateDetailWeekday(
                                            e.target.value,
                                            availabilityIndex,
                                            weedayIndex
                                          )
                                        }
                                      />
                                    </div>
                                    <FcEmptyTrash
                                      onClick={() =>
                                        handleDeleteWeekday(
                                          availabilityIndex,
                                          weedayIndex
                                        )
                                      }
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {dataWeekChoose?.map(
                                (day: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex gap-1 shadow-custom-card-mui bg-gray-300 border border-solid border-gray-300 rounded-md text-sm px-2 py-1 text-gray-500"
                                    onClick={() => {
                                      handleAddDetailWeekday(
                                        availabilityIndex,
                                        {
                                          day: day?.day,
                                          timeSlot: "10:00",
                                        }
                                      );
                                    }}
                                  >
                                    <span>
                                      Add {getDayName(day?.day)} start
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="font-medium">singleDates</span>
                            {availabilityItem?.special_dates?.map(
                              (
                                specialDateItem: {
                                  date: string;
                                  timeSlot: string;
                                },
                                specialDateIndex: number
                              ) => (
                                <React.Fragment key={specialDateIndex}>
                                  <div className="modal-ava-pick-time flex gap-3 items-center">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DemoContainer
                                        components={[
                                          "DatePicker",
                                          "DateTimePicker",
                                          "DateRangePicker",
                                        ]}
                                      >
                                        <DemoItem>
                                          <DatePicker
                                            value={dayjs(specialDateItem?.date)}
                                            minDate={dayjs(
                                              availabilityItem?.validity_date_range_from
                                            )}
                                            onChange={(e) =>
                                              handleSingleDateChange(
                                                e,
                                                availabilityIndex,
                                                specialDateIndex
                                              )
                                            }
                                            maxDate={dayjs(
                                              availabilityItem?.validity_date_range_to
                                            )}
                                          />
                                        </DemoItem>
                                      </DemoContainer>
                                    </LocalizationProvider>
                                    <input
                                      type="time"
                                      className="border border-gray-300 rounded-lg px-2 text-gray-500"
                                      value={specialDateItem?.timeSlot}
                                      onChange={(e) =>
                                        handleSingleDateTimeSlotChange(
                                          e.target.value,
                                          availabilityIndex,
                                          specialDateIndex
                                        )
                                      }
                                    />
                                    <FcEmptyTrash
                                      onClick={() =>
                                        handleDeleteSingleDate(
                                          availabilityIndex,
                                          specialDateIndex
                                        )
                                      }
                                    />
                                  </div>
                                </React.Fragment>
                              )
                            )}
                            <div className=" modal-ava-add-single-time flex justify-end ">
                              <div className="flex items-center  w-40 rounded-lg px-2 bg-gray-300">
                                <span className="text-gray-500">
                                  Add single date
                                </span>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DemoContainer
                                    components={[
                                      "DatePicker",
                                      "DateTimePicker",
                                      "DateRangePicker",
                                    ]}
                                  >
                                    <DemoItem>
                                      <DatePicker
                                        minDate={dayjs(
                                          availabilityItem?.validity_date_range_from
                                        )}
                                        onChange={(e) =>
                                          handleAddSingleDate(
                                            availabilityIndex,
                                            e
                                          )
                                        }
                                        maxDate={dayjs(
                                          availabilityItem?.validity_date_range_to
                                        )}
                                      />
                                    </DemoItem>
                                  </DemoContainer>
                                </LocalizationProvider>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div
                className="flex gap-5 absolute bottom-0 bg-white w-full justify-center p-4 rounded-b-xl border border-solid border-gray-200"
                style={{ marginBottom: "-1px    " }}
              >
                <button
                  className="px-6 py-2 bg-gray-300 rounded-lg text-gray-600 font-medium"
                  onClick={handleCloseCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-navy-blue rounded-lg text-white font-medium"
                  onClick={handleCloseUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalAvailability;
