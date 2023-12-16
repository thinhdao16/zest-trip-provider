import React, { useState } from "react";
import {
  BannerContainer,
  BannerContent,
  CreateChooseContent,
  CreateDescription,
  CreateDurationContent,
  CreateKnotHidden,
  CreateKnotPre,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Card, Typography } from "@mui/material";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { dataTypeDuration } from "../dataFake";
import FormModal from "./Title/FormModal";
import { FaCircle, FaTrashCan } from "react-icons/fa6";
export interface BoxData {
  data: string;
  fromTime: string;
  toTime: string;
}
interface NestedData {
  boxes: BoxData[];
  title: string;
  day: number;
}
const DurationCheckIn: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [dataDuration, setDataDuration] = useState(dataTypeDuration);

  const [modalOpen, setModalOpen] = useState(false);
  const [nestedDataArray, setNestedDataArray] = useState<NestedData[]>([]);
  const [day, setDay] = useState<number | undefined>(undefined);

  const maxNumber = Math.max(dataDuration[0]?.no, dataDuration[1]?.no);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (boxes: BoxData[], title: string, day: number) => {
    const newNestedData: NestedData = {
      boxes: boxes,
      title: title,
      day: day,
    };
    setNestedDataArray((prevData) => [...prevData, newNestedData]);
  };

  const handleIncrement = (id: number) => {
    const updatedData = dataDuration.map((item) =>
      item.id === id ? { ...item, no: item.no + 1 } : item
    );
    setDataDuration(updatedData);
  };
  const handleDecrement = (id: number) => {
    const updatedData = dataDuration.map((item) =>
      item.id === id && item.no > 0 ? { ...item, no: item.no - 1 } : item
    );
    setDataDuration(updatedData);
  };
  const handleRemove = (index: number) => {
    const updatedNestedDataArray = [...nestedDataArray];
    updatedNestedDataArray.splice(index, 1);
    setNestedDataArray(updatedNestedDataArray);
  };

  const handleUpdateSchedule = (
    nestedIndex: number,
    boxIndex: number,
    newData: BoxData
  ) => {
    setNestedDataArray((prevData) =>
      prevData.map((nestedData, index) =>
        index === nestedIndex
          ? {
              ...nestedData,
              boxes: nestedData.boxes.map((box, bIndex) =>
                bIndex === boxIndex ? newData : box
              ),
            }
          : nestedData
      )
    );
  };

  const handleAddBoxForDay = (nestedIndex: number) => {
    const newBox: BoxData = {
      data: "Desctiption",
      fromTime: "00:00",
      toTime: "00:00",
    };

    setNestedDataArray((prevData) =>
      prevData.map((nestedData, index) =>
        index === nestedIndex
          ? { ...nestedData, boxes: [...nestedData.boxes, newBox] }
          : nestedData
      )
    );
  };

  const handleDeleteBox = (nestedIndex: number, boxIndex: number) => {
    const updatedNestedDataArray = [...nestedDataArray];
    updatedNestedDataArray[nestedIndex].boxes.splice(boxIndex, 1);
    setNestedDataArray(updatedNestedDataArray);
  };

  React.useEffect(() => {
    updateFormValues(4, {
      DurationCheckIn: [dataDuration, nestedDataArray],
    });

    let maxDay = 0; // Initialize maxDay with 0

    nestedDataArray?.forEach((data) => {
      if (data?.day) {
        const dayValue = Number(data.day);
        if (!isNaN(dayValue)) {
          maxDay = Math.max(maxDay, dayValue);
        }
      }
    });

    if (maxDay === 0) {
      setDay(1);
    } else {
      setDay(maxDay + 1);
    }
  }, [dataDuration, nestedDataArray]);

  if (currentStep !== 8) {
    return null;
  }

  return (
    <BannerContainer className="global-scrollbar">
      <div className="mt-4">
        <div className="flex items-center justify-center h-full">
          <BannerContent>
            <CreateTitleNullDes>
              Share some basic information about the time
            </CreateTitleNullDes>
            <CreateDescription>
              Your address is only shared with guests after they have
              successfully.
            </CreateDescription>
            <div className="flex items-center gap-1">
              <p className="font-medium mb-1 text-lg">Duration</p>
              {(dataDuration[0]?.no - dataDuration[1]?.no) *
                (dataDuration[0]?.no - dataDuration[1]?.no) >
                1 && (
                <span className="text-xs text-red-500">
                  * Day and night cannot differ by more than 1
                </span>
              )}
              {dataDuration[0]?.no + dataDuration[1]?.no === 0 && (
                <span className="text-xs text-red-500">
                  * Please duration day or night cannot both be 0
                </span>
              )}
            </div>

            {dataDuration.map((data) => (
              <CreateDurationContent key={data?.id}>
                <div className="flex flex-1 justify-between items-center border-b border-solid border-gray-400 p-3 rounded hover:border-navy-blue  ">
                  <Typography>{data?.title}</Typography>
                  <div>
                    <CreateChooseContent key={data?.id}>
                      {data?.no > 0 ? (
                        <CreateKnotPre onClick={() => handleDecrement(data.id)}>
                          <GoNoEntry />
                        </CreateKnotPre>
                      ) : (
                        <CreateKnotHidden>
                          <GoNoEntry />
                        </CreateKnotHidden>
                      )}
                      <Typography sx={{ marginX: 2 }}>{data?.no}</Typography>
                      <CreateKnotPre onClick={() => handleIncrement(data?.id)}>
                        <GoPlusCircle />
                      </CreateKnotPre>
                    </CreateChooseContent>
                  </div>
                </div>
              </CreateDurationContent>
            ))}
            <div className="mt-4">
              <div className="flex items-center gap-1">
                <p className="font-medium mb-1 text-lg">Tour Schedule</p>
                {(dataDuration[0]?.no - dataDuration[1]?.no) *
                  (dataDuration[0]?.no - dataDuration[1]?.no) >
                  1 ||
                  (nestedDataArray?.length < maxNumber && (
                    <span className="text-xs text-red-500">
                      * Plase add schedule {maxNumber} day
                    </span>
                  ))}
                {nestedDataArray?.length > maxNumber && (
                  <span className="text-xs text-red-500">
                    * Tour schedule has exceeded the allowed duration (
                    {maxNumber})
                  </span>
                )}
              </div>

              {nestedDataArray?.length > 0 ? (
                <Card className="p-7 border border-gray-400 border-solid">
                  <div>
                    <div className="gap-4 grid">
                      {nestedDataArray.map((data, index) => (
                        <div key={`nested_${index}`}>
                          <div className="flex gap-3">
                            <div className="">
                              <div className="flex gap-4 items-center">
                                <button className="font-medium p-2 bg-navy-blue text-white rounded-lg h-10 w-16">
                                  Day {data?.day}
                                </button>

                                <span className="font-medium text-navy-blue flex flex-wrap">
                                  {data?.title}
                                </span>

                                {index === nestedDataArray.length - 1 && (
                                  <div className="flex items-center">
                                    <FaTrashCan
                                      onClick={() => handleRemove(index)}
                                    />
                                  </div>
                                )}
                              </div>

                              {data.boxes.map((box, boxIndex) => (
                                <div
                                  key={`box_${boxIndex}`}
                                  className="relative mt-3"
                                >
                                  <FaCircle className="absolute inset-y-1/3 w-2" />
                                  <div className="pl-5 pr-7">
                                    <div className="flex font-medium text-gray-700">
                                      <input
                                        type="time"
                                        value={box?.fromTime}
                                        onChange={(e) =>
                                          handleUpdateSchedule(
                                            index,
                                            boxIndex,
                                            {
                                              ...box,
                                              fromTime: e.target.value,
                                            }
                                          )
                                        }
                                      />
                                      -{" "}
                                      <input
                                        type="time"
                                        value={box?.toTime}
                                        onChange={(e) =>
                                          handleUpdateSchedule(
                                            index,
                                            boxIndex,
                                            {
                                              ...box,
                                              toTime: e.target.value,
                                            }
                                          )
                                        }
                                      />
                                      <button
                                        className="text-red-500 ml-4"
                                        onClick={() =>
                                          handleDeleteBox(index, boxIndex)
                                        }
                                      >
                                        <FaTrashCan />
                                      </button>
                                    </div>
                                    <textarea
                                      className="w-[35vw] overflow-auto global-scrollbar min-h-10 max-h-96"
                                      value={box?.data}
                                      onChange={(e) =>
                                        handleUpdateSchedule(index, boxIndex, {
                                          ...box,
                                          data: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                              <div className="mt-3 text-end pr-4">
                                <button
                                  className="font-medium p-2 bg-white border border-navy-blue text-navy-blue rounded-lg"
                                  onClick={() => handleAddBoxForDay(index)} // Thêm Box cho ngày
                                >
                                  Add detail
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {nestedDataArray.length < maxNumber ? (
                        <div className="flex items-center justify-center">
                          <button
                            className="border bg-gray-200 font-medium py-2 px-4 rounded-lg hover:bg-white hover:border-gray-200"
                            onClick={handleModalOpen}
                          >
                            Add schedule day {nestedDataArray.length + 1}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <button className="border bg-gray-200 font-medium py-2 px-4 rounded-lg hover:bg-white hover:border-gray-200">
                            Add schedule full
                          </button>
                        </div>
                      )}
                    </div>
                    {nestedDataArray.length === 0 && (
                      <div className="flex items-center justify-center">
                        <button
                          onClick={handleModalOpen}
                          className="border bg-gray-200 font-medium py-2 px-4 rounded-lg hover:bg-white hover:border-gray-200"
                        >
                          Add schedule
                        </button>
                      </div>
                    )}
                    <FormModal
                      day={day}
                      open={modalOpen}
                      onClose={handleModalClose}
                      onSubmit={handleFormSubmit}
                    />
                  </div>
                </Card>
              ) : (
                <Card className="p-16 border border-gray-400 border-solid">
                  <div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleModalOpen}
                        className="border bg-gray-200 font-medium py-2 px-4 rounded-lg hover.bg-white hover.border-gray-200"
                      >
                        Add schedule day {nestedDataArray.length + 1}
                      </button>
                    </div>
                    <FormModal
                      day={day}
                      open={modalOpen}
                      onClose={handleModalClose}
                      onSubmit={handleFormSubmit}
                    />
                  </div>
                </Card>
              )}
            </div>
          </BannerContent>
        </div>
      </div>
    </BannerContainer>
  );
};

export default DurationCheckIn;
