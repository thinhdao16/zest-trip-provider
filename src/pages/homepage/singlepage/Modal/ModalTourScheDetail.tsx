import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FcEmptyTrash } from "react-icons/fc";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 0,
  background: "white",
  borderRadius: "12px",
};

const ModalTourScheDetail = ({
  dataScheDetail: { schedule, setSchedule },
}: {
  dataScheDetail: { schedule: any; setSchedule: any };
}) => {
  const [open, setOpen] = useState(false);

  const [reload, setReload] = useState(1);

  const [scheCancel, setScheCancel] = useState<any>();

  const handleOpen = () => {
    setOpen(true);
    setReload((prev) => ++prev);
  };
  const handleCloseCancel = () => {
    setSchedule();
    setSchedule(scheCancel);
    setOpen(false);
  };
  const handleCloseUpdate = () => {
    setOpen(false);
  };
  const updateDescription = (index: any, newTitle: any) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      description: newTitle,
    };
    setSchedule(updatedSchedule);
  };

  const handleUpdateDetail = (
    newDescription: any,
    newFrom: any,
    newTo: any,
    scheduleIndex: any,
    detailIndex: any
  ) => {
    const updatedSchedule = schedule?.map((scheduleItem: any, sIndex: any) => {
      if (sIndex !== scheduleIndex) {
        return scheduleItem;
      } else {
        return {
          ...scheduleItem,
          TourScheduleDetail: scheduleItem.TourScheduleDetail?.map(
            (detailItem: any, dIndex: any) => {
              if (dIndex !== detailIndex) {
                return detailItem;
              } else {
                return {
                  ...detailItem,
                  description: newDescription,
                  from: newFrom,
                  to: newTo,
                };
              }
            }
          ),
        };
      }
    });
    setSchedule(updatedSchedule);
  };
  const handleAddDetail = (scheduleIndex: any, newDetail: any) => {
    const updatedSchedule = [...schedule];
    const updatedScheduleItem = { ...updatedSchedule[scheduleIndex] };
    const updatedDetails = [...updatedScheduleItem.TourScheduleDetail];
    updatedDetails.push(newDetail);
    updatedScheduleItem.TourScheduleDetail = updatedDetails;
    updatedSchedule[scheduleIndex] = updatedScheduleItem;

    setSchedule(updatedSchedule);
  };
  function getMaxToAmount(schedule: any) {
    let maxToAmount = "00:00";
    schedule.TourScheduleDetail.forEach((scheduleDetail: any) => {
      const toTime = scheduleDetail.to;

      if (toTime && /\d{2}:\d{2}/.test(toTime) && toTime > maxToAmount) {
        maxToAmount = toTime;
      }
    });

    return maxToAmount;
  }

  function addMinuteFromTime(timeString: any) {
    const [hour, minute] = timeString.split(":").map(Number);
    const newMinute = (minute + 1) % 60;
    const newHour = hour + Math.floor((minute + 1) / 60);
    const newTime = `${newHour.toString().padStart(2, "0")}:${newMinute
      .toString()
      .padStart(2, "0")}`;

    return newTime;
  }

  function addMinuteToTime(timeString: any) {
    const [hour, minute] = timeString.split(":").map(Number);
    const newMinute = (minute + 2) % 60;
    const newHour = hour + Math.floor((minute + 2) / 60);
    const newTime = `${newHour.toString().padStart(2, "0")}:${newMinute
      .toString()
      .padStart(2, "0")}`;

    return newTime;
  }

  const handleDeleteDetail = (scheduleIndex: any, detailIndex: any) => {
    const updatedSchedule = schedule?.map((scheduleItem: any, sIndex: any) => {
      if (sIndex !== scheduleIndex) {
        return scheduleItem;
      } else {
        return {
          ...scheduleItem,
          TourScheduleDetail: scheduleItem.TourScheduleDetail.filter(
            (_detailItem: any, dIndex: any) => dIndex !== detailIndex
          ),
        };
      }
    });
    setSchedule(updatedSchedule);
  };
  useEffect(() => {
    setScheCancel(schedule);
  }, [reload]);
  return (
    <div>
      <button>
        <FaRegPenToSquare
          className="absolute top-4 right-4"
          onClick={handleOpen}
        />
      </button>
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
                  <span className=" text-xl font-semibold">Tour Schedule</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-4 min-h-[20vh] max-h-[80vh] overflow-auto global-scrollbar py-16 p-4">
                  {schedule?.map((scheduleItem: any, scheduleIndex: any) => (
                    <div key={scheduleIndex} className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <button className="border-navy-blue border px-2 py-1 rounded-md font-medium text-navy-blue">
                          {scheduleItem?.title}
                        </button>
                        <input
                          className="border-gray-300 border w-2/3 shadow-custom-card-mui text-sm px-2 py-1 rounded-md"
                          type="text"
                          value={scheduleItem.description}
                          onChange={(e) =>
                            updateDescription(scheduleIndex, e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        {scheduleItem?.TourScheduleDetail?.map(
                          (detailItem: any, detailIndex: any) => (
                            <div
                              key={detailItem.id}
                              className="flex justify-between gap-2 items-center"
                            >
                              <input
                                type="time"
                                className="px-2 py-1 border border-gray-300 rounded-lg"
                                value={detailItem.from}
                                onChange={(e) =>
                                  handleUpdateDetail(
                                    detailItem.description,
                                    e.target.value,
                                    detailItem.to,
                                    scheduleIndex,
                                    detailIndex
                                  )
                                }
                              />
                              <input
                                type="time"
                                className="px-2 py-1 border border-gray-300 rounded-lg"
                                value={detailItem.to}
                                onChange={(e) =>
                                  handleUpdateDetail(
                                    detailItem.description,
                                    detailItem.from,
                                    e.target.value,
                                    scheduleIndex,
                                    detailIndex
                                  )
                                }
                              />
                              <input
                                type="text"
                                className="px-2 py-1 border border-gray-300 rounded-lg"
                                value={detailItem.description}
                                onChange={(e) =>
                                  handleUpdateDetail(
                                    e.target.value,
                                    detailItem.from,
                                    detailItem.to,
                                    scheduleIndex,
                                    detailIndex
                                  )
                                }
                              />
                              <FcEmptyTrash
                                onClick={() =>
                                  handleDeleteDetail(scheduleIndex, detailIndex)
                                }
                              />
                            </div>
                          )
                        )}
                        <div className="flex justify-end">
                          <button
                            className="bg-black px-2 py-1 text-white rounded-lg"
                            onClick={() => {
                              const maxToAmount = getMaxToAmount(scheduleItem);
                              console.log(maxToAmount);
                              const toValue =
                                scheduleItem?.TourScheduleDetail.find(
                                  (scheduleDetail: any) =>
                                    scheduleDetail.to === maxToAmount
                                );

                              if (toValue) {
                                const newFrom = addMinuteFromTime(toValue.to);
                                const newTo = addMinuteToTime(toValue.to);

                                handleAddDetail(scheduleIndex, {
                                  description: "New Detail",
                                  from: newFrom,
                                  to: newTo,
                                });
                              } else {
                                console.error("Không tìm thấy giá trị 'to'");
                              }
                            }}
                          >
                            Add Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default ModalTourScheDetail;
