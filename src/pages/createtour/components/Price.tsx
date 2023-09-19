import React, { useState } from "react";
import {
  BannerContainer,
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
const countries = [
  { code: "Infant", name: "Infant" },
  { code: "Children", name: "Children" },
  { code: "Youth", name: "Youth" },
  { code: "Senior", name: "Senior" },
  { code: "Student", name: "Student (with ID)" },
  { code: "Military", name: "Military (with ID)" },
  { code: "Asean", name: "Student ASEAN Citizens (with ID)" },
];
const radioItems = [
  "Standard",
  "Free - ticket required",
  "Free - no ticket required",
  "Not permitted",
];

const Price: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRadio, setSelectedRadio] = useState({
    students: radioItems[0],
    children: radioItems[0],
    adults: radioItems[0],
  });

  const [formList, setFormList] = useState([
    {
      id: 0,
      numberOfPeople: 1,
      numberOfPeopleAfter: 1,
      retailPrice: 0,
      payoutPerPerson: 0,
      retailPriceChildren: 0,
      retailPriceStudent: 0,
      retailPriceAdult: 0,
      payoutPerPersonStudent: 0,
      payoutPerPersonChildren: 0,
      payoutPerPersonAdult: 0,
    },
  ]);
  const [ageFor, setAgeFor] = useState({
    chidlren: {
      ageStart: 0,
      ageEnd: 17,
    },
    adult: {
      ageStart: 18,
      ageEnd: 99,
    },
    student: {
      ageStart: 0,
      ageEnd: 99,
    },
  });
  const combinedObject = {
    ...formList,
    ...ageFor,
  };
  const handleRadioChange = (groupName: string, selectedValue: string) => {
    setSelectedRadio((prevRadio) => ({
      ...prevRadio,
      [groupName]: selectedValue,
    }));
    // setAdultsFormList(formList);

    if (groupName === "students") {
      if (selectedValue === "Standard") {
        // setStudentsFormList(formList);
      } else if (selectedValue === "Free - ticket required") {
        // setStudentsFormList(formList);
      }
    } else if (groupName === "children") {
      if (selectedValue === "Standard") {
        // setChildrensFormList(formList);
      } else if (selectedValue === "Free - ticket required") {
        // setChildrensFormList(formList);
      }
    } else if (groupName === "adults") {
      if (selectedValue === "Standard") {
        // setAdultsFormList(formList);
      } else if (selectedValue === "Free - ticket required") {
        // setAdultsFormList(formList);
      }
    }
  };
  //select age
  const initialInputValues: InputValue[] = dataTypePrice.map((data: any) => ({
    labelMain: data.labelMain,
    value: parseFloat(data.value),
  }));
  const [inputValues, setInputValues] =
    useState<InputValue[]>(initialInputValues);
  const options = [];
  for (let i = 0; i <= 99; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleInput = (index: number, value: string) => {
    const updatedInputValues: any = [...inputValues];
    updatedInputValues[index].value = value;
    setInputValues(updatedInputValues);
  };
  //end

  // Hàm thêm một form mới
  const addNewForm = () => {
    const prevForm = formList[formList.length - 1];
    const newRetailPrice = prevForm ? prevForm.numberOfPeopleAfter + 1 : 0;

    const newForm = {
      id: formList.length,
      numberOfPeople: newRetailPrice,
      numberOfPeopleAfter: newRetailPrice,
      retailPrice: 0,
      payoutPerPerson: 0,
      retailPriceChildren: 0,
      retailPriceStudent: 0,
      retailPriceAdult: 0,
      payoutPerPersonStudent: 0,
      payoutPerPersonChildren: 0,
      payoutPerPersonAdult: 0,
    };

    setFormList([...formList, newForm]);
  };
  const handleNumberOfPeopleChange = (e: any, id: any) => {
    const newNumberOfPeople = parseInt(e.target.value);
    const updatedFormList = formList.map((form, index) => {
      if (form.id === id) {
        const updatedForm = {
          ...form,
          numberOfPeopleAfter:
            newNumberOfPeople >= form.numberOfPeople
              ? newNumberOfPeople
              : form.numberOfPeople,
          payoutPerPerson: (form.retailPrice * 30) / 100,
        };
        return updatedForm;
      } else if (index === id + 1) {
        const updatedForm = {
          ...form,
          numberOfPeople: newNumberOfPeople >= 0 ? newNumberOfPeople + 1 : 0,
        };
        return updatedForm;
      }
      return form;
    });

    setFormList(updatedFormList);
  };
  const handleRetailPriceChange = (e: any, id: any, field: string) => {
    const newRetailPrice = parseFloat(e.target.value);
    const updatedFormList: any = formList.map((form) => {
      if (form.id === id) {
        if (field === "") {
          return {
            ...form,
            retailPrice: newRetailPrice,
            payoutPerPerson: (newRetailPrice * 70) / 100,
          };
        }
        if (field === "student") {
          return {
            ...form,
            retailPriceStudent: newRetailPrice,
            payoutPerPersonStudent: (newRetailPrice * 70) / 100,
          };
        }
        if (field === "children") {
          return {
            ...form,
            retailPriceChildren: newRetailPrice,
            payoutPerPersonChildren: (newRetailPrice * 70) / 100,
          };
        }
        if (field === "adult") {
          return {
            ...form,
            retailPriceAdult: newRetailPrice,
            payoutPerPersonAdult: (newRetailPrice * 70) / 100,
          };
        }
      }
      return form;
    });

    setFormList(updatedFormList);
  };

  const removeForm = (id: any) => {
    const updatedFormList = formList.filter((form) => form.id !== id);
    setFormList(updatedFormList);
  };
  const handleAgeChange = (e: any, field: string, type: string) => {
    const newAgeStart = parseInt(e.target.value, 10);
    if (field === "children" && type === "childrenStart") {
      setAgeFor({
        ...ageFor,
        chidlren: {
          ...ageFor.chidlren,
          ageStart: newAgeStart,
        },
      });
    }
    if (field === "children" && type === "childrenEnd") {
      setAgeFor({
        ...ageFor,
        chidlren: {
          ...ageFor.chidlren,
          ageEnd: newAgeStart,
        },
        adult: {
          ...ageFor.adult,
          ageStart: newAgeStart + parseInt("1"),
        },
      });
    }
    if (field === "adult" && type === "adultStart") {
      setAgeFor({
        ...ageFor,
        adult: {
          ...ageFor.adult,
          ageStart: newAgeStart,
        },
      });
    }
    if (field === "adult" && type === "adultEnd") {
      setAgeFor({
        ...ageFor,
        adult: {
          ...ageFor.adult,
          ageEnd: newAgeStart,
        },
      });
    }
  };

  const handleCountryChange = (e: any) => {
    setSelectedCountry(e.target.value);
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
        <select
          id="countries_disabled"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="" disabled>
            Choose a country
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <div className="mt-3">
          <p className="font-medium">Prices per person</p>
          <div className="p-4 rounded" style={{ border: "1px solid black" }}>
            <p className="font-semibold text-lg">Prices per person</p>
            <div className="grid md:grid-cols-12">
              <div className="col-span-2">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
                  <div></div>
                </div>
              </div>
              <div className="col-span-7">
                {" "}
                <div>
                  {formList.map((form) => (
                    <div
                      key={form.id}
                      className="grid grid-cols-4 gap-4 md:grid-cols-4"
                    >
                      <div>
                        <div className="font-medium">Number of People</div>
                        <div className="flex items-center">
                          <p className="font-medium">{form.numberOfPeople}</p>
                          <p>-</p>
                          <input
                            type="number"
                            id="first_name"
                            className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                            defaultValue={form.numberOfPeopleAfter}
                            required
                            onChange={(e) =>
                              handleNumberOfPeopleChange(e, form.id)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <p className="font-medium">Retail price</p>
                        <input
                          type="number"
                          id="retailPriceChildren"
                          className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                          value={form.retailPrice}
                          onChange={(e) =>
                            handleRetailPriceChange(e, form.id, "")
                          }
                        />
                      </div>
                      <div>
                        <p className="font-medium">Commission</p>
                        <p className="font-medium">30%</p>
                      </div>
                      <div>
                        <div className="font-medium">Payout per person</div>
                        <div className="flex items-center">
                          <input
                            className="p-2 w-20 bg-slate-200 rounded-md"
                            value={form.payoutPerPerson}
                            disabled
                          />
                          <p className="font-medium">VND</p>
                          {form.id !== 0 ? (
                            <button onClick={() => removeForm(form.id)}>
                              X
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addNewForm}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Student */}
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
                        defaultValue={ageFor.student.ageStart}
                      >
                        {options}
                      </select>
                      <p className="mx-1">-</p>
                      <select
                        id="countries2"
                        className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={ageFor.student.ageEnd}
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
                            id={`radio-students-${index + 1}`}
                            type="radio"
                            name="radio-students"
                            className="w-3 h-3"
                            checked={selectedRadio.students === item}
                            onChange={() => handleRadioChange("students", item)}
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
                {selectedRadio.students === "Standard" && (
                  <div>
                    {formList.map((form) => (
                      <div
                        key={form.id}
                        className="grid grid-cols-4 gap-4 md:grid-cols-4"
                      >
                        <div>
                          <div className="font-medium">Number of People</div>
                          <div className="flex items-center">
                            <p className="font-medium">{form.numberOfPeople}</p>
                            <p>-</p>
                            <input
                              type="number"
                              id="first_name"
                              className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                              defaultValue={form.numberOfPeopleAfter}
                              required
                              onChange={(e) =>
                                handleNumberOfPeopleChange(e, form.id)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Retail price</p>
                          <input
                            type="number"
                            id="retailPriceChildren"
                            className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                            value={form.retailPriceStudent}
                            onChange={(e) =>
                              handleRetailPriceChange(e, form.id, "student")
                            }
                          />
                        </div>
                        <div>
                          <p className="font-medium">Commission</p>
                          <p className="font-medium">30%</p>
                        </div>
                        <div>
                          <div className="font-medium">Payout per person</div>
                          <div className="flex items-center">
                            <input
                              className="p-2 w-20 bg-slate-200 rounded-md"
                              value={form.payoutPerPersonStudent}
                              disabled
                            />
                            <p className="font-medium">VND</p>
                            {form.id !== 0 ? (
                              <button onClick={() => removeForm(form.id)}>
                                X
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addNewForm}>Add</button>
                  </div>
                )}
                {selectedRadio.students === "Free - ticket required" && (
                  <div>
                    {formList.map((form) => (
                      <div
                        key={form.id}
                        className="grid grid-cols-4 gap-4 md:grid-cols-4"
                      >
                        <div></div>
                        <div>
                          <div className="font-medium">Number of People</div>
                          <div className="flex items-center">
                            <p className="font-medium">{form.numberOfPeople}</p>
                            <p>-</p>
                            <input
                              type="number"
                              id="first_name"
                              className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                              defaultValue={form.numberOfPeopleAfter}
                              required
                              onChange={(e) =>
                                handleNumberOfPeopleChange(e, form.id)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Retail price</p>
                          <input
                            type="number"
                            id="retailPriceChildren"
                            className="w-20 bg-slate-200 border-gray-300 text-gray-600   text-base font-medium rounded-md p-2"
                            defaultValue="0"
                            onChange={(e) =>
                              handleRetailPriceChange(e, form.id, "children")
                            }
                            disabled
                          />
                        </div>
                        <div></div>
                      </div>
                    ))}
                    <button onClick={addNewForm}>Add</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Children */}
        <div className="mt-3">
          <p className="font-medium">Prices per person</p>
          <div className="p-4 rounded" style={{ border: "1px solid black" }}>
            <p className="font-semibold text-lg">Children</p>
            <div className="grid md:grid-cols-12">
              <div className="col-span-5">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
                  <div>
                    <p className="font-medium">Age range</p>
                    <div className="flex items-center">
                      {/* <select
                        id="countries1"
                        className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={ageFor.chidlren.ageStart}
                        onChange={(e) =>
                          handleAgeChange(e, "children", "childrenStart")
                        }
                      >
                        {options}
                      </select> */}
                      <div>
                        <p className="font-medium">
                          {ageFor?.chidlren?.ageStart}
                        </p>
                      </div>
                      <p className="mx-1">-</p>
                      <select
                        id="countries2"
                        className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={ageFor.chidlren.ageEnd}
                        onChange={(e) =>
                          handleAgeChange(e, "children", "childrenEnd")
                        }
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
                            id={`radio-children-${index + 1}`}
                            type="radio"
                            name="radio-children"
                            className="w-3 h-3"
                            checked={selectedRadio.children === item}
                            onChange={() => handleRadioChange("children", item)}
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
                {selectedRadio.children === "Standard" && (
                  <div>
                    {formList.map((form) => (
                      <div
                        key={form.id}
                        className="grid grid-cols-4 gap-4 md:grid-cols-4"
                      >
                        <div>
                          <div className="font-medium">Number of People</div>
                          <div className="flex items-center">
                            <p className="font-medium">{form.numberOfPeople}</p>
                            <p>-</p>
                            <input
                              type="number"
                              id="first_name"
                              className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                              defaultValue={form.numberOfPeopleAfter}
                              required
                              onChange={(e) =>
                                handleNumberOfPeopleChange(e, form.id)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Retail price</p>

                          <input
                            type="number"
                            id="retailPriceChildren"
                            className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                            value={form.retailPriceChildren}
                            onChange={(e) =>
                              handleRetailPriceChange(e, form.id, "children")
                            }
                          />
                        </div>
                        <div>
                          <p className="font-medium">Commission</p>
                          <p className="font-medium">30%</p>
                        </div>
                        <div>
                          <div className="font-medium">Payout per person</div>
                          <div className="flex items-center">
                            <input
                              className="p-2 w-20 bg-slate-200 rounded-md"
                              value={form.payoutPerPersonChildren}
                              disabled
                            />
                            <p className="font-medium">VND</p>
                            {form.id !== 0 ? (
                              <button onClick={() => removeForm(form.id)}>
                                X
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addNewForm}>Add</button>
                  </div>
                )}
                {selectedRadio.children === "Free - ticket required" && (
                  <div>
                    {formList.map((form) => (
                      <div
                        key={form.id}
                        className="grid grid-cols-4 gap-4 md:grid-cols-4"
                      >
                        <div></div>
                        <div>
                          <div className="font-medium">Number of People</div>
                          <div className="flex items-center">
                            <p className="font-medium">{form.numberOfPeople}</p>
                            <p>-</p>
                            <input
                              type="number"
                              id="first_name"
                              className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                              defaultValue={form.numberOfPeopleAfter}
                              required
                              onChange={(e) =>
                                handleNumberOfPeopleChange(e, form.id)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Retail price</p>

                          <input
                            type="number"
                            id="retailPriceChildren"
                            className="w-20 bg-slate-200 border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                            defaultValue="0"
                            disabled
                          />
                        </div>

                        <div></div>
                      </div>
                    ))}
                    <button onClick={addNewForm}>Add</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Adults */}
        <div className="mt-3">
          <p className="font-medium">Prices per person</p>
          <div className="p-4 rounded" style={{ border: "1px solid black" }}>
            <p className="font-semibold text-lg">Adults</p>
            <div className="grid md:grid-cols-12">
              <div className="col-span-5">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
                  <div>
                    <p className="font-medium">Age range</p>
                    <div className="flex items-center">
                      {/* <select
                        id="countries1"
                        className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={ageFor?.adult?.ageStart}
                        onChange={(e) =>
                          handleAgeChange(e, "adult", "adultStart")
                        }
                      >
                        {options}
                      </select> */}
                      <div>
                        <p className="font-medium">{ageFor?.adult?.ageStart}</p>
                      </div>
                      <p className="mx-1">-</p>
                      <select
                        id="countries2"
                        className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={ageFor?.adult?.ageEnd}
                        onChange={(e) =>
                          handleAgeChange(e, "adult", "adultStart")
                        }
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
                            id={`radio-adults-${index + 1}`}
                            type="radio"
                            name="radio-adults"
                            className="w-3 h-3"
                            checked={selectedRadio.adults === item}
                            onChange={() => handleRadioChange("adults", item)}
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
                {selectedRadio.adults === "Standard" && (
                  <div>
                    {formList.map((form) => (
                      <div
                        key={form.id}
                        className="grid grid-cols-4 gap-4 md:grid-cols-4"
                      >
                        <div>
                          <div className="font-medium">Number of People</div>
                          <div className="flex items-center">
                            <p className="font-medium">{form.numberOfPeople}</p>
                            <p>-</p>
                            <input
                              type="number"
                              id="first_name"
                              className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                              defaultValue={form.numberOfPeopleAfter}
                              required
                              onChange={(e) =>
                                handleNumberOfPeopleChange(e, form.id)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Retail price</p>
                          <input
                            type="number"
                            id="retailPriceChildren"
                            className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                            value={form.retailPriceAdult}
                            onChange={(e) =>
                              handleRetailPriceChange(e, form.id, "adult")
                            }
                          />
                        </div>
                        <div>
                          <p className="font-medium">Commission</p>
                          <p className="font-medium">30%</p>
                        </div>
                        <div>
                          <div className="font-medium">Payout per person</div>
                          <div className="flex items-center">
                            <input
                              className="p-2 w-20 bg-slate-200 rounded-md"
                              value={form.payoutPerPersonAdult}
                              disabled
                            />
                            <p className="font-medium">VND</p>
                            {form.id !== 0 ? (
                              <button onClick={() => removeForm(form.id)}>
                                X
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addNewForm}>Add</button>
                  </div>
                )}
                {selectedRadio.adults === "Free - ticket required" && (
                  <div>
                    {formList.map((form) => (
                      <div
                        key={form.id}
                        className="grid grid-cols-4 gap-4 md:grid-cols-4"
                      >
                        <div></div>
                        <div>
                          <div className="font-medium">Number of People</div>
                          <div className="flex items-center">
                            <p className="font-medium">{form.numberOfPeople}</p>
                            <p>-</p>
                            <input
                              type="number"
                              id="first_name"
                              className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                              defaultValue={form.numberOfPeopleAfter}
                              required
                              onChange={(e) =>
                                handleNumberOfPeopleChange(e, form.id)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Retail price</p>
                          <input
                            type="number"
                            id="retailPriceChildren"
                            className="w-20 bg-slate-200 border border-gray-300 text-gray-900 text-base font-medium rounded-md p-2"
                            defaultValue="0"
                          />
                        </div>
                        <div></div>
                      </div>
                    ))}
                    <button onClick={addNewForm}>Add</button>
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
