import React, { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";
import { LuMoveRight } from "react-icons/lu";
import ModalTicketAdult from "./Modal/ModalTicketAdult";
import ModalAvailability from "./Modal/ModalAvailability";
import dayjs from "dayjs";
import { useEditContext } from "./Context/useEditContext";
import AddChildren from "./Modal/AddChilren";
import AddAvailability from "./Modal/AddAvailability";
import { StatusAvailabilty } from "../../../styles/status/availability";
import { Dropdown, Menu, Popconfirm, Space } from "antd";
import { CiCircleMore } from "react-icons/ci";
import { Switch } from "antd";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import {
  deleteTicket,
  editAvailabilityActive,
  editAvailabilityDeactive,
} from "../../../store/redux/silce/tourSlice";
import { DataContext } from "../../../store/dataContext/DataContext";
import { IoTrash } from "react-icons/io5";

function ScreenSP() {
  const dispatch: AppDispatch = useDispatch();
  const { setRefreshTourDetail } = useContext(DataContext);
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  const { ticketPricing, setTicketPricing, availability, setAvailability } =
    useEditContext();

  const quantityTicketTrue = ticketPricing?.filter(
    (ticket: { is_default: boolean }) => ticket.is_default === true
  );
  const duration = useMemo(() => {
    return tourDetail.duration;
  }, [tourDetail]);
  useEffect(() => {
    if (tourDetail && tourDetail.TicketPricing) {
      setTicketPricing(tourDetail.TicketPricing);
    }
    setAvailability(tourDetail?.TourAvailability);
  }, [setAvailability, setTicketPricing, tourDetail]);
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
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

  const handleSwitchChangeStatusAvailability = (
    checked: boolean,
    dataIndex: { id: number }
  ) => {
    console.log(dataIndex);
    if (checked === false) {
      dispatch(editAvailabilityDeactive(dataIndex?.id)).then(
        (response: any) => {
          if (editAvailabilityDeactive.fulfilled.match(response)) {
            setRefreshTourDetail((prev) => !prev);
          }
        }
      );
    }
    if (checked === true) {
      dispatch(editAvailabilityActive(dataIndex?.id)).then((response: any) => {
        if (editAvailabilityActive.fulfilled.match(response)) {
          setRefreshTourDetail((prev) => !prev);
        }
      });
    }
  };

  const handleDeleteTicket = (e: any) => {
    dispatch(deleteTicket(e)).then((response: any) => {
      if (deleteTicket.fulfilled.match(response)) {
        setRefreshTourDetail((prev) => !prev);
      }
    });
  };

  const items: any = [
    {
      label: (
        <div className="flex items-center gap-1">
          <ModalAvailability
            dataAvailability={{ availability, setAvailability }}
          />
          Edit availability
        </div>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          {" "}
          <AddAvailability
            dataDetailTour={availability}
            setAvailability={setAvailability}
          />{" "}
          Add availability
        </div>
      ),
      key: "1",
    },
  ];

  console.log(ticketPricing);
  return (
    <div>
      <div className="mb-4 first-letter" id="ticket">
        <span className="font-medium text-xl">Ticket Pricing</span>
      </div>
      <div className="p-1 flex flex-col gap-3">
        <div className=" grid grid-cols-12 gap-4">
          <div className="flex gap-3 col-span-2 justify-end">
            <span className="font-medium text-lg"> Ticket</span>
          </div>
          <div className="flex flex-col col-span-10">
            <div className="bg-white border border-solid pr-7 p-4 border-gray-300  shadow-custom-card-mui rounded-lg flex flex-col gap-4 relative">
              <div className="absolute top-2 right-2">
                <Dropdown
                  overlay={
                    <Menu>
                      {/* Add menu items for editing and adding availability */}
                      <Menu.Item key="addchildren">
                        {quantityTicketTrue?.length < 2 && (
                          <>
                            <AddChildren data={quantityTicketTrue} />
                          </>
                        )}
                      </Menu.Item>
                      <Menu.Item key="edit">
                        <ModalTicketAdult
                          dataTicket={{
                            ticketPricing,
                            setTicketPricing,
                            duration,
                          }}
                        />
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <CiCircleMore className="w-6 h-6" />
                </Dropdown>
              </div>

              {ticketPricing?.map((ticket: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col gap-4 p-4 rounded-xl bg-main shadow-custom-card-mui pr-10 relative">
                    {ticket?.is_default === true &&
                    ticket?.Ticket?.name === "ADULT" ? (
                      <></>
                    ) : (
                      <div className="absolute inset-y-1/3 right-4">
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => handleDeleteTicket(ticket?.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <IoTrash className="w-5 h-5 text-red-500" />
                        </Popconfirm>
                      </div>
                    )}

                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-medium">
                          Ticket intended for:
                        </span>
                        <span className=" text-sm text-gray-500">
                          {ticket?.Ticket?.name}
                        </span>
                      </div>
                      <span className="text-2xl text-gray-500">•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-medium">
                          Ticket type:
                        </span>
                        <span className=" text-sm text-gray-500">
                          <span className="">{ticket?.PricingType?.name}</span>
                        </span>
                      </div>
                      {ticket?.is_default === false && (
                        <>
                          <span className="text-2xl text-gray-500">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-medium text-red-700">
                              Special
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <span className="font-medium">Min quantity</span>
                        <span className="text-gray-500">
                          {ticket?.minimum_ticket_count}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Max quantity</span>
                        <span className="text-gray-500">
                          {ticket?.maximum_ticket_count}
                        </span>
                      </div>{" "}
                      <div className="flex flex-col">
                        <span className="font-medium">From age</span>
                        <span className="text-gray-500">
                          {ticket?.from_age}
                        </span>
                      </div>{" "}
                      <div className="flex flex-col">
                        <span className="font-medium">To age</span>
                        <span className="text-gray-500">{ticket?.to_age}</span>
                      </div>
                    </div>
                    <div>
                      {ticket?.is_default === false && (
                        <>
                          <span className="font-medium mb-1 block">
                            Apply for
                          </span>
                          <div className="flex items-center gap-4">
                            {ticket?.apply_dates?.map((special: string) => (
                              <span className="text-gray-500">
                                {dayjs(special).format("YYYY-MM-DD")}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="w-full flex items-center">
                      <hr
                        className="flex-1 border-gray-300 mr-2"
                        style={{ borderWidth: "-0.01px" }}
                      />
                      <span className="font-medium">Ticket pricing</span>
                      <hr
                        className="flex-1 border-gray-300 ml-2"
                        style={{ borderWidth: "-0.01px" }}
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      <>
                        {ticket?.price_range?.map(
                          (
                            price: {
                              from_amount: number;
                              to_amount: number;
                              price: number;
                            },
                            index: number
                          ) => (
                            <div
                              className="flex items-center bg-white border border-solid border-gray-300 justify-evenly text-sm  text-gray-500 py-1 rounded-md"
                              key={index}
                            >
                              <div>{price?.from_amount}</div>
                              <LuMoveRight />
                              <div>{price?.to_amount}</div>
                              <div>vnđ {price?.price}</div>
                            </div>
                          )
                        )}
                      </>
                    </div>
                  </div>
                  {index < ticketPricing?.length - 1 && (
                    <hr className="border border-solid" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4" id="availability">
        <span className="font-medium text-xl">Availability</span>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="flex gap-3 justify-end col-span-2">
          <span className="font-medium text-lg">Avalibility</span>
        </div>
        <div className="flex flex-col gap-4 col-span-10 bg-white">
          <div className="pr-8 py-4 pl-4 bg-white border border-solid border-gray-300  shadow-custom-card-mui rounded-lg flex flex-col gap-4 relative">
            <div className="absolute top-2 right-2">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()} className="flex">
                  <Space>
                    <div>
                      <CiCircleMore className="w-6 h-6" />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </div>

            {Array.isArray(availability) &&
              [...availability]
                .sort((a, b) => b.id - a.id) // Sort the copied array
                .map((data, index) => (
                  <React.Fragment key={index}>
                    <div className=" bg-main p-4 shadow-custom-card-mui rounded-lg">
                      <div className="grid grid-cols-12 gap-4 relative">
                        <div className="absolute right-0 inset-y-1/3">
                          <Switch
                            defaultChecked
                            size="small"
                            checked={data?.status === "ACTIVE"}
                            className="bg-white shadow-custom-0"
                            onChange={(checked) =>
                              handleSwitchChangeStatusAvailability(
                                checked,
                                data
                              )
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="flex flex-col gap-3">
                            <span className="font-medium">
                              {data
                                ? formatDate(data.validity_date_range_from)
                                : null}
                            </span>

                            <span className="font-medium text-gray-600">
                              {data
                                ? formatDate(data.validity_date_range_to)
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-3 flex gap-4 ">
                          <div
                            className={`w-w-1 h-auto rounded-full ${
                              data?.status === "ACTIVE"
                                ? "bg-gray-300"
                                : "bg-gray-300"
                            }`}
                          ></div>

                          <div className="flex flex-col gap-2 ">
                            <span className="font-medium">{data?.name}</span>
                            <div>
                              <StatusAvailabilty>
                                {data?.status}
                              </StatusAvailabilty>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-4 flex flex-col gap-4">
                          <span className="font-medium">Weekdays</span>
                          <div className="flex flex-wrap gap-3">
                            {data?.weekdays?.map(
                              (
                                weekday: { day: number; timeSlot: string },
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className="flex gap-1 border border-solid bg-white border-gray-300 rounded-md text-sm px-2 py-1 text-gray-500"
                                >
                                  <span>{getDayName(weekday?.day)}</span>
                                  <span>{weekday?.timeSlot}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="col-span-3 flex flex-col gap-4">
                          <span className="font-medium">Special dates</span>
                          <div className="flex flex-wrap gap-3">
                            {data?.special_dates?.map(
                              (
                                special: { date: any; timeSlot: string },
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className="flex gap-1  border border-solid bg-white border-gray-300 rounded-md text-sm px-2 py-1 text-gray-500"
                                >
                                  {special.date &&
                                  dayjs.isDayjs(special.date) ? (
                                    <span className="font-medium">
                                      {special.date.format("DD/MM/YYYY")}:
                                    </span>
                                  ) : (
                                    <span className="font-medium">
                                      {special.date}:
                                    </span>
                                  )}

                                  <span>{special?.timeSlot}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* {index < availability?.length - 1 && (
                  <hr className="border border-solid" />
                )} */}
                  </React.Fragment>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ScreenSP.propTypes = {};

export default ScreenSP;
