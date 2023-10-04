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
import { Card, Grid, Typography } from "@mui/material";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { dataTypeDuration } from "../dataFake";
import FormModal from "./Title/FormModal";
import { FaCircle } from "react-icons/fa6";
export interface BoxData {
  data: string;
  fromTime: string;
  toTime: string;
}
interface NestedData {
  boxes: BoxData[];
}
const DurationCheckIn: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [dataDuration, setDataDuration] = useState(dataTypeDuration);
  const [modalOpen, setModalOpen] = useState(false);
  const [nestedDataArray, setNestedDataArray] = useState<NestedData[]>([]);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (boxes: BoxData[]) => {
    const newNestedData: NestedData = {
      boxes: boxes,
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
      item.id === id && item.no > 1 ? { ...item, no: item.no - 1 } : item
    );
    setDataDuration(updatedData);
  };
  React.useEffect(() => {
    updateFormValues(4, {
      DurationCheckIn: [dataDuration, nestedDataArray],
    });
  }, [dataDuration, nestedDataArray]);
  if (currentStep !== 7) {
    return null;
  }
  return (
    <BannerContainer>
      <div className="flex items-center justify-center h-full">
        <BannerContent>
          <CreateTitleNullDes>
            Share some basic information about the time
          </CreateTitleNullDes>
          <CreateDescription>
            Your address is only shared with guests after they have
            successfully.
          </CreateDescription>
          {dataDuration.map((data) => (
            <CreateDurationContent key={data?.id}>
              <p className="font-medium mb-1 text-lg">Duration</p>
              <div className="flex flex-1 justify-between items-center border-b border-solid border-gray-400 p-3 rounded hover:border-navy-blue  ">
                <Typography>{data?.title}</Typography>
                <div>
                  <CreateChooseContent key={data?.id}>
                    {data?.no > 1 ? (
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
          <div>
            <p className="font-medium mb-1 text-lg">Tour Schedule</p>

            {nestedDataArray?.length > 0 ? (
              <Card className="p-7 border border-gray-400  border-solid">
                <div>
                  <div className="gap-4 grid">
                    {nestedDataArray.map((data, index) => (
                      <div key={index}>
                        <div className="flex gap-3">
                          <div className="">
                            <button className="font-medium p-2 bg-navy-blue text-white rounded-lg ">
                              Day {index + 1}
                            </button>

                            {data.boxes.map((data, index) => (
                              <div className="relative mt-3">
                                <FaCircle className="absolute inset-y-1/3 w-2" />
                                <div className="pl-5 pr-7">
                                  <div
                                    key={index}
                                    className="flex font-medium text-gray-700"
                                  >
                                    <p>{data?.toTime}</p> -
                                    <p>{data?.fromTime}</p>
                                  </div>
                                  <p className=" font-normal">{data?.data}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-center">
                      <button
                        className="border bg-gray-200 font-medium py-2 px-4 rounded-lg hover:bg-white hover:border-gray-200"
                        onClick={handleModalOpen}
                      >
                        Add schedule day {nestedDataArray.length + 1}
                      </button>
                    </div>
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
                    open={modalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleFormSubmit}
                  />
                </div>
              </Card>
            ) : (
              <Card className="p-16 border border-gray-400  border-solid">
                <div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleModalOpen}
                      className="border bg-gray-200 font-medium py-2 px-4 rounded-lg hover:bg-white hover:border-gray-200"
                    >
                      Add schedule day {nestedDataArray.length + 1}
                    </button>
                  </div>
                  <FormModal
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
    </BannerContainer>
  );
};

export default DurationCheckIn;
