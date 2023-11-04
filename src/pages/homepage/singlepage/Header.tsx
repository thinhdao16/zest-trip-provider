import Box from "@mui/material/Box";
import { FaAngleLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StateTour } from "../../createtour/types/index.t";
import { useEditContext } from "./Context/useEditContext";
import { useContext } from "react";
import { DataContext } from "../../../store/dataContext/DataContext";
import { AppDispatch } from "../../../store/redux/store";
import dayjs from "dayjs";
import {
  editTicketAvailability,
  editContentTour,
  editTicketTour,
  addTourImage,
} from "../../../store/redux/silce/tourSlice";

export default function Header() {
  const {
    name,
    description,
    footnote,
    addressName,
    addressCountry,
    addressDis,
    addressPro,
    addressWard,
    schedule,
    tourTag,
    tourVehicle,
    ticketPricing,
    tourImages,
    imageSrc,
    availability,
  } = useEditContext();
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  const { setRefreshTourDetail } = useContext(DataContext);

  const dispatch: AppDispatch = useDispatch();
  const handleEditContent = () => {
    const dataValue = {
      name: name,
      description: description,
      footnote: footnote,
      duration: tourDetail?.duration,
      tag_id: tourTag?.map((tag: { id: number }) => tag?.id),
      vehicle_id: tourVehicle?.map((acc: { id: number }) => acc?.id),
      tour_location_type: tourDetail?.tour_location_type,
      address_name: addressName,
      address_district: addressDis,
      address_ward: addressWard,
      address_province: addressPro,
      address_country: addressCountry,
      tour_images: tourImages,
      TourSchedule: schedule?.map((data: any) => ({
        title: `${data?.title}`,
        description: data?.description,
        schedule_detail: data?.TourScheduleDetail?.map((detail: any) => ({
          from: detail?.from,
          to: detail?.to,
          description: detail?.description,
        })),
      })),
    };

    const pricing_data = ticketPricing?.map((item: any) => {
      const pricingData: any = {
        ticket_type: item?.Ticket?.name,
        pricing_type: item?.PricingType?.name,
        maximum_ticket_count: parseInt(item?.maximum_booking_quantity),
        minimum_ticket_count: 1,
        minimum_booking_quantity: 1,
        from_age: item?.from_age?.toString(),
        to_age: item?.to_age?.toString(),
      };
      if (item.price_range) {
        pricingData.price_range = item.price_range.map((formItem: any) => ({
          from_amount: parseInt(formItem.from_amount),
          to_amount: parseInt(formItem.to_amount),
          price: parseInt(formItem.price),
        }));
      }

      return pricingData;
    });
    const dataUpdateTicket = {
      tour_id: tourDetail?.id,
      pricing_data,
    };
    const formDataImg = new FormData();
    for (const image of imageSrc) {
      formDataImg.append("tour_images", image?.file);
    }
    const avaibility_data = availability?.map((availabilityItem: any) => {
      return {
        id: availabilityItem?.id?.toString(),
        name: availabilityItem?.name?.toString(),
        validity_date_range_from: dayjs(
          availabilityItem?.validity_date_range_from
        )
          .format("YYYY-MM-DD")
          ?.toString(),
        validity_date_range_to: dayjs(availabilityItem?.validity_date_range_to)
          .format("YYYY-MM-DD")
          ?.toString(),
        tour_id: availabilityItem?.tour_id,
        special_dates: availabilityItem?.special_dates?.map(
          (specialItem: any) => ({
            date: specialItem?.date,
            timeSlot: specialItem?.timeSlot,
          })
        ),
        weekdays: availabilityItem?.weekdays?.map((weekday: any) => ({
          day: weekday?.day,
          timeSlot: weekday?.timeSlot,
        })),
      };
    });
    avaibility_data.forEach((availabilityItem: any) => {
      console.log(availabilityItem);

      dispatch(editTicketAvailability(availabilityItem));
    });
    const allFormImg = { formDataImg, id: tourDetail?.id };
    const allForm = { dataValue, id: tourDetail?.id };
    dispatch(editContentTour(allForm)).then((response) => {
      if (editContentTour.fulfilled.match(response)) {
        setRefreshTourDetail((prev) => !prev);
      }
    });
    dispatch(editTicketTour(dataUpdateTicket));
    if (imageSrc?.length > 0) {
      dispatch(addTourImage(allFormImg));
    }
  };
  return (
    <div className="h-[12.8vh] ">
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <div className=" py-6 px-4 bg-white">
          <div className="flex justify-between items-center ">
            <Link to="/" className=" flex items-center justify-center gap-x-4">
              <FaAngleLeft />
              <span className=" font-medium text-xl"> {tourDetail?.name}</span>
            </Link>
            <div className="flex gap-x-8">
              <button className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue ">
                Any question ?
              </button>

              <button
                onClick={handleEditContent}
                className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="px-4">
          <hr />
        </div>
      </Box>
    </div>
  );
}
