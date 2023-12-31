import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";
import { FaRegPenToSquare } from "react-icons/fa6";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { editTicketAvailability } from "../../../store/redux/silce/tourSlice";
import { DataContext } from "../../../store/dataContext/DataContext";
import { message } from "antd";
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
const EditAvailability = (dataAvailability: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { setRefeshTour } = useContext(DataContext);
  const [availability, setAvailability] = useState<any>(
    dataAvailability?.dataAvailability
  );
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setDataWeekChoose] = useState<any>([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseCancel = () => {
    setOpen(false);
  };

  function getDayName(day: number) {
    switch (day) {
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
      case 7:
        return "Saturday";
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
  const handleEditAvailability = () => {
    const avaibility_data = availability?.map((availabilityItem: any) => {
      return {
        id: availabilityItem?.id,
        name: availabilityItem?.name,
        validity_date_range_from: dayjs(
          availabilityItem?.validity_date_range_from
        ).format("YYYY-MM-DD"),
        validity_date_range_to: dayjs(
          availabilityItem?.validity_date_range_to
        ).format("YYYY-MM-DD"),
        tour_id: availabilityItem?.tour_id,
        specialDates: availabilityItem?.special_dates?.map(
          (specialItem: any) => ({
            date: specialItem?.date,
            timeSlot: specialItem?.timeSlot,
          })
        ),
        weekdays: availabilityItem?.weekdays?.map((weekday: any) => ({
          day: weekday?.day,
          timeSlot: weekday?.timeSlot,
        })),
      };
    });
    console.log(avaibility_data);

    avaibility_data.forEach((availabilityItem: any) => {
      dispatch(editTicketAvailability(availabilityItem)).then((response) => {
        if (editTicketAvailability.fulfilled.match(response)) {
          setRefeshTour((prev) => !prev);
          message.success("Edit success!");
          setOpen(false);
        }
      });
    });
  };

  const shouldDisableDateInRanges = (date: any) => {
    const disableDate = availability;

    if (disableDate) {
      for (const range of disableDate) {
        const disabledStartDate = dayjs(range?.validity_date_range_from).format(
          "YYYY-MM-DD"
        );
        const disabledEndDate = dayjs(range?.validity_date_range_to).format(
          "YYYY-MM-DD"
        );
        const formattedDate = date.format("YYYY-MM-DD");

        if (
          (formattedDate >= disabledStartDate &&
            formattedDate <= disabledEndDate) ||
          (formattedDate >= disabledEndDate &&
            formattedDate <= disabledStartDate)
        ) {
          return true; // Ngày nằm trong khoảng, trả về true (disable)
        }
      }
    }

    // Ngày không nằm trong bất kỳ khoảng nào, trả về false (mở ra)
    return false;
  };

  // Hàm kiểm tra ngày có bị disable theo chỉ số currentIndex trong TourAvailability hay không
  const shouldDisableDateByIndex = (currentIndex: number) => (date: any) => {
    const disableDate = availability;
    if (disableDate && currentIndex >= 0 && currentIndex < disableDate.length) {
      const range = disableDate[currentIndex];
      const disabledStartDate = dayjs(range?.validity_date_range_from).format(
        "YYYY-MM-DD"
      );
      const disabledEndDate = dayjs(range?.validity_date_range_to).format(
        "YYYY-MM-DD"
      );
      const formattedDate = date.format("YYYY-MM-DD");
      if (
        formattedDate >= disabledStartDate &&
        formattedDate <= disabledEndDate
      ) {
        return false;
      }
    }

    // Ngày không nằm trong khoảng, trả về true (mở ra)
    return true;
  };

  // Hàm tổng cộng điều kiện từ cả hai hàm
  const shouldDisableDateCombined = (currentIndex: number) => (date: any) => {
    return (
      shouldDisableDateInRanges(date) &&
      shouldDisableDateByIndex(currentIndex)(date)
    );
  };

  const handleDateChange = (
    newDate: any,
    availabilityIndex: any,
    field: string
  ) => {
    const selectedDate = dayjs(newDate);
    const updatedAvailabilitySpecialDate = availability?.map(
      (availabilityItem: any, sIndex: any) => {
        if (sIndex !== availabilityIndex) {
          return availabilityItem;
        } else {
          return {
            ...availabilityItem,
            [field]: dayjs(selectedDate).format("YYYY-MM-DD"),
          };
        }
      }
    );
    setAvailability(updatedAvailabilitySpecialDate);
  };

  useEffect(() => {
    if (availability) {
      const updatedDataWeekChoose = avaWeekdays.map((weekDay) => {
        const matchingAvailability = availability.find((avail: any) =>
          avail.weekdays.some((day: any) => day.day === weekDay.day)
        );

        if (!matchingAvailability) {
          return {
            day: weekDay.day,
            timeSlot: "10:00",
          };
        } else if (matchingAvailability.weekdays.length === 1) {
          const otherDays = avaWeekdays.filter(
            (day) => day.day !== weekDay.day
          );
          return otherDays.map((day) => ({ day: day.day, timeSlot: "10:00" }));
        }

        return null;
      });

      const filteredDataWeekChoose = updatedDataWeekChoose
        .flat()
        .filter((day) => day !== null);

      setDataWeekChoose(filteredDataWeekChoose);
    }
  }, [availability]);

  return (
    <div>
      <button className="flex items-center gap-1" onClick={handleOpen}>
        <FaRegPenToSquare className="w-4 h-4 shadow-custom-card-mui" /> Edit
        Availability
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        onClose={handleCloseCancel}
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
                          <div>
                            <span className="font-medium mr-2">Name:</span>
                            <span>{availabilityItem?.name}</span>
                          </div>

                          <p className="font-medium">Valid of this season</p>
                          <div className="grid grid-cols-2 gap-4 ">
                            <div className="flex gap-1 items-center create-tour-valid-date">
                              <span>From</span>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                  components={[
                                    "DatePicker",
                                    "DateTimePicker",
                                    "DateRangePicker",
                                  ]}
                                >
                                  <DemoItem>
                                    <DatePicker
                                      shouldDisableDate={shouldDisableDateCombined(
                                        availabilityIndex
                                      )}
                                      value={
                                        availabilityItem?.validity_date_range_from
                                          ? dayjs(
                                              availabilityItem?.validity_date_range_from
                                            )
                                          : null
                                      }
                                      // minDate={tomorrow}
                                      onChange={(e) =>
                                        handleDateChange(
                                          e,
                                          availabilityIndex,
                                          "validity_date_range_from"
                                        )
                                      }
                                    />
                                  </DemoItem>
                                </DemoContainer>
                              </LocalizationProvider>
                            </div>
                            <div className="flex gap-1 items-center create-tour-valid-date">
                              <span>to</span>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                  components={[
                                    "DatePicker",
                                    "DateTimePicker",
                                    "DateRangePicker",
                                  ]}
                                >
                                  <DemoItem>
                                    <DatePicker
                                      shouldDisableDate={shouldDisableDateCombined(
                                        availabilityIndex
                                      )}
                                      value={
                                        availabilityItem?.validity_date_range_to
                                          ? dayjs(
                                              availabilityItem?.validity_date_range_to
                                            )
                                          : null
                                      }
                                      minDate={dayjs(
                                        availabilityItem?.validity_date_range_from
                                      )}
                                      onChange={(e) =>
                                        handleDateChange(
                                          e,
                                          availabilityIndex,
                                          "validity_date_range_to"
                                        )
                                      }
                                    />
                                  </DemoItem>
                                </DemoContainer>
                              </LocalizationProvider>
                            </div>
                          </div>

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
                              {avaWeekdays
                                .filter(
                                  (avaWeekday) =>
                                    !availabilityItem.weekdays.some(
                                      (weekday: any) =>
                                        weekday.day === avaWeekday.day
                                    )
                                )
                                .map((avaWeekday: any) => {
                                  return (
                                    <div
                                      className="flex items-center gap-1"
                                      key={avaWeekday.day}
                                    >
                                      <div
                                        className="flex gap-1 shadow-custom-card-mui bg-gray-300 border border-solid border-gray-300 rounded-md text-sm px-2 py-1 text-gray-500"
                                        onClick={() => {
                                          handleAddDetailWeekday(
                                            availabilityIndex,
                                            {
                                              day: avaWeekday?.day,
                                              timeSlot: "10:00",
                                            }
                                          );
                                        }}
                                      >
                                        <span>
                                          Add {getDayName(avaWeekday?.day)}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="font-medium">Special dates</span>
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
                                      className="border border-gray-300 rounded-md px-2 text-gray-500"
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
                              <div className="flex items-center  w-44 rounded-md pl-2 bg-gray-300">
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
                          <hr className="my-2 bg-black" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div
                className="flex gap-5 absolute bottom-0 bg-white w-full justify-center p-4 rounded-b-xl border border-solid border-gray-200"
                style={{ marginBottom: "-1px" }}
              >
                <button
                  className="px-6 py-2 bg-gray-300 rounded-md text-gray-600 font-medium"
                  onClick={handleCloseCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-navy-blue rounded-md text-white font-medium"
                  onClick={handleEditAvailability}
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

export default EditAvailability;
