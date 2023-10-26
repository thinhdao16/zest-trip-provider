import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "white",
};

const ModalTourScheDetail = ({
  dataScheDetail: { schedule, setSchedule },
}: {
  dataScheDetail: { schedule: any; setSchedule: any };
}) => {
  console.log(schedule);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
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
  const handleDeleteDetail = (scheduleIndex: any, detailIndex: any) => {
    const updatedSchedule = schedule?.map((scheduleItem: any, sIndex: any) => {
      if (sIndex !== scheduleIndex) {
        return scheduleItem;
      } else {
        return {
          ...scheduleItem,
          TourScheduleDetail: scheduleItem.TourScheduleDetail.filter(
            (detailItem: any, dIndex: any) => dIndex !== detailIndex
          ),
        };
      }
    });
    setSchedule(updatedSchedule);
  };
  return (
    <div>
      <button onClick={handleOpen}>Open modal</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="h-2/3 overflow-auto">
            {schedule?.map((scheduleItem: any, scheduleIndex: any) => (
              <div key={scheduleIndex}>
                <input
                  type="text"
                  value={scheduleItem.description}
                  onChange={(e) =>
                    updateDescription(scheduleIndex, e.target.value)
                  }
                />
                {scheduleItem?.TourScheduleDetail?.map(
                  (detailItem: any, detailIndex: any) => (
                    <div key={detailItem.id}>
                      <input
                        type="text"
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
                      <input
                        type="time"
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
                      <button
                        onClick={() =>
                          handleDeleteDetail(scheduleIndex, detailIndex)
                        }
                      >
                        Xóa Detail
                      </button>
                    </div>
                  )
                )}
                <button
                  onClick={() => {
                    handleAddDetail(scheduleIndex, {
                      description: "New Detail",
                      from: "00:00",
                      to: "00:00",
                      tour_schedule_id: scheduleItem.id,
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    });
                  }}
                >
                  Thêm Detail
                </button>
              </div>
            ))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTourScheDetail;
