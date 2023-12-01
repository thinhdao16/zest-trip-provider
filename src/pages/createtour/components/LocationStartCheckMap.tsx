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

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationStart: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();

  //location start
  const [addressNameStart, setAddressNameStart] = useState("");

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

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [valueRecommend, setValueRecommend] = useState<any>(null);
  const [valueDate, setValueDate] = useState("");
  const [lat, setLat] = useState(
    parseFloat(valueRecommend?.lat || "10.8422931")
  );
  const [lng, setLng] = useState(
    parseFloat(valueRecommend?.lng || "106.8061656")
  );

  const [departure, setDeparture] = useState([]);

  console.log(departure);
  const [address, setAddress] = useState("");

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
    setLat(parseFloat(valueRecommend?.lat || "10.8422931"));
    setLng(parseFloat(valueRecommend?.lng || "106.8061656"));
  }, [valueRecommend]);
  if (currentStep !== 7) {
    return null;
  }

  const AnyReactComponent = ({ text }: { text: ReactNode }) => (
    <div>{text}</div>
  );

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
    zoom: 18,
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
  const handleChange = (newAddress: any) => {
    setAddress(newAddress);
  };

  const handleSelect = async (newAddress: any) => {
    try {
      const results = await geocodeByAddress(newAddress);
      const latLng = await getLatLng(results[0]);

      const { lat, lng } = latLng;

      console.log("Success", latLng);
      setValueRecommend({
        address: newAddress,
        lat,
        lng,
        status: "success",
      });
    } catch (error) {
      console.error("Error", error);

      // Nếu có lỗi, cũng lưu thông tin địa chỉ, nhưng không lưu toạ độ và đặt trạng thái là 'error'
      setValueRecommend({
        address: newAddress,
        status: "error",
      });
    }
  };
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
            <div>
              <input
                type="time"
                value={valueDate}
                onChange={(e) => setValueDate(e.target.value)}
              />
              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                searchOptions={{ types: ["address"] }} // Thêm các tùy chọn để chỉ định loại địa chỉ cần tìm kiếm
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
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
            {/* <BannerMapContainer>
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
            </BannerMapContainer> */}
          </BannerContent>
        </div>
      </BannerContainer>
    </>
  );
};

export default LocationStart;
