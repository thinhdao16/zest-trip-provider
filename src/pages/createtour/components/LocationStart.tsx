import {
  BannerContainer,
  BannerContent,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import { FaTrash } from "react-icons/fa6";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIconOptions, Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import iconLocation from "../placeholder.png";
import "./style.css";
import axios from "axios";
import { message } from "antd";
const customIcon = new Icon({
  iconUrl: iconLocation,
  iconSize: [38, 38],
});

const LocationStart: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  // console.log(formValues);
  //location start
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

  const [departure, setDeparture] = useState<any>(
    [] || ["10.8422931", "106.8061656"]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceDelay = 300; // Thời gian trì hoãn (milliseconds)
  let debounceTimer: any;

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
  useEffect(() => {
    // Update lat, lng when valueRecommend changes
    setLat(parseFloat(valueRecommend?.lat || "10.8422931"));
    setLng(parseFloat(valueRecommend?.lng || "106.8061656"));
  }, [valueRecommend]);

  useEffect(() => {
    const debounceSearch = () => {
      if (searchQuery.length > 5) {
        setLoading(true);
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`;

        fetch(nominatimUrl)
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Lỗi khi thực hiện yêu cầu Nominatim:", error);
            setLoading(false);
          });
      } else {
        setSuggestions([]);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    debounceTimer = setTimeout(debounceSearch, debounceDelay);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setSuggestions([]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCancelSuggest = () => {
    setSuggestions([]);
  };

  const handleInputChanges = async (event: any) => {
    const addressSearch = event.target.value;
    setSearchQuery(addressSearch);
  };

  const handleKeyPress = async (event: any) => {
    if (event.key === "Enter") {
      if (searchQuery?.length > 0) {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}`
        );
        if (response.data && response.data.length > 0) {
          const lat = response.data[0].lat;
          const lng = response.data[0].lon;
          setValueRecommend({
            address: searchQuery,
            lat,
            lng,
          });
        } else {
          setValueRecommend({
            address: searchQuery,
          });
        }
      } else {
        message.warning("Please input departure");
      }
    }
  };

  const handleSuggestionSelect = (selectedSuggestion: any) => {
    const { lat, lon, display_name } = selectedSuggestion;
    setValueRecommend({
      address: display_name,
      lat,
      lng: lon,
      status: "success",
    });
  };

  if (currentStep !== 7) {
    return null;
  }

  const handleTimeChange = (e: any) => {
    setValueDate(e.target.value);
  };
  const handleInputChange = (index: number, field: string, value: string) => {
    const fieldNull = departure?.filter(
      (value: any) => value?.addressLocationStart === null
    );
    if (fieldNull?.length > 0) {
      message.warning("Please enter a valid");
    } else {
      setDeparture((prevDeparture: any) => {
        const updatedDeparture = [...prevDeparture];
        updatedDeparture[index][field] = value;
        return updatedDeparture;
      });
    }
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

  const createClusterCustomIcon = function (cluster: any) {
    const divIconOptions: DivIconOptions = {
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    };
    return divIcon(divIconOptions);
  };

  const handleAddlocation = () => {
    setValueDate("");
    setAddValueLocation(false);
    setSearchQuery("");
  };

  const MapComponent = () => {
    const map = useMap();
    map.setView([lat, lng]);
    return null;
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
        <div
          className="flex flex-col items-center justify-center"
          onClick={handleCancelSuggest}
        >
          <BannerContent>
            <CreateTitleNullDes variant="h6">
              Where departure point for trip to tour?
            </CreateTitleNullDes>
            <CreateDescription>
              This is the location where your tour departs.
            </CreateDescription>

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
                  <div>
                    <div className="">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChanges}
                        onKeyDown={handleKeyPress}
                        className="w-full rounded-xl p-4 focus:outline-none focus:rounded-b-none focus:border-b focus:border-solid focus:border-gray-300"
                      />
                      <div className="autocomplete-dropdown-container bg-white max-h-56 overflow-auto global-scrollbar rounded-b-xl ">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion: any, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              className=" px-4 py-3"
                            >
                              <span>{suggestion.display_name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <MapContainer center={[lat, lng]} zoom={8}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup
                  chunkedLoading
                  iconCreateFunction={createClusterCustomIcon}
                >
                  {departure?.[0]?.addressLocationStart !== null ? (
                    <>
                      {departure?.map((coordinate: any) => (
                        <Marker
                          position={[
                            coordinate?.addressLocationStart?.lat,
                            coordinate?.addressLocationStart?.lng,
                          ]}
                          icon={customIcon}
                        ></Marker>
                      ))}
                    </>
                  ) : (
                    <Marker
                      position={[
                        defaultProps?.center?.lat,
                        defaultProps?.center?.lng,
                      ]}
                      icon={customIcon}
                    >
                      đâs
                    </Marker>
                  )}
                </MarkerClusterGroup>
                <MapComponent />
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
