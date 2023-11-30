import axios from "axios";
import {
  BannerContainer,
  BannerContent,
  BannerMapContainer,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import React, { ReactNode, useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { BASE_URL } from "../../../store/apiInterceptors";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { FaStaylinked } from "react-icons/fa6";

import GoogleMapReact from "google-map-react";
import { IoMdClose } from "react-icons/io";
import { ElementCheckInput } from "../../../utils/ElementCheckInput";

const LocationStart: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();

  //location start
  const [addressNameStart, setAddressNameStart] = useState("");
  const [addressProvinceStart, setAddressProvinceStart] = useState<any>();

  const [addressDistrictStart, setAddressDistrictStart] = useState<any>();

  const [addressWardStart, setAddressWardStart] = useState<any>();

  const [addProStart, setAddProStart] = useState<any>();

  const [addDisStart, setAddDisStart] = useState<any>();

  const [addWardStart, setAddWardStart] = useState<any>();

  const [coordinates, setCoordinates] = React.useState<
    | {
        latitude: number;
        longitude: number;
      }
    | any
  >(null);

  const [selectedDataProStart, setSelectedDataProStart] = useState<any>();
  const [selectedDataDisStart, setSelectedDataDisStart] = useState<any>();
  const [selectedDataWardStart, setSelectedDataWardStart] = useState<any>();

  const [dataManyLocationStart, setDataManyLocationStart] = useState<any>([]);
  const [checkAddMore, setCheckAddMore] = useState(false);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);

  const [lat, setLat] = useState(
    parseFloat(coordinates?.latitude || "10.8422931")
  );

  const [lng, setLng] = useState(
    parseFloat(coordinates?.longitude || "106.8061656")
  );

  const handleAddMoreDeparture = () => {
    setSelectedDataProStart(undefined);
    setSelectedDataDisStart(undefined);
    setAddressDistrictStart(undefined);
    setSelectedDataWardStart(undefined);
    setAddressWardStart(undefined);
    setCheckAddMore(false);
  };

  useEffect(() => {
    updateFormValues(9, {
      LocationStart: {
        address_name: addressNameStart,
        address_province: selectedDataProStart,
        address_district: selectedDataDisStart,
        address_ward: selectedDataWardStart,
        address_country: "Việt Nam",
        lat_start: lat,
        lng_start: lng,
        find_tour: checkLocation,
      },
    });
  }, [
    addressNameStart,
    selectedDataProStart,
    selectedDataDisStart,
    selectedDataWardStart,
    lat,
    lng,
  ]);

  useEffect(() => {
    setLat(parseFloat(coordinates?.latitude || "10.8422931"));
    setLng(parseFloat(coordinates?.longitude || "106.8061656"));
  }, [coordinates]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/resource/province/all`)
      .then((response: any) => {
        setAddressProvinceStart(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOpenLoading(true);

        const addressSearch = `${addressNameStart}, ${addWardStart?.full_name}, ${addDisStart?.full_name}, ${addProStart?.full_name}, Việt Nam`;
        console.log(addressSearch);

        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            addressSearch
          )}&limit=1` // Limit to 1 result since you are only using the first one
        );

        console.log(response);

        if (response.data.length > 0) {
          const latitude = parseFloat(response.data[0].lat);
          const longitude = parseFloat(response.data[0].lon);
          setCoordinates({ latitude, longitude });
          setOpenLoading(false);
          setCheckLocation(true);
          if (checkAddMore && dataManyLocationStart?.length > 0) {
            setDataManyLocationStart((prevData: any) => {
              const newData = [...prevData];
              newData.pop();

              return [
                ...newData,
                {
                  addressLocationStart: addressSearch,
                  lat: latitude,
                  long: longitude,
                },
              ];
            });
            setCheckAddMore(true);
          } else {
            setDataManyLocationStart((prevData: any) => [
              ...prevData,
              {
                addressLocationStart: addressSearch,
                lat: latitude,
                long: longitude,
              },
            ]);
          }
          setCheckAddMore(true);
        } else {
          console.error("Address not found.");
          setOpenSnackbar(true);
          setOpenLoading(false);
          setSelectedDataProStart(undefined);
          setSelectedDataDisStart(undefined);
          setAddressDistrictStart(undefined);
          setSelectedDataWardStart(undefined);
          setAddressWardStart(undefined);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setOpenSnackbar(true);
        setOpenLoading(false);
      }
    };

    if (addWardStart) {
      fetchData();
    }
  }, [addWardStart]);
  const handleSelectLocation = (data: any, key: string, field: string) => {
    if (field === "locationStart") {
      if (key === "address_province") {
        axios
          .get(`${BASE_URL}/resource/district/provinceCode/${data?.code}`)
          .then((response) => {
            setAddressDistrictStart(response.data.data);
          })
          .catch((error) => {
            console.error("Lỗi khi gọi API:", error);
          });
        setAddProStart(data);
      }
      if (key === "address_district") {
        axios
          .get(`${BASE_URL}/resource/ward/districtCode/${data?.code}`)
          .then((response) => {
            setAddressWardStart(response.data.data);
          })
          .catch((error) => {
            console.error("Lỗi khi gọi API:", error);
          });
        setAddDisStart(data);
      }
      if (key === "address_ward") {
        setAddWardStart(data);
      }
    }
  };
  if (currentStep !== 7) {
    return null;
  }

  const AnyReactComponent = ({
    // lat,
    // lng,
    text,
  }: {
    // lat: number;
    // lng: number;
    text: ReactNode;
  }) => <div>{text}</div>;

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 13,
  };
  const RedMarker = () => <div style={{ color: "red" }}>📍</div>;
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <IoMdClose fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
        onClick={() => setOpenLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BannerContainer className="global-scrollbar">
        <div className="flex flex-col items-center justify-center">
          <BannerContent>
            <CreateTitleNullDes variant="h6">
              Where departure point for trip to tour?
            </CreateTitleNullDes>
            <CreateDescription>
              This is the location where your tour departs.
            </CreateDescription>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message="Address not found yet, please enter another address"
              action={action}
            />
            <BannerMapContainer>
              <div className="text-black flex flex-col gap-3 ">
                <div>
                  <p className="font-medium mb-1">Country Name</p>
                  <div className="relative">
                    <GoLocation className="absolute top-4 left-2" />

                    <div className="bg-white w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-1 focus:outline-navy-blue hover:border-navy-blue  border border-gray-400 ">
                      Việt Nam
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-1">Address Name</p>
                  <div className="relative">
                    <GoLocation className="absolute top-4 left-2" />
                    <input
                      value={addressNameStart || ""}
                      onChange={(e) => setAddressNameStart(e.target.value)}
                      className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-1 focus:outline-navy-blue hover:border-navy-blue  border border-gray-400 "
                      name="address"
                      placeholder="Address"
                      type="text"
                      autoComplete="address-line1"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-1 flex gap-1">
                    Address province
                    {selectedDataProStart === undefined && (
                      <ElementCheckInput />
                    )}
                  </p>
                  <FormControl
                    fullWidth
                    className="relative bg-white shadow-custom-card-mui"
                  >
                    <FaStaylinked className="absolute top-4 left-3" />
                    <Select
                      className=""
                      style={{
                        borderRadius: "8px",
                        height: "50px",
                        paddingLeft: "20px",
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      value={selectedDataProStart?.full_name || ""}
                      onChange={(e) => {
                        const selectedFullname = e.target.value;
                        const selectedData = addressProvinceStart.find(
                          (data: any) => data.full_name === selectedFullname
                        );
                        setSelectedDataProStart(selectedData);
                        handleSelectLocation(
                          selectedData,
                          "address_province",
                          "locationStart"
                        );
                      }}
                    >
                      <MenuItem value="">
                        <em>Please choose type</em>
                      </MenuItem>
                      {addressProvinceStart?.map((data: any) => (
                        <MenuItem key={data?.code} value={data?.full_name}>
                          {data?.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p className="font-medium mb-1 flex gap-1">
                    Address district
                    {selectedDataDisStart === undefined && (
                      <ElementCheckInput />
                    )}
                  </p>
                  <FormControl
                    fullWidth
                    className="relative bg-white shadow-custom-card-mui"
                  >
                    <FaStaylinked className="absolute top-4 left-3" />
                    <Select
                      style={{
                        borderRadius: "8px",
                        height: "50px",
                        paddingLeft: "20px",
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      value={selectedDataDisStart?.full_name || ""}
                      onChange={(e) => {
                        const selectedFullname = e.target.value;
                        const selectedData = addressDistrictStart.find(
                          (data: any) => data.full_name === selectedFullname
                        );
                        setSelectedDataDisStart(selectedData);
                        handleSelectLocation(
                          selectedData,
                          "address_district",
                          "locationStart"
                        );
                      }}
                    >
                      {addressDistrictStart &&
                      addressDistrictStart.length > 0 ? (
                        addressDistrictStart.map((data: any) => (
                          <MenuItem key={data.code} value={data?.full_name}>
                            {data.full_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>Please choose address province</em>
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p className="font-medium mb-1 flex gap-1">
                    Address ward
                    {selectedDataWardStart === undefined && (
                      <ElementCheckInput />
                    )}
                  </p>
                  <FormControl
                    fullWidth
                    className="relative bg-white shadow-custom-card-mui"
                  >
                    <FaStaylinked className="absolute top-4 left-3" />
                    <Select
                      style={{
                        borderRadius: "8px",
                        height: "50px",
                        paddingLeft: "20px",
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      value={selectedDataWardStart?.full_name || ""}
                      onChange={(e) => {
                        const selectedFullname = e.target.value;
                        const selectedData = addressWardStart.find(
                          (data: any) => data.full_name === selectedFullname
                        );
                        setSelectedDataWardStart(selectedData);
                        handleSelectLocation(
                          selectedData,
                          "address_ward",
                          "locationStart"
                        );
                      }}
                    >
                      {addressWardStart && addressWardStart.length > 0 ? (
                        addressWardStart.map((data: any) => (
                          <MenuItem key={data.code} value={data?.full_name}>
                            {data.full_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>Please choose address ward</em>
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="">
                  <p className="font-medium mb-1 flex items-center gap-1">
                    Location
                    {!checkLocation && <ElementCheckInput />}
                  </p>
                  {dataManyLocationStart?.length === 0 ? (
                    <div className="bg-white shadow-custom-card-mui p-3 rounded-lg text-red-500">
                      Please handle search find location
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2">
                        {dataManyLocationStart?.map(
                          (dataLocationStart: {
                            addressLocationStart: string;
                          }) => (
                            <div className="bg-white shadow-custom-card-mui p-3 rounded-lg ">
                              {dataLocationStart?.addressLocationStart}
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                  <div className="text-center mt-4">
                    <button
                      className="bg-white text-center rounded-md p-1 border border-solid border-navy-blue text-navy-blue"
                      onClick={handleAddMoreDeparture}
                    >
                      Add departure
                    </button>
                  </div>
                </div>
              </div>
            </BannerMapContainer>
            <div style={{ height: "400px", width: "600px" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBx6NX4xtTaUpaTpHt6jiWNkrYdD85S5Vw",
                }}
                center={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  // lat={defaultProps.center.lat}
                  // lng={defaultProps.center.lng}
                  text={<RedMarker />}
                />
              </GoogleMapReact>
            </div>
          </BannerContent>
        </div>
      </BannerContainer>
    </>
  );
};

export default LocationStart;
