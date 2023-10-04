import React, { useState } from "react";
import {
  BannerContainer,
  BannerContentPrice,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { dataTypePrice } from "../dataFake";
import { FaRegTrashCan } from "react-icons/fa6";

interface InputValue {
  labelMain: string;
}

const countries = [
  { code: "Infant", name: "Infant" },
  { code: "Children", name: "Children" },
  { code: "Adults", name: "Adults" },

  { code: "Student", name: "Student (with ID)" },
];
const radioItems = [
  "Standard",
  "Free - ticket required",
  "Free - no ticket required",
  "Not permitted",
];

const Price: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCountries, setSelectedCountries]: any = useState([]);
  const [dataTicket, setDataTicket]: any = useState([]);
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
  const handleCountryChange = (event: any) => {
    const selectedCountryCode = event.target.value;
    if (!selectedCountries.includes(selectedCountryCode)) {
      setSelectedCountries([...selectedCountries, selectedCountryCode]);
    }

    const updatedFormList = [...formList];
    const updatedAgeFor = { ...ageFor };

    if (selectedCountryCode === "Student") {
      const updatedFormListCheck = updatedFormList.map((item) => ({
        ...item,
        role: "student",
        id: item.id,
        numberOfPeople: item.numberOfPeople,
        numberOfPeopleAfter: item.numberOfPeopleAfter,
        retailPrice: item.retailPriceStudent,
        payoutPerPerson: item.payoutPerPersonStudent,
        retailPriceStudent: item.retailPriceStudent,
        payoutPerPersonStudent: item.payoutPerPersonStudent,
      }));
      const updatedAgeForCheck: any = {
        ageStart: updatedAgeFor?.student?.ageStart,
        ageEnd: updatedAgeFor?.student?.ageEnd,
      };
      const object = { ...updatedFormListCheck, ...updatedAgeForCheck };
      setDataTicket(object);
    }
    if (selectedCountryCode === "Children") {
      const updatedFormListCheck = updatedFormList.map((item) => ({
        ...item,
        role: "Children",
        id: item.id,
        numberOfPeople: item.numberOfPeople,
        numberOfPeopleAfter: item.numberOfPeopleAfter,
        retailPrice: item.retailPriceStudent,
        payoutPerPerson: item.payoutPerPersonStudent,
        retailPriceStudent: item.retailPriceStudent,
        payoutPerPersonStudent: item.payoutPerPersonStudent,
      }));

      const updatedAgeForCheck: any = {
        ageStart: updatedAgeFor?.student?.ageStart,
        ageEnd: updatedAgeFor?.student?.ageEnd,
      };
      const object = { ...updatedFormListCheck, ...updatedAgeForCheck };
      setDataTicket(object);
    }

    if (selectedCountryCode === "Adults") {
      const updatedFormListCheck = updatedFormList.map((item) => ({
        ...item,
        role: "student",
        id: item.id,
        numberOfPeople: item.numberOfPeople,
        numberOfPeopleAfter: item.numberOfPeopleAfter,
        retailPrice: item.retailPriceStudent,
        payoutPerPerson: item.payoutPerPersonStudent,
        retailPriceStudent: item.retailPriceStudent,
        payoutPerPersonStudent: item.payoutPerPersonStudent,
      }));
      const updatedAgeForCheck: any = {
        ageStart: updatedAgeFor?.student?.ageStart,
        ageEnd: updatedAgeFor?.student?.ageEnd,
      };
      const object = { ...updatedFormListCheck, ...updatedAgeForCheck };
      setDataTicket(object);
    }
    if (
      selectedCountries.includes("Children") ||
      selectedCountries.includes("Student")
    ) {
      const updatedFormListCheck = updatedFormList.map((item) => ({
        ...item,
        role: ["Children", "Student"],
      }));
      setDataTicket(updatedFormListCheck);
    }
  };
  const handleDeleteCountry = (countryCode: any) => {
    const updatedSelectedCountries = selectedCountries.filter(
      (code: any) => code !== countryCode
    );
    setSelectedCountries(updatedSelectedCountries);
  };

  //select age
  const initialInputValues: InputValue[] = dataTypePrice.map((data) => ({
    labelMain: data.labelMain,
    // value: parseFloat(data.value),
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
  const handleNumberOfPeopleChange = (e: any, id: number) => {
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
  const handleRetailPriceChange = (e: any, id: number, field: string) => {
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

  const removeForm = (id: number) => {
    const updatedFormList = formList.filter((form) => form.id !== id);
    setFormList(updatedFormList);
  };
  const handleAgeChange = (e: any, field: string, type: string) => {
    const newAgeStart = parseInt(e.target.value, 10);
    if (field === "student" && type === "studentStart") {
      setAgeFor({
        ...ageFor,
        student: {
          ...ageFor.student,
          ageStart: newAgeStart,
        },
      });
    }
    if (field === "student" && type === "studentEnd") {
      setAgeFor({
        ...ageFor,
        student: {
          ...ageFor.student,
          ageEnd: newAgeStart,
        },
      });
    }
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

  React.useEffect(() => {
    if (currentStep === 9) {
      updateFormValues(6, { ticket: dataTicket });
    }
    if (selectedCountries.length === 0) {
      setDataTicket(formList);
    }
  }, [formList, selectedCountries]);

  if (currentStep !== 9) {
    return null;
  }
  return (
    <BannerContainer className="global-scrollbar">
      <div className="flex items-center justify-center">
        <div className="py-5">
          <CreateTitleNullDes>Setting price and tickets</CreateTitleNullDes>
          <CreateDescription>Enter the pricing information</CreateDescription>
          {dataTypePrice.map((data, index) => (
            <>
              <div className="mb-3" key={index}>
                <p className="font-medium mb-1">{data.labelMain}</p>
                <div className=" relative ">
                  <p className="absolute top-4 left-2">{data.icon}</p>
                  <input
                    className="w-1/2 border rounded-lg pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                    placeholder="New availability"
                    type={data?.type}
                    onChange={(e) => handleInput(index, e.target.value)}
                  />
                </div>
              </div>
            </>
          ))}
          <select
            id="countries_disabled"
            className="w-44 text-navy-blue font-medium text-lg hover:text-black focus:border-none"
            value={selectedCountries}
            onChange={handleCountryChange}
          >
            <option value="" disabled>
              Choose type ticket
            </option>
            {countries.map((country, index) => {
              // Kiểm tra xem country.code có tồn tại trong selectedCountries không
              if (!selectedCountries.includes(country.code)) {
                return (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                );
              }
              return null; // Nếu đã chọn, không hiển thị tùy chọn này
            })}
          </select>
          {selectedCountries.length === 0 && (
            <div className="mt-3">
              <p className="font-semibold text-lg mb-4">Prices per person</p>
              <div className="p-4 rounded relative border border-gray-400 border-solid shadow-custom-card-mui">
                <FaRegTrashCan
                  className="absolute , top-0, right-3 text-white "
                  onClick={() => handleDeleteCountry("Student")}
                />
                <div className="grid md:grid-cols-12">
                  <div className="col-span-3">
                    <p className="font-medium">Prices per person</p>
                  </div>
                  <div className="col-span-9">
                    {" "}
                    <div>
                      {formList.map((form) => (
                        <div
                          key={form.id}
                          className="grid grid-cols-4 gap-4 md:grid-cols-4 mb-2"
                        >
                          <div>
                            <div className="font-medium h-4 mb-2">
                              Number of People
                            </div>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {form.numberOfPeople}
                              </p>
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
                            <p className="font-medium h-4 mb-2">Retail price</p>
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
                            <p className="font-medium h-4 mb-2">Commission</p>
                            <p className="font-medium">30%</p>
                          </div>
                          <div>
                            <div className="font-medium h-4 mb-2">
                              Payout per person
                            </div>
                            <div className="flex items-center gap-4">
                              <input
                                className="p-2 w-20 bg-slate-200 rounded-md"
                                value={form.payoutPerPerson}
                                disabled
                              />
                              <p className="font-medium">VND</p>
                              {form.id !== 0 ? (
                                <button
                                  className="font-medium text-red-600 hover:text-red-800 text-xl"
                                  onClick={() => removeForm(form.id)}
                                >
                                  x
                                </button>
                              ) : (
                                <button className="font-medium text-white  text-xl ">
                                  x
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        className=" text-base font-semibold bg-white p-0 mt-2 focus:outline-none hover:border-none hover:p-0 hover:m border-none text-navy-blue hover:text-black"
                        onClick={addNewForm}
                      >
                        Set up price tiers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Student */}
          {selectedCountries.includes("Student") && (
            <div className="mt-3">
              <p className="font-medium">Prices per person</p>
              <div className="p-4 rounded relative border border-gray-400 border-solid shadow-custom-card-mui">
                <FaRegTrashCan
                  className="absolute , top-0, right-3 text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteCountry("Student")}
                />
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
                            onChange={(e) =>
                              handleAgeChange(e, "student", "studentStart")
                            }
                          >
                            {options}
                          </select>
                          <p className="mx-1">-</p>
                          <select
                            id="countries2"
                            className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={ageFor.student.ageEnd}
                            onChange={(e) =>
                              handleAgeChange(e, "student", "studentEnd")
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
                                id={`radio-students-${index + 1}`}
                                type="radio"
                                name="radio-students"
                                className="w-3 h-3"
                                checked={selectedRadio.students === item}
                                onChange={() =>
                                  handleRadioChange("students", item)
                                }
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
                              <div className="font-medium">
                                Number of People
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium">
                                  {form.numberOfPeople}
                                </p>
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
                              <div className="font-medium">
                                Payout per person
                              </div>
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
                              <div className="font-medium">
                                Number of People
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium">
                                  {form.numberOfPeople}
                                </p>
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
                                  handleRetailPriceChange(
                                    e,
                                    form.id,
                                    "children"
                                  )
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
          )}

          {/* Children */}

          {selectedCountries.includes("Children") && (
            <div className="mt-3">
              <p className="font-medium">Prices per person</p>
              <div
                className="p-4 rounded"
                style={{ border: "1px solid black", position: "relative" }}
              >
                <FaRegTrashCan
                  className="absolute , top-0, right-3 text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteCountry("Children")}
                />
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
                                onChange={() =>
                                  handleRadioChange("children", item)
                                }
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
                              <div className="font-medium">
                                Number of People
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium">
                                  {form.numberOfPeople}
                                </p>
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
                                  handleRetailPriceChange(
                                    e,
                                    form.id,
                                    "children"
                                  )
                                }
                              />
                            </div>
                            <div>
                              <p className="font-medium">Commission</p>
                              <p className="font-medium">30%</p>
                            </div>
                            <div>
                              <div className="font-medium">
                                Payout per person
                              </div>
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
                              <div className="font-medium">
                                Number of People
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium">
                                  {form.numberOfPeople}
                                </p>
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
          )}

          {/* Adults */}
          {selectedCountries.includes("Adults") && (
            <div className="mt-3">
              <p className="font-medium">Prices per person</p>
              <div
                className="p-4 rounded"
                style={{ border: "1px solid black", position: "relative" }}
              >
                <FaRegTrashCan
                  className="absolute , top-0, right-3 text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteCountry("Adults")}
                />
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
                            <p className="font-medium">
                              {ageFor?.adult?.ageStart}
                            </p>
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
                                onChange={() =>
                                  handleRadioChange("adults", item)
                                }
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
                              <div className="font-medium">
                                Number of People
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium">
                                  {form.numberOfPeople}
                                </p>
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
                              <div className="font-medium">
                                Payout per person
                              </div>
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
                              <div className="font-medium">
                                Number of People
                              </div>
                              <div className="flex items-center">
                                <p className="font-medium">
                                  {form.numberOfPeople}
                                </p>
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
          )}
        </div>
      </div>
    </BannerContainer>
  );
};

export default Price;
