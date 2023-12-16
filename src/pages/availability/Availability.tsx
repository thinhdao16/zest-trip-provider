import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Index";
import { AppDispatch } from "../../store/redux/store";
import { useContext, useEffect, useState } from "react";
import {
  editAvailabilityActive,
  editAvailabilityDeactive,
  fetchTours,
} from "../../store/redux/silce/tourSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import AddAvailability from "./Modal/AddAvailability";
import EditAvailability from "./Modal/EditAvailability";
import { AiOutlineDown } from "react-icons/ai";
import { Dropdown, Pagination, Menu, Switch, Select } from "antd";
import { DataContext } from "../../store/dataContext/DataContext";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import DatePicker from "react-multi-date-picker";
import { CiCircleMore } from "react-icons/ci";
import { StatusAvailabilty } from "../../styles/status/availability";
import { Link } from "react-router-dom";

function Availability() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch: AppDispatch = useDispatch();
  const { tours, loading } = useSelector((state: any) => state.tour);
  const { refeshTour, setRefeshTour } = useContext(DataContext);
  const dataTours = tours?.tours;
  const countTours = tours?.total_count;
  const [loadings, setLoadings] = useState(null);

  const [openField, setOpenField] = useState(false);

  const [updatedDataTours, setUpdatedDataTours] = useState<any>([]);
  const [updatedDataTourNoChange, setUpdatedDataToursNoChange] = useState([]);

  const [fieldSelectDate, setFieldSelectDate] = useState("normal");

  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const availabilityIndex = 0;

  const generateDatesForWeekday = (weekday: any, from: any, to: any) => {
    const formatFrom = dayjs(from).format("YYYY-MM-DD");
    const formatTo = dayjs(to).format("YYYY-MM-DD");
    const dates = [];
    const currentDate = new Date(formatFrom);
    const toDate = new Date(formatTo);
    while (currentDate <= toDate) {
      if (currentDate.getUTCDay() + 1 === weekday) {
        dates.push(new Date(currentDate).toISOString().split("T")[0]);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const allDates = dataTours
    ? dataTours?.flatMap((tour: any) => {
        const availabilityDates = tour?.TourAvailability?.flatMap(
          (availability: any) => {
            const weekdays = availability?.weekdays?.map(
              (weekday: { day: string }) => weekday.day
            );
            return weekdays.flatMap((item: any) =>
              generateDatesForWeekday(
                item,
                availability.validity_date_range_from,
                availability.validity_date_range_to
              )
            );
          }
        );
        return availabilityDates;
      })
    : [];

  const allSingleDates = dataTours
    ? dataTours
        ?.flatMap((tour: any) =>
          tour?.TourAvailability?.flatMap((availability: any) =>
            availability?.special_dates?.map(
              (specialDate: any) => specialDate.date
            )
          )
        )
        ?.filter((date: any) => date !== undefined)
    : [];

  const [dateAvailability, setDateAvailability] = useState([
    ...allDates,
    ...allSingleDates,
  ]);

  const uniqueDates = new Set();
  const filteredBookingDetails: any[] = [];

  dataTours?.forEach((tour: any) => {
    const bookings = tour?.Booking;
    if (bookings && Array.isArray(bookings)) {
      bookings.forEach((booking: any) => {
        const bookedDate = dayjs(booking?.booked_date).format("YYYY-MM-DD");
        if (!uniqueDates.has(bookedDate)) {
          uniqueDates.add(bookedDate);
          filteredBookingDetails.push(booking);
        }
      });
    }
  });

  const book_date_fil = filteredBookingDetails?.map(
    (data: { booked_date: string }) =>
      dayjs(data?.booked_date)?.format("YYYY-MM-DD")
  );

  const handleBookingHave = () => {
    const commonDates = dateAvailability.filter((date) =>
      book_date_fil.includes(date)
    );
    setDateAvailability(commonDates);
    setOpenField(true);
    setFieldSelectDate("booking");
  };
  const handleAvailabilityHave = () => {
    setDateAvailability([...allDates, ...allSingleDates]);
    setOpenField(false);
    setFieldSelectDate("normal");
    setUpdatedDataTours(updatedDataTourNoChange);
  };
  const handleAddSingleDate = (_index: number, selectedDate: any) => {
    const formattedDates = dayjs(selectedDate)?.format("YYYY-MM-DD");
    setSelectedDate(formattedDates);
    if (fieldSelectDate === "normal" && formattedDates.length > 0) {
      const filterDateTour = updatedDataTourNoChange?.filter((tour: any) => {
        const availabilityDates = tour?.TourAvailability?.flatMap(
          (availability: any) => availability.availabilityDate
        );
        const specialDates = tour?.TourAvailability?.flatMap(
          (availability: any) =>
            availability.special_dates?.map(
              (specialDate: { date: string }) => specialDate.date
            ) || []
        );
        return (
          availabilityDates.includes(formattedDates) ||
          specialDates.includes(formattedDates)
        );
      });
      setUpdatedDataTours(filterDateTour);
    }
    if (fieldSelectDate === "booking" && formattedDates.length > 0) {
      const filterDateTour = updatedDataTourNoChange?.filter((tour: any) => {
        const bookingDates = tour?.Booking?.flatMap((booking: any) =>
          dayjs(booking.booked_date)?.format("YYYY-MM-DD")
        );
        return bookingDates.includes(formattedDates);
      });
      setUpdatedDataTours(filterDateTour);
    }
  };

  function getDayName(day: number) {
    switch (day) {
      case 1:
        return "Sun";
      case 2:
        return "Mon";
      case 3:
        return "Tue";
      case 4:
        return "Wed";
      case 5:
        return "Thu";
      case 6:
        return "Fri";
      case 7:
        return "Sat";
      default:
        return "Unknown";
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    console.log(current);
    setPageSize(size);
    setCurrentPage(current);
  };
  const handleClearDate = () => {
    setSelectedDate(undefined);
    setUpdatedDataTours(updatedDataTourNoChange);
  };

  const handleFilterTour = (value: string) => {
    console.log(value);
    if (value === "" || value === undefined) {
      setUpdatedDataTours(updatedDataTourNoChange);
    } else {
      const filteredTours = updatedDataTourNoChange?.map((tour: any) => {
        return {
          ...tour,
          TourAvailability: tour?.TourAvailability?.filter(
            (availability: any) => availability.status === value
          ),
        };
      });
      setUpdatedDataTours(filteredTours);
    }
  };

  useEffect(() => {
    const updatedDataTourss = dataTours?.map((tour: any) => {
      const updatedAvailability = tour?.TourAvailability?.map(
        (availability: any) => {
          const weekdays = availability?.weekdays?.map(
            (weekday: { day: string }) => weekday.day
          );
          const generatedDates = weekdays.flatMap((item: any) =>
            generateDatesForWeekday(
              item,
              availability.validity_date_range_from,
              availability.validity_date_range_to
            )
          );
          return {
            ...availability,
            availabilityDate: generatedDates,
          };
        }
      );

      return {
        ...tour,
        TourAvailability: updatedAvailability,
      };
    });
    setUpdatedDataTours(updatedDataTourss);
    setUpdatedDataToursNoChange(updatedDataTourss);
    setDateAvailability([...allDates, ...allSingleDates]);
  }, [dataTours]);

  useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
  }, [currentPage, dispatch, pageSize, loadings, refeshTour]);
  const handleSwitchChangeStatusAvailability = (
    checked: boolean,
    dataIndex: number
  ) => {
    console.log(dataIndex);
    if (checked === false) {
      dispatch(editAvailabilityDeactive(dataIndex)).then((response: any) => {
        if (editAvailabilityDeactive.fulfilled.match(response)) {
          setRefeshTour((prev) => !prev);
        }
      });
    }
    if (checked === true) {
      dispatch(editAvailabilityActive(dataIndex)).then((response: any) => {
        if (editAvailabilityActive.fulfilled.match(response)) {
          setRefeshTour((prev) => !prev);
        }
      });
    }
  };
  return (
    <>
      {loading ? (
        <LoadingFullScreen loading={loading} />
      ) : (
        <>
          <Navbar />

          <main className="h-full bg-main overflow-auto global-scrollbar rounded-2xl m-4">
            <div className="container mx-auto py-4 px-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold ">
                    List of Availability
                  </h1>
                  <span className="text-gray-500">
                    When provider have availability new, they open here
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="filter-date-pick"
                    className="bg-gray-300 p-1.5 rounded-md  text-sm "
                  >
                    Open
                  </label>
                  <DatePicker
                    className="pb-4 px-4 "
                    id="filter-date-pick"
                    value={selectedDate}
                    numberOfMonths={1}
                    mapDays={({ date }) => {
                      const formattedDate = date.format("YYYY-MM-DD");
                      const formattedDateDisable = dateAvailability?.map(
                        (disableDate: any) =>
                          dayjs(disableDate).format("YYYY-MM-DD")
                      );
                      const isDisabled =
                        formattedDateDisable.includes(formattedDate);

                      const formattedBlockedDates =
                        updatedDataTourNoChange?.flatMap(
                          (dataTour: any) =>
                            dataTour?.blocked_dates?.map((date: string) =>
                              dayjs(date).format("YYYY-MM-DD")
                            ) || []
                        );

                      console.log(formattedBlockedDates);

                      return {
                        disabled: !isDisabled,
                        // style: style,
                      };
                    }}
                    onChange={(date: any) =>
                      handleAddSingleDate(availabilityIndex, date)
                    }
                  >
                    <div className=" flex items-center gap-2">
                      {!openField && (
                        <button
                          className="bg-navy-blue py-1.5 px-2 text-white rounded-md text-sm "
                          onClick={handleBookingHave}
                        >
                          Check booking
                        </button>
                      )}
                      {openField && (
                        <button
                          className="bg-navy-blue py-1.5 px-2 text-white rounded-md text-sm "
                          onClick={handleAvailabilityHave}
                        >
                          Check availability
                        </button>
                      )}
                      <button
                        className="bg-blue-300 p-1.5 rounded-md text-blue-900 text-sm"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        Today
                      </button>
                      <button
                        className="bg-red-300 p-1.5 rounded-md text-red-900 text-sm"
                        onClick={() => handleClearDate()}
                      >
                        Deselect
                      </button>
                    </div>
                  </DatePicker>

                  <Select
                    defaultValue=""
                    onChange={handleFilterTour}
                    style={{ width: 120 }}
                    allowClear
                    options={[
                      { value: "", label: "Choose value" },
                      { value: "ACTIVE", label: "Active" },
                      { value: "INACTIVE", label: "Inactive" },
                    ]}
                  />
                </div>
              </div>
              <div className="container flex flex-col gap-4">
                <div className="bg-navy-blue text-white p-3 rounded-lg shadow-custom-card-mui">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-2">
                      <span className="font-medium">Title</span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Period time</span>
                    </div>
                    <div className="col-span-3">
                      <span className="font-medium">Weekdays</span>
                    </div>
                    <div className="col-span-3">
                      <span className="font-medium">Special dates</span>
                    </div>
                    <div className="col-span-1">
                      <span className="font-medium"> Status</span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="font-medium"> Action</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {updatedDataTours?.length > 0 ? (
                    Array.isArray(updatedDataTours) &&
                    updatedDataTours?.map((dataTour: any, index: number) => (
                      <>
                        <div
                          key={index}
                          className="shadow-custom-card-mui bg-white rounded-lg relative transition-effect-hover"
                        >
                          <Link to={`/availability/detail/${dataTour?.id}`}>
                            <div className=" flex items-center gap-2 p-4 rounded-t-lg bg-stone-200">
                              <img
                                src={dataTour?.tour_images[0]}
                                className="w-12 h-12 rounded-lg object-cover"
                                alt="wait"
                              />
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {dataTour?.name}
                                </span>
                                <span className="font-medium text-gray-500">
                                  {dataTour?.address_district},
                                  {dataTour?.address_province},{" "}
                                  {dataTour?.address_country}
                                </span>
                              </div>
                            </div>
                          </Link>

                          <hr className="mb-2" />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Dropdown
                              overlay={
                                <Menu>
                                  {/* Add menu items for editing and adding availability */}
                                  <Menu.Item key="edit">
                                    <EditAvailability
                                      dataAvailability={
                                        dataTour?.TourAvailability
                                      }
                                    />
                                  </Menu.Item>
                                  <Menu.Item key="add">
                                    <AddAvailability
                                      dataDetailTour={dataTour}
                                      setLoading={setLoadings}
                                    />
                                  </Menu.Item>
                                </Menu>
                              }
                              trigger={["click"]}
                            >
                              <CiCircleMore className="w-5 h-5" />
                            </Dropdown>
                          </div>
                          {dataTour?.TourAvailability?.length > 0 ? (
                            dataTour?.TourAvailability?.map(
                              (
                                _availability: {
                                  id: number;
                                  name: string;
                                  status: string;
                                  validity_date_range_from: string;
                                  validity_date_range_to: string;
                                  weekdays: {
                                    day: number;
                                    timeSlot: string;
                                  }[];
                                  special_dates: {
                                    date: string;
                                    timeSlot: string;
                                  }[];
                                },
                                index: number
                              ) => (
                                <div
                                  className=" px-4  mb-2  relative  transition-effect-hover rounded-lg"
                                  key={index}
                                >
                                  <div className="grid grid-cols-12 gap-3  ">
                                    <div className="col-span-2 flex items-center ">
                                      <div className="">
                                        <span className="font-medium">
                                          {_availability?.name}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-span-2 flex items-center ">
                                      <div className="flex flex-col relative gap-3">
                                        <AiOutlineDown className="absolute top-6 left-9 w-3 h-3" />
                                        <span className="">
                                          {dayjs(
                                            _availability?.validity_date_range_from
                                          ).format("YYYY-MM-DD")}
                                        </span>
                                        <span className=" text-gray-600 ">
                                          {dayjs(
                                            _availability?.validity_date_range_to
                                          ).format("YYYY-MM-DD")}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-span-3 flex items-center ">
                                      <div className="flex flex-wrap gap-3">
                                        {" "}
                                        {_availability?.weekdays?.map(
                                          (weekdayItem, index: number) => (
                                            <div
                                              key={index}
                                              className=" flex gap-1 "
                                            >
                                              <span className="">
                                                {getDayName(weekdayItem?.day)}
                                              </span>
                                              <span className="text-gray-500">
                                                {weekdayItem?.timeSlot}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-span-3 flex items-center">
                                      <div className="flex flex-wrap gap-3">
                                        {" "}
                                        {_availability?.special_dates?.map(
                                          (specialItem, index: number) => (
                                            <div
                                              key={index}
                                              className="flex gap-1 "
                                            >
                                              <span>{specialItem?.date}</span>
                                              <span className="text-gray-500">
                                                {specialItem?.timeSlot}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                      <StatusAvailabilty>
                                        {_availability?.status}
                                      </StatusAvailabilty>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center">
                                      <Switch
                                        defaultChecked
                                        size="small"
                                        checked={
                                          _availability?.status === "ACTIVE"
                                        }
                                        className="bg-white shadow-custom-1"
                                        onChange={(checked) =>
                                          handleSwitchChangeStatusAvailability(
                                            checked,
                                            _availability?.id
                                          )
                                        }
                                      />
                                    </div>
                                  </div>

                                  {index <
                                    dataTour?.TourAvailability?.length - 1 && (
                                    <hr className="mt-2" />
                                  )}
                                </div>
                              )
                            )
                          ) : (
                            <div className="flex justify-center p-8">
                              <button
                                type="button"
                                className="bg-main rounded-md py-1 px-2 shadow-custom-card-mui font-medium"
                              >
                                This tour does not have availability
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ))
                  ) : (
                    <button
                      type="button"
                      className="bg-main rounded-md py-1 px-2 shadow-custom-card-mui font-medium"
                    >
                      {loading ? "Loading..." : "No tours available"}
                    </button>
                  )}

                  <div className="flex justify-center">
                    {dataTours?.length > 0 && (
                      <Pagination
                        current={currentPage}
                        total={countTours}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 30, 40]}
                        showSizeChanger
                        onChange={handlePageChange}
                        onShowSizeChange={(current, size) =>
                          handlePageSizeChange(current, size)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

Availability.propTypes = {};

export default Availability;
