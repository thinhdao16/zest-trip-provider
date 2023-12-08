import { useContext, useEffect, useState } from "react";

import { FaRegTrashCan } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { formatNumberInput } from "../../utils/formatNumberInput";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import { ButtonCreateTicketSpecial } from "./ButtonCreateTicketSpecial";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { fetchTourDetail } from "../../store/redux/silce/tourSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataContext } from "../../store/dataContext/DataContext";
import { getCommistionRate } from "../../store/redux/silce/authSilce";

const radioItems = [
  "Standard",
  "Free - ticket required",
  "Free - no ticket required",
];
const typeDefault = {
  role: "ADULT",
  type: "DEFAULT",
};
function TicketSpecial() {
  const { index } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { commision } = useSelector(
    (state: { auth: { commision: number } }) => state.auth
  );
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);

  const { setDataTicketCreate } = useContext(DataContext);

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
      numberOfPeopleAfter: 2,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
  ]);
  const [formListChildren, setFormListChildren] = useState([
    {
      id: 0,
      numberOfPeople: 0,
      numberOfPeopleAfter: 2,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
  ]);
  const [formListAdult, setFormListAdult] = useState([
    {
      id: 0,
      numberOfPeople: 1,
      numberOfPeopleAfter: 2,
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
  const free_no_ticket_price_range_children = [
    {
      id: 0,
      numberOfPeople: 0,
      numberOfPeopleAfter: 2,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
    {
      id: 1,
      numberOfPeople: 3,
      numberOfPeopleAfter: 4,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
  ];
  const free_no_ticket_price_range_adult = [
    {
      id: 0,
      numberOfPeople: 1,
      numberOfPeopleAfter: 2,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
    {
      id: 1,
      numberOfPeople: 3,
      numberOfPeopleAfter: 4,
      retailPrice: 0,
      payoutPerPerson: 0,
    },
  ];

  const ageDefault = { ageStart: "0", ageEnd: "99" };
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
          apply_dates: selectDateChildren,
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
          apply_dates: selectDateChildren,
        };
        dataChildren = object;
      }
      if (selectedRadio.children === "Free - no ticket required") {
        const price_range = [...free_no_ticket_price_range_children];
        const updatedFormListCheck = {
          role: "CHILDREN",
          type: "FREE_NO_TICKET",
        };
        const object = {
          price_range,
          ...updatedFormListCheck,
          ...quantityChildren,
          ...updatedAgeForChildren,
          apply_dates: selectDateChildren,
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
          apply_dates: selectDateChildren,
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
          apply_dates: selectDateAdult,
        };
        dataAdult = object;
      }
      if (selectedRadio.adults === "Free - ticket required") {
        const formList = [...formListAdult];
        const price_range = formList.map((item) => ({
          id: item.id,
          numberOfPeople: item.numberOfPeople,
          numberOfPeopleAfter: item.numberOfPeopleAfter,
          retailPrice: 0,
          payoutPerPerson: 0,
        }));
        const roleType = { role: "ADULT", type: "FREE_WITH_TICKET" };
        const object = {
          price_range,
          ...roleType,
          ...quantityAdult,
          ...updatedAgeForAdult,
          apply_dates: selectDateAdult,
        };
        dataAdult = object;
      }
      if (selectedRadio.adults === "Free - no ticket required") {
        const price_range = [...free_no_ticket_price_range_adult];
        const updatedFormListCheck = {
          role: "ADULT",
          type: "FREE_NO_TICKET",
        };
        const object = {
          price_range,
          ...updatedFormListCheck,
          ...quantityAdult,
          ...updatedAgeForAdult,
          apply_dates: selectDateAdult,
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
          apply_dates: selectDateAdult,
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
    console.log(countryCode);
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
  //select date
  const [selectDateDefault, setSelectDateDefault] = useState([]);
  const [selectDateAdult, setSelectDateAdult] = useState([]);
  const [selectDateChildren, setSelectDateChildren] = useState([]);

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
    if (field === "default") {
      const updatedFormList = formList.map((form, index) => {
        if (form.id === id) {
          const updatedForm = {
            ...form,
            numberOfPeopleAfter:
              newNumberOfPeople >= form.numberOfPeople
                ? newNumberOfPeople
                : form.numberOfPeople,
            payoutPerPerson: form.retailPrice * commision,
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
            payoutPerPerson: form.retailPrice * commision,
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
            payoutPerPerson: form.retailPrice * commision,
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
  useEffect(() => {
    if (selectedCountries.length === 0) {
      const convertArray = {
        price_range: formList,
        ...quantityDefault,
        ...typeDefault,
        ...ageDefault,
        apply_dates: selectDateDefault,
      };
      setDataTicket([convertArray]);
    }
  }, [
    selectedCountries,
    formList,
    quantityDefault,
    typeDefault,
    selectDateDefault,
  ]);
  useEffect(() => {
    funcUpdateTicketRole();
  }, [
    selectedCountries,
    selectedRadio,
    formListChildren,
    formList,
    formListAdult,
    quantityAdult,
    quantityChildren,
    typeDefault,
    selectDateChildren,
    selectDateAdult,
  ]);

  useEffect(() => {
    if (index) {
      dispatch(fetchTourDetail(index));
    }
    dispatch(getCommistionRate());
  }, [dispatch, index]);
  useEffect(() => {
    setDataTicketCreate(dataTicket);
  }, [dataTicket, setDataTicketCreate]);
  const formatNumberWithCommas = (value: any) => {
    const numericValue = value?.toString()?.replace(/[^0-9]/g, "");

    if (numericValue?.length >= 3) {
      return new Intl.NumberFormat("en-US")?.format(Number(numericValue));
    }

    return numericValue;
  };

  const handleDateChange = (newDates: any, field: string) => {
    const formatDate = newDates?.map((date: any) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    if (field === "default") {
      setSelectDateDefault(formatDate);
    }
    if (field === "adult") {
      setSelectDateAdult(formatDate);
    }
    if (field === "children") {
      setSelectDateChildren(formatDate);
    }
  };

  const disableDateAdult = () => {
    const adultTicket = tourDetail?.TicketPricing.filter(
      (ticket: any) => ticket.Ticket.name === "ADULT"
    );
    const formattedDates = adultTicket?.flatMap((dateFil: any) =>
      dateFil?.apply_dates?.map((dateApp: string) =>
        dayjs(dateApp).format("YYYY-MM-DD")
      )
    );
    return formattedDates;
  };
  const disableDateChildren = () => {
    const adultTicket = tourDetail?.TicketPricing.filter(
      (ticket: any) => ticket.Ticket.name === "CHILDREN"
    );
    const formattedDates = adultTicket?.flatMap((dateFil: any) =>
      dateFil?.apply_dates?.map((dateApp: string) =>
        dayjs(dateApp).format("YYYY-MM-DD")
      )
    );
    return formattedDates;
  };
  const dataDisableDateAdult = disableDateAdult();
  const dataDisableDateChildren = disableDateChildren();
  return (
    <div className="max-h-[68vh] overflow-auto global-scrollbar">
      <div className="flex items-center justify-center">
        <div className="py-5">
          <div className="hidden">
            <ButtonCreateTicketSpecial />
          </div>
          {selectedCountries.length === 0 && (
            <div className="mt-3 flex flex-col items-start gap-4">
              <div className="flex items-center gap-8">
                <div className="">
                  <p className="font-medium mb-1">Minimum ticket count</p>
                  <div className=" relative ">
                    <p className="absolute top-4 left-2">
                      <GoLocation />
                    </p>
                    <input
                      disabled
                      className="w-28 border rounded-lg pr-1 pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                      type="number"
                      value={quantityDefault.min}
                      onChange={(e) => handleInputChange(e, "min", "default")}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="mb-1 flex flex-col">
                    <span className="font-medium">Maximum ticket count</span>
                    {formList[formList.length - 1]?.numberOfPeopleAfter >
                      quantityDefault?.max && (
                      <span className="text-red-500 text-sm">
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
              <div className="flex flex-col w-full">
                {" "}
                <div className="flex flex-col mt-2">
                  <span className="font-medium mb-1">Date special</span>
                  <div className="bg-white">
                    <DatePicker
                      multiple
                      id="selectDateSingle"
                      mapDays={({ date }) => {
                        const formattedDate = date.format("YYYY-MM-DD");
                        const isDisabled =
                          dataDisableDateAdult.includes(formattedDate);
                        const dayClasses = isDisabled
                          ? "text-gray-500 bg-gray-200 cursor-not-allowed"
                          : "hover:bg-blue-500 hover:text-white cursor-pointer";

                        return { className: dayClasses, disabled: isDisabled };
                      }}
                      onChange={(e) => handleDateChange(e, "default")}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white relative border border-gray-400 border-solid shadow-custom-card-mui">
                <FaRegTrashCan
                  className="absolute , top-0, right-3 text-white "
                  onClick={() => handleDeleteCountry("default")}
                />
                <div className="flex items-center gap-1">
                  <p className="font-medium text-lg">Default Ticket</p>
                  {formList?.length < 2 && (
                    <span className="text-xs text-red-500">
                      * Please Number of People at least 2
                    </span>
                  )}
                </div>

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
                              type="text"
                              id="retailPriceChildren"
                              className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md py-2 pl-2"
                              value={formatNumberWithCommas(form?.retailPrice)}
                              onChange={(e) => {
                                const newValue = e.target.value.replace(
                                  /,/g,
                                  ""
                                );
                                handleRetailPriceChange(
                                  { target: { value: newValue } },
                                  form.id,
                                  ""
                                );
                              }}
                            />
                            {form.retailPrice <= 50000 && (
                              <span className="text-red-500 text-xs block">
                                Greater than 50,000
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium h-4 mb-2">Commission</p>
                            <p className="font-medium">{commision * 100}%</p>
                          </div>
                          <div>
                            <div className="font-medium h-4 mb-2">
                              Payout per person
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                className="p-2 w-20 bg-slate-200 rounded-md"
                                value={formatNumberInput(form.payoutPerPerson)}
                                disabled
                              />
                              <div className="flex items-center gap-2">
                                <p className="font-medium">VND</p>
                                {form.id !== 0 ? (
                                  <button
                                    className="font-medium text-red-600 hover:text-red-800 text-xl mb-1"
                                    onClick={() => removeForm(form.id, "")}
                                  >
                                    <IoMdClose />
                                  </button>
                                ) : (
                                  <div className="font-medium text-white  text-xl ">
                                    <IoMdClose />
                                  </div>
                                )}
                              </div>
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
                <div className="flex flex-col gap-2">
                  <div className=" flex items-center gap-8">
                    <div className="">
                      <p className="font-medium mb-1">
                        Minimum adult ticket count
                      </p>
                      <div className=" relative ">
                        <p className="absolute top-4 left-2">
                          <GoLocation />
                        </p>
                        <input
                          disabled
                          className="w-28 border rounded-lg pr-1 pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                          type="number"
                          value={quantityAdult.min}
                          onChange={(e) => handleInputChange(e, "min", "adult")}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-1 flex flex-col">
                        <span className="font-medium mb-1">
                          Maximum adult ticket count
                        </span>
                        {formListAdult[formListAdult.length - 1]
                          ?.numberOfPeopleAfter > quantityAdult?.max && (
                          <span className="text-red-500 text-sm">
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
                  <p className="font-medium">Date special adult</p>

                  <DatePicker
                    id="selectDateSingle"
                    multiple
                    mapDays={({ date }) => {
                      const formattedDate = date.format("YYYY-MM-DD");
                      const isDisabled =
                        dataDisableDateAdult.includes(formattedDate);
                      return { disabled: isDisabled };
                    }}
                    onChange={(e) => handleDateChange(e, "adult")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-8">
                    <div className="">
                      <p className="font-medium mb-1">
                        Minimum children ticket count
                      </p>
                      <div className=" relative ">
                        <p className="absolute top-4 left-2">
                          <GoLocation />
                        </p>
                        <input
                          disabled
                          className="w-28 border rounded-lg pl-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                          type="number"
                          value={quantityChildren.min}
                          onChange={(e) =>
                            handleInputChange(e, "min", "children")
                          }
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-1 flex flex-col">
                        <span className="font-medium mb-1">
                          Maximum children ticket count
                        </span>
                        {formListChildren[formListChildren.length - 1]
                          ?.numberOfPeopleAfter > quantityChildren?.max && (
                          <span className="text-red-500 text-sm">
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

                  <div>
                    <p className="font-medium mb-1">Date special children</p>
                    <DatePicker
                      multiple
                      id="selectDateSingle"
                      mapDays={({ date }) => {
                        const formattedDate = date.format("YYYY-MM-DD");
                        const isDisabled =
                          dataDisableDateChildren.includes(formattedDate);
                        return { disabled: isDisabled };
                      }}
                      onChange={(e) => handleDateChange(e, "children")}
                    />
                  </div>
                </div>
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
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-lg">Adults</p>
                  {formListAdult?.length < 2 &&
                    selectedRadio?.adults !== "Free - no ticket required" && (
                      <span className="text-xs text-red-500">
                        * Please Number of People at least 2
                      </span>
                    )}
                </div>
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
                            className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  "
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
                                disabled={selectedRadio.children !== "Standard"}
                              />

                              <label
                                htmlFor={`default-radio-${index + 1}`}
                                className="ml-3 text-sm font-medium text-gray-900 "
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
                                type="text"
                                id="retailPriceChildren"
                                className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md py-2 pl-2"
                                value={formatNumberWithCommas(
                                  form?.retailPrice
                                )}
                                onChange={(e) => {
                                  // Loại bỏ dấu phẩy khi người dùng nhập giá trị
                                  const newValue = e.target.value.replace(
                                    /,/g,
                                    ""
                                  );
                                  handleRetailPriceChange(
                                    { target: { value: newValue } },
                                    form.id,
                                    "adult"
                                  );
                                }}
                              />
                              {form.retailPrice <= 50000 && (
                                <span className="text-red-500 text-xs block">
                                  Greater than 50,000
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">Commission</p>
                              <p className="font-medium">{commision * 100}%</p>
                            </div>
                            <div>
                              <div className="font-medium">
                                Payout per person
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  className="p-2 w-20 bg-slate-200 rounded-md"
                                  value={formatNumberInput(
                                    form.payoutPerPerson
                                  )}
                                  disabled
                                />
                                <p className="font-medium">VND</p>
                                {form.id !== 0 ? (
                                  <button
                                    className="text-red-500"
                                    onClick={() => removeForm(form.id, "adult")}
                                  >
                                    <IoMdClose />
                                  </button>
                                ) : (
                                  <>
                                    <div className="text-white">
                                      <IoMdClose />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          className=" text-base font-semibold bg-white p-0 mt-2 focus:outline-none hover:border-none hover:p-0 hover:m border-none text-navy-blue hover:text-black"
                          onClick={() => addNewForm("adult")}
                        >
                          Set up price tiers
                        </button>
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
                              {form.id !== 0 ? (
                                <button
                                  className="ml-2"
                                  onClick={() => removeForm(form.id, "adult")}
                                >
                                  <IoMdClose />
                                </button>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div></div>
                          </div>
                        ))}
                        <button
                          className=" text-base font-semibold bg-white p-0 mt-2 focus:outline-none hover:border-none hover:p-0 hover:m border-none text-navy-blue hover:text-black"
                          onClick={() => addNewForm("adult")}
                        >
                          Set up price tiers
                        </button>
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
              <div className="p-4 rounded-lg bg-white relative border border-gray-400 border-solid shadow-custom-card-mui">
                <FaRegTrashCan
                  className="absolute , top-0, right-3 text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteCountry("Children")}
                />
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-lg">Children</p>
                  {formListChildren?.length < 2 &&
                    selectedRadio?.children !== "Free - no ticket required" && (
                      <span className="text-xs text-red-500">
                        * Please Number of People at least 2
                      </span>
                    )}
                </div>

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
                            className="w-20 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
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
                                disabled={selectedRadio.adults !== "Standard"}
                              />

                              <label
                                htmlFor={`default-radio-${index + 1}`}
                                className="ml-3 text-sm font-medium text-gray-900"
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
                                type="text"
                                id="retailPriceChildren"
                                className="w-20 bg-white border border-gray-300 text-gray-900 text-base font-medium rounded-md py-2 pl-2"
                                value={formatNumberWithCommas(
                                  form?.retailPrice
                                )}
                                onChange={(e) => {
                                  // Loại bỏ dấu phẩy khi người dùng nhập giá trị
                                  const newValue = e.target.value.replace(
                                    /,/g,
                                    ""
                                  );
                                  handleRetailPriceChange(
                                    { target: { value: newValue } },
                                    form.id,
                                    "children"
                                  );
                                }}
                              />
                              {form.retailPrice <= 50000 && (
                                <span className="text-red-500 text-xs block">
                                  Greater than 50,000
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">Commission</p>
                              <p className="font-medium">{commision * 100}%</p>
                            </div>
                            <div>
                              <div className="font-medium">
                                Payout per person
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  className="p-2 w-20 bg-slate-200 rounded-md"
                                  value={formatNumberInput(
                                    form?.payoutPerPerson
                                  )}
                                  disabled
                                />
                                <p className="font-medium">VND</p>
                                {form.id !== 0 ? (
                                  <button
                                    className="text-red-500"
                                    onClick={() =>
                                      removeForm(form.id, "children")
                                    }
                                  >
                                    <IoMdClose />
                                  </button>
                                ) : (
                                  <>
                                    <div className="text-white">
                                      <IoMdClose />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          className=" text-base font-semibold bg-white p-0 mt-2 focus:outline-none hover:border-none hover:p-0 hover:m border-none text-navy-blue hover:text-black"
                          onClick={() => addNewForm("children")}
                        >
                          Set up price tiers
                        </button>
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
                              {form.id !== 0 ? (
                                <button
                                  className="ml-2"
                                  onClick={() =>
                                    removeForm(form.id, "children")
                                  }
                                >
                                  <IoMdClose />
                                </button>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div></div>
                          </div>
                        ))}
                        <button
                          className=" text-base font-semibold bg-white p-0 mt-2 focus:outline-none hover:border-none hover:p-0 hover:m border-none text-navy-blue hover:text-black"
                          onClick={() => addNewForm("children")}
                        >
                          Set up price tiers
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketSpecial;
