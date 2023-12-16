import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { AppDispatch } from "../../store/redux/store";
import {
  getBookingDetail,
  getTicketQuantity,
} from "../../store/redux/silce/booking";
import {
  editAvailabilityActive,
  editAvailabilityDeactive,
  fetchTourDetail,
} from "../../store/redux/silce/tourSlice";
import { StatusTour } from "../../styles/status/tour";
import TruncatedText from "../../utils/TruncatedText";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import { Dropdown, MenuProps, Switch } from "antd";
import { DataContext } from "../../store/dataContext/DataContext";
import { CiCircleMore } from "react-icons/ci";
import EditAvailability from "./Modal/EditAvailability";
import { StatusAvailabilty } from "../../styles/status/availability";
import DateAvailability from "./DateAvailability";
import AddAvailability from "./Modal/AddAvailability";

function DetailAvailability() {
  const dispatch: AppDispatch = useDispatch();
  const { index } = useParams<{ index: string }>();
  const { refreshTourDetail, setRefreshTourDetail, reloadStatus, refeshTour } =
    useContext(DataContext);

  const { loadingCreateTour } = useSelector((state: any) => state.tour);

  const tourDetail: any = useSelector((state: any) => state.tour.tourGetDetail);

  const [loadings, setLoadings] = useState(null);

  useEffect(() => {
    if (index) {
      dispatch(getBookingDetail(index));
      dispatch(fetchTourDetail(index));
      dispatch(getTicketQuantity(index));
    }
  }, [
    dispatch,
    index,
    loadingCreateTour,
    refreshTourDetail,
    reloadStatus,
    loadings,
    refeshTour,
  ]);
  useEffect(() => {
    console.log("reloadStatus changed:", reloadStatus);
  }, [reloadStatus]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <EditAvailability dataAvailability={tourDetail?.TourAvailability} />
      ),
    },
    {
      key: "2",
      label: (
        <AddAvailability dataDetailTour={tourDetail} setLoading={setLoadings} />
      ),
    },
  ];

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
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
                <Link to="/availability">
                  <button className="font-medium text-lg">
                    List availability
                  </button>
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
                <div className="flex items-center gap-4 bg-white  p-4 shadow-custom-card-mui rounded-lg relative">
                  <div className="absolute top-2 right-2">
                    <StatusTour idtour={tourDetail?.id}>
                      {tourDetail?.status}
                    </StatusTour>
                  </div>
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
                          <TruncatedText
                            text={tourDetail?.name}
                            maxLength={50}
                          />
                        </span>
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
            <div>
              <DateAvailability />
            </div>

            <div className=" p-4 flex flex-col gap-3">
              <div className="flex flex-col gap-4">
                {Array.isArray(tourDetail?.TourAvailability) &&
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  [...tourDetail?.TourAvailability]
                    .sort((a, b) => b.id - a.id)
                    .map((data, index) => (
                      <React.Fragment key={index}>
                        <div className=" bg-white border border-solid border-gray-300 p-4 shadow-custom-card-mui rounded-lg">
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
                                <span className="font-medium">
                                  {data?.name}
                                </span>
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
                                    weekday: {
                                      day: number;
                                      timeSlot: string;
                                    },
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
      )}
    </>
  );
}

export default DetailAvailability;
