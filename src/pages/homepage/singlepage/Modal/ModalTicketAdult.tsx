import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FcEmptyTrash } from "react-icons/fc";

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
};

const ModalTicketAdult = ({
  dataTicket: { ticketPricing, setTicketPricing, duration },
}: {
  dataTicket: { ticketPricing: any; setTicketPricing: any; duration: number };
}) => {
  const [open, setOpen] = useState(false);
  const [reloadNumber, setReloadNumber] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseCancel = () => {
    setOpen(false);
  };
  const handleCloseUpdate = () => {
    setOpen(false);
  };
  const updateScript = (index: any, newTitle: any, field: string) => {
    const updatedSchedule = [...ticketPricing];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: newTitle,
    };
    setTicketPricing(updatedSchedule);
  };
  const updateType = (index: any, newTitle: any, field: string) => {
    const updatedSchedule = [...ticketPricing];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: {
        ...updatedSchedule[index][field],
        name: newTitle,
      },
    };
    setTicketPricing(updatedSchedule);
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

    const updatedPrice = ticketPricing?.map(
      (ticketItem: any, sIndex: number) => {
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
      }
    );
    console.log(updatedPrice);
    setReloadNumber(reloadNumber + 1);

    setTicketPricing(updatedPrice);
  };
  const handleAddDetail = (ticketIndex: any, newDetail: any) => {
    const updatedTicket = [...ticketPricing];
    const updatedTicketItem = { ...updatedTicket[ticketIndex] };
    const updatedDetails = [...updatedTicketItem.price_range];
    updatedDetails.push(newDetail);
    updatedTicketItem.price_range = updatedDetails;
    updatedTicket[ticketIndex] = updatedTicketItem;

    setTicketPricing(updatedTicket);
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
    const updatedTicket = ticketPricing?.map((ticketItem: any, sIndex: any) => {
      if (sIndex !== ticketIndex) {
        return ticketItem;
      } else {
        return {
          ...ticketItem,
          price_range: ticketItem.price_range.filter(
            (detailItem: any, dIndex: any) => dIndex !== detailIndex
          ),
        };
      }
    });
    setTicketPricing(updatedTicket);
  };
  return (
    <div>
      <button onClick={handleOpen}>edit</button>
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
                  <span className=" text-xl font-semibold">Tour Schedule</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-4 min-h-[20vh] max-h-[80vh] overflow-auto global-scrollbar py-16 p-4">
                  {ticketPricing?.map((ticket: any, ticketIndex: number) => (
                    <div key={ticketIndex} className="flex flex-col">
                      <input
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded-lg"
                        value={ticket?.Ticket?.name}
                        onChange={(e) =>
                          updateType(ticketIndex, e.target.value, "Ticket")
                        }
                      />
                      <input
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded-lg"
                        value={ticket?.PricingType?.name}
                        onChange={(e) =>
                          updateType(ticketIndex, e.target.value, "PricingType")
                        }
                      />
                      <span>max</span>
                      <input
                        type="text"
                        placeholder="max"
                        className="px-2 py-1 border border-gray-300 rounded-lg"
                        value={ticket?.maximum_booking_quantity}
                        onChange={(e) =>
                          updateScript(
                            ticketIndex,
                            e.target.value,
                            "maximum_booking_quantity"
                          )
                        }
                      />{" "}
                      <span>min</span>
                      <input
                        type="text"
                        placeholder="min"
                        className="px-2 py-1 border border-gray-300 rounded-lg"
                        value={ticket?.minimum_booking_quantity}
                        onChange={(e) =>
                          updateScript(
                            ticketIndex,
                            e.target.value,
                            "minimum_booking_quantity"
                          )
                        }
                      />
                      <span>price</span>
                      {ticket?.price_range?.map(
                        (price: any, detailIndex: number) => (
                          <div
                            key={detailIndex}
                            className="flex flex-col border-b border-solid border-gray-400"
                          >
                            <span>from</span>
                            <input
                              type="text"
                              placeholder="min"
                              disabled
                              className="px-2 py-1 border border-gray-300 rounded-lg"
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
                            <span>to</span>
                            <input
                              type="text"
                              placeholder="min"
                              className="px-2 py-1 border border-gray-300 rounded-lg"
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

                            <span>price</span>
                            <input
                              type="text"
                              placeholder="min"
                              className="px-2 py-1 border border-gray-300 rounded-lg"
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
                            <FcEmptyTrash
                              onClick={() =>
                                handleDeleteDetail(ticketIndex, detailIndex)
                              }
                            />
                          </div>
                        )
                      )}
                      <button
                        className="bg-black px-2 py-1 text-white rounded-lg"
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
                  ))}
                </div>
              </div>

              <div
                className="flex gap-5 absolute bottom-0 bg-white w-full justify-center p-4 rounded-b-xl border border-solid border-gray-200"
                style={{ marginBottom: "-1px    " }}
              >
                <button
                  className="px-6 py-2 bg-gray-300 rounded-lg text-gray-600 font-medium"
                  onClick={handleCloseCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-navy-blue rounded-lg text-white font-medium"
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
