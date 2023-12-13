import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FcEmptyTrash } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { editTicketTourId } from "../../store/redux/silce/tourSlice";
import { message } from "antd";
import dayjs from "dayjs";
import DatePicker from "react-multi-date-picker";
import { DataContext } from "../../store/dataContext/DataContext";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 0,
  background: "white",
  borderRadius: "12px",
  minWidth: "400px",
  maxWidth: "600px",
};

const ModalTicketAdult = ({
  dataTicket: { filterTickets },
}: {
  dataTicket: { filterTickets: any };
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [ticketData, setTicketData] = useState(filterTickets);
  const { setRefreshTourDetail } = useContext(DataContext);

  useEffect(() => {
    setTicketData(filterTickets);
  }, [filterTickets]);
  console.log(ticketData);
  const [open, setOpen] = useState(false);
  const [reloadNumber, setReloadNumber] = useState(0);

  if (!Array.isArray(ticketData)) {
    console.error("filterTickets is not an array");
    return null;
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseCancel = () => {
    setOpen(false);
  };
  const handleCloseUpdate = () => {
    const pricing_data = ticketData?.map((item: any) => {
      const pricingData: any = {
        id: item?.id,
        ticket_type: item?.Ticket?.name,
        pricing_type: item?.PricingType?.name,
        maximum_ticket_count: parseInt(item?.maximum_ticket_count),
        minimum_ticket_count: 1,
        minimum_booking_quantity: 1,
        from_age: item?.from_age?.toString(),
        to_age: item?.to_age?.toString(),
        is_default: item?.is_default,
        apply_dates: item?.apply_dates,
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
    pricing_data?.map((pricingData: any) =>
      dispatch(editTicketTourId(pricingData)).then((ticket) => {
        if (editTicketTourId.fulfilled.match(ticket)) {
          message.success("Edit ticket successfully");
          setRefreshTourDetail((prev) => !prev);
          setOpen(false);
        }
      })
    );
  };
  const updateScript = (index: any, newTitle: any, field: string) => {
    const updatedSchedule = [...ticketData];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: newTitle,
    };
    setTicketData(updatedSchedule);
  };
  const updateType = (index: any, newTitle: any, field: string) => {
    const updatedSchedule = [...ticketData];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: {
        ...updatedSchedule[index][field],
        name: newTitle,
      },
    };
    setTicketData(updatedSchedule);
  };
  const handleUpdatePrice = (
    price: number,
    from: number,
    to: number,
    scheduleIndex: number,
    detailIndex: number
  ) => {
    price = isNaN(price) ? 0 : price;
    from = isNaN(from) ? 0 : from;
    to = isNaN(to) ? 0 : to;

    const updatedPrice = ticketData?.map((ticketItem: any, sIndex: number) => {
      if (sIndex !== scheduleIndex) {
        return ticketItem;
      } else {
        return {
          ...ticketItem,
          price_range: ticketItem?.price_range?.map(
            (detailItem: any, dIndex: number) => {
              if (dIndex === detailIndex) {
                const updatedDetailItem = {
                  ...detailItem,
                  price: price,
                  from_amount: from,
                  to_amount: to,
                };
                return updatedDetailItem;
              } else if (dIndex === detailIndex + 1) {
                const updatedDetailItem = {
                  ...detailItem,
                  from_amount: to >= 0 ? to + 1 : 0,
                };
                return updatedDetailItem;
              }
              return detailItem;
            }
          ),
        };
      }
    });
    console.log(updatedPrice);
    setReloadNumber(reloadNumber + 1);

    setTicketData(updatedPrice);
  };
  const handleAddDetail = (ticketIndex: any, newDetail: any) => {
    const updatedTicket = [...ticketData];
    const updatedTicketItem = { ...updatedTicket[ticketIndex] };
    const updatedDetails = [...updatedTicketItem.price_range];
    updatedDetails.push(newDetail);
    updatedTicketItem.price_range = updatedDetails;
    updatedTicket[ticketIndex] = updatedTicketItem;

    setTicketData(updatedTicket);
  };
  function getMaxToAmount(ticket: any) {
    let maxToAmount = 0;

    ticket.price_range.forEach((price: any) => {
      if (price.to_amount > maxToAmount) {
        maxToAmount = price.to_amount;
      }
    });

    return maxToAmount;
  }
  const handleDeleteDetail = (ticketIndex: any, detailIndex: any) => {
    const updatedTicket = ticketData?.map((ticketItem: any, sIndex: any) => {
      if (sIndex !== ticketIndex) {
        return ticketItem;
      } else {
        return {
          ...ticketItem,
          price_range: ticketItem.price_range.filter(
            (_detailItem: any, dIndex: any) => dIndex !== detailIndex
          ),
        };
      }
    });
    setTicketData(updatedTicket);
  };

  const disableDateAdult = () => {
    const adultTicket = ticketData.filter(
      (ticket: any) => ticket.Ticket.name === "ADULT"
    );
    const formattedDates = adultTicket?.flatMap((dateFil: any) =>
      dateFil?.apply_dates?.map((dateApp: string) =>
        dayjs(dateApp).format("YYYY-MM-DD")
      )
    );
    return formattedDates;
  };

  const handleDateChange = (newDates: any, ticketIndex: number) => {
    if (newDates) {
      const formatDate = newDates?.map((date: any) =>
        dayjs(date).format("YYYY-MM-DD")
      );

      if (formatDate && formatDate.length > 0) {
        const updatedTicket = [...ticketData];
        const updatedTicketItem = { ...updatedTicket[ticketIndex] };
        const updatedDetails = [...updatedTicketItem.apply_dates];
        updatedDetails.push(...formatDate);
        updatedTicketItem.apply_dates = updatedDetails;
        updatedTicket[ticketIndex] = updatedTicketItem;

        setTicketData(updatedTicket);
      }
    }
  };

  const disableDateChildren = () => {
    const adultTicket = ticketData.filter(
      (ticket: any) => ticket.Ticket.name === "CHILDREN"
    );
    const formattedDates = adultTicket?.flatMap((dateFil: any) =>
      dateFil?.apply_dates?.map((dateApp: string) =>
        dayjs(dateApp).format("YYYY-MM-DD")
      )
    );
    return formattedDates;
  };
  const dataDisableDateAdult = disableDateAdult();
  const dataDisableDateChildren = disableDateChildren();
  return (
    <div>
      <div className="flex items-center gap-1" onClick={handleOpen}>
        <FaRegPenToSquare className="w-4 h-4 shadow-custom-card-mui" /> Edit
        tickets
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="">
            <div className="relative ">
              <div
                className="absolute top-0 bg-white w-full p-4 shadow-custom-59 rounded-t-xl "
                style={{ marginTop: "-1px" }}
              >
                <div className="flex items-center justify-center">
                  <span className=" text-xl font-semibold">Tour Ticket</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-4 min-h-[20vh] max-h-[80vh] overflow-auto global-scrollbar py-16 p-4">
                  {ticketData?.map((ticket: any, ticketIndex: number) => (
                    <div key={ticketIndex} className="flex flex-col">
                      {ticket?.is_default === false && (
                        <div className="flex flex-col mt-2">
                          <span className="font-medium mb-1">Date special</span>
                          <div className="bg-white">
                            <DatePicker
                              multiple
                              value={ticket?.apply_dates || null}
                              mapDays={({ date }) => {
                                const formattedDate = date.format("YYYY-MM-DD");

                                let isDisabled = false;

                                if (ticket?.Ticket?.name === "CHILDREN") {
                                  isDisabled =
                                    dataDisableDateChildren.includes(
                                      formattedDate
                                    );
                                }

                                if (ticket?.Ticket?.name === "ADULT") {
                                  isDisabled =
                                    dataDisableDateAdult.includes(
                                      formattedDate
                                    );
                                }

                                const dayClasses = isDisabled
                                  ? "text-gray-500 bg-gray-200 cursor-not-allowed"
                                  : "hover:bg-blue-500 hover:text-white cursor-pointer";

                                return {
                                  className: dayClasses,
                                  // disabled: isDisabled,
                                };
                              }}
                              onChange={(e) => handleDateChange(e, ticketIndex)}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3 items-start">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Ticket name</span>
                          <input
                            type="text"
                            disabled
                            className="px-2 py-1 border border-gray-300 rounded-md"
                            value={ticket?.Ticket?.name}
                            onChange={(e) =>
                              updateType(ticketIndex, e.target.value, "Ticket")
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Ticket type</span>
                          <input
                            disabled
                            type="text"
                            className="px-2 py-1 border border-gray-300 rounded-md"
                            value={ticket?.PricingType?.name}
                            onChange={(e) =>
                              updateType(
                                ticketIndex,
                                e.target.value,
                                "PricingType"
                              )
                            }
                          />
                        </div>
                        {ticket?.is_default === false && (
                          <>
                            <span className="text-lg font-medium text-red-700">
                              Special
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Max count</span>
                            {ticket?.price_range[
                              ticket?.price_range?.length - 1
                            ]?.to_amount > ticket?.maximum_ticket_count && (
                              <span className="text-red-500 text-xs">
                                *Max greater than to
                              </span>
                            )}
                          </div>

                          <input
                            type="text"
                            placeholder="max"
                            className="px-2 py-1 border border-gray-300 rounded-md"
                            value={ticket?.maximum_ticket_count}
                            onChange={(e) =>
                              updateScript(
                                ticketIndex,
                                e.target.value,
                                "maximum_ticket_count"
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Min count</span>
                          <input
                            disabled
                            type="text"
                            placeholder="min"
                            className="px-2 py-1 border border-gray-300 rounded-md"
                            value={ticket?.minimum_booking_quantity}
                            onChange={(e) =>
                              updateScript(
                                ticketIndex,
                                e.target.value,
                                "minimum_booking_quantity"
                              )
                            }
                          />
                        </div>
                      </div>
                      {ticket?.price_range?.map(
                        (price: any, detailIndex: number) => (
                          <div
                            key={detailIndex}
                            className="flex gap-3 items-center  "
                          >
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">From</span>
                              <input
                                type="text"
                                placeholder="min"
                                disabled
                                className="px-2 py-1 border border-gray-300 rounded-md w-20"
                                value={price?.from_amount}
                                onChange={(e) =>
                                  handleUpdatePrice(
                                    price?.price,
                                    parseInt(e.target.value, 10),
                                    price?.to_amount,
                                    ticketIndex,
                                    detailIndex
                                  )
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">to</span>
                                {price?.to_amount < price?.from_amount && (
                                  <span className="text-red-500 text-xs">
                                    *Greater than or equal to
                                  </span>
                                )}
                              </div>

                              <input
                                type="text"
                                placeholder="min"
                                className="px-2 py-1 border border-gray-300 rounded-md"
                                value={price.to_amount || ""}
                                onChange={(e) => {
                                  const toAmount = parseInt(e.target.value, 10);
                                  handleUpdatePrice(
                                    price.price,
                                    price.from_amount,
                                    toAmount,
                                    ticketIndex,
                                    detailIndex
                                  );
                                }}
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <div className="flex gap-1 items-center">
                                <span className="font-medium">Price</span>{" "}
                                {price?.price <= 50000 &&
                                  ticket?.PricingType?.name === "DEFAULT" && (
                                    <span
                                      className="text-xs text-red-500
                            "
                                    >
                                      *Greater than 50,000
                                    </span>
                                  )}
                              </div>

                              <input
                                type="text"
                                placeholder="min"
                                className="px-2 py-1 border border-gray-300 rounded-md"
                                value={price?.price}
                                onChange={(e) =>
                                  handleUpdatePrice(
                                    parseInt(e.target.value, 10),
                                    price?.from_amount,
                                    price?.to_amount,
                                    ticketIndex,
                                    detailIndex
                                  )
                                }
                              />
                            </div>

                            <FcEmptyTrash
                              onClick={() =>
                                handleDeleteDetail(ticketIndex, detailIndex)
                              }
                            />
                          </div>
                        )
                      )}
                      <div className="flex justify-end mt-3">
                        <button
                          className="bg-black px-2 py-1 text-white rounded-md"
                          onClick={() => {
                            const maxToAmount = getMaxToAmount(ticket);
                            handleAddDetail(ticketIndex, {
                              from_amount: maxToAmount + 1,
                              to_amount: maxToAmount + 2,
                              price: 0,
                            });
                          }}
                        >
                          Add Price
                        </button>
                      </div>
                      <hr className="bg-black mt-4" />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex gap-5 absolute bottom-0 bg-white w-full justify-center p-4 rounded-b-xl border border-solid border-gray-200"
                style={{ marginBottom: "-1px    " }}
              >
                <button
                  className="px-6 py-2 bg-gray-300 rounded-md text-gray-600 font-medium"
                  onClick={handleCloseCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-navy-blue rounded-md text-white font-medium"
                  onClick={handleCloseUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTicketAdult;
