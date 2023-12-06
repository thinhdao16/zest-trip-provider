import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";
import Construction, {
  ConstructionDes,
  ConstructionTitle,
  ConstructionTitletext,
} from "./singlePageConst/Construction";
import {
  FaAddressCard,
  FaCircle,
  FaCirclePlus,
  FaHardDrive,
} from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import AutoResizableTextarea from "./singlePageConst/AutoResizableTextarea";
import { TourTag } from "../../../components/icon/tour/tag";
import TabContext from "@mui/lab/TabContext";
import { Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./detail.css";
import ModalTag from "./Modal/ModalTag";
import ModalVehicle from "./Modal/ModalVehicle";
import { FcEmptyTrash } from "react-icons/fc";
import ModalTourScheDetail from "./Modal/ModalTourScheDetail";
import { useEditContext } from "./Context/useEditContext";
import { DataContext } from "../../../store/dataContext/DataContext";
import ScreenSP from "./ScreenSP";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { VehicleTag } from "../../../components/icon/tour/vehicle";
interface tourSche {
  id: number;
  description: string;
  title: string;
  tour_id: string;
  created_at: string;
  updated_at: string;
  TourScheduleDetail: {
    created_at: string;
    description: string;
    from: string;
    to: string;
    tour_schedule_id: number;
    id: number;
    updated_at: string;
  }[];
}
function ScreenMain() {
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  console.log(tourDetail);
  const {
    name,
    setName,
    description,
    setDescription,
    footnote,
    setFootnote,
    addressName,
    setAddressName,
    addressCountry,
    setAddressCountry,
    addressDis,
    setAddressDis,
    addressPro,
    setAddressPro,
    addressWard,
    setAddressWard,
    schedule,
    setSchedule,
    tourTag,
    setTourTag,
    tourVehicle,
    setTourVehicle,
    tourImages,
    setTourImages,
    imageSrc,
    setImageSrc,
    statusTour,
    setStatusTour,
  } = useEditContext();

  const { refreshTourDetail } = useContext(DataContext);

  const [valueTab, setValueTab] = useState("1");

  const [, setHasChanges] = useState(false);

  const [allImage, setAllImage] = useState<any>([]);

  const handleValueTab = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);
    setValueTab(newValue);
  };

  const removeImage = (imageURL: string) => {
    const indexToRemove = tourImages.findIndex(
      (image: string) => image === imageURL
    );
    const indexToRemoveImgSrc = imageSrc.findIndex(
      (image: { url: string }) => image.url === imageURL
    );
    const indexToRemoveAllImg = allImage.findIndex(
      (image: string) => image === imageURL
    );
    if (indexToRemove >= 0) {
      const updatedImages = [...tourImages];
      updatedImages.splice(indexToRemove, 1);
      setTourImages(updatedImages);
    }
    if (indexToRemoveImgSrc >= 0) {
      const updatedImages = [...imageSrc];
      updatedImages.splice(indexToRemove, 1);
      setImageSrc(updatedImages);
    }
    if (indexToRemoveAllImg >= 0) {
      const updatedImages = [...allImage];
      updatedImages.splice(indexToRemove, 1);
      setAllImage(updatedImages);
    }
  };

  const handleDataChange = () => {
    setHasChanges(true);
  };

  const handleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const inputFile: any = document.getElementById("imageInputImageEdit");
    inputFile.click();
  };

  const handleImageInputChange = async (event: any) => {
    const selectedFiles = event.target.files;
    const newImages: any = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      if (selectedFile instanceof File) {
        const imageUrl = URL.createObjectURL(selectedFile);
        newImages.push({
          id: selectedFile.name,
          url: imageUrl,
          file: selectedFile,
        });
      }
    }
    await new Promise((resolve: any) => {
      setImageSrc((prevImages: any) => [...prevImages, ...newImages]);
      resolve();
    });
    const urlsFromImageSrc = newImages.map((image: any) => image.url);
    const updatedTourImages = [...allImage, ...urlsFromImageSrc];
    setAllImage(updatedTourImages);
  };
  useEffect(() => {
    if (tourDetail) {
      const urlsFromImageSrc = imageSrc?.map((image: any) => image.url);
      const getTourImg = Array.isArray(tourDetail?.tour_images)
        ? tourDetail.tour_images
        : [];
      const updatedTourImages = [...getTourImg, ...urlsFromImageSrc];
      setName(tourDetail?.name);
      setDescription(tourDetail.description);
      setFootnote(tourDetail.footnote);
      setAddressName(tourDetail?.address_name);
      setAddressDis(tourDetail?.address_district);
      setAddressPro(tourDetail?.address_province);
      setAddressWard(tourDetail?.address_ward);
      setSchedule(tourDetail?.TourSchedule);
      setTourTag(tourDetail?.tag_id);
      setTourVehicle(tourDetail?.vehicle_id);
      setTourImages(tourDetail?.tour_images);
      setAddressCountry(tourDetail?.address_country);
      setAllImage(updatedTourImages);
      setStatusTour(tourDetail?.status);
    }
  }, [tourDetail, refreshTourDetail]);

  return (
    <>
      <div
        className="bg-main rounded-xl p-4 h-full overflow-y-auto global-scrollbar"
        onClick={handleDataChange}
      >
        <div className="mb-4" id="information_basic">
          <span className="font-medium text-xl">Infomation Tour detail</span>
        </div>
        <div className="flex flex-col gap-6 px-6">
          <div className="grid grid-cols-12">
            <div className="grid grid-cols-12 gap-4 col-span-5">
              <div className="col-span-5 flex justify-end">
                <ConstructionTitletext>Tour type</ConstructionTitletext>
              </div>
              <div className="col-span-7  ">
                <div className=" p-2 rounded-lg bg-white shadow-custom-card-mui cursor-not-allowed border-solid ">
                  {tourDetail?.tour_location_type}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 col-span-3">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Duration</ConstructionTitletext>
              </div>
              <div className="col-span-8 ">
                <div className="p-2 rounded-lg bg-white shadow-custom-card-mui cursor-not-allowed border-solid ">
                  <span className="mr-2">
                    {tourDetail?.duration_day}/
                    <span className="text-gray-500">day</span>
                  </span>
                  <span>
                    {tourDetail?.duration_night}/
                    <span className="text-gray-500">night</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 col-span-4">
              <div className="col-span-3 flex justify-end">
                <ConstructionTitletext>Status</ConstructionTitletext>
              </div>
              <div className="col-span-8">
                <div className=" ">
                  <select
                    value={statusTour}
                    onChange={(e) => setStatusTour(e.target.value)}
                    className="rounded-lg p-2 bg-white border border-gray-300  border-solid w-full shadow-custom-card-mui"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="HIDDEN">HIDDEN</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Image product</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              {/* <span className="font-medium">*Image ratio 1:1</span> */}
              <div className="grid grid-cols-7 gap-4 border">
                {allImage?.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="border border-solid bg-white border-gray-300 rounded-lg p-1 relative flex items-center justify-center"
                  >
                    <img
                      className="object-cover rounded-lg"
                      src={img}
                      alt="error"
                      style={{ width: "100px", height: "100px", flexGrow: 1 }}
                    />

                    <FcEmptyTrash
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(img)}
                    />
                  </div>
                ))}
                <div className="border border-solid bg-white border-gray-300 rounded-lg p-1 flex items-center justify-center h-28">
                  <input
                    id="imageInputImageEdit"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    multiple
                    onChange={(e) => handleImageInputChange(e)}
                  />
                  <button
                    className="flex items-center gap-1"
                    onClick={(e) => handleAddImage(e)}
                  >
                    <FaCirclePlus />
                    Images
                  </button>
                </div>
              </div>
            </ConstructionDes>
          </Construction>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Name Product</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <div className="relative">
                <MdTitle className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={name || tourDetail?.name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>
            </ConstructionDes>
          </Construction>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Description Product</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <div className="relative">
                <MdOutlineDescription className="absolute top-3 left-3 " />
                <AutoResizableTextarea
                  defaultValue={description}
                  onChange={(e) => setDescription(e)}
                />
              </div>
            </ConstructionDes>
          </Construction>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Footnote</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <div className="relative">
                <FaHardDrive className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={footnote || tourDetail?.footnote}
                  onChange={(e) => setFootnote(e.target.value)}
                  type="text"
                />
              </div>
            </ConstructionDes>
          </Construction>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Tag for tour</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <div className="bg-white p-4 shadow-custom-card-mui rounded-lg flex justify-between gap-4">
                <div className="grid grid-cols-4 gap-4">
                  {tourTag?.map((tag: { name: string; id: number }) => (
                    <div
                      key={tag?.id}
                      className="flex bg-white items-center gap-2 border border-gray-400 border-solid rounded-lg p-3 shadow-custom-card-mui"
                    >
                      <TourTag field={tag?.name} style="w-8 h-8" />
                      <p className="text-sm">{tag?.name}</p>
                    </div>
                  ))}
                </div>
                <ModalTag dataTag={{ tourTag, setTourTag }} />
              </div>
            </ConstructionDes>
          </Construction>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Vehicle for tour</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <div className="bg-white  p-4 shadow-custom-card-mui rounded-lg flex justify-between">
                <div className="grid grid-cols-4 gap-4">
                  {tourVehicle?.map((tag: { name: string; id: number }) => (
                    <div
                      key={tag?.id}
                      className="flex flex-wrap bg-white items-center gap-2 border border-gray-400 border-solid rounded-lg p-3 shadow-custom-card-mui"
                    >
                      <VehicleTag field={tag?.name} style="w-8 h-8" />
                      <p className="text-sm flex flex-wrap">{tag?.name}</p>
                    </div>
                  ))}
                </div>
                <ModalVehicle dataVehicle={{ tourVehicle, setTourVehicle }} />
              </div>
            </ConstructionDes>
          </Construction>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Address name</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <div className="relative">
                <FaAddressCard className="absolute top-3 left-3 " />
                {/* <input
                  // disabled
                  className="bg-white shadow-custom-card-mui rounded-lg py-2 px-8 w-full"
                  defaultValue={addressName || tourDetail?.address_name}
                  onChange={(e) => setAddressName(e.target.value)}
                  type="text"
                /> */}
                <div className="bg-white shadow-custom-card-mui rounded-lg py-2 px-8 w-full">
                  {addressName}
                </div>
              </div>
            </ConstructionDes>
          </Construction>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address country</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaAddressCard className="absolute top-3 left-3 " />
                <input
                  disabled
                  className="bg-white shadow-custom-card-mui rounded-lg py-2 px-8 w-full"
                  defaultValue={addressCountry || tourDetail?.address_country}
                  onChange={(e) => setAddressCountry(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address province</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaAddressCard className="absolute top-3 left-3 " />

                {/* <div>
                  <select
                    disabled
                    value={addressPro}
                    onChange={(e) => handleCountryChange(e, "pro")}
                    id="countries"
                    className="pl-8 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    {addressProvince ? (
                      addressProvince?.map((pro: any) => (
                        <option key={pro.code_name} value={pro.full_name}>
                          {pro.full_name}
                        </option>
                      ))
                    ) : (
                      <option value={addressPro}>{addressPro}</option>
                    )}
                  </select>
                </div> */}
                <div className="pl-8 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  {addressPro}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address district</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaAddressCard className="absolute top-3 left-3 " />

                {/* <div>
                  <select
                    disabled
                    value={addressDis}
                    onChange={(e) => handleCountryChange(e, "dis")}
                    id="countries"
                     className=" pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {addressDistrict ? (
                      addressDistrict?.map((pro: any) => (
                        <option key={pro.code_name} value={pro.full_name}>
                          {pro.full_name}
                        </option>
                      ))
                    ) : (
                      <option value={addressDis}>{addressDis}</option>
                    )}
                  </select>
                </div> */}
                <div className=" pl-8 bg-white shadow-custom-card-mui text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  {addressDis}
                </div>
              </div>
            </div>{" "}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address ward</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaAddressCard className="absolute top-3 left-3 " />
                {/* <div>
                  <select
                    disabled
                    value={addressWard}
                    onChange={(e) => handleCountryChange(e, "ward")}
                    id="countries"
                    className="pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {addressWards ? (
                      addressWards?.map((pro: any) => (
                        <option key={pro.code_name} value={pro.full_name}>
                          {pro.full_name}
                        </option>
                      ))
                    ) : (
                      <option value={addressWard}>{addressWard}</option>
                    )}
                  </select>
                </div> */}
                <div className="pl-8 bg-white shadow-custom-card-mui text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  {addressWard}
                </div>
              </div>
            </div>
          </div>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Tour Schedules</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <TabContext value={valueTab}>
                <div className="bg-white  rounded-lg shadow-custom-card-mui p-4 relative border border-solid border-gray-300">
                  <TabList
                    onChange={handleValueTab}
                    aria-label="lab API tabs example"
                    className="tab-lish overflow-y-auto"
                  >
                    {schedule?.map((scheTit: any, index: number) => {
                      return (
                        <Tab
                          label={`${scheTit?.title}`}
                          value={(index + 1).toString()}
                          key={index}
                          sx={{
                            "&.MuiButtonBase-root.Mui-selected": {
                              color: "white",
                              background: "#05445E",
                              borderRadius: "8px",
                              height: "40px",
                              minHeight: "40px",
                              textTransform: "none",
                              fontWeight: "550",
                            },
                            "&.MuiButtonBase-root": {
                              color: "black",
                              borderRadius: "8px",
                              height: "40px",
                              minHeight: "40px",
                              textTransform: "none",
                              fontWeight: "550",
                            },
                          }}
                        />
                      );
                    })}
                  </TabList>
                  {schedule?.map((scheDes: tourSche, index: number) => (
                    <TabPanel
                      value={(index + 1).toString()}
                      key={index}
                      sx={{
                        "&.MuiTabPanel-root": {
                          padding: "0px ",
                          position: "relative",
                        },
                      }}
                    >
                      <React.Fragment>
                        <div className="flex flex-col gap-3">
                          <span className="font-medium">
                            {scheDes?.description}
                          </span>
                          <div className="flex flex-col gap-2">
                            {scheDes?.TourScheduleDetail?.map(
                              (detail, index: number) => (
                                <div className="relative pl-5 " key={index}>
                                  <FaCircle className="absolute inset-y-1/3 w-2 left-0" />
                                  <div className="flex gap-1 text-gray-600 font-medium">
                                    <p>{detail?.from}</p>-<p>{detail?.to}</p>
                                  </div>
                                  <span className="text-gray-500">
                                    {detail?.description}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    </TabPanel>
                  ))}
                  <ModalTourScheDetail
                    dataScheDetail={{ schedule, setSchedule }}
                  />
                </div>
              </TabContext>
            </ConstructionDes>
          </Construction>
          <ScreenSP />
        </div>
      </div>
    </>
  );
}

export default ScreenMain;
