import React, { ChangeEvent, useState } from "react";
import {
  BannerContainer,
  BannerContent,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { AiOutlineLock } from "react-icons/ai";
import "../styles/createtour.css";
import { Tooltip } from "@mui/material";
import { FaRegCircleQuestion } from "react-icons/fa6";
import AutoResizableTextarea from "./Title/AutoResizableTextarea";
import { MdOutlineDescription } from "react-icons/md";
const Title: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleEmpty, setIsTitleEmpty] = useState<boolean>(true);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    console.log(inputData.length);
    setTitle(inputData);
    if (inputData.length > 0) {
      setIsTitleEmpty(false);
    } else {
      setIsTitleEmpty(true);
    }
  };

  // const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   const inputData = e.target.value;
  //   setDescription(inputData);
  // };
  React.useEffect(() => {
    updateFormValues(8, { Title: [title, description] });
  }, [title, description]);

  if (currentStep !== 3) {
    return null;
  }
  return (
    <BannerContainer>
      <div className="items-center flex justify-center h-full ">
        <BannerContent>
          <CreateTitleNullDes>Title & Description</CreateTitleNullDes>
          <CreateDescription>
            Share what makes your place special.
          </CreateDescription>
          <div className="gap-3 grid" style={{ width: "480px" }}>
            <div>
              <div className="flex items-center gap-3">
                <p className="font-medium">Title tour</p>

                <Tooltip
                  title="What is the title of your activity?
Write a short descriptive title to help customers understand your product. It should include:

• the activity’s main location (where the activity starts from or takes place)
• the type of activity (e.g. an entry ticket, a walking tour, a full-day trip, etc)
• any important inclusions (e.g. transportation, meals, etc)"
                  placement="top-end"
                >
                  <p>
                    <FaRegCircleQuestion />
                  </p>
                </Tooltip>
                {isTitleEmpty && (
                  <p className="text-red-500 text-xs">*Title cannot be empty</p>
                )}
              </div>

              <div className="relative mt-2">
                <AiOutlineLock className="absolute top-4 left-2" />
                <input
                  value={title}
                  className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:ring-navy-blue focus:ring-1 focus:outline-none   hover:ring-1 hover:ring-navy-blue  border border-gray-400 "
                  name="apartment"
                  placeholder="e.g. Stephen King"
                  type="text"
                  autoComplete="address-line2"
                  onChange={handleTitle}
                  maxLength={70}
                />
              </div>
              <span className="text-gray-500 text-sm">{title.length}/70</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <p className="font-medium mb-1">Description tour</p>
                <Tooltip
                  title="What is the title of your activity?
Write a short descriptive title to help customers understand your product. It should include:

• the activity’s main location (where the activity starts from or takes place)
• the type of activity (e.g. an entry ticket, a walking tour, a full-day trip, etc)
• any important inclusions (e.g. transportation, meals, etc)"
                  placement="top-end"
                >
                  <p>
                    <FaRegCircleQuestion />
                  </p>
                </Tooltip>
                {description?.length === 0 && (
                  <p className="text-red-500 text-xs">
                    *Description cannot be empty
                  </p>
                )}
              </div>
              <div className="relative">
                <MdOutlineDescription className="absolute top-3 left-3 " />
                <AutoResizableTextarea
                  defaultValue={description}
                  onChange={(e) => setDescription(e)}
                  placeholder="Description"
                  maxLength={3000}
                />
              </div>
            </div>
          </div>
        </BannerContent>
      </div>
    </BannerContainer>
  );
};

export default Title;
