import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";
import Construction, {
  ConstructionDes,
  ConstructionTitle,
  ConstructionTitletext,
} from "./singlePageConst/Construction";
import { FaCircle, FaHardDrive } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import AutoResizableTextarea from "./singlePageConst/AutoResizableTextarea";
import { TourTag, VehicleTag } from "../../../components/icon/tour/tag";
import TabContext from "@mui/lab/TabContext";
import { Backdrop, Box, CircularProgress, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./detail.css";
import ModalTag from "./Modal/ModalTag";
import ModalVehicle from "./Modal/ModalVehicle";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { addTourImage } from "../../../store/redux/silce/tourSlice";
import { DataContext } from "../../../store/dataContext/DataContext";
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
  const loadingTourImageDetail: any = useSelector(
    (state: any) => state.tour.loadingTourImageDetail
  );
  const dispatch: AppDispatch = useDispatch();
  const { setRefreshTourDetail } = useContext(DataContext);
  useEffect(() => {
    if (tourDetail) {
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
    }
  }, [tourDetail]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [footnote, setFootnote] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressDis, setAddressDis] = useState("");
  const [addressPro, setAddressPro] = useState("");
  const [addressWard, setAddressWard] = useState("");
  const [valueTab, setValueTab] = useState("1");
  const [schedule, setSchedule] = useState([]);
  const [tourTag, setTourTag] = useState([]);
  const [tourVehicle, setTourVehicle] = useState([]);
  const [tourImages, setTourImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState<any>([]);

  const handleValueTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const handleImageChange = (e: any) => {
    const files = e.target.files;
    console.log(files);
    setSelectedImages([...selectedImages, ...files]);
    const formData = new FormData();
    for (const image of files) {
      formData.append("tour_images", image);
    }

    const allForm = { formData, id: tourDetail?.id };
    dispatch(addTourImage(allForm)).then((response) => {
      if (addTourImage?.fulfilled.match(response)) {
        setRefreshTourDetail((prev) => !prev);
      }
    });
    setSelectedImages([]);
  };
  const removeImage = (imageURL: string) => {
    console.log(imageURL);
    const updatedImages = tourImages.filter((image) => image !== imageURL);
    setTourImages(updatedImages);
  };
  console.log(tourDetail);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingTourImageDetail}
        onClick={() => loadingTourImageDetail(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-main rounded-xl p-4 h-full overflow-y-auto global-scrollbar">
        <div className="mb-4">
          <span className="font-medium text-xl">Infomation basic</span>
        </div>
        <div className="flex flex-col gap-3 px-4">
          <div className="grid grid-cols-12">
            <div className="grid grid-cols-12 gap-4 col-span-5">
              <div className="col-span-5 flex justify-end">
                <ConstructionTitletext>Tour type</ConstructionTitletext>
              </div>
              <div className="col-span-7  ">
                <div className="border-navy-blue  border-l-4 p-2 rounded-lg bg-white cursor-not-allowed border-solid ">
                  {tourDetail?.tour_location_type}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 col-span-4">
              <div className="col-span-3 flex justify-end">
                <ConstructionTitletext>Status</ConstructionTitletext>
              </div>
              <div className="col-span-8 ">
                <div className="border-navy-blue border-l-4 p-2 rounded-lg bg-white cursor-not-allowed border-solid ">
                  {tourDetail?.status}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 col-span-3">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Duration</ConstructionTitletext>
              </div>
              <div className="col-span-8 ">
                <div className="border-navy-blue border-l-4 p-2 rounded-lg bg-white cursor-not-allowed border-solid ">
                  {tourDetail?.duration}
                </div>
              </div>
            </div>
          </div>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Image product</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <span className="font-medium">*Image ratio 1:1</span>
              <div className="grid grid-cols-5 gap-4 border">
                {tourImages?.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="border border-solid bg-white border-gray-300 rounded-lg p-1"
                    style={{ display: "flex" }}
                  >
                    <img
                      className="object-cover rounded-lg"
                      src={img}
                      alt="error"
                      style={{ width: "100px", height: "100px", flexGrow: 1 }}
                    />
                    <button onClick={() => removeImage(img)}>Xóa</button>
                  </div>
                ))}
                <div className="border border-solid bg-white border-gray-300 rounded-lg p-1 h-20">
                  <input type="file" multiple onChange={handleImageChange} />
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
                <FaHardDrive className="absolute top-3 left-3 " />
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
                <FaHardDrive className="absolute top-3 left-3 " />
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
                <FaHardDrive className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={addressName || tourDetail?.address_name}
                  onChange={(e) => setAddressName(e.target.value)}
                  type="text"
                />
              </div>
            </ConstructionDes>
          </Construction>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address country</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaHardDrive className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={addressCountry || tourDetail?.address_country}
                  onChange={(e) => setAddressCountry(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address district</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaHardDrive className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={addressDis || tourDetail?.address_district}
                  onChange={(e) => setAddressDis(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address province</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaHardDrive className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={addressPro || tourDetail?.address_province}
                  onChange={(e) => setAddressPro(e.target.value)}
                  type="text"
                />
              </div>
            </div>{" "}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 flex justify-end">
                <ConstructionTitletext>Address ward</ConstructionTitletext>
              </div>
              <div className="col-span-8 relative">
                <FaHardDrive className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={addressWard || tourDetail?.address_ward}
                  onChange={(e) => setAddressWard(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          </div>
          <Construction>
            <ConstructionTitle>
              <ConstructionTitletext>Tour Schedule</ConstructionTitletext>
            </ConstructionTitle>
            <ConstructionDes>
              <TabContext value={valueTab}>
                <div className="bg-white  rounded-lg shadow-custom-card-mui p-4">
                  <TabList
                    onChange={handleValueTab}
                    aria-label="lab API tabs example"
                    className="tab-lish"
                  >
                    {tourDetail?.TourSchedule?.map(
                      (scheTit: tourSche, index: string) => {
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
                      }
                    )}
                  </TabList>
                  {tourDetail?.TourSchedule?.map(
                    (scheDes: tourSche, index: number) => (
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
                    )
                  )}
                </div>
              </TabContext>
            </ConstructionDes>
          </Construction>
        </div>
      </div>
    </>
  );
}

ScreenMain.propTypes = {};

export default ScreenMain;
