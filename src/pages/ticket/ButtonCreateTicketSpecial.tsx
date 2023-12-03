import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { postCreateTicketTour } from "../../store/redux/silce/tourSlice";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useContext } from "react";
import { DataContext } from "../../store/dataContext/DataContext";

export const ButtonCreateTicketSpecial = () => {
  const { index } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { dataTicketCreate } = useContext(DataContext);
  console.log(dataTicketCreate);
  const handleCreateTicketSpecial = () => {
    const pricing_data = dataTicketCreate?.map((item: any) => {
      const pricingData: any = {
        ticket_type: item?.role,
        pricing_type: item?.type,
        maximum_ticket_count: parseInt(item?.max),
        minimum_ticket_count: 1,
        from_age: item?.ageStart?.toString(),
        to_age: item?.ageEnd?.toString(),
        is_default: false,
        apply_dates: item?.apply_dates?.map((item: string) =>
          dayjs(item)?.format("YYYY-MM-DD")
        ),
      };

      if (item.price_range) {
        pricingData.price_range = item.price_range.map((formItem: any) => ({
          from_amount: parseInt(formItem?.numberOfPeople),
          to_amount: parseInt(formItem?.numberOfPeopleAfter),
          price: parseInt(formItem?.retailPrice),
        }));
      }
      return pricingData;
    });
    localStorage.setItem("dataResTicket", pricing_data);
    const data = {
      tour_id: index,
      pricing_data,
    };
    dispatch(postCreateTicketTour(data)).then((data) => {
      if (postCreateTicketTour.fulfilled.match(data)) {
        console.log("create ticket success");
      } else {
        console.log("ticket create failed");
      }
    });
  };
  return (
    <div>
      <button className="bg-navy-blue p-2" onClick={handleCreateTicketSpecial}>
        Create
      </button>
    </div>
  );
};
