import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { IoHomeOutline, IoTrash } from "react-icons/io5";
import { AppDispatch } from "../../store/redux/store";
import { getBookingDetail } from "../../store/redux/silce/booking";
import {
  deleteTicket,
  fetchTourDetail,
} from "../../store/redux/silce/tourSlice";
import { StatusTour } from "../../styles/status/tour";
import TruncatedText from "../../utils/TruncatedText";
import { LuMoveRight } from "react-icons/lu";
import ModalCreateTicketSpecial from "./ModalCreateTicketSpecial";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import AddChildren from "./AddChilren";
import { Dropdown, Popconfirm, Select, MenuProps } from "antd";
import { DataContext } from "../../store/dataContext/DataContext";
import ModalTicketAdult from "./ModalTicketAdult";
import { formatNumber } from "../../utils/formatNumber";
import { CiCircleMore } from "react-icons/ci";

const { Option } = Select;

function DetailTicketTour() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();
  const { refreshTourDetail, setRefreshTourDetail } = useContext(DataContext);

  const { loadingCreateTour } = useSelector((state: any) => state.tour);
  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);
  const quantityTicketTrue = tourDetail?.TicketPricing?.filter(
    (ticket: { is_default: boolean }) => ticket.is_default === true
  );
  const [filterTickets, setFilterTickets] = useState<any>(tourDetail);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusClick = (status: any) => {
    console.log(status);
    setSelectedStatus(status);
  };

  useEffect(() => {
    const filtered = tourDetail?.TicketPricing?.filter((ticket: any) =>
      selectedStatus === "" ? true : ticket?.is_default === selectedStatus
    );
    setFilterTickets(filtered);
  }, [selectedStatus, tourDetail?.TicketPricing]);

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
      dispatch(fetchTourDetail(index));
    }
  }, [dispatch, index, loadingCreateTour, refreshTourDetail]);

  const handleDeleteTicket = (e: any) => {
    dispatch(deleteTicket(e)).then((response: any) => {
      if (deleteTicket.fulfilled.match(response)) {
        setRefreshTourDetail((prev) => !prev);
      }
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <ModalTicketAdult
          dataTicket={{
            filterTickets,
          }}
        />
      ),
    },
    {
      key: "2",
      label: <ModalCreateTicketSpecial />,
    },
    {
      key: "3",
      label: quantityTicketTrue?.length < 2 && (
        <AddChildren data={quantityTicketTrue} />
      ),
    },
  ];

  return (
    <>
      {loadingCreateTour ? (
        <LoadingFullScreen loading={loadingCreateTour} />
      ) : (
        <div className="bg-main rounded-xl px-8 py-2 h-full overflow-y-auto global-scrollbar">
          <div className="mb-6" id="booking">
            <div className="flex justify-between px-4 items-start">
              <div className="flex gap-1 items-center">
                <Link to="/">
                  <IoHomeOutline />
                </Link>
                /
                <Link to="/ticket">
                  <button className="font-medium text-lg">List ticket</button>
                </Link>{" "}
                /
                <Link to="">
                  <div className="font-medium text-lg">
                    <TruncatedText text={tourDetail?.name} maxLength={20} />
                  </div>
                </Link>
              </div>
            </div>
            <div className=" p-4 grid grid-cols-12 items-center">
              <div className="col-span-8">
                <div className="flex items-center gap-4 bg-white  p-4 shadow-custom-card-mui rounded-lg">
                  <div className="">
                    <img
                      src={tourDetail?.tour_images?.[0]}
                      alt={`Image ${index}`}
                      className="rounded-lg h-20 w-20 "
                    />
                  </div>
                  <div className="">
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <span className="font-medium text-lg">
                          {tourDetail?.name}
                        </span>
                        <div>
                          <StatusTour>{tourDetail?.status}</StatusTour>
                        </div>
                      </div>

                      <span>
                        {tourDetail?.address_name}, {tourDetail?.address_ward},{" "}
                        {tourDetail?.address_district},{" "}
                        {tourDetail?.address_province},{" "}
                        {tourDetail?.address_country}
                      </span>

                      <div className="grid grid-cols-3">
                        <span>
                          <span className="font-medium">
                            {tourDetail?.duration_day}
                          </span>
                          /day
                        </span>
                        <span>
                          <span className="font-medium">
                            {tourDetail?.duration_night}
                          </span>
                          /night
                        </span>
                        <Rating
                          name="half-rating-read"
                          defaultValue={tourDetail?.avgRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="text-end flex gap-4  justify-end items-end">
                  <Select
                    className="shadow-custom-card-mui rounded-md"
                    style={{ width: 120 }}
                    defaultValue="" // Set your default value if needed
                    onChange={(value) => handleStatusClick(value)}
                  >
                    <Option value="">Filter</Option>
                    <Option value={true}>Normal</Option>
                    <Option value={false}>Special</Option>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <button className="px-4 py-1 border border-gray-300 shadow-custom-card-mui bg-white rounded-md flex items-center gap-2">
                          <CiCircleMore /> Action
                        </button>
                      </a>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div></div>

            <div className=" p-4 flex flex-col gap-3">
              {filterTickets && filterTickets?.length > 0 ? (
                <div className="p-1 flex flex-col gap-3">
                  <div className=" rounded-lg flex flex-col gap-4 relative">
                    {filterTickets
                      ?.sort(
                        (
                          a: { updated_at: string },
                          b: { updated_at: string }
                        ) => {
                          // Sắp xếp theo thời gian cập nhật mới nhất lên trước
                          const timeA = new Date(a?.updated_at).getTime();
                          const timeB = new Date(b?.updated_at).getTime();

                          return timeB - timeA;
                        }
                      )
                      ?.map((ticket: any, index: number) => (
                        <React.Fragment key={index}>
                          <div className="flex flex-col gap-4 p-4 rounded-xl shadow-custom-card-mui pr-10 bg-white border border-solid border-gray-300 relative ">
                            {ticket?.is_default === true &&
                            ticket?.Ticket?.name === "ADULT" ? (
                              <></>
                            ) : (
                              <div className="absolute inset-y-1/3 right-4">
                                <Popconfirm
                                  title="Delete the task"
                                  description="Are you sure to delete this task?"
                                  onConfirm={() =>
                                    handleDeleteTicket(ticket?.id)
                                  }
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
                                  <span className="">
                                    {ticket?.PricingType?.name}
                                  </span>
                                </span>
                              </div>
                              {ticket?.is_default === false && (
                                <>
                                  <span className="text-2xl text-gray-500">
                                    •
                                  </span>
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
                                <span className="font-medium">
                                  Min quantity
                                </span>
                                <span className="text-gray-500">
                                  {ticket?.minimum_ticket_count}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  Max quantity
                                </span>
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
                                <span className="text-gray-500">
                                  {ticket?.to_age}
                                </span>
                              </div>
                            </div>
                            <div>
                              {ticket?.is_default === false && (
                                <>
                                  <span className="font-medium mb-1 block">
                                    Apply for
                                  </span>
                                  <div className="flex items-center gap-4">
                                    {ticket?.apply_dates?.map(
                                      (special: string) => (
                                        <span className="text-gray-500">
                                          {dayjs(special).format("YYYY-MM-DD")}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="w-full flex items-center">
                              <hr
                                className="flex-1 border-gray-300 mr-2"
                                style={{ borderWidth: "-0.01px" }}
                              />
                              <span className="font-medium">
                                Ticket pricing
                              </span>
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
                                      className="flex items-center border border-solid border-gray-300 justify-evenly text-sm  text-gray-500 py-1 rounded-md"
                                      key={index}
                                    >
                                      <div>{price?.from_amount}</div>
                                      <LuMoveRight />
                                      <div>{price?.to_amount}</div>
                                      <div> {formatNumber(price?.price)}</div>
                                    </div>
                                  )
                                )}
                              </>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center">No one Ticket.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailTicketTour;
