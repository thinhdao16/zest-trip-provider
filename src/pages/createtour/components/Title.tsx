import React, { ChangeEvent, useState } from "react";
import {
  BannerContainer,
  BannerContent,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Input } from "../../../components/setUpProvider/components/input";
import { AiOutlineLock } from "react-icons/ai";
import { Box, Card, Grid } from "@mui/material";
import InputArea from "../../../components/setUpProvider/components/inputArea";
import { IoAddCircleOutline } from "react-icons/io5";
import FormModal from "./Title/FormModal";
export interface BoxData {
  data: string;
  fromTime: string;
  toTime: string;
}
interface NestedData {
  boxes: BoxData[];
}
const Title: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setTitle(inputData);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputData = e.target.value;
    setDescription(inputData);
  };
  React.useEffect(() => {
    updateFormValues(8, { Title: [title, description, nestedDataArray] });
  }, [title, description, nestedDataArray]);

  if (currentStep !== 10) {
    return null;
  }
  return (
    <BannerContainer>
      <BannerContent>
        <CreateTitleNullDes>Title & Description</CreateTitleNullDes>
        <CreateDescription>
          Share what makes your place special.
        </CreateDescription>
        <Box style={{ width: "38vw", marginBottom: "30px" }}>
          <Input
            labels="Title tour"
            placeholder="e.g. Stephen King"
            icon={<AiOutlineLock />}
            // showRequired={ userInfo.nameCompany}
            onChange={handleTitle}
          />

          <InputArea
            label="Description"
            onChange={handleDescription}
            icon={<AiOutlineLock />}
            placeholder="Description"
            maxLength={500}
          />
        </Box>
        <Box>
          <CreateTitleNullDes>Tour Schedule</CreateTitleNullDes>
          <Card style={{ border: "1px solid", padding: "50px" }}>
            <div>
              <Grid container spacing={2}>
                {nestedDataArray.map((data, index) => (
                  <Grid item xs={6} key={index}>
                    <div className="flex"> 
                    <IoAddCircleOutline />
                    <p>day:{index+1 }</p>
                    </div>
                    {data.boxes.map((data, index) => (
                      <div key={index} className="flex">
                        <p >{data?.toTime}</p> -
                        <p >{data?.fromTime}</p>
                        <p >{data?.data}</p>
                      </div>
                    ))}
                  </Grid>
                ))}
                <Grid item xs={6}>
                  <IoAddCircleOutline onClick={handleModalOpen} />
                </Grid>
              </Grid>
              <FormModal
                open={modalOpen}
                onClose={handleModalClose}
                onSubmit={handleFormSubmit}
              />
            </div>
          </Card>
        </Box>
      </BannerContent>
    </BannerContainer>
  );
};

export default Title;
