import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BannerContainer,
  BannerContentPrice,
  CreateDescription,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { GoLocation } from "react-icons/go";
import { FaCheck, FaRegClock, FaRegTrashCan } from "react-icons/fa6";

const Capacity: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [capacity, setCapacity] = useState("");
  const [startingTimes, setStartingTimes] = useState<any>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
    Single: [],
    DateFrom: "",
    DateTo: "",
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
    Mon: startingTimes.Mon.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Tue: startingTimes.Tue.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Wed: startingTimes.Wed.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Thu: startingTimes.Thu.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Fri: startingTimes.Fri.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Sat: startingTimes.Sat.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    Sun: startingTimes.Sun.map((time: Date) =>
      formatTimeToHourAndMinute(time)
    ).toString(),
    SingleTime: startingTimeSingle.map((time: any) => ({
      day: time.day,
      time: time.time.toString(),
    })),
    DateFrom: startingTimes.DateFrom,
    DateTo: startingTimes.DateTo,
    Title: capacity,
  };

  const [selectedHour, setSelectedHour] = useState<any>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
    Single: [],
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
  const addDayWithTime = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const newDay = {
      day: formattedDate,
      time: ["10:00"],
    };

    setStartingTimeSingle([...startingTimeSingle, newDay]);
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

  const removeForm = (index: number, field: string) => {
    const updatedStartingTimes = { ...startingTimes };
    updatedStartingTimes[field] = updatedStartingTimes[field].filter(
      (_: any, i: number) => i !== index
    );
    setStartingTimes(updatedStartingTimes);
  };
  const removeTimeFromDay = (dayIndex: number, timeIndex: number) => {
    if (dayIndex >= 0 && dayIndex < startingTimeSingle.length) {
      const updatedStartingTimeSingle = [...startingTimeSingle];
      const updatedDay = { ...updatedStartingTimeSingle[dayIndex] };
      updatedDay.time.splice(timeIndex, 1);
      updatedStartingTimeSingle[dayIndex] = updatedDay;
      setStartingTimeSingle(updatedStartingTimeSingle);
    }
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
    if (field === "from") {
      const newDateFrom = e.target.value;
      setStartingTimes((prevStartingTimes: any) => ({
        ...prevStartingTimes,
        DateFrom: newDateFrom,
      }));
    }
    if (field === "to") {
      const newDateFrom = e.target.value;
      setStartingTimes((prevStartingTimes: any) => ({
        ...prevStartingTimes,
        DateTo: newDateFrom,
      }));
    }
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
  }, [startingTimes, startingTimeSingle, capacity]);

  if (currentStep !== 8) {
    return null;
  }
  return (
    <BannerContainer>
      <div className="flex items-center justify-center">
        <BannerContentPrice>
          <CreateTitleNullDes>Availability</CreateTitleNullDes>
          <CreateDescription>
            When is your activity available for customers? Add your activity’s
            dates and times by connecting your booking system or by manually
            entering the information for your product and options.
          </CreateDescription>

          <div>
            <p className="font-medium mb-1">
              Name (e.g. Summer Season, Autumn 2011... )
            </p>
            <div className="  relative ">
              <GoLocation className="absolute top-4 left-2" />
              <input
                className="w-1/2 border rounded-lg px-8 py-3 border-gray-400 shadow-custom-card-mui focus:outline-none hover:border-navy-blue focus:border-navy-blue"
                placeholder="New availability"
                type="text"
                onChange={handlePersonalInfo}
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="font-medium">Validity of this season</p>{" "}
            <div className="flex items-center gap-3 mt-2">
              <p className="font-medium">Valid from </p>
              <div>
                <input
                  className="flex items-center justify-center font-medium border border-solid border-gray-300 rounded-md p-2   focus:outline-none focus:ring-1 focus:ring-sky-500"
                  type="date"
                  value={startingTimes?.DateFrom}
                  onChange={(e) => onChangeDateFrom(e, "from")}
                />
              </div>
              <p className="font-medium">to</p>
              <div>
                <input
                  className="flex items-center justify-center font-medium border border-solid border-gray-300 rounded-md p-2   focus:outline-none focus:ring-1 focus:ring-sky-500"
                  type="date"
                  value={startingTimes?.DateTo}
                  onChange={(e) => onChangeDateFrom(e, "to")}
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-medium">Weekly starting times</p>

            <div className="">
              <div className="mt-2">
                <div className="flex flex-wrap items-center mb-1">
                  <p className="font-medium mr-5 w-5 ">Mon</p>
                  {startingTimes?.Mon?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center mr-8">
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
                      <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Mon")}
                      />
                    </div>
                  ))}
                  {startingTimes?.Mon.length < 1 && (
                    <button
                      className="flex items-center bg-white border-none mr-3"
                      onClick={() => addStartingTime("Mon")}
                    >
                      <FaRegClock className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black text-md">
                        Add starting time
                      </span>
                    </button>
                  )}

                  <button
                    className="flex items-center bg-white border-none"
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
                <div className="flex flex-wrap items-center mb-1">
                  <p className="font-medium mr-5 w-5">Tue</p>
                  {startingTimes?.Tue?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center mr-8">
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
                      <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Tue")}
                      />
                    </div>
                  ))}
                  {startingTimes?.Tue.length < 1 && (
                    <button
                      className="flex items-center bg-white border-none mr-3  "
                      onClick={() => addStartingTime("Tue")}
                    >
                      <FaRegClock className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Add starting time
                      </span>
                    </button>
                  )}
                  <button
                    className="flex items-center bg-white border-none"
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
                <div className="flex flex-wrap items-center mb-1">
                  <p className="font-medium mr-5 w-5">Wed</p>
                  {startingTimes?.Wed?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center mr-8">
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
                      <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Wed")}
                      />
                    </div>
                  ))}

                  {startingTimes?.Wed.length < 1 && (
                    <button
                      className="flex items-center bg-white border-none  mr-3"
                      onClick={() => addStartingTime("Wed")}
                    >
                      <FaRegClock className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Add starting time
                      </span>
                    </button>
                  )}
                  <button
                    className="flex items-center bg-white border-none"
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
                <div className="flex flex-wrap items-center mb-1">
                  <p className="font-medium mr-5 w-5">Thu</p>
                  {startingTimes?.Thu?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center mr-8">
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
                      <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Thu")}
                      />
                    </div>
                  ))}
                  {startingTimes?.Thu.length < 1 && (
                    <button
                      className="flex items-center bg-white border-none  mr-3"
                      onClick={() => addStartingTime("Thu")}
                    >
                      <FaRegClock className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Add starting time
                      </span>
                    </button>
                  )}
                  <button
                    className="flex items-center bg-white border-none"
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
                <div className="flex flex-wrap items-center mb-1">
                  <p className="font-medium mr-5 w-5">Fri</p>
                  {startingTimes?.Fri?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center mr-8">
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
                      <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Fri")}
                      />
                    </div>
                  ))}
                  {startingTimes?.Fri.length < 1 && (
                    <button
                      className="flex items-center bg-white border-none  mr-3"
                      onClick={() => addStartingTime("Fri")}
                    >
                      <FaRegClock className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Add starting time
                      </span>
                    </button>
                  )}
                  <button
                    className="flex items-center bg-white border-none"
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
                <div className="flex flex-wrap items-center mb-1">
                  <p className="font-medium mr-5 w-5">Sat</p>
                  {startingTimes?.Sat?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center mr-8">
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
                      <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Sat")}
                      />
                    </div>
                  ))}
                  {startingTimes?.Sat.length < 1 && (
                    <button
                      className="flex items-center bg-white border-none  mr-3"
                      onClick={() => addStartingTime("Sat")}
                    >
                      <FaRegClock className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Add starting time
                      </span>
                    </button>
                  )}
                  <button
                    className="flex items-center bg-white border-none"
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
                <div className="flex flex-wrap items-center mb-1">
                  <p className="font-medium mr-5 w-5">Sun</p>
                  {startingTimes?.Sun?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center mr-8">
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
                      <FaRegTrashCan
                        className="ml-3 text-red-600 hover:text-red-900"
                        onClick={() => removeForm(index, "Sun")}
                      />
                    </div>
                  ))}
                  {startingTimes?.Sun.length < 1 && (
                    <button
                      className="flex items-center bg-white border-none  mr-3"
                      onClick={() => addStartingTime("Sun")}
                    >
                      <FaRegClock className="text-navy-blue mr-1" />{" "}
                      <span className="font-medium text-navy-blue hover:text-black  text-md  ">
                        Add starting time
                      </span>
                    </button>
                  )}
                  <button
                    className="flex items-center bg-white border-none"
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

                            {/* <FaRegTrashCan
                            className="ml-3 text-red-600 hover:text-red-900"
                            onClick={() =>
                              removeTimeFromDay(dayIndex, timeIndex)
                            }
                          /> */}
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

                <button
                  className="flex items-center bg-white border-2 px-3 py-2 border-navy-blue rounded-xl   text-navy-blue hover:text-white hover:bg-navy-blue hover:border-sky-900"
                  onClick={() => addDayWithTime()}
                >
                  <span className="font-medium text-md  ">Add new date</span>
                </button>
              </div>
            </div>
          </div>
        </BannerContentPrice>
      </div>
    </BannerContainer>
  );
};

export default Capacity;
