import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Index";
import { getBooking } from "../../../store/redux/silce/booking";
import { AppDispatch } from "../../../store/redux/store";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import dayjs from "dayjs";
import { formatNumber } from "../../../utils/formatNumber";
import { StatusBooking } from "../../../styles/status/booking";
import { Fade } from "@mui/material";
import { getTours } from "../../../store/redux/silce/tourSlice";
import { DatePicker, DatePickerProps, Select } from "antd";

function ListBooking() {
  const dispatch: AppDispatch = useDispatch();

  const { booking } = useSelector((state: any) => state.booking);
  const bookingDontReject = booking?.filter(
    (booking: any) => booking?.status !== "REJECT"
  );
  const { tours } = useSelector((state: any) => state.tour);
  const [selectDate, setSelectDate] = useState("");

  const [status, setStatus] = useState("");
  const [sortBy] = useState("desc");

  const [searchTerm, setSearchTerm] = useState("");

  const [expandedItems, setExpandedItems] = useState<any>({});

  const [selectedValueTourId, setSelectedValueTourId] = useState<string>("");

  const dataTours = tours?.tours;
  const dataTourGrafts = Array.isArray(dataTours) ? [...dataTours] : [];

  const options = [
    { value: "", label: "All" },
    ...dataTourGrafts.map((item) => ({ value: item?.id, label: item?.name })),
  ];
  const handleChange = (value: string) => {
    setSelectedValueTourId(value);
    const filGetBooking = {
      sort_by: sortBy,
      ...(value.length > 0 && { tour_id: value }),
      ...(status?.length > 0 && { status: status }),
      ...(selectDate?.length > 0 && { selected_date: selectDate }),
    };
    dispatch(getBooking(filGetBooking));
  };

  const handleChangeFilterStatus = (value: string) => {
    setStatus(value);
    const filGetBooking = {
      sort_by: sortBy,
      ...(selectedValueTourId?.length > 0 && { tour_id: selectedValueTourId }),
      ...(value?.length > 0 && { status: value }),
      ...(selectDate?.length > 0 && { selected_date: selectDate }),
    };
    dispatch(getBooking(filGetBooking));
  };
  const handleOnchangeDate: DatePickerProps["onChange"] = (
    _date,
    dateString
  ) => {
    setSelectDate(dateString);
    const filGetBooking = {
      sort_by: sortBy,
      ...(selectedValueTourId?.length > 0 && { tour_id: selectedValueTourId }),
      ...(dateString?.length > 0 && { selected_date: dateString }),
      ...(status.length > 0 && { status: status }),
    };
    dispatch(getBooking(filGetBooking));
  };

  const filteredBookings = bookingDontReject.filter((bookingItem: any) =>
    // Áp dụng logic tìm kiếm dựa trên các trường bạn muốn
    bookingItem.booker_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleContentVisibility = (index: any) => {
    const newExpandedItems = { ...expandedItems };
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  useEffect(() => {
    const filGetBooking = {
      sort_by: sortBy,
    };
    dispatch(getBooking(filGetBooking));
    dispatch(getTours());
  }, [dispatch, sortBy]);
  return (
    <div>
      <Navbar />
      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg ">
        <div className="container mx-auto px-8 py-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">List of Booking</h1>
              <span className="text-gray-500">
                When provider have booking new, they open here
              </span>
            </div>
            <div className="flex items-center gap-3">
              <DatePicker onChange={handleOnchangeDate} />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={options}
                value={selectedValueTourId}
                onChange={handleChange}
              />
              <div className="relative">
                <RiSearchLine className="absolute top-2 left-2" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  className="border border-gray-300 pl-8 py-1.5 w-24 rounded-md font-light text-sm"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div>
                <Select
                  defaultValue=""
                  onChange={handleChangeFilterStatus}
                  style={{ width: 120 }}
                  allowClear
                  options={[
                    { value: "", label: "Filter" },
                    { value: "PENDING", label: "Pending" },
                    { value: "ACCEPTED", label: "Accepted" },
                    { value: "REFUNDED", label: "Refund" },
                    {
                      value: "USER_REQUEST_REFUND",
                      label: "User request refund",
                    },
                    { value: "PROVIDER_REFUNDED", label: "Provider refund" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 p-3 rounded-lg shadow-custom-card-mui bg-navy-blue text-white mb-4">
            <div className=" font-medium">Booker</div>
            <div className=" font-medium">Book time</div>
            <div className=" font-medium">Original price</div>
            <div className=" font-medium">Provider receive</div>
            <div className=" font-medium">Status</div>
          </div>
          {filteredBookings?.map(
            (
              booking: {
                booker_email: string;
                booked_date: string;
                time_slot: string;
                original_price: string;
                provider_receive: string;
                status: string;
                BookingOnTour: {
                  tour_images: string[];
                  name: string;
                  address_name: string;
                  address_ward: string;
                  address_district: string;
                  address_province: string;
                };
              },
              indexBooking: number
            ) => (
              <div
                className="rounded-lg shadow-custom-card-mui bg-white mb-2 relative"
                key={indexBooking}
              >
                {!expandedItems[indexBooking] ? (
                  <div
                    className="absolute bottom-2 right-2 text-xs flex items-center gap-1"
                    onClick={() => toggleContentVisibility(indexBooking)}
                  >
                    <span>By tour</span>
                    <AiOutlineDown />
                  </div>
                ) : (
                  <div className="absolute bottom-2 right-2 text-xs flex items-center gap-1">
                    <span onClick={() => toggleContentVisibility(indexBooking)}>
                      See less
                    </span>
                    <AiOutlineUp />
                  </div>
                )}
                <div className=" grid grid-cols-5 px-4 py-6 ">
                  <div className="">{booking?.booker_email}</div>
                  <div className="">
                    {dayjs(booking?.booked_date).format("YYYY-MM-DD")}
                    <span className="text-gray-500"> {booking?.time_slot}</span>
                  </div>
                  <div className="">
                    {formatNumber(parseInt(booking?.original_price))}
                  </div>
                  <div className="">
                    {formatNumber(parseInt(booking?.provider_receive))}
                  </div>
                  <div className="">
                    <button>
                      <StatusBooking>{booking?.status}</StatusBooking>
                    </button>
                  </div>
                </div>
                {expandedItems[indexBooking] && (
                  <Fade in={expandedItems[indexBooking]} timeout={700}>
                    <div>
                      <hr />
                      <div className="p-4 flex items-center">
                        <img
                          src={booking?.BookingOnTour?.tour_images[0]}
                          alt="dont find"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <div>{booking?.BookingOnTour?.name}</div>

                          <div>
                            {booking?.BookingOnTour?.address_name},{" "}
                            {booking?.BookingOnTour?.address_ward},{" "}
                            {booking?.BookingOnTour?.address_district},{" "}
                            {booking?.BookingOnTour?.address_province}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

ListBooking.propTypes = {};

export default ListBooking;
