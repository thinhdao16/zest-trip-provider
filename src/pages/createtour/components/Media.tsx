import React, { useState, useEffect } from "react";
import {
  BannerContainer,
  BannerContentHaveImage,
  CreateDescription,
  CreateTitleImage,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import { FaRegTrashCan } from "react-icons/fa6";

type GalleryImage = {
  id: string;
  url: string;
};

const Media: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedImages, setSelectedImages] = useState<GalleryImage[]>([]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(selectedImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedImages(items);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: file.name,
        url: URL.createObjectURL(file),
        file: files,
      }));

      // Check for duplicates before adding images
      const updatedImages = [...selectedImages];
      newImages.forEach((newImage) => {
        const isDuplicate = selectedImages.some(
          (image) => image.id === newImage.id
        );
        if (!isDuplicate) {
          updatedImages.push(newImage);
        } else {
          alert("Duplicate image detected: " + newImage.url);
        }
      });

      setSelectedImages(updatedImages);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: file.name,
        url: URL.createObjectURL(file),
        file: files,
      }));

      const updatedImages = [...selectedImages];
      newImages.forEach((newImage) => {
        const isDuplicate = selectedImages.some(
          (image) => image.id === newImage.id
        );
        if (!isDuplicate) {
          updatedImages.push(newImage);
        } else {
          alert("Duplicate image detected: " + newImage.url);
        }
      });

      setSelectedImages(updatedImages);
    }
  };

  const handleDeleteImage = (id: string) => {
    const updatedImages = selectedImages.filter((image) => image.id !== id);
    setSelectedImages(updatedImages);
  };
  const handleConfirm = () => {
    if (selectedImages.length > 1) {
      const updatedImages = [...selectedImages.slice(1), selectedImages[0]];
      setSelectedImages(updatedImages);
    }
    // Thêm logic xác nhận khác nếu cần
  };
  useEffect(() => {
    updateFormValues(7, { Media: selectedImages });
  }, [selectedImages]);

  if (currentStep !== 11) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BannerContainer
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        className="global-scrollbar"
      >
        <div className="flex items-center justify-center">
          <BannerContentHaveImage>
            <CreateTitleNullDes>Choose media</CreateTitleNullDes>
            <CreateDescription>
              Choose your photo for the tour
            </CreateDescription>

            {selectedImages.length < 1 ? (
              <Box
                className="shadow-custom-card-mui rounded-lg"
                style={{
                  padding: "120px",
                  // width: "42vw",
                  border: "1px dashed rgb(113, 113, 113)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px", // Gap between the two elements
                  background: "white",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      height: "64px",
                      width: "64px",
                      fill: "currentcolor",
                    }}
                  >
                    <path
                      d="M41.636 8.404l1.017 7.237 17.579 4.71a5 5 0 0 1 3.587 5.914l-.051.21-6.73 25.114A5.002 5.002 0 0 1 53 55.233V56a5 5 0 0 1-4.783 4.995L48 61H16a5 5 0 0 1-4.995-4.783L11 56V44.013l-1.69.239a5 5 0 0 1-5.612-4.042l-.034-.214L.045 14.25a5 5 0 0 1 4.041-5.612l.215-.035 31.688-4.454a5 5 0 0 1 5.647 4.256zm-20.49 39.373l-.14.131L13 55.914V56a3 3 0 0 0 2.824 2.995L16 59h21.42L25.149 47.812a3 3 0 0 0-4.004-.035zm16.501-9.903l-.139.136-9.417 9.778L40.387 59H48a3 3 0 0 0 2.995-2.824L51 56v-9.561l-9.3-8.556a3 3 0 0 0-4.053-.009zM53 34.614V53.19a3.003 3.003 0 0 0 2.054-1.944l.052-.174 2.475-9.235L53 34.614zM48 27H31.991c-.283.031-.571.032-.862 0H16a3 3 0 0 0-2.995 2.824L13 30v23.084l6.592-6.59a5 5 0 0 1 6.722-.318l.182.159.117.105 9.455-9.817a5 5 0 0 1 6.802-.374l.184.162L51 43.721V30a3 3 0 0 0-2.824-2.995L48 27zm-37 5.548l-5.363 7.118.007.052a3 3 0 0 0 3.388 2.553L11 41.994v-9.446zM25.18 15.954l-.05.169-2.38 8.876h5.336a4 4 0 1 1 6.955 0L48 25.001a5 5 0 0 1 4.995 4.783L53 30v.88l5.284 8.331 3.552-13.253a3 3 0 0 0-1.953-3.624l-.169-.05L28.804 14a3 3 0 0 0-3.623 1.953zM21 31a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM36.443 6.11l-.175.019-31.69 4.453a3 3 0 0 0-2.572 3.214l.02.175 3.217 22.894 5.833-7.74a5.002 5.002 0 0 1 4.707-4.12L16 25h4.68l2.519-9.395a5 5 0 0 1 5.913-3.587l.21.051 11.232 3.01-.898-6.397a3 3 0 0 0-3.213-2.573zm-6.811 16.395a2 2 0 0 0 1.64 2.496h.593a2 2 0 1 0-2.233-2.496zM10 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                      fill="#222"
                    ></path>
                  </svg>
                  <CreateTitleImage>
                    Choose image you want to create
                  </CreateTitleImage>
                  <Typography>Choose many image</Typography>
                </Box>

                <InputLabel
                  htmlFor="image-upload"
                  style={{ cursor: "pointer" }}
                >
                  <Button
                    component="label"
                    style={{
                      textTransform: "none",
                      background: "#05445E",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "10px",
                    }}
                  >
                    Choose
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      id="image-upload"
                    />
                  </Button>
                </InputLabel>
              </Box>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative w-[44vw] h-[55vh]">
                  <img
                    src={selectedImages[0]?.url}
                    alt="error"
                    className="object-cover w-[50vw] h-[55vh] shadow-custom-card-mui rounded-lg "
                  />
                  <button
                    onClick={() => handleDeleteImage(selectedImages[0]?.id)}
                    className=" absolute top-3 right-3 bg-white shadow-custom-card-mui font-medium text-gray-600 w-8 h-8 p-0 rounded-full flex items-center justify-center"
                  >
                    <FaRegTrashCan />
                  </button>
                </div>

                <Droppable droppableId="selectedImages" direction="horizontal">
                  {(provided) => (
                    <Grid
                      container
                      spacing={2}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {selectedImages?.slice(1)?.map((image, index) => (
                        <Draggable
                          key={image.id}
                          draggableId={image.id}
                          index={index}
                        >
                          {(provided) => (
                            <Grid item xs={12} sm={6} key={image.id}>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  backgroundColor: "#f7f7f7",
                                  position: "relative",
                                }} // Set position to relative
                              >
                                <img
                                  src={image.url}
                                  alt={`Image ${index}`}
                                  style={{
                                    objectFit: "cover",
                                    height: "28vh",
                                    width: "100%",
                                  }}
                                  className="shadow-custom-card-mui rounded-lg"
                                />
                                <button
                                  onClick={() => handleDeleteImage(image.id)}
                                  className="absolute top-3 right-3 bg-white shadow-custom-card-mui font-medium text-gray-600 w-8 h-8 p-0 rounded-full flex items-center justify-center"
                                >
                                  <FaRegTrashCan />
                                </button>
                              </div>
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                      <Grid item xs={6}>
                        <label htmlFor="image-upload">
                          <div
                            className="shadow-custom-card-mui rounded-lg"
                            style={{
                              backgroundColor: "#f7f7f7",
                              height: "28vh",
                              width: "100%",
                              border: "1px dashed rgb(113, 113, 113)",
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              style={{ display: "none" }}
                              id="image-upload"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                              style={{
                                display: "block",
                                height: "32px",
                                width: "32px",
                                fill: "currentcolor",
                              }}
                            >
                              <path d="M27 3a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM8.89 19.04l-.1.08L3 24.92V25a2 2 0 0 0 1.85 2H18.1l-7.88-7.88a1 1 0 0 0-1.32-.08zm12.5-6-.1.08-7.13 7.13L20.92 27H27a2 2 0 0 0 2-1.85v-5.73l-6.3-6.3a1 1 0 0 0-1.31-.08zM27 5H5a2 2 0 0 0-2 2v15.08l4.38-4.37a3 3 0 0 1 4.1-.14l.14.14 1.13 1.13 7.13-7.13a3 3 0 0 1 4.1-.14l.14.14L29 16.59V7a2 2 0 0 0-1.85-2zM8 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                          </div>
                        </label>
                      </Grid>
                      {provided.placeholder}
                    </Grid>
                  )}
                </Droppable>
              </div>
            )}
          </BannerContentHaveImage>
        </div>
      </BannerContainer>
    </DragDropContext>
  );
};

export default Media;
