import React, { useContext, useState } from "react";
import List from "@mui/material/List";
import TicketSpecial from "./TicketSpecial";
import { Modal, message } from "antd";
import AvailabilityForCreateTicketSpecial from "./AvailabilityForCreateTicketSpecial";
import { postCreateTicketTour } from "../../store/redux/silce/tourSlice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { DataContext } from "../../store/dataContext/DataContext";
import dayjs from "dayjs";
import { MdFolderSpecial } from "react-icons/md";

export default function ModalCreateTicketSpecial() {
  const [open, setOpen] = useState<any>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { index } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { dataTicketCreate } = useContext(DataContext);
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
        message.success("Create ticket special success");
      } else {
        console.log("ticket create failed");
      }
    });
  };
  return (
    <React.Fragment>
      <button className="flex items-center gap-1" onClick={handleClickOpen}>
        <MdFolderSpecial />
        Add special ticket
      </button>
      <Modal
        className="top-10"
        title="Ticket special "
        open={open}
        onCancel={() => handleClose()}
        width={1450}
        onOk={handleCreateTicketSpecial}
      >
        <List>
          <div className="flex items-start gap-8">
            <AvailabilityForCreateTicketSpecial />
            <TicketSpecial />
          </div>
        </List>
      </Modal>
      {/* </Dialog> */}
    </React.Fragment>
  );
}
