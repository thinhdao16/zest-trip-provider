import {
  BannerContainer,
  BannerContent,
  BannerMapContainer,
  CreateDescription,
  CreateIconContent,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { TextField, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/joy";
import { GoLocation, GoPlusCircle } from "react-icons/go";

const Location: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [formList, setFormList] = useState([
    {
      id: 0,
      value: "",
    },
  ]);
  const [location, setLocation] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country: any) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách nước: ", error));
  }, []);

  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value);
  };
  useEffect(() => {
    updateFormValues(3, { Location: location });
  }, [location]);

  const handleFormChange = (value: string) => {
    setLocation(value);
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
                <p className="font-medium mb-1">Address line 1</p>
                <div className="relative">
                  <GoLocation className="absolute top-4 left-2" />
                  <input
                    value={location}
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
                <p className="font-medium mb-1">Address line 2 (optional)</p>
                <div className="relative">
                  <GoLocation className="absolute top-4 left-2" />
                  <input
                    className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-1 focus:outline-navy-blue hover:border-navy-blue  border border-gray-400 "
                    name="apartment"
                    placeholder="Apartment number"
                    type="text"
                    autoComplete="address-line2"
                  />
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">City (optional)</p>
                <div className="relative">
                  <GoLocation className="absolute top-4 left-2" />
                  <input
                    className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-nonefocus:outline-1 focus:outline-navy-blue hover:border-navy-blue  border border-gray-400 "
                    name="city"
                    placeholder="City"
                    type="text"
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              <div>
                <p className="font-medium mb-1">
                  {" "}
                  State/province/region/territory (optional)
                </p>
                <div className="relative">
                  <GoLocation className="absolute top-4 left-2" />
                  <input
                    className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-1 focus:outline-navy-blue hover:border-navy-blue  border border-gray-400 "
                    name="state"
                    placeholder="State"
                    type="text"
                    autoComplete="address-level1"
                  />
                </div>
              </div>
              <div>
                <span className="font-medium mb-1">
                  {" "}
                  Postal code (optional)
                </span>
                <div className="relative">
                  <GoLocation className="absolute top-4 left-2" />
                  <input
                    className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:outline-1 focus:outline-navy-blue hover:border-navy-blue  border border-gray-400 "
                    name="postcode"
                    placeholder="Postcode"
                    type="text"
                    autoComplete="postal-code"
                  />
                </div>
              </div>
            </div>
          </BannerMapContainer>
        </BannerContent>
      </div>
    </BannerContainer>
  );
};
export default Location;
