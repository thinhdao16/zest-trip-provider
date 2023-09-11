import React, { ChangeEvent, useState } from "react";
import {
  BannerContainer,
  BannerContent,
  BannerContentPrice,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Input } from "./input";
import { dataTypePrice } from "../dataFake";

interface InputValue {
  labelMain: string;
  value: number;
}

interface PriceData {
  [key: string]: string;
}
const radioItems = [
  "Standard",
  "Free - ticket required",
  "Free - no ticket required",
  "Not permitted",
];

const Price: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedRadio, setSelectedRadio] = useState(radioItems[0]);
  const initialInputValues: InputValue[] = dataTypePrice.map((data: any) => ({
    labelMain: data.labelMain,
    value: parseFloat(data.value), // Chuyển đổi kiểu string sang number
  }));
  const [inputValues, setInputValues] =
    useState<InputValue[]>(initialInputValues);
  const options = [];
  for (let i = 0; i <= 99; i++) {
    options.push(
      <option className="font-medium" key={i} value={i}>
        {i}
      </option>
    );
  }
  const handleInput = (index: number, value: string) => {
    const updatedInputValues: any = [...inputValues];
    updatedInputValues[index].value = value;
    setInputValues(updatedInputValues);
  };

  React.useEffect(() => {
    if (currentStep === 8) {
      const priceData: PriceData = inputValues.reduce((data, input) => {
        data[input.labelMain] = input.value.toString(); // Chuyển đổi lại thành string nếu cần
        return data;
      }, {} as PriceData);
      updateFormValues(6, priceData);
    }
  }, [inputValues]);

  if (currentStep !== 8) {
    return null;
  }

  return (
    <BannerContainer>
      <BannerContentPrice>
        <CreateTitleNullDes>Setting price and tickets</CreateTitleNullDes>
        <CreateDescription>Enter the pricing information</CreateDescription>
        {dataTypePrice.map((data, index) => (
          <Input
            key={index}
            labelMain={data.labelMain}
            placeholder="inputs"
            type={data?.type}
            icon={data.icon}
            onChange={(e) => handleInput(index, e.target.value)}
          />
        ))}
        <div className="mt-3">
          <p className="font-medium">Prices per person</p>
          <div className="p-4 rounded" style={{ border: "1px solid black" }}>
            <p className="font-semibold text-lg">Student (with ID)</p>
            <div className="grid md:grid-cols-12">
              <div className="col-span-5">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
                  <div>
                    <p className="font-medium">Age range</p>
                    <div className="flex items-center">
                      <select
                        id="countries1"
                        className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {options}
                      </select>
                      <p className="mx-1">-</p>
                      <select
                        id="countries2"
                        className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {options}
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Booking category </p>
                    <div>
                      {radioItems.map((item, index) => (
                        <div className="flex items-center mb-1" key={index}>
                          <input
                            id={`default-radio-${index + 1}`}
                            type="radio"
                            name="default-radio"
                            className="w-3 h-3"
                            checked={selectedRadio === item}
                            onChange={() => setSelectedRadio(item)}
                          />
                          <label
                            htmlFor={`default-radio-${index + 1}`}
                            className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-7">
                {" "}
                {selectedRadio === "Standard" && (
                  <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
                    <div>
                      <div className="font-medium">Number of People</div>
                      <div className="flex items-center">
                        <p className="font-medium">1</p>
                        <p>-</p>
                        <input
                          type="number"
                          id="first_name"
                          className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                          defaultValue="0"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Retail price</p>
                      <input
                        type="number"
                        id="first_name"
                        className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium  rounded-md p-2"
                        defaultValue="0"
                        required
                      />
                    </div>
                    <div>
                      <p className="font-medium">Commission</p>
                      <p className="font-medium">30%</p>
                    </div>
                    <div>
                      <div className="font-medium">Payout per person</div>
                      <div className="flex items-center">
                        <input className="p-2 w-20 bg-slate-200 rounded-md" />
                        <p className="font-medium">VND</p>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <p className="font-bold">Set up price tiers</p>
                    </div>
                  </div>
                )}
                {selectedRadio === "Free - ticket required" && (
                  <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
                    <div></div>
                    <div>
                      <div className="font-medium">Number of People</div>
                      <div className="flex items-center">
                        <p className="font-medium">1</p>
                        <p>-</p>
                        <input
                          type="number"
                          id="first_name"
                          className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                          defaultValue="0"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Retail price</p>
                      <input
                        type="number"
                        id="first_name"
                        className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium  rounded-md p-2"
                        defaultValue="0"
                        required
                      />
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </BannerContentPrice>
    </BannerContainer>
  );
};

export default Price;
