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
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { FaStaylinked } from "react-icons/fa6";

import GoogleMapReact from "google-map-react";
import { IoMdClose } from "react-icons/io";

const Location: React.FC = () => {
  const { currentStep, updateFormValues, formValues } = useStepContext();

  const [addressName, setAddressName] = useState("");

  const [countries, setCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [addressProvince, setAddressProvince] = useState<any>();

  const [addressDistrict, setAddressDistrict] = useState<any>();

  const [addressWard, setAddressWard] = useState<any>();

  const [addPro, setAddPro] = useState<any>();

  const [addDis, setAddDis] = useState<any>();

  const [addWard, setAddWard] = useState<any>();
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

  const [selectedData, setSelectedData] = useState<any>();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country: any) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách nước: ", error));

    axios
      .get(`${BASE_URL}/resource/province/all`)
      .then((response: any) => {
        setAddressProvince(response.data.data);
        setAddressProvinceStart(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value);
  };
  useEffect(() => {
    updateFormValues(3, {
      Location: {
        address_name: addressName,
        address_province: addPro,
        address_district: addDis,
        address_ward: addWard,
        address_country: selectedCountry,
      },
    });
  }, [addressName, addPro, addWard, selectedCountry, addDis, selectedData]);

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
  if (currentStep !== 6) {
    return null;
  }

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
                <p className="font-medium mb-1 ">Country/region</p>
                <div className="relative">
                  <GoLocation className="absolute top-4 left-2" />
                  <select
                    className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-1 focus:outline-navy-blue hover:border-navy-blue border border-gray-400  "
                    value={selectedCountry || ""}
                    onChange={handleCountryChange}
                  >
                    <option value="">Choose a country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">Address Name</p>
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
                  />
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">Address province</p>
                <FormControl
                  fullWidth
                  className="relative bg-white shadow-custom-card-mui"
                >
                  <FaStaylinked className="absolute top-4 left-3 " />
                  <Select
                    // className="bg-white"
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
                </FormControl>
              </div>
              <div>
                <p className="font-medium mb-1">Address district</p>
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
                </FormControl>
              </div>
              <div>
                <p className="font-medium mb-1">Address ward</p>
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
                </FormControl>
              </div>{" "}
            </div>
          </BannerMapContainer>
        </BannerContent>
      </div>
    </BannerContainer>
  );
};

export default Location;
