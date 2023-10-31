import React, { useState } from "react";
import {
  BannerContainer,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";

interface InputValue {
  main: string;
}

const countries = [
  { code: "Infant", name: "Infant" },
  { code: "Children", name: "Children" },
  { code: "Adults", name: "Adults" },
];
const radioItems = [
  "Standard",
  "Free - ticket required",
  "Free - no ticket required",
  "Not permitted",
];
const typeDefault = {
  role: "ADULT",
  type: "DEFAULT",
};
const Price: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCountries, setSelectedCountries]: any = useState([]);
  const [dataTicket, setDataTicket]: any = useState([]);
  const [selectedRadio, setSelectedRadio] = useState({
    children: radioItems[0],
    adults: radioItems[0],
  });
  const [formList, setFormList] = useState([
    {
      id: 0,
      numberOfPeople: 1,
      numberOfPeopleAfter: 3,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
  ]);
  const [formListChildren, setFormListChildren] = useState([
    {
      id: 0,
      numberOfPeople: 1,
      numberOfPeopleAfter: 3,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
  ]);
  const [formListAdult, setFormListAdult] = useState([
    {
      id: 0,
      numberOfPeople: 1,
      numberOfPeopleAfter: 3,
      retailPrice: 0,
      payoutPerPerson: 0,
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
  });

  const handleRadioChange = (groupName: string, selectedValue: string) => {
    setSelectedRadio((prevRadio) => ({
      ...prevRadio,
      [groupName]: selectedValue,
    }));
  };
  const handleCountryChange = () => {
    // const selectedCountryCode = event.target.value;
    // if (!selectedCountries.includes(selectedCountryCode)) {
    //   setSelectedCountries([...selectedCountries, selectedCountryCode]);
    // }
    const type = ["Children", "Adults"];
    setSelectedCountries(type);
  };
  const funcUpdateTicketRole = () => {
    const updatedAgeFor = { ...ageFor };
    if (
      selectedCountries.includes("Children") &&
      selectedCountries.includes("Adults")
    ) {
      const updatedAgeForChildren: any = {
        ageStart: updatedAgeFor?.chidlren?.ageStart,
        ageEnd: updatedAgeFor?.chidlren?.ageEnd,
      };
      const updatedAgeForAdult: any = {
        ageStart: updatedAgeFor?.adult?.ageStart,
        ageEnd: updatedAgeFor?.adult?.ageEnd,
      };
      let dataChildren;
      if (selectedRadio.children === "Standard") {
        const price_range = [...formListChildren];
        const roleType = { role: "CHILDREN", type: "DEFAULT" };
        const object = {
          price_range,
          ...roleType,
          ...quantityChildren,
          ...updatedAgeForChildren,
        };
        dataChildren = object;
      }
      if (selectedRadio.children === "Free - ticket required") {
        const updatedFormListCheck = [...formListChildren];
        const price_range = updatedFormListCheck.map((item) => ({
          id: item.id,
          numberOfPeople: item.numberOfPeople,
          numberOfPeopleAfter: item.numberOfPeopleAfter,
          retailPrice: 0,
          payoutPerPerson: 0,
        }));
        const roleType = { role: "CHILDREN", type: "FREE_WITH_TICKET" };
        const object = {
          price_range,
          ...roleType,
          ...quantityChildren,
          ...updatedAgeForChildren,
        };
        dataChildren = object;
      }
      if (selectedRadio.children === "Free - no ticket required") {
        const updatedFormListCheck = {
          role: "CHILDREN",
          type: "FREE_NO_TICKET",
        };
        const object = {
          ...updatedFormListCheck,
          ...quantityChildren,
          ...updatedAgeForChildren,
        };
        dataChildren = object;
      }
      if (selectedRadio.children === "Not permitted") {
        const updatedFormListCheck = {
          role: "CHILDREN",
          type: "Not permitted",
        };
        const object = {
          ...updatedFormListCheck,
          ...quantityChildren,
          ...updatedAgeForChildren,
        };
        dataChildren = object;
      }
      let dataAdult;
      if (selectedRadio.adults === "Standard") {
        const price_range = [...formListAdult];
        const roleType = { role: "ADULT", type: "DEFAULT" };
        const object = {
          price_range,
          ...roleType,
          ...quantityAdult,
          ...updatedAgeForAdult,
        };
        dataAdult = object;
      }
      if (selectedRadio.adults === "Free - ticket required") {
        const formList = [...formListAdult];
        const price_range = formList.map((item) => ({
          id: item.id,
          numberOfPeople: item.numberOfPeople,
          numberOfPeopleAfter: item.numberOfPeopleAfter,
          retailPriceChildren: 0,
          payoutPerPerson: 0,
        }));
        const roleType = { role: "ADULT", type: "FREE_WITH_TICKET" };
        const object = {
          price_range,
          ...roleType,
          ...quantityAdult,
          ...updatedAgeForAdult,
        };
        dataAdult = object;
      }
      if (selectedRadio.adults === "Free - no ticket required") {
        const updatedFormListCheck = {
          role: "ADULT",
          type: "FREE_NO_TICKET",
        };
        const object = {
          ...updatedFormListCheck,
          ...quantityAdult,
          ...updatedAgeForAdult,
        };
        dataAdult = object;
      }
      if (selectedRadio.adults === "Not permitted") {
        const updatedFormListCheck = {
          role: "ADULT",
          type: "Not permitted",
        };
        const object = {
          ...updatedFormListCheck,
          ...quantityAdult,
          ...updatedAgeForAdult,
        };
        dataAdult = object;
      }
      const object = [dataAdult, dataChildren];
      setDataTicket(object);
    }
  };
  const handleDeleteCountry = (countryCode: any) => {
    // const updatedSelectedCountries = selectedCountries.filter(
    //   (code: any) => code !== countryCode
    // );
    setSelectedCountries([]);
  };

  //select age
  const [quantityDefault, setQuantityDefault] = useState({
    max: 2,
    min: 1,
  });
  const [quantityAdult, setQuantityAdult] = useState({
    max: 2,
    min: 1,
  });
  const [quantityChildren, setQuantityChildren] = useState({
    max: 2,
    min: 1,
  });
  const handleInputChange = (e: any, field: string, type: string) => {
    const value = parseInt(e.target.value);
    if (type === "default") {
      setQuantityDefault((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
    if (type === "adult") {
      setQuantityAdult((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
    if (type === "children") {
      setQuantityChildren((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  const options = [];
  for (let i = 0; i <= 99; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  //end

  // Hàm thêm một form mới
  const addNewForm = (field: string) => {
    const prevForm = formList[formList.length - 1];
    const prevFormChildren = formListChildren[formListChildren.length - 1];
    const prevFrormAdult = formListAdult[formListAdult.length - 1];
    const newNumberPeople = prevForm ? prevForm.numberOfPeopleAfter + 1 : 0;
    const newNumberPeopleChildren = prevFormChildren
      ? prevFormChildren.numberOfPeopleAfter + 1
      : 0;
    const newNumberPeopleAdult = prevFrormAdult
      ? prevFrormAdult.numberOfPeopleAfter + 1
      : 0;
    if (field === "default") {
      const newForm = {
        id: formList.length,
        numberOfPeople: newNumberPeople,
        numberOfPeopleAfter: newNumberPeople,
        retailPrice: 0,
        payoutPerPerson: 0,
      };
      setFormList([...formList, newForm]);
    }
    if (field === "children") {
      const newFormChildren = {
        id: formListChildren.length,
        numberOfPeople: newNumberPeopleChildren,
        numberOfPeopleAfter: newNumberPeopleChildren,
        retailPrice: 0,
        payoutPerPerson: 0,
      };
      setFormListChildren([...formListChildren, newFormChildren]);
    }
    if (field === "adult") {
      const newFormAdult = {
        id: formListAdult.length,
        numberOfPeople: newNumberPeopleAdult,
        numberOfPeopleAfter: newNumberPeopleAdult,
        retailPrice: 0,
        payoutPerPerson: 0,
      };
      setFormListAdult([...formListAdult, newFormAdult]);
    }
  };
  const handleNumberOfPeopleChange = (e: any, id: number, field: string) => {
    const newNumberOfPeople = parseInt(e.target.value);
    console.log(newNumberOfPeople);
    if (field === "default") {
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
            numberOfPeopleAfter: newNumberOfPeople,
          };
          return updatedForm;
        }
        return form;
      });
      setFormList(updatedFormList);
    }
    if (field === "adult") {
      const updatedFormListAdult = formListAdult.map((form, index) => {
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

      setFormListAdult(updatedFormListAdult);
    }
    if (field === "children") {
      const updatedFormListChildren = formListChildren.map((form, index) => {
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

      setFormListChildren(updatedFormListChildren);
    }
  };
  const handleRetailPriceChange = (e: any, id: number, field: string) => {
    const newRetailPrice = parseFloat(e.target.value);
    if (field === "") {
      const updatedFormList: any = formList.map((form) => {
        if (form.id === id) {
          return {
            ...form,
            retailPrice: newRetailPrice,
            payoutPerPerson: (newRetailPrice * 70) / 100,
          };
        }
        return form;
      });
      setFormList(updatedFormList);
    }
    if (field === "adult") {
      const updatedFormList: any = formListAdult.map((form) => {
        if (form.id === id) {
          return {
            ...form,
            retailPrice: newRetailPrice,
            payoutPerPerson: (newRetailPrice * 70) / 100,
          };
        }
        return form;
      });
      setFormListAdult(updatedFormList);
    }
    if (field === "children") {
      const updatedFormList: any = formListChildren.map((form) => {
        if (form.id === id) {
          return {
            ...form,
            retailPrice: newRetailPrice,
            payoutPerPerson: (newRetailPrice * 70) / 100,
          };
        }
        return form;
      });
      setFormListChildren(updatedFormList);
    }
  };

  const removeForm = (id: number, field: string) => {
    if (field === "") {
      const updatedFormList = formList.filter((form) => form.id !== id);
      setFormList(updatedFormList);
    }
    if (field === "adult") {
      const updatedFormList = formListAdult.filter((form) => form.id !== id);
      setFormListAdult(updatedFormList);
    }
    if (field === "children") {
      const updatedFormList = formListChildren.filter((form) => form.id !== id);
      setFormListChildren(updatedFormList);
    }
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
  React.useEffect(() => {
    if (currentStep === 9) {
      updateFormValues(6, { ticket: dataTicket });
    }
  }, [currentStep, dataTicket]);

  React.useEffect(() => {
    if (selectedCountries.length === 0) {
      const convertArray = {
        price_range: formList,
        ...quantityDefault,
        ...typeDefault,
      };
      setDataTicket([convertArray]);
    }
  }, [selectedCountries, formList, quantityDefault, typeDefault]);

  React.useEffect(() => {
    funcUpdateTicketRole(); // Hàm này sẽ được gọi lại khi các dependency thay đổi
  }, [
    selectedCountries,
    selectedRadio,
    formListChildren,
    formList,
    formListAdult,
    quantityAdult,
    quantityChildren,
    typeDefault,
  ]);

  if (currentStep !== 9) {
    return null;
  }

  return (
    <BannerContainer className="global-scrollbar">
      <div className="flex items-center justify-center">
        <div className="py-5">
          <CreateTitleNullDes>Setting price and tickets</CreateTitleNullDes>
          <CreateDescription>Enter the pricing information</CreateDescription>

          {selectedCountries.length === 0 && (
            <div className="mt-3 flex flex-col items-start gap-4">
              <div className="flex flex-col w-full">
                {" "}
                <div className="mb-2">
                  <p className="font-medium mb-1">
                    Minimum participants per booking
                  </p>
                  <div className=" relative ">
                    <p className="absolute top-4 left-2">
                      <GoLocation />
                    </p>
                    <input
                      className="w-28 border rounded-lg pr-1 pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                      type="number"
                      value={quantityDefault.min}
                      onChange={(e) => handleInputChange(e, "min", "default")}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="mb-1 flex flex-col">
                    <span className="font-medium">
                      Maximum participants per booking
                    </span>
                    {formList[formList.length - 1]?.numberOfPeopleAfter >
                      quantityDefault?.max && (
                      <span className="text-red-700 text-sm">
                        Max greater than or equal max number of people
                      </span>
                    )}
                  </div>

                  <div className=" relative ">
                    <p className="absolute top-4 left-2">
                      <GoLocation />
                    </p>
                    <input
                      className="w-28 border rounded-lg pr-1 pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                      type="number"
                      value={quantityDefault.max}
                      onChange={(e) => handleInputChange(e, "max", "default")}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white relative border border-gray-400 border-solid shadow-custom-card-mui">
                <FaRegTrashCan
                  className="absolute , top-0, right-3 text-white "
                  onClick={() => handleDeleteCountry("default")}
                />
                <p className="font-medium text-lg">Default Ticket</p>

                <div className="grid md:grid-cols-12">
                  <div className="col-span-3"></div>
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
                                  handleNumberOfPeopleChange(
                                    e,
                                    form.id,
                                    "default"
                                  )
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
                                  onClick={() => removeForm(form.id, "")}
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
                        onClick={() => addNewForm("default")}
                      >
                        Set up price tiers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="font-medium text-lg text-navy-blue hover hover:text-black"
                onClick={() => handleCountryChange()}
              >
                + Add type ticket{" "}
              </button>
            </div>
          )}
          {selectedCountries.includes("Adults") &&
            selectedCountries.includes("Children") && (
              <div className="flex justify-between">
                <div className="">
                  <div className="mb-3">
                    <p className="font-medium mb-1">
                      Minimum adult participants per booking
                    </p>
                    <div className=" relative ">
                      <p className="absolute top-4 left-2">
                        <GoLocation />
                      </p>
                      <input
                        className="w-28 border rounded-lg pr-1 pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                        type="number"
                        value={quantityAdult.min}
                        onChange={(e) => handleInputChange(e, "min", "adult")}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-1 flex flex-col">
                      <span className="font-medium mb-1">
                        Maximum adult participants per booking
                      </span>
                      {formListAdult[formListAdult.length - 1]
                        ?.numberOfPeopleAfter > quantityAdult?.max && (
                        <span className="text-red-700 text-sm">
                          Max greater than or equal max number of people
                        </span>
                      )}
                    </div>

                    <div className=" relative ">
                      <p className="absolute top-4 left-2">
                        <GoLocation />
                      </p>
                      <input
                        className="w-28 border rounded-lg pr-1 pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                        type="number"
                        value={quantityAdult.max}
                        onChange={(e) => handleInputChange(e, "max", "adult")}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <p className="font-medium mb-1">
                      Minimum children participants per booking
                    </p>
                    <div className=" relative ">
                      <p className="absolute top-4 left-2">
                        <GoLocation />
                      </p>
                      <input
                        className="w-28 border rounded-lg pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                        type="number"
                        value={quantityChildren.min}
                        onChange={(e) =>
                          handleInputChange(e, "min", "children")
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-1 flex flex-col">
                      <span className="font-medium mb-1">
                        Maximum children participants per booking
                      </span>
                      {formListChildren[formListChildren.length - 1]
                        ?.numberOfPeopleAfter > quantityChildren?.max && (
                        <span className="text-red-700 text-sm">
                          Max greater than or equal max number of people
                        </span>
                      )}
                    </div>
                    <div className=" relative ">
                      <p className="absolute top-4 left-2">
                        <GoLocation />
                      </p>
                      <input
                        className="w-28 border rounded-lg pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                        type="number"
                        value={quantityChildren.max}
                        onChange={(e) =>
                          handleInputChange(e, "max", "children")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            )}

          {/* Adults */}
          {selectedCountries.includes("Adults") && (
            <div className="mt-3">
              <div className="p-4 rounded-lg bg-white relative border border-gray-400 border-solid shadow-custom-card-mui">
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
                        {formListAdult.map((form) => (
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
                                    handleNumberOfPeopleChange(
                                      e,
                                      form.id,
                                      "adult"
                                    )
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
                                  value={form.payoutPerPerson}
                                  disabled
                                />
                                <p className="font-medium">VND</p>
                                {form.id !== 0 ? (
                                  <button
                                    onClick={() => removeForm(form.id, "adult")}
                                  >
                                    X
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedRadio.adults === "Free - ticket required" && (
                      <div>
                        {formListAdult.map((form) => (
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
                                    handleNumberOfPeopleChange(
                                      e,
                                      form.id,
                                      "adult"
                                    )
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
                      </div>
                    )}
                    <button
                      className=" text-base font-semibold bg-white p-0 mt-2 focus:outline-none hover:border-none hover:p-0 hover:m border-none text-navy-blue hover:text-black"
                      onClick={() => addNewForm("adult")}
                    >
                      Set up price tiers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Children */}
          {selectedCountries.includes("Children") && (
            <div className="mt-3">
              <div className="p-4 rounded-lg bg-white relative border border-gray-400 border-solid shadow-custom-card-mui">
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
                        {formListChildren.map((form) => (
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
                                    handleNumberOfPeopleChange(
                                      e,
                                      form.id,
                                      "children"
                                    )
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
                                  value={form.payoutPerPerson}
                                  disabled
                                />
                                <p className="font-medium">VND</p>
                                {form.id !== 0 ? (
                                  <button
                                    onClick={() =>
                                      removeForm(form.id, "children")
                                    }
                                  >
                                    X
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedRadio.children === "Free - ticket required" && (
                      <div>
                        {formListChildren.map((form) => (
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
                                    handleNumberOfPeopleChange(
                                      e,
                                      form.id,
                                      "children"
                                    )
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
                      </div>
                    )}
                    <button
                      className=" text-base font-semibold bg-white p-0 mt-2 focus:outline-none hover:border-none hover:p-0 hover:m border-none text-navy-blue hover:text-black"
                      onClick={() => addNewForm("children")}
                    >
                      Set up price tiers
                    </button>
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
