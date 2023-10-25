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
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FaStaylinked } from "react-icons/fa6";

const Location: React.FC = () => {
  const { currentStep, updateFormValues, formValues } = useStepContext();

  const [addressName, setAddressName] = useState("");

  const [countries, setCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [addressProvince, setAddressProvince] = useState<[]>();

  const [addressDistrict, setAddressDistrict] = useState<[]>();

  const [addressWard, setAddressWard] = useState<[]>();

  const [addPro, setAddPro] = useState("");

  const [addDis, setAddDis] = useState("");

  const [addWard, setAddWard] = useState("");

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
  }, [addressName, addPro, addWard, selectedCountry, addDis]);

  const handleFormChange = (value: string) => {
    setAddressName(value);
  };

  const handleSelectLocation = (e: SelectChangeEvent<any>, key: string) => {
    const selectValue = e.target.value;
    if (key === "address_province") {
      axios
        .get(`${BASE_URL}/resource/district/provinceCode/${selectValue?.code}`)
        .then((response) => {
          setAddressDistrict(response.data.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API:", error);
        });
      setAddPro(selectValue);
    }
    if (key === "address_district") {
      axios
        .get(`${BASE_URL}/resource/ward/districtCode/${selectValue?.code}`)
        .then((response) => {
          setAddressWard(response.data.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API:", error);
        });
      setAddDis(selectValue);
    }
    if (key === "address_ward") {
      setAddWard(selectValue);
    }
  };
  if (currentStep !== 6) {
    return null;
  }

  return (
    <BannerContainer className="global-scrollbar">
      <div className="flex items-center justify-center">
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
                    value={selectedCountry}
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
                    value={addressName}
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
                <FormControl fullWidth className="relative">
                  <FaStaylinked className="absolute top-4 left-3" />
                  <Select
                    style={{
                      borderRadius: "8px",
                      height: "50px",
                      paddingLeft: "20px",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    // value={userInfo?.address_province}
                    onChange={(e) =>
                      handleSelectLocation(e, "address_province")
                    }
                  >
                    <MenuItem value="">
                      <em>Please choose type</em>
                    </MenuItem>
                    {addressProvince?.map((data: any) => (
                      <MenuItem key={data?.code} value={data}>
                        {data?.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <p className="font-medium mb-1">Address district</p>
                <FormControl fullWidth className="relative">
                  <FaStaylinked className="absolute top-4 left-3" />
                  <Select
                    style={{
                      borderRadius: "8px",
                      height: "50px",
                      paddingLeft: "20px",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    // value={userInfo?.address_district}
                    onChange={(e) =>
                      handleSelectLocation(e, "address_district")
                    }
                  >
                    {addressDistrict && addressDistrict.length > 0 ? (
                      addressDistrict.map((data: any) => (
                        <MenuItem key={data.code} value={data}>
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
                <FormControl fullWidth className="relative">
                  <FaStaylinked className="absolute top-4 left-3" />
                  <Select
                    style={{
                      borderRadius: "8px",
                      height: "50px",
                      paddingLeft: "20px",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    // value={userInfo?.address_ward}
                    onChange={(e) => handleSelectLocation(e, "address_ward")}
                  >
                    {addressWard && addressWard.length > 0 ? (
                      addressWard.map((data: any) => (
                        <MenuItem key={data.code} value={data}>
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
