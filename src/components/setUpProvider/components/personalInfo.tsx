import React, { FormEvent, useState } from "react";
import { Input } from "./input";
import { Plan, UserInfo } from "AppTypes";
import {
  AiFillFileAdd,
  AiOutlineBulb,
  AiOutlineDelete,
  AiOutlineSync,
} from "react-icons/ai";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FaEarthEurope,
  FaHotel,
  FaLocationDot,
  FaStaylinked,
} from "react-icons/fa6";

const plans: Plan[] = [
  {
    serviceType: [
      {
        id: 1,
        name: "Domestic",
      },
      {
        id: 2,
        name: "International",
      },
    ],
    policyCancell: [
      {
        id: 1,
        name: "Free before 24 hr",
      },
      {
        id: 2,
        name: "Dont free after 24 hr",
      },
    ],
    policyConfirm: [
      {
        id: 1,
        name: "Immediate",
      },
      {
        id: 2,
        name: "Dont Immediate",
      },
    ],
  },
];
interface PersonalInfoProps {
  userInfo: UserInfo;
  updateUserInfo: (userInfo: UserInfo) => void;
  showRequired: boolean;
  selectedPlan: Plan | null;
  updateSelectedPlan: (selectedPlan: Plan) => void;
}

export const PersonalInfo = ({
  userInfo,
  updateUserInfo,
  selectedPlan,
  updateSelectedPlan,
}: PersonalInfoProps) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [imageSrc, setImageSrc] = useState<any>();
  const [imageAvt, setImageAvt] = useState<any>();

  const handlePersonalInfo = (
    event: FormEvent<HTMLInputElement>,
    key: keyof UserInfo
  ) => {
    const updatedUserInfo = { ...userInfo };
    updatedUserInfo[key] = event.currentTarget.value;
    updateUserInfo(updatedUserInfo);
  };

  const handleFileChange = (event: any, key: keyof UserInfo) => {
    const newSelectedFiles = Array.from(event.target.files);
    setSelectedFiles(newSelectedFiles);

    const updatedUserInfo = { ...userInfo };
    updatedUserInfo[key] = newSelectedFiles; // Không cần gán giá trị vào userInfo.file ở đây
    updateUserInfo(updatedUserInfo);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedFiles = Array.from(selectedFiles);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);

    setSelectedFiles(reorderedFiles);
  };
  const handleRemoveFile = (index: number, field: string) => {
    console.log(field);
    if (field === "file") {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles.splice(index, 1);
      setSelectedFiles(newSelectedFiles);
    }
    if (field === "banner") {
      setImageSrc(undefined);
    }
    if (field === "avt") {
      setImageAvt(undefined);
    }
  };
  const handleImageChange = (
    field: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Ngăn chặn reload trang

    if (field === "banner") {
      const inputFile: any = document.getElementById("imageInputBanner");
      inputFile.click();
    }
    if (field === "avt") {
      const inputFile: any = document.getElementById("imageInputAvt");
      inputFile.click();
    }
  };

  const handleImageInputChange = (event: any, field: string) => {
    if (field === "banner") {
      const selectedFile = event.target.files[0];
      const newImages: any = {
        id: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
        file: selectedFile,
      };
      setImageSrc(newImages);
    }
    if (field === "avt") {
      const selectedFile = event.target.files[0];
      const newImages: any = {
        id: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
        file: selectedFile,
      };
      setImageAvt(newImages);
    }
  };
  const handleSelect = (
    e: SelectChangeEvent<string>,
    attributeName: keyof Plan
  ) => {
    const selectedValue = e.target.value;
    const updatedPlan: Plan = {
      ...selectedPlan!,
      [attributeName]: selectedValue,
    };
    console.log(updatedPlan);
    updateSelectedPlan(updatedPlan);
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <div
        style={{
          width: "450px",
          display: "flex",
          flexDirection: "column",
          margin: "50px 0 30px 0",
        }}
      >
        <p className="font-medium text-gray-400">Step 1/3</p>
        <p className="font-bold text-2xl">Secure Info</p>
      </div>
      <Input
        labels="Company’s legal name"
        placeholder="e.g. Stephen King"
        icon={<FaHotel />}
        // showRequired={ userInfo.nameCompany}
        value={userInfo.nameCompany}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          handlePersonalInfo(e, "nameCompany")
        }
      />
      <Input
        labels="Region"
        placeholder="e.g. Stephen King"
        icon={<FaEarthEurope />}
        value={userInfo.region}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          handlePersonalInfo(e, "region")
        }
      />

      <Input
        labels="Address"
        placeholder="e.g. Stephen King"
        icon={<FaLocationDot />}
        value={userInfo.address}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          handlePersonalInfo(e, "address")
        }
      />
      {/* <Input
        labels="Company Website"
        placeholder="e.g. Stephen King"
        icon={<FaConnectdevelop />}
        value={userInfo.webCompnany}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          handlePersonalInfo(e, "webCompnany")
        }
      /> */}
      <Input
        labels="Social media"
        placeholder="e.g. Stephen King"
        icon={<FaStaylinked />}
        value={userInfo.mediaSocial}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          handlePersonalInfo(e, "mediaSocial")
        }
      />
      <div style={{ width: "450px" }}>
        <p className="font-medium mb-1">Service type</p>
        <FormControl fullWidth className="relative">
          {/* <FaStaylinked className="absolute top-3 left-3" /> */}
          <Select
            style={{ borderRadius: "8px", height: "40px" }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={selectedPlan?.serviceType || ""}
            onChange={(e) => handleSelect(e, "serviceType")}
          >
            <MenuItem value="">
              <em>Please choose type</em>
            </MenuItem>
            {plans[0]?.serviceType?.map((data: any) => (
              <MenuItem key={data?.id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <p className="font-medium">Business license</p>
        <Box
          style={{
            marginTop: "5px",
            padding: "12px",
            border: "1px dashed rgb(113, 113, 113)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "450px",
          }}
        >
          {selectedFiles && selectedFiles.length > 0 ? (
            <React.Fragment>
              <InputLabel htmlFor="image-upload" style={{ cursor: "pointer" }}>
                <AiOutlineSync style={{ color: "black", fontSize: "25px" }} />
                <input
                  type="file"
                  accept="file/*"
                  multiple
                  onChange={(event) => handleFileChange(event, "file")}
                  style={{ display: "none" }}
                  id="image-upload"
                />
              </InputLabel>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="selectedFiles" direction="horizontal">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {selectedFiles.map((file: any, index: number) => (
                        <Draggable
                          key={file.name}
                          draggableId={file.name}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                display: "flex",
                                justifyContent: "space-between  ",
                                alignItems: "center",
                              }}
                            >
                              {file.name}
                              <AiOutlineDelete
                                onClick={() => handleRemoveFile(index, "file")}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </React.Fragment>
          ) : (
            <InputLabel htmlFor="image-upload" style={{ cursor: "pointer" }}>
              <AiFillFileAdd style={{ color: "black", fontSize: "25px" }} />
              <input
                type="file"
                accept="file/*"
                multiple
                onChange={(event) => handleFileChange(event, "file")}
                style={{ display: "none" }}
                id="image-upload"
              />
            </InputLabel>
          )}
        </Box>
      </div>
      <div>
        <p className="font-medium mb-1 ">Upload banner and avatar</p>
        {imageSrc && imageSrc?.url ? (
          <div style={{ position: "relative" }}>
            <AiOutlineDelete
              className="text-lg"
              onClick={() => handleRemoveFile(0, "banner")}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                zIndex: "1",
                color: "white",
              }}
            />
            <img
              src={imageSrc?.url}
              alt="anything"
              style={{
                height: "150px",
                width: "450px",
                objectFit: "cover",
                zIndex: "2",
                borderRadius: "15px",
              }}
            />
            <input
              id="imageInputBanner"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageInputChange(e, "banner")}
            />
          </div>
        ) : (
          <div
            style={{
              border: "1px dashed rgb(113, 113, 113)",
              borderRadius: "15px",
              height: "150px",
              width: "450px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AiOutlineBulb
              className="text-lg"
              onClick={() => handleRemoveFile(0, "avt")}
            />
            <input
              id="imageInputBanner"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageInputChange(e, "banner")}
            />
          </div>
        )}
        <div className="flex ">
          {imageAvt && imageAvt?.url ? (
            <div className="flex" style={{ position: "relative" }}>
              <AiOutlineDelete
                className="text-sm"
                onClick={() => handleRemoveFile(0, "avt")}
                style={{
                  position: "absolute",
                  top: "25px",
                  right: "15px",
                  cursor: "pointer",
                  zIndex: "4",
                  color: "black",
                  background: "#e4e6eb",
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
              <img
                src={imageAvt?.url}
                alt="Image"
                style={{
                  zIndex: "3",
                  objectFit: "cover",
                  borderRadius: "50%",
                  height: "100px",
                  width: "100px",
                  marginTop: "-50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px",
                  background: "white",
                  marginLeft: "25px",
                }}
              />

              <input
                id="imageInputAvt"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageInputChange(e, "avt")}
              />
            </div>
          ) : (
            <div
              style={{
                border: "1px dashed rgb(113, 113, 113)",
                borderRadius: "50%",
                height: "100px",
                width: "100px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "-50px",
                background: "white",
                marginLeft: "25px",
                zIndex: "3",
              }}
            >
              <AiOutlineBulb
                className="text-lg"
                onClick={() => handleRemoveFile(0, "avt")}
              />
              <input
                id="imageInputAvt"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageInputChange(e, "avt")}
              />
            </div>
          )}
          {imageSrc ? (
            <button
              className="bg-white border border-navy-blue text-navy-blue px-3 rounded-2xl hover:border hover:border-navy-blue hover:bg-navy-blue hover:text-white h-10 m-3"
              onClick={(e) => handleImageChange("banner", e)}
            >
              Change banner
            </button>
          ) : (
            <button
              className="bg-navy-blue  text-white h-10 m-3 border border-navy-blue hover:bg-white hover:border hover:border-navy-blue hover:text-navy-blue rounded-2xl px-3"
              onClick={(e) => handleImageChange("banner", e)}
            >
              Add banner
            </button>
          )}
          {imageAvt ? (
            <button
              className="bg-white border border-blue-grotto text-blue-grotto rounded-2xl hover:border hover:border-solid hover:border-blue-grotto hover:bg-blue-grotto hover:text-white hover:rounded-2xl h-10 mt-3 px-3 "
              onClick={(e) => handleImageChange("avt", e)}
            >
              Change avt
            </button>
          ) : (
            <button
              className="bg-blue-grotto  text-white border border-blue-grotto h-10 hover:bg-white hover:border hover:border-blue-grotto hover:text-blue-grotto  mt-3 px-3 rounded-2xl"
              onClick={(e) => handleImageChange("avt", e)}
            >
              Add avt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
