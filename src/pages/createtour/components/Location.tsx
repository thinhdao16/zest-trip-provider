import axios from "axios";
import {
  BannerContainer,
  BannerContent,
  BannerMapContainer,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { BASE_URL } from "../../../store/apiInterceptors";
import { Autocomplete, TextField } from "@mui/material";
import { FaStaylinked } from "react-icons/fa6";
import { ElementCheckInput } from "../../../utils/ElementCheckInput";

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

const Location: React.FC = () => {
  const { currentStep, updateFormValues, formValues } = useStepContext();

  const [addressName, setAddressName] = useState("");

  const [addressProvince, setAddressProvince] = useState<any>();

  const [addressDistrict, setAddressDistrict] = useState<any>();

  const [addressWard, setAddressWard] = useState<any>();

  const [addPro, setAddPro] = useState<any>();

  const [addDis, setAddDis] = useState<any>();

  const [addWard, setAddWard] = useState<any>();

  const [selectedData, setSelectedData] = useState<any>();

  const [inputCompleted, setInputCompleted] = useState<any>(false);

  const [coordinates, setCoordinates] = React.useState<
    | {
        latitude: number;
        longitude: number;
      }
    | any
  >(null);

  const [lat, setLat] = useState(
    parseFloat(coordinates?.latitude || "10.8422931")
  );

  const [lng, setLng] = useState(
    parseFloat(coordinates?.longitude || "106.8061656")
  );

  useEffect(() => {
    axios
      .get(`${BASE_URL}/resource/province/all`)
      .then((response: any) => {
        setAddressProvince(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    updateFormValues(3, {
      Location: {
        address_name: addressName,
        address_province: addPro,
        address_district: addDis,
        address_ward: addWard,
        address_country: "Việt Nam",
        lat: lat,
        lng: lng,
      },
    });
  }, [addressName, addPro, addWard, addDis, selectedData]);

  const apiKey = "AIzaSyDKm7Jq04yAY0uFMM2GrcDDY-39lEez9e4";
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputCompleted) {
          const addressSearch = `${addressName}, ${addWard?.full_name}, ${addDis?.full_name}, ${addPro?.full_name}, Việt Nam`;
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encodeURIComponent(
              addressSearch
            )}&sensor=flase`
          );
          console.log(response);
          // Check if there is a valid result in the response
          if (
            response.data &&
            response.data.results &&
            response.data.results.length > 0 &&
            response.data.results[0].geometry &&
            response.data.results[0].geometry.location
          ) {
            const { lat, lng } = response.data.results[0].geometry.location;

            // Set coordinates
            setCoordinates({
              latitude: lat,
              longitude: lng,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchData();
  }, [
    addDis?.full_name,
    addPro?.full_name,
    addWard?.full_name,
    addressName,
    inputCompleted,
  ]);

  useEffect(() => {
    setLat(parseFloat(coordinates?.latitude || "10.8422931"));
    setLng(parseFloat(coordinates?.longitude || "106.8061656"));
  }, [coordinates]);

  const handleFormChange = (value: string) => {
    setAddressName(value);
  };

  const handleSelectLocation = (data: any, key: string, field: string) => {
    if (field === "location") {
      if (key === "address_province") {
        axios
          .get(`${BASE_URL}/resource/district/provinceCode/${data?.code}`)
          .then((response) => {
            setAddressDistrict(response.data.data);
          })
          .catch((error) => {
            console.error("Lỗi khi gọi API:", error);
          });
        setAddPro(data);
      }
      if (key === "address_district") {
        axios
          .get(`${BASE_URL}/resource/ward/districtCode/${data?.code}`)
          .then((response) => {
            setAddressWard(response.data.data);
          })
          .catch((error) => {
            console.error("Lỗi khi gọi API:", error);
          });
        setAddDis(data);
      }
      if (key === "address_ward") {
        setAddWard(data);
      }
    }
  };

  const handleInputFocus = () => {
    setInputCompleted(false);
  };
  const handleInputBlur = () => {
    setInputCompleted(true);
    // Lưu trạng thái khi input đã nhập xong và thoát khỏi focus
  };

  ElementCheckInput;

  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 18,
  };
  console.log(defaultProps);
  if (currentStep !== 6) {
    return null;
  }

  const createClusterCustomIcon = function (cluster: any) {
    const divIconOptions: DivIconOptions = {
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    };
    return divIcon(divIconOptions);
  };

  return (
    <BannerContainer className="global-scrollbar">
      <div className="flex flex-col items-center justify-center">
        <BannerContent>
          <CreateTitleNullDes variant="h6">
            Where does your tour take place?
          </CreateTitleNullDes>
          <CreateDescription>
            This is the location where your tour departs.
          </CreateDescription>

          <BannerMapContainer>
            <div className="text-black gap-y-3 grid ">
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
                <p className="font-medium mb-1 flex items-center gap-1">
                  Address province
                  {formValues[3]?.Location?.address_province === undefined && (
                    <ElementCheckInput />
                  )}
                </p>
                <Autocomplete
                  value={formValues[3]?.Location?.address_province}
                  className="relative bg-white shadow-custom-card-mui rounded-lg"
                  disablePortal
                  options={addressProvince}
                  getOptionLabel={(option: { full_name: string }) =>
                    option?.full_name
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params?.InputProps,
                        startAdornment: (
                          <FaStaylinked className=" top-4 left-3" />
                        ),
                      }}
                      className="m-4"
                    />
                  )}
                  onChange={(_event, newValue) => {
                    setSelectedData(newValue);
                    handleSelectLocation(
                      newValue,
                      "address_province",
                      "location"
                    );
                  }}
                />
                {/* <FormControl
                  fullWidth
                  className="relative bg-white shadow-custom-card-mui rounded-lg"
                >
                  <FaStaylinked className="absolute top-4 left-3 " />
                  <Select
                    style={{
                      borderRadius: "8px",
                      height: "50px",
                      paddingLeft: "20px",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={
                      formValues[3]?.Location?.address_province?.full_name || ""
                    }
                    onChange={(e) => {
                      const selectedFullname = e.target.value;
                      const selectedData = addressProvince.find(
                        (data: any) => data.full_name === selectedFullname
                      );
                      setSelectedData(selectedData);
                      handleSelectLocation(
                        selectedData,
                        "address_province",
                        "location"
                      );
                    }}
                  >
                    <MenuItem value="">
                      <em>Please choose type</em>
                    </MenuItem>
                    {addressProvince?.map((data: any) => (
                      <MenuItem key={data?.code} value={data?.full_name}>
                        {data?.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </div>
              <div>
                <p className="font-medium mb-1 flex items-center gap-1">
                  Address district
                  {formValues[3]?.Location?.address_district === undefined && (
                    <ElementCheckInput />
                  )}
                </p>
                {/* <FormControl
                  fullWidth
                  className="relative bg-white shadow-custom-card-mui rounded-lg"
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
                    value={
                      formValues[3]?.Location?.address_district?.full_name || ""
                    }
                    onChange={(e) => {
                      const selectedData = addressDistrict.find(
                        (data: any) => data.full_name === e.target.value
                      );
                      setSelectedData(selectedData);
                      handleSelectLocation(
                        selectedData,
                        "address_district",
                        "location"
                      );
                    }}
                  >
                    {addressDistrict && addressDistrict.length > 0 ? (
                      addressDistrict.map((data: any) => (
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
                </FormControl> */}
                <Autocomplete
                  value={formValues[3]?.Location?.address_district}
                  className="relative bg-white shadow-custom-card-mui rounded-lg"
                  disablePortal
                  id="combo-box-demo"
                  options={addressDistrict || []}
                  getOptionLabel={(option: { full_name: string }) =>
                    option?.full_name
                  }
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(_event, newValue) => {
                    setSelectedData(newValue);
                    handleSelectLocation(
                      newValue,
                      "address_district",
                      "location"
                    );
                  }}
                />
              </div>
              <div>
                <p className="font-medium mb-1 flex items-center gap-1">
                  Address ward
                  {formValues[3]?.Location?.address_ward === undefined && (
                    <ElementCheckInput />
                  )}
                </p>
                {/* <FormControl
                  fullWidth
                  className="relative bg-white shadow-custom-card-mui rounded-lg"
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
                    value={
                      formValues[3]?.Location?.address_ward?.full_name || ""
                    }
                    onChange={(e) => {
                      const selectedData = addressWard.find(
                        (data: any) => data.full_name === e.target.value
                      );
                      setSelectedData(selectedData);
                      handleSelectLocation(
                        selectedData,
                        "address_ward",
                        "location"
                      );
                    }}
                  >
                    {addressWard && addressWard.length > 0 ? (
                      addressWard.map((data: any) => (
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
                </FormControl> */}

                <Autocomplete
                  value={formValues[3]?.Location?.address_ward}
                  className="relative bg-white shadow-custom-card-mui rounded-lg"
                  disablePortal
                  options={addressWard || []}
                  getOptionLabel={(option: { full_name: string }) =>
                    option?.full_name
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params?.InputProps,
                        startAdornment: (
                          <FaStaylinked className=" top-4 left-3" />
                        ),
                      }}
                      className="m-4"
                    />
                  )}
                  onChange={(_event, newValue) => {
                    setSelectedData(newValue);
                    handleSelectLocation(
                      selectedData,
                      "address_ward",
                      "location"
                    );
                  }}
                />
              </div>{" "}
              <div>
                <p className="font-medium mb-1 flex items-center gap-1">
                  Address Name
                  {addressName?.length < 1 && <ElementCheckInput />}
                </p>
                <div className="relative">
                  <GoLocation className="absolute top-4 left-2" />
                  <input
                    value={addressName || ""}
                    onChange={(e) => handleFormChange(e.target.value)}
                    className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-1 focus:outline-navy-blue hover:border-navy-blue  border border-gray-400 "
                    name="address"
                    placeholder="Address"
                    type="text"
                    autoComplete="address-line1"
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                  />
                </div>
              </div>
              <div className="bg-white">
                <MapContainer
                  center={[
                    defaultProps?.center?.lat,
                    defaultProps?.center?.lng,
                  ]}
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
                    ></Marker>
                    {/* ))} */}
                  </MarkerClusterGroup>
                </MapContainer>
              </div>
            </div>
          </BannerMapContainer>
        </BannerContent>
      </div>
    </BannerContainer>
  );
};

export default Location;
