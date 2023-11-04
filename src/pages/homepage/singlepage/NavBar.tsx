import { useSelector } from "react-redux";
import { useEditContext } from "./Context/useEditContext";
import { StateTour } from "../../createtour/types/index.t";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import {
  addTourImage,
  editContentTour,
  editTicketAvailability,
  editTicketTour,
} from "../../../store/redux/silce/tourSlice";
import dayjs from "dayjs";
import { useContext } from "react";
import { DataContext } from "../../../store/dataContext/DataContext";

function NavBar() {
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
        minimum_ticket_count: parseInt(item?.minimum_booking_quantity),
        minimum_booking_quantity: parseInt(item?.minimum_booking_quantity),
        from_age: item?.from_age?.toString(),
        to_age: item?.to_age?.toString(),
      };
      console.log(pricingData);
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
        id: availabilityItem?.id,
        name: availabilityItem?.name,
        validity_date_range_from: dayjs(
          availabilityItem?.validity_date_range_from
        ).format("YYYY-MM-DD"),
        validity_date_range_to: dayjs(
          availabilityItem?.validity_date_range_to
        ).format("YYYY-MM-DD"),
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
    <div className="">
      <div className=" border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
        <div className="flex flex-col justify-center ">
          <p className="font-medium pl-5 pb-3">Information</p>
          <div className="h-[60vh] overflow-auto scrollbar-none gap-4 flex flex-col">
            <div className={`flex items-center font-medium pl-1 gap-4`}>
              <div className="w-1.5 h-7 rounded-full bg-navy-blue"></div>
              <p className="mr-4 font-medium text-navy-blue">1.</p>
              <span className="text-navy-blue">kjhgfdsa</span>
            </div>
          </div>
          <div className="flex w-64 items-center  justify-center">
            <button
              type="button"
              className="bg-navy-blue text-white p-2 rounded-lg"
              onClick={handleEditContent}
            >
              Save change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {};

export default NavBar;
