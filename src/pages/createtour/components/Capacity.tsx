import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BannerContainer,
  BannerContentPrice,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import {
  FaCheck,
  FaRegCalendarCheck,
  FaRegClock,
  FaRegTrashCan,
} from "react-icons/fa6";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { RiRefund2Line } from "react-icons/ri";
import { MdOutlineSubtitles } from "react-icons/md";
import { ElementCheckInput } from "../../../utils/ElementCheckInput";

const Capacity: React.FC = () => {
  const { currentStep, updateFormValues, formValues } = useStepContext();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const [capacity, setCapacity] = useState("");
  const [bookBefore, setBoookBefore] = useState<number>(0);
  const [refundBefore, setRefundBefore] = useState<number>(0);
  const [startingTimes, setStartingTimes] = useState<any>({
    Mon: [new Date()],
    Tue: [new Date()],
    Wed: [new Date()],
    Thu: [new Date()],
    Fri: [new Date()],
    Sat: [new Date()],
    Sun: [new Date()],
    Single: [new Date()],
    DateFrom: "",
    DateTo: "",
  });
  const [startingTimeCheckBox, setStartingTimeCheckBox] = useState<any>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
    Single: [],
  });
  const [startingTimeSingle, setStartingTimeSingle] = useState<any>([]);

  function formatTimeToHourAndMinute(date: any) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      ?.padStart(2, "0")}`;

    return formattedTime;
  }

  const formattedStartingTimes = {
    Mon: startingTimeCheckBox.Mon.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Tue: startingTimeCheckBox.Tue.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Wed: startingTimeCheckBox.Wed.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Thu: startingTimeCheckBox.Thu.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Fri: startingTimeCheckBox.Fri.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Sat: startingTimeCheckBox.Sat.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Sun: startingTimeCheckBox.Sun.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    SingleTime: startingTimeSingle.map((time: any) => ({
      day: time.day,
      time: time.time.toString(),
    })),
    DateFrom: startingTimes.DateFrom,
    DateTo: startingTimes.DateTo,
    Title: capacity,
    BookBefore: bookBefore,
    RefundBefore: refundBefore,
  };

  const [selectedHour, setSelectedHour] = useState<any>({
    Mon: [currentHour, currentMinute],
    Tue: [currentHour, currentMinute],
    Wed: [currentHour, currentMinute],
    Thu: [currentHour, currentMinute],
    Fri: [currentHour, currentMinute],
    Sat: [currentHour, currentMinute],
    Sun: [currentHour, currentMinute],
  });

  const [selectedMinute, setSelectedMinute] = useState<any>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
    Single: [],
  });
  const addStartingTime = (field: string) => {
    const previousTime =
      startingTimes[field]?.length > 0
        ? startingTimes[field][startingTimes[field]?.length - 1]
        : new Date();
    const newTime = new Date(previousTime);
    newTime.setMinutes(newTime.getMinutes() + 5);

    setStartingTimes((prevStartingTimes: any) => ({
      ...prevStartingTimes,
      [field]: [...prevStartingTimes[field], newTime],
    }));

    setSelectedHour((prevSelectedHour: any) => ({
      ...prevSelectedHour,
      [field]: [...prevSelectedHour[field], newTime.getHours()],
    }));
    setSelectedMinute((prevSelectedMinute: any) => ({
      ...prevSelectedMinute,
      [field]: [...prevSelectedMinute[field], newTime.getMinutes()],
    }));
  };
  const addDayWithTime = (e: any) => {
    const newDateFrom = dayjs(e).format("YYYY-MM-DD");
    if (!startingTimeSingle.some((date: any) => date.day === newDateFrom)) {
      const newDay = {
        day: newDateFrom,
        time: ["10:00"],
      };
      setStartingTimeSingle([...startingTimeSingle, newDay]);
    } else {
      alert("Ngày đã tồn tại trong special_dates");
    }
  };

  const addTimeToDay = (dayIndex: number) => {
    if (dayIndex >= 0 && dayIndex < startingTimeSingle.length) {
      const updatedStartingTimeSingle = [...startingTimeSingle];
      updatedStartingTimeSingle[dayIndex].time.push("10:00");
      setStartingTimeSingle(updatedStartingTimeSingle);
    }
  };
  const updateHourForDay = (
    dayIndex: number,
    timeIndex: number,
    newHour: number
  ) => {
    if (
      dayIndex >= 0 &&
      dayIndex < startingTimeSingle.length &&
      timeIndex >= 0 &&
      timeIndex < startingTimeSingle[dayIndex].time.length
    ) {
      const updatedStartingTimeSingle = [...startingTimeSingle];
      const time =
        updatedStartingTimeSingle[dayIndex].time[timeIndex].split(":");
      time[0] = String(newHour).padStart(2, "0");
      updatedStartingTimeSingle[dayIndex].time[timeIndex] = time.join(":");
      setStartingTimeSingle(updatedStartingTimeSingle);
    }
  };

  const updateMinuteForDay = (
    dayIndex: number,
    timeIndex: number,
    newMinute: number
  ) => {
    if (
      dayIndex >= 0 &&
      dayIndex < startingTimeSingle.length &&
      timeIndex >= 0 &&
      timeIndex < startingTimeSingle[dayIndex].time.length
    ) {
      const updatedStartingTimeSingle = [...startingTimeSingle];
      const time =
        updatedStartingTimeSingle[dayIndex].time[timeIndex].split(":");
      time[1] = String(newMinute).padStart(2, "0");
      updatedStartingTimeSingle[dayIndex].time[timeIndex] = time.join(":");
      setStartingTimeSingle(updatedStartingTimeSingle);
    }
  };
  const updateDayForDay = (dayIndex: number, newDate: string) => {
    if (dayIndex >= 0 && dayIndex < startingTimeSingle.length) {
      const updatedStartingTimeSingle = [...startingTimeSingle];
      updatedStartingTimeSingle[dayIndex].day = newDate;
      setStartingTimeSingle(updatedStartingTimeSingle);
    }
  };

  const handleHourChange = (index: number, value: number, field: string) => {
    const updatedHours = [...selectedHour[field]];
    updatedHours[index] = value;
    setSelectedHour({ ...selectedHour, [field]: updatedHours });

    const updatedStartingTimes = { ...startingTimes };
    console.log(value);
    updatedStartingTimes[field][index].setHours(value);

    setStartingTimes(updatedStartingTimes);
  };

  const handleMinuteChange = (index: number, value: number, field: string) => {
    const updatedMinutes = [...selectedMinute[field]];
    updatedMinutes[index] = value;
    setSelectedMinute({ ...selectedMinute, [field]: updatedMinutes });

    const updatedStartingTimes = { ...startingTimes };
    updatedStartingTimes[field][index].setMinutes(value);

    setStartingTimes(updatedStartingTimes);
  };

  const removeDay = (dayIndex: number) => {
    if (dayIndex >= 0 && dayIndex < startingTimeSingle.length) {
      const updatedStartingTimeSingle = [...startingTimeSingle];
      updatedStartingTimeSingle.splice(dayIndex, 1);
      setStartingTimeSingle(updatedStartingTimeSingle);
    }
  };

  const copyToWholeWeek = (sourceDay: string) => {
    const sourceData = startingTimes[sourceDay];
    const sourceHour = selectedHour[sourceDay];
    const sourceMinute = selectedMinute[sourceDay];
    const updatedStartingTimes = { ...startingTimes };
    const updatedSelectedHour = { ...selectedHour };
    const updatedSelectedMinute = { ...selectedMinute };

    const daysToCopyTo = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (const day of daysToCopyTo) {
      if (day !== sourceDay) {
        updatedStartingTimes[day] = [...sourceData];
        updatedSelectedHour[day] = [...sourceHour];
        updatedSelectedMinute[day] = [...sourceMinute];
      }
    }
    setSelectedHour(updatedSelectedHour);
    setSelectedMinute(updatedSelectedMinute);
    setStartingTimes(updatedStartingTimes);
  };
  const onChangeDateFrom = (e: any, field: string) => {
    const newDate = dayjs(e).format("YYYY-MM-DD");

    if (field === "from") {
      setStartingTimes((prevStartingTimes: any) => {
        return {
          ...prevStartingTimes,
          DateFrom: newDate,
        };
      });
    }
    if (field === "to") {
      setStartingTimes((prevStartingTimes: any) => {
        return {
          ...prevStartingTimes,
          DateTo: newDate,
        };
      });
    }
  };

  const handleCheckBoxChange = (day: string) => {
    setStartingTimeCheckBox((prev: any) => {
      if (prev[day].length > 0) {
        // If there are selected times, remove them
        return {
          ...prev,
          [day]: [],
        };
      } else {
        // If there are no selected times, copy from startingTimes
        return {
          ...prev,
          [day]: startingTimes[day].slice(),
        };
      }
    });
  };

  const handleSelectAllChange = () => {
    setStartingTimeCheckBox((prev: any) => {
      const allSelected = Object.values(prev).some(
        (day: any) => day.length > 0
      );

      if (allSelected) {
        // If all times are selected, unselect all
        return Object.fromEntries(Object.keys(prev).map((day) => [day, []]));
      } else {
        // If not all times are selected, copy from startingTimes for all days
        return Object.fromEntries(
          Object.keys(prev).map((day) => [day, startingTimes[day].slice()])
        );
      }
    });
  };
  const optionHr = [];
  for (let i = 0; i <= 23; i++) {
    optionHr.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const optionMin = [];
  for (let i = 0; i <= 59; i++) {
    optionMin.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const daysWithOptions = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Single",
  ];
  const convertToYYYYMMDD = (dateString: any) => {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateString;
  };

  const optionsByDay = daysWithOptions.reduce((acc: any, day: any) => {
    const optionHr: any = [];
    const optionMin: any = [];

    for (let i = 0; i <= 23; i++) {
      optionHr.push(
        <option key={`hr-${i}`} value={i}>
          {i}
        </option>
      );
    }

    for (let i = 0; i <= 59; i++) {
      optionMin.push(
        <option key={`min-${i}`} value={i}>
          {i}
        </option>
      );
    }

    acc[day] = {
      hr: optionHr,
      min: optionMin,
    };

    return acc;
  }, {});

  const handlePersonalInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setCapacity(inputData);
  };
  useEffect(() => {
    updateFormValues(5, { Capacity: formattedStartingTimes });
  }, [
    startingTimes,
    startingTimeSingle,
    capacity,
    bookBefore,
    refundBefore,
    startingTimeCheckBox,
  ]);

  if (currentStep !== 9) {
    return null;
  }
  const tomorrow = dayjs().add(formValues[5]?.Capacity?.BookBefore, "day");
  const handleClickTimeSingleDate = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const addButton: HTMLButtonElement | null = document.querySelector(
      ".single-date-celandar .MuiButtonBase-root"
    );

    if (addButton) {
      addButton.click();
    }
  };

  return (
    <BannerContainer className="global-scrollbar">
      <div className="flex items-center justify-center">
        <BannerContentPrice>
          <CreateTitleNullDes>Availability</CreateTitleNullDes>
          <CreateDescription>
            When is your activity available for customers? Add your activity’s
            dates and times by connecting your booking system or by manually
            entering the information for your product and options.
          </CreateDescription>
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-medium mb-1">
                Name (e.g. Summer Season, Autumn 2011... ){" "}
                {capacity?.length === 0 && <ElementCheckInput />}
              </p>
              <div className="  relative ">
                <MdOutlineSubtitles className="absolute top-4 left-2" />
                <input
                  className="w-1/2 border rounded-lg px-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                  placeholder="New availability"
                  type="text"
                  value={capacity}
                  onChange={handlePersonalInfo}
                />
              </div>
            </div>
            <div>
              <p className="font-medium mb-1 flex items-center">
                Book Before (calculated from the tour start time)
                {bookBefore < 1 && (
                  <span className="text-xs text-red-500 font-normal">
                    * Book Before greater than 1
                  </span>
                )}
              </p>
              <div className="  relative ">
                <FaRegCalendarCheck className="absolute top-4 left-2" />
                <input
                  min={1}
                  className="w-1/2 border rounded-lg px-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                  placeholder="New availability"
                  value={bookBefore}
                  type="text"
                  onChange={(e) => {
                    const inputValue = parseInt(e.target.value, 10);
                    const newValue = isNaN(inputValue) ? 0 : inputValue;
                    setBoookBefore(newValue);
                  }}
                />
              </div>
            </div>
            <div>
              <p className="font-medium mb-1 flex item-center">
                Refund Before (calculated from the tour start time){" "}
                {refundBefore < 1 && (
                  <span className="text-xs text-red-500 font-normal">
                    * Refund Before greater than 1
                  </span>
                )}
              </p>
              <div className="  relative ">
                <RiRefund2Line className="absolute top-4 left-2" />
                <input
                  className="w-1/2 border rounded-lg px-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                  placeholder="New availability"
                  value={refundBefore}
                  type="text"
                  onChange={(e) => {
                    const inputValue = parseInt(e.target.value, 10);
                    const newValue = isNaN(inputValue) ? 0 : inputValue;
                    setRefundBefore(newValue);
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-medium">Validity of this season</p>{" "}
              <div className="flex items-center gap-3 mt-2">
                <p className="font-medium text-gray-500">Valid from </p>
                <div className="create-tour-valid-date">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "DatePicker",
                        "DateTimePicker",
                        "DateRangePicker",
                      ]}
                    >
                      <DemoItem>
                        <DatePicker
                          value={dayjs(startingTimes?.DateFrom)}
                          minDate={tomorrow}
                          onChange={(e) => onChangeDateFrom(e, "from")}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <p className="font-medium text-gray-500">to</p>
                <div>
                  <div className="create-tour-valid-date">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={[
                          "DatePicker",
                          "DateTimePicker",
                          "DateRangePicker",
                        ]}
                      >
                        <DemoItem>
                          <DatePicker
                            value={dayjs(startingTimes?.DateTo)}
                            minDate={dayjs(startingTimes?.DateFrom)}
                            onChange={(e) => onChangeDateFrom(e, "to")}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-1">
                <p className="font-medium">Weekly starting times</p>
                {startingTimeCheckBox?.Mon?.length === 0 &&
                  startingTimeCheckBox?.Tue?.length === 0 &&
                  startingTimeCheckBox?.Wed?.length === 0 &&
                  startingTimeCheckBox?.Thu?.length === 0 &&
                  startingTimeCheckBox?.Fri?.length === 0 &&
                  startingTimeCheckBox?.Sat?.length === 0 &&
                  startingTimeCheckBox?.Sun?.length === 0 && (
                    <span className="text-xs text-red-500">
                      * Choose at least 1
                    </span>
                  )}
              </div>

              <div className="">
                <div className="mt-2">
                  <label className="font-medium flex gap-1 mb-2">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllChange}
                      checked={Object.values(startingTimeCheckBox).every(
                        (day: any) => day.length > 0
                      )}
                    />
                    Select All
                  </label>
                  <div className="flex flex-wrap items-center mb-1 gap-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("Mon")}
                      checked={startingTimeCheckBox?.Mon?.length > 0}
                    />
                    <p className="font-medium mr-5 w-5 ">Mon</p>
                    {startingTimes?.Mon?.map((_item: any, index: number) => (
                      <div key={index} className="flex items-center mr-4">
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedHour?.Mon[index]}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              parseInt(e.target.value),
                              "Mon"
                            )
                          }
                        >
                          {optionsByDay["Mon"].hr}
                        </select>
                        <div className="mx-1 font-medium"> :</div>
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedMinute?.Mon[index]}
                          onChange={(e) =>
                            handleMinuteChange(
                              index,
                              parseInt(e.target.value),
                              "Mon"
                            )
                          }
                        >
                          {optionsByDay["Mon"].min}
                        </select>
                        {/* <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Mon")}
                      /> */}
                      </div>
                    ))}
                    {startingTimes?.Mon.length < 1 && (
                      <button
                        className="flex items-center  border-none mr-3"
                        onClick={() => addStartingTime("Mon")}
                      >
                        <FaRegClock className="text-navy-blue mr-1" />{" "}
                        <span className="font-medium text-navy-blue hover:text-black text-md">
                          Add starting time
                        </span>
                      </button>
                    )}

                    <button
                      className="flex items-center  border-none"
                      onClick={() => copyToWholeWeek("Mon")}
                    >
                      <FaCheck className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Copy to whole
                      </span>
                    </button>
                  </div>

                  <hr className="mt-3" />
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap items-center mb-1 gap-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("Tue")}
                      checked={startingTimeCheckBox?.Tue?.length > 0}
                    />
                    <p className="font-medium mr-5 w-5">Tue</p>
                    {startingTimes?.Tue?.map((_item: any, index: number) => (
                      <div key={index} className="flex items-center mr-4">
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedHour?.Tue[index]}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              parseInt(e.target.value),
                              "Tue"
                            )
                          }
                        >
                          {optionsByDay["Tue"].hr}
                        </select>
                        <div className="mx-1 font-medium"> :</div>
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedMinute?.Tue[index]}
                          onChange={(e) =>
                            handleMinuteChange(
                              index,
                              parseInt(e.target.value),
                              "Tue"
                            )
                          }
                        >
                          {optionsByDay["Tue"].min}
                        </select>
                        {/* <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Tue")}
                      /> */}
                      </div>
                    ))}
                    {startingTimes?.Tue.length < 1 && (
                      <button
                        className="flex items-center  border-none mr-3  "
                        onClick={() => addStartingTime("Tue")}
                      >
                        <FaRegClock className="text-navy-blue mr-1" />{" "}
                        <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                          Add starting time
                        </span>
                      </button>
                    )}
                    <button
                      className="flex items-center  border-none"
                      onClick={() => copyToWholeWeek("Tue")}
                    >
                      <FaCheck className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Copy to whole
                      </span>
                    </button>
                  </div>

                  <hr className="mt-3" />
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap items-center mb-1 gap-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("Wed")}
                      checked={startingTimeCheckBox?.Wed?.length > 0}
                    />
                    <p className="font-medium mr-5 w-5">Wed</p>
                    {startingTimes?.Wed?.map((_item: any, index: number) => (
                      <div key={index} className="flex items-center mr-4">
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedHour?.Wed[index]}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              parseInt(e.target.value),
                              "Wed"
                            )
                          }
                        >
                          {optionsByDay["Wed"].hr}
                        </select>
                        <div className="mx-1 font-medium"> :</div>
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedMinute?.Wed[index]}
                          onChange={(e) =>
                            handleMinuteChange(
                              index,
                              parseInt(e.target.value),
                              "Wed"
                            )
                          }
                        >
                          {optionsByDay["Wed"].min}
                        </select>
                        {/* <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Wed")}
                      /> */}
                      </div>
                    ))}

                    {startingTimes?.Wed.length < 1 && (
                      <button
                        className="flex items-center  border-none  mr-3"
                        onClick={() => addStartingTime("Wed")}
                      >
                        <FaRegClock className="text-navy-blue mr-1" />{" "}
                        <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                          Add starting time
                        </span>
                      </button>
                    )}
                    <button
                      className="flex items-center  border-none"
                      onClick={() => copyToWholeWeek("Wed")}
                    >
                      <FaCheck className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Copy to whole
                      </span>
                    </button>
                  </div>

                  <hr className="mt-3" />
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap items-center mb-1 gap-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("Thu")}
                      checked={startingTimeCheckBox?.Thu?.length > 0}
                    />
                    <p className="font-medium mr-5 w-5">Thu</p>
                    {startingTimes?.Thu?.map((_item: any, index: number) => (
                      <div key={index} className="flex items-center mr-4">
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedHour?.Thu[index]}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              parseInt(e.target.value),
                              "Thu"
                            )
                          }
                        >
                          {optionsByDay["Thu"].hr}
                        </select>
                        <div className="mx-1 font-medium"> :</div>
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedMinute?.Thu[index]}
                          onChange={(e) =>
                            handleMinuteChange(
                              index,
                              parseInt(e.target.value),
                              "Thu"
                            )
                          }
                        >
                          {optionsByDay["Thu"].min}
                        </select>
                        {/* <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Thu")}
                      /> */}
                      </div>
                    ))}
                    {startingTimes?.Thu.length < 1 && (
                      <button
                        className="flex items-center  border-none  mr-3"
                        onClick={() => addStartingTime("Thu")}
                      >
                        <FaRegClock className="text-navy-blue mr-1" />{" "}
                        <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                          Add starting time
                        </span>
                      </button>
                    )}
                    <button
                      className="flex items-center  border-none"
                      onClick={() => copyToWholeWeek("Thu")}
                    >
                      <FaCheck className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Copy to whole
                      </span>
                    </button>
                  </div>

                  <hr className="mt-3" />
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap items-center mb-1 gap-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("Fri")}
                      checked={startingTimeCheckBox?.Fri?.length > 0}
                    />
                    <p className="font-medium mr-5 w-5">Fri</p>
                    {startingTimes?.Fri?.map((_item: any, index: number) => (
                      <div key={index} className="flex items-center mr-4">
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedHour?.Fri[index]}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              parseInt(e.target.value),
                              "Fri"
                            )
                          }
                        >
                          {optionsByDay["Fri"].hr}
                        </select>
                        <div className="mx-1 font-medium"> :</div>
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedMinute?.Fri[index]}
                          onChange={(e) =>
                            handleMinuteChange(
                              index,
                              parseInt(e.target.value),
                              "Fri"
                            )
                          }
                        >
                          {optionsByDay["Fri"].min}
                        </select>
                        {/* <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Fri")}
                      /> */}
                      </div>
                    ))}
                    {startingTimes?.Fri.length < 1 && (
                      <button
                        className="flex items-center  border-none  mr-3"
                        onClick={() => addStartingTime("Fri")}
                      >
                        <FaRegClock className="text-navy-blue mr-1" />{" "}
                        <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                          Add starting time
                        </span>
                      </button>
                    )}
                    <button
                      className="flex items-center  border-none"
                      onClick={() => copyToWholeWeek("Fri")}
                    >
                      <FaCheck className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Copy to whole
                      </span>
                    </button>
                  </div>

                  <hr className="mt-3" />
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap items-center mb-1 gap-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("Sat")}
                      checked={startingTimeCheckBox?.Sat?.length > 0}
                    />
                    <p className="font-medium mr-5 w-5">Sat</p>
                    {startingTimes?.Sat?.map((_item: any, index: number) => (
                      <div key={index} className="flex items-center mr-4">
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedHour?.Sat[index]}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              parseInt(e.target.value),
                              "Sat"
                            )
                          }
                        >
                          {optionsByDay["Sat"].hr}
                        </select>
                        <div className="mx-1 font-medium"> :</div>
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedMinute?.Sat[index]}
                          onChange={(e) =>
                            handleMinuteChange(
                              index,
                              parseInt(e.target.value),
                              "Sat"
                            )
                          }
                        >
                          {optionsByDay["Sat"].min}
                        </select>
                        {/* <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Sat")}
                      /> */}
                      </div>
                    ))}
                    {startingTimes?.Sat.length < 1 && (
                      <button
                        className="flex items-center  border-none  mr-3"
                        onClick={() => addStartingTime("Sat")}
                      >
                        <FaRegClock className="text-navy-blue mr-1" />{" "}
                        <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                          Add starting time
                        </span>
                      </button>
                    )}
                    <button
                      className="flex items-center  border-none"
                      onClick={() => copyToWholeWeek("Sat")}
                    >
                      <FaCheck className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Copy to whole
                      </span>
                    </button>
                  </div>

                  <hr className="mt-3" />
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap items-center mb-1 gap-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("Sun")}
                      checked={startingTimeCheckBox?.Sun?.length > 0}
                    />
                    <p className="font-medium mr-5 w-5">Sun</p>
                    {startingTimes?.Sun?.map((_item: any, index: number) => (
                      <div key={index} className="flex items-center mr-4">
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedHour?.Sun[index]}
                          onChange={(e) =>
                            handleHourChange(
                              index,
                              parseInt(e.target.value),
                              "Sun"
                            )
                          }
                        >
                          {optionsByDay["Sun"].hr}
                        </select>
                        <div className="mx-1 font-medium"> :</div>
                        <select
                          className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                          value={selectedMinute?.Sun[index]}
                          onChange={(e) =>
                            handleMinuteChange(
                              index,
                              parseInt(e.target.value),
                              "Sun"
                            )
                          }
                        >
                          {optionsByDay["Sun"].min}
                        </select>
                        {/* <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Sun")}
                      /> */}
                      </div>
                    ))}
                    {startingTimes?.Sun.length < 1 && (
                      <button
                        className="flex items-center  border-none  mr-3"
                        onClick={() => addStartingTime("Sun")}
                      >
                        <FaRegClock className="text-navy-blue mr-1" />{" "}
                        <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                          Add starting time
                        </span>
                      </button>
                    )}
                    <button
                      className="flex items-center  border-none"
                      onClick={() => copyToWholeWeek("Sun")}
                    >
                      <FaCheck className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Copy to whole
                      </span>
                    </button>
                  </div>

                  <hr className="mt-3" />
                </div>
              </div>
              <div className="mt-3">
                <p className="font-medium">Single/special dates</p>
                <div className="mt-2">
                  {startingTimeSingle?.map(
                    (day: { day: string; time: [] }, dayIndex: number) => (
                      <div
                        key={dayIndex}
                        className="flex flex-wrap items-center mb-4 gap-4"
                      >
                        <FaRegTrashCan
                          className="ml-3 text-red-600 hover:text-red-900"
                          onClick={() => removeDay(dayIndex)}
                        />

                        <input
                          type="date"
                          className="flex items-center justify-center font-medium border border-solid border-gray-300 rounded-md p-2   focus:outline-none focus:ring-1 focus:ring-sky-500"
                          value={convertToYYYYMMDD(day.day)}
                          onChange={(e) =>
                            updateDayForDay(dayIndex, e.target.value)
                          }
                        />
                        {day.time.map((time: string, timeIndex: number) => {
                          const [hour, minute] = time.split(":");

                          return (
                            <div
                              key={timeIndex}
                              className="flex items-center mr-4"
                            >
                              <select
                                className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                                value={hour}
                                onChange={(e) =>
                                  updateHourForDay(
                                    dayIndex,
                                    timeIndex,
                                    parseInt(e.target.value)
                                  )
                                }
                              >
                                {optionsByDay["Single"].hr}
                              </select>
                              <div className="mx-1 font-medium">:</div>
                              <select
                                className="border-solid border border-gray-300 rounded-md p-1 text-sm font-medium"
                                value={minute}
                                onChange={(e) =>
                                  updateMinuteForDay(
                                    dayIndex,
                                    timeIndex,
                                    parseInt(e.target.value)
                                  )
                                }
                              >
                                {optionsByDay["Single"].min}
                              </select>
                            </div>
                          );
                        })}
                        {day.time?.length < 1 && (
                          <button
                            className="flex items-center bg-white border-none"
                            onClick={() => addTimeToDay(dayIndex)}
                          >
                            <FaRegClock className="text-navy-blue mr-1" />{" "}
                            <span className="font-medium text-navy-blue hover:text-black text-md">
                              Add starting time
                            </span>
                          </button>
                        )}
                      </div>
                    )
                  )}
                  <div className="single-date-celandar ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={[
                          "DatePicker",
                          "DateTimePicker",
                          "DateRangePicker",
                        ]}
                      >
                        <DemoItem>
                          <DatePicker
                            value={dayjs(startingTimes?.DateFrom)}
                            minDate={dayjs(startingTimes?.DateFrom)}
                            maxDate={dayjs(startingTimes?.DateTo)}
                            onChange={(e) => addDayWithTime(e)}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                    <button
                      className="flex items-center bg-white border-2 px-3 py-2 border-navy-blue rounded-xl   text-navy-blue hover:text-white hover:bg-navy-blue hover:border-sky-900"
                      onClick={(e) => handleClickTimeSingleDate(e)}
                    >
                      <span className="font-medium text-md  ">
                        Add new date
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BannerContentPrice>
      </div>
    </BannerContainer>
  );
};

export default Capacity;
