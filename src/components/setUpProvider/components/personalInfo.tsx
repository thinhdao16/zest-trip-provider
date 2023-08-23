import React, { FormEvent } from "react";
import { Input } from "./input";
import { UserInfo } from "AppTypes";
import { AiFillFileAdd, AiOutlineDelete, AiOutlineSync } from "react-icons/ai";
import { Box, InputLabel } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FaConnectdevelop,
  FaEarthEurope,
  FaHotel,
  FaLocationDot,
  FaStaylinked,
} from "react-icons/fa6";
import { FormLabel } from "@mui/joy";
interface PersonalInfoProps {
  userInfo: UserInfo;
  updateUserInfo: (userInfo: UserInfo) => void;
  showRequired: boolean;
}

export const PersonalInfo = ({
  userInfo,
  updateUserInfo,
}: // showRequired,
PersonalInfoProps) => {
  const [selectedFiles, setSelectedFiles] = React.useState<any[]>([]);
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
  const handleRemoveFile = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  return (
    <>
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
      <Input
        labels="Company Website"
        placeholder="e.g. Stephen King"
        icon={<FaConnectdevelop />}
        value={userInfo.webCompnany}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          handlePersonalInfo(e, "webCompnany")
        }
      />
      <Input
        labels="Social media"
        placeholder="e.g. Stephen King"
        icon={<FaStaylinked />}
        value={userInfo.mediaSocial}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          handlePersonalInfo(e, "mediaSocial")
        }
      />
      <Box>
        <FormLabel>Business registration</FormLabel>
        <Box
          style={{
            marginTop: "5px",
            padding: "12px",
            border: "1px dashed rgb(113, 113, 113)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                                onClick={() => handleRemoveFile(index)}
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
      </Box>
    </>
  );
};
