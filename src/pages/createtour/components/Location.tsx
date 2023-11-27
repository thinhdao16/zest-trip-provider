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
import { FormControl, MenuItem, Select } from "@mui/material";
import { FaStaylinked } from "react-icons/fa6";

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
      },
    });
  }, [addressName, addPro, addWard, addDis, selectedData]);

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
                  Address Name
                  {addressName?.length < 1 && (
                    <span className="text-red-500">*</span>
                  )}
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
                  />
                </div>
              </div>
              <div>
                <p className="font-medium mb-1 flex items-center gap-1">
                  Address province
                  {formValues[3]?.Location?.address_province === undefined && (
                    <span className="text-red-500">*</span>
                  )}
                </p>

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
                <p className="font-medium mb-1 flex items-center gap-1">
                  Address district
                  {formValues[3]?.Location?.address_district === undefined && (
                    <span className="text-red-500">*</span>
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
                <p className="font-medium mb-1 flex items-center gap-1">
                  Address ward
                  {formValues[3]?.Location?.address_ward === undefined && (
                    <span className="text-red-500">*</span>
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
