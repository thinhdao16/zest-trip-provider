import {
  BannerContainer,
  BannerContent,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";

import { IoMdClose } from "react-icons/io";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FaTrash } from "react-icons/fa6";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIconOptions, Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import iconLocation from "../placeholder.png";
import "./style.css";
const customIcon = new Icon({
  iconUrl: iconLocation,
  iconSize: [38, 38],
});

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
  }, [valueDate, valueRecommend, lat, lng, departure]);

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

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    setDeparture((prevDeparture: any) => {
      const updatedDeparture = [...prevDeparture];
      updatedDeparture[index][field] = value;
      return updatedDeparture;
    });
  };

  const handleDeleteDeparture = (index: number) => {
    setDeparture((prevDeparture: any) => {
      const updatedDeparture = [...prevDeparture];
      updatedDeparture.splice(index, 1);
      return updatedDeparture;
    });
  };

  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 18,
  };
  console.log(defaultProps);

  const createClusterCustomIcon = function (cluster: any) {
    const divIconOptions: DivIconOptions = {
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    };
    return divIcon(divIconOptions);
  };

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
    setValueDate("");
    setAddress("");
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
                    searchOptions={{ types: ["address"] }}
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

              <MapContainer
                center={[defaultProps?.center?.lat, defaultProps?.center?.lng]}
                zoom={defaultProps?.zoom}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup
                  chunkedLoading
                  iconCreateFunction={createClusterCustomIcon}
                >
                  {/* {markers.map((marker, index) => ( */}
                  <Marker
                    // key={index}
                    position={[
                      defaultProps?.center?.lat,
                      defaultProps?.center?.lng,
                    ]}
                    icon={customIcon}
                  >
                    {/* <Popup>{marker.popUp}</Popup> */}
                  </Marker>
                  {/* ))} */}
                </MarkerClusterGroup>
              </MapContainer>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              {departure?.length > 0 &&
                departure?.map((departureScreen: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-white rounded-lg p-2 shadow-custom-card-mui flex items-center gap-3">
                      <input
                        className="border-b border-gray-300 focus:outline-none focus:border-black hover:border-black"
                        type="time"
                        value={departureScreen?.time}
                        onChange={(e) =>
                          handleInputChange(index, "time", e.target.value)
                        }
                      />
                      <input
                        className="w-96 border-b border-gray-300 focus:outline-none focus:border-black hover:border-black"
                        type="text"
                        value={departureScreen?.addressLocationStart?.address}
                        onChange={(e) =>
                          handleInputChange(index, "addressLocationStart", {
                            ...departureScreen.addressLocationStart,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      className=" text-red-700"
                      onClick={() => handleDeleteDeparture(index)}
                    >
                      <FaTrash />
                    </button>
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
          </BannerContent>
        </div>
      </BannerContainer>
    </>
  );
};

export default LocationStart;
