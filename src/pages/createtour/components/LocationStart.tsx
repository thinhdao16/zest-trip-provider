import {
  BannerContainer,
  BannerContent,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";

import GoogleMapReact from "google-map-react";
import { IoMdClose } from "react-icons/io";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationStart: React.FC = () => {
  const { currentStep, updateFormValues, formValues } = useStepContext();
  console.log(formValues);
  //location start

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [valueRecommend, setValueRecommend] = useState<any>(null);
  const [valueDate, setValueDate] = useState("");

  const [addValueLocation, setAddValueLocation] = useState(true);

  const [lat, setLat] = useState(
    parseFloat(valueRecommend?.lat || "10.8422931")
  );
  const [lng, setLng] = useState(
    parseFloat(valueRecommend?.lng || "106.8061656")
  );

  const [departure, setDeparture] = useState<any>([]);

  console.log(departure);
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (addValueLocation) {
      setDeparture((prevData: any) => {
        const newData = [...prevData];
        newData.pop();

        return [
          ...newData,
          {
            addressLocationStart: valueRecommend,
            time: valueDate,
          },
        ];
      });
    } else {
      setDeparture((prevData: any) => [
        ...prevData,
        {
          addressLocationStart: valueRecommend,
          time: valueDate,
        },
      ]);
    }
  }, [valueDate, valueRecommend]);

  useEffect(() => {
    setAddValueLocation(true);
  }, [valueDate, valueRecommend]);
  useEffect(() => {
    updateFormValues(9, {
      LocationStart: departure,
    });
  }, [valueDate, valueRecommend, lat, lng]);

  useEffect(() => {
    setLat(parseFloat(valueRecommend?.lat || "10.8422931"));
    setLng(parseFloat(valueRecommend?.lng || "106.8061656"));
  }, [valueRecommend]);
  if (currentStep !== 7) {
    return null;
  }

  const handleTimeChange = (e: any) => {
    console.log(e.target.value);
    setValueDate(e.target.value);
  };

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
    zoom: 15,
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
      setValueRecommend({
        address: newAddress,
        status: "error",
      });
    }
  };
  const handleAddlocation = () => {
    console.log("object");
    setAddValueLocation(false);
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

            <div
              style={{ height: "400px", width: "600px" }}
              className="relative"
            >
              <div className="py-4 px-20 absolute top-2 z-50 w-full">
                <div className="w-full">
                  <div className="text-center">
                    <input
                      className="bg-white mb-2 p-2 rounded-lg border border-gray-300"
                      type="time"
                      value={valueDate}
                      onChange={handleTimeChange}
                    />
                  </div>

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
                      <div className="">
                        <input
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input",
                          })}
                          className=" w-full rounded-xl p-4 focus:outline-none focus:rounded-b-none focus:border-b focus:border-solid focus:border-gray-300"
                        />
                        <div className="autocomplete-dropdown-container bg-white max-h-56 overflow-auto global-scrollbar rounded-b-xl ">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion: any) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  // style,
                                })}
                                className=" px-4 py-3"
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
              </div>

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
            <div className="flex flex-col gap-2 mt-5">
              {departure?.length > 0 &&
                departure?.map((departureScreen: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-2 shadow-custom-card-mui "
                  >
                    <span>
                      {departureScreen?.addressLocationStart?.address}
                    </span>
                    <span>{departureScreen?.time}</span>
                  </div>
                ))}
            </div>

            {addValueLocation && (
              <button
                type="button"
                className="bg-white  rounded-lg  px-4 py-1 mt-4 text-navy-blue border border-navy-blue"
                onClick={() => handleAddlocation()}
              >
                Add more departure
              </button>
            )}
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
