import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRefund,
  createRefundForCus,
  getBooking,
} from "../../../store/redux/silce/booking";
import { AppDispatch } from "../../../store/redux/store";
import { StatusBooking } from "../../../styles/status/booking";
import { formatNumber } from "../../../utils/formatNumber";
import { FaRegTrashCan } from "react-icons/fa6";
import { DragDropContext } from "react-beautiful-dnd";
import { IoIosCloseCircleOutline } from "react-icons/io";
import LoadingModal from "../../../styles/loading/LoadingModal";
import { MdChevronLeft } from "react-icons/md";
import { message } from "antd";

function ScreenMain() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { booking, loadingBooking } = useSelector(
    (state: any) => state.booking
  );
  // console.log(first);

  const { index } = useParams<{ index: string | undefined }>();
  const filteredData = booking.filter(
    (item: { id: string }) => item.id === index
  );

  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  console.log(filteredData);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [reason, setReason] = useState("");
  const [moreRefund, setMoreRefund] = useState(false);
  const [loadingRes, setLoadingRes] = useState<any>(null);
  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      setIsDraggingOver(false);
      return;
    }

    const items = Array.from(selectedImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedImages(items);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newImage = {
        id: file.name,
        url: URL.createObjectURL(file),
        file: file,
      };

      setSelectedImages([newImage]);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(false);

    const files = event.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: file.name,
        url: URL.createObjectURL(file),
        file: files,
      }));

      const updatedImages = [...selectedImages];
      newImages.forEach((newImage) => {
        const isDuplicate = selectedImages.some(
          (image) => image.id === newImage.id
        );
        if (!isDuplicate) {
          updatedImages.push(newImage);
        } else {
          alert("Duplicate image detected: " + newImage.url);
        }
      });

      setSelectedImages(updatedImages);
    }
  };

  const handleDeleteImage = (id: string) => {
    const updatedImages = selectedImages.filter((image) => image.id !== id);
    setSelectedImages(updatedImages);
  };

  const handleMore = () => {
    const currentDate = new Date();
    const dateBook = filteredData?.[0]?.booked_date;
    if (moreRefund === false) {
      if (
        dayjs(currentDate).format("YYYY-MM-DD") >= dateBook &&
        filteredData[0]?.status === "ACCEPTED"
      ) {
        message.warning("Can not refund bookings in the past");
      } else {
        setMoreRefund(true);
      }
    }
    if (moreRefund === true) {
      setMoreRefund(false);
    }
  };
  const handleAcceptRefund = () => {
    const formDataImg = new FormData();
    formDataImg.append("File", selectedImages[0]?.file);
    const data = {
      booking_id: index,
      File: selectedImages[0]?.file,
    };
    dispatch(acceptRefund(data)).then((response) => {
      if (acceptRefund.fulfilled.match(response)) {
        setMoreRefund(false);
        setLoadingRes((prev: any) => !prev);
      }
    });
  };
  const handleCreateRefundForCus = () => {
    const formDataImg = new FormData();
    formDataImg.append("File", selectedImages[0]?.file);
    const data = {
      booking_id: index,
      reason: reason,
      File: selectedImages[0]?.file,
    };
    dispatch(createRefundForCus(data)).then((response) => {
      if (createRefundForCus.fulfilled.match(response)) {
        setMoreRefund(false);
        setLoadingRes((prev: any) => !prev);
      }
    });
  };
  useEffect(() => {
    const data = { sort_by: "desc" };
    dispatch(getBooking(data));
  }, [dispatch, loadingRes]);
  const handleGoBack = () => {
    navigate(-1); // Sử dụng số âm để navigate về trang trước đó
  };
  return (
    <>
      {loadingBooking ? (
        <LoadingModal loading={loadingBooking} />
      ) : (
        <div className="  bg-main rounded-xl p-8 h-full overflow-y-auto global-scrollbar ">
          <div className="">
            <button
              type="button"
              className="text-2xl font-medium flex items-center "
              onClick={handleGoBack}
            >
              <MdChevronLeft /> Back
            </button>
            <div className="  pb-7 flex flex-col justify-center items-center">
              <div className="mb-5">
                <p className=" text-2xl font-medium">Booking Detail</p>
              </div>
              <div className="border border-solid border-gray-300 rounded-lg shadow-custom-card-mui w-1/2 bg-white">
                <div className=" p-6 relative">
                  <button type="button" className="absolute top-6 right-6">
                    <StatusBooking>{filteredData[0]?.status}</StatusBooking>
                  </button>
                  <div className="pb-3">
                    <span className="font-medium">Pricing detail</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">Name </span>
                        <span className=" ">
                          {filteredData[0]?.booker_name}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">
                          Email{" "}
                        </span>
                        <span className=" ">
                          {filteredData[0]?.booker_email}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">
                          Phone{" "}
                        </span>
                        <span className=" ">
                          {filteredData[0]?.booker_phone}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">Time </span>
                        <span className=" ">
                          {dayjs(filteredData[0]?.booked_date).format(
                            "YYYY-MM-DD"
                          )}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">
                          Time slot{" "}
                        </span>
                        <span className=" ">{filteredData[0]?.time_slot}</span>
                      </div>
                    </div>
                  </div>
                  {filteredData[0]?.refund_reason && (
                    <div className="mb-4">
                      <p className="font-medium text-black">Refund reason</p>
                      <span>{filteredData[0]?.refund_reason}</span>
                    </div>
                  )}
                  <span className="font-medium">Pricing detail</span>
                  <hr />
                  <div className="grid grid-cols-4 py-3">
                    <span className=" font-medium text-gray-700">
                      Ticket type
                    </span>
                    <span className="  font-medium text-gray-700 text-center">
                      Quantity
                    </span>
                    <span className=" font-medium text-gray-700 text-center">
                      Original price
                    </span>
                    <span className=" font-medium text-gray-700 text-end">
                      Paid price
                    </span>
                  </div>
                  <hr className="pb-3" />

                  <div className="flex flex-col gap-3">
                    {filteredData[0]?.TicketOnBooking?.map(
                      (ticketQuantity: any, index: number) => (
                        <div key={index} className=" grid grid-cols-4 ">
                          <span className="">
                            {ticketQuantity?.ticket_type_id === 1
                              ? "Adult"
                              : "Children"}
                          </span>
                          <span className=" text-center ">
                            {ticketQuantity?.quantity}
                          </span>
                          <span className="  text-center">
                            {formatNumber(
                              parseInt(ticketQuantity?.original_price)
                            )}
                          </span>{" "}
                          <span className="  text-end">
                            {formatNumber(parseInt(ticketQuantity?.paid_price))}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-gray-200 p-6 rounded-b-lg flex justify-between ">
                  <div className="flex flex-col">
                    <span className=" text-gray-600">Total paid</span>
                    <span className=" text-xl pb-2 font-medium">
                      {formatNumber(parseInt(filteredData[0]?.paid_price))}
                    </span>
                    <span className="text-xs   text-gray-600">
                      All taxes and fees included
                    </span>
                  </div>
                  {filteredData[0]?.status === "ACCEPTED" && (
                    <div className="flex items-center ">
                      <button
                        type="button"
                        className="bg-white border border-navy-blue text-navy-blue px-3 py-2 rounded-lg  "
                        onClick={() => handleMore()}
                      >
                        Issue Refund
                      </button>
                    </div>
                  )}
                  {filteredData[0]?.status === "USER_REQUEST_REFUND" && (
                    <div className="flex items-center ">
                      <button
                        type="button"
                        className="bg-white border border-navy-blue text-navy-blue px-3 py-2 rounded-lg  "
                        onClick={() => handleMore()}
                      >
                        Confirm Refund
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {moreRefund && (
                <div className="mt-4 bg-white w-1/2 border border-solid border-gray-300 rounded-lg relative">
                  <IoIosCloseCircleOutline
                    className="absolute top-4 right-4 w-6 h-6 "
                    onClick={() => handleMore()}
                  />
                  <div className="px-6 py-4">
                    {filteredData[0]?.status === "ACCEPTED" && (
                      <p className="font-medium text-xl">Issue Refund</p>
                    )}
                    {filteredData[0]?.status === "USER_REQUEST_REFUND" && (
                      <p className="font-medium text-xl"> Confirm Refund</p>
                    )}
                  </div>
                  <hr />
                  <div className="p-6">
                    {filteredData[0]?.status === "ACCEPTED" && (
                      <div className="mb-2">
                        <textarea
                          placeholder="Write here"
                          className=" p-1 rounded-md w-full focus:outline-none"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                      </div>
                    )}
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <div
                        onDrop={handleDrop}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        style={{
                          backgroundColor: isDraggingOver ? "#000" : "",
                          transition: "background-color 0.3s ease",
                        }}
                        className="rounded-lg"
                      >
                        <div>
                          <div>
                            {selectedImages.length < 1 ? (
                              <div
                                className={`${
                                  isDraggingOver ? "bg-white" : ""
                                } flex  justify-center items-center flex-col gap-5 shadow-custom-card-mui rounded-lg bg-navy-blue-opacity-1 border-navy-blue border-2 border-dashed h-80`}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="text-navy-blue"
                                >
                                  <svg
                                    viewBox="0 0 64 64"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{
                                      display: "block",
                                      height: "64px",
                                      width: "64px",
                                      fill: "currentcolor",
                                    }}
                                  >
                                    <path
                                      d="M41.636 8.404l1.017 7.237 17.579 4.71a5 5 0 0 1 3.587 5.914l-.051.21-6.73 25.114A5.002 5.002 0 0 1 53 55.233V56a5 5 0 0 1-4.783 4.995L48 61H16a5 5 0 0 1-4.995-4.783L11 56V44.013l-1.69.239a5 5 0 0 1-5.612-4.042l-.034-.214L.045 14.25a5 5 0 0 1 4.041-5.612l.215-.035 31.688-4.454a5 5 0 0 1 5.647 4.256zm-20.49 39.373l-.14.131L13 55.914V56a3 3 0 0 0 2.824 2.995L16 59h21.42L25.149 47.812a3 3 0 0 0-4.004-.035zm16.501-9.903l-.139.136-9.417 9.778L40.387 59H48a3 3 0 0 0 2.995-2.824L51 56v-9.561l-9.3-8.556a3 3 0 0 0-4.053-.009zM53 34.614V53.19a3.003 3.003 0 0 0 2.054-1.944l.052-.174 2.475-9.235L53 34.614zM48 27H31.991c-.283.031-.571.032-.862 0H16a3 3 0 0 0-2.995 2.824L13 30v23.084l6.592-6.59a5 5 0 0 1 6.722-.318l.182.159.117.105 9.455-9.817a5 5 0 0 1 6.802-.374l.184.162L51 43.721V30a3 3 0 0 0-2.824-2.995L48 27zm-37 5.548l-5.363 7.118.007.052a3 3 0 0 0 3.388 2.553L11 41.994v-9.446zM25.18 15.954l-.05.169-2.38 8.876h5.336a4 4 0 1 1 6.955 0L48 25.001a5 5 0 0 1 4.995 4.783L53 30v.88l5.284 8.331 3.552-13.253a3 3 0 0 0-1.953-3.624l-.169-.05L28.804 14a3 3 0 0 0-3.623 1.953zM21 31a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM36.443 6.11l-.175.019-31.69 4.453a3 3 0 0 0-2.572 3.214l.02.175 3.217 22.894 5.833-7.74a5.002 5.002 0 0 1 4.707-4.12L16 25h4.68l2.519-9.395a5 5 0 0 1 5.913-3.587l.21.051 11.232 3.01-.898-6.397a3 3 0 0 0-3.213-2.573zm-6.811 16.395a2 2 0 0 0 1.64 2.496h.593a2 2 0 1 0-2.233-2.496zM10 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                                      fill="#222"
                                    ></path>
                                  </svg>
                                  <div>Choose an image</div>
                                </div>

                                <label
                                  htmlFor="image-upload"
                                  style={{
                                    cursor: "pointer",
                                    display: "inline-block",
                                    marginBottom: "16px", // Adjust spacing as needed
                                  }}
                                >
                                  <div
                                    className="bg-black"
                                    style={{
                                      textTransform: "none",
                                      color: "white",
                                      padding: "10px 20px",
                                      borderRadius: "10px",
                                      display: "inline-block",
                                    }}
                                  >
                                    Choose
                                  </div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                    id="image-upload"
                                  />
                                </label>
                              </div>
                            ) : (
                              <div className="w-full">
                                <div className="relative">
                                  <img
                                    src={selectedImages[0]?.url}
                                    alt="error"
                                    className="object-cover w-full h-80 shadow-custom-card-mui rounded-lg "
                                  />
                                  <button
                                    onClick={() =>
                                      handleDeleteImage(selectedImages[0]?.id)
                                    }
                                    className=" absolute top-3 right-3 bg-white shadow-custom-card-mui font-medium text-gray-600 w-8 h-8 p-0 rounded-full flex items-center justify-center"
                                  >
                                    <FaRegTrashCan />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </DragDropContext>
                    {filteredData[0]?.status === "ACCEPTED" && (
                      <div className="mt-4">
                        <button
                          type="button"
                          className={`font-medium p-2 w-full rounded-lg ${
                            selectedImages?.length === 0 || reason?.length === 0
                              ? "disabled bg-gray-300 text-gray-700 cursor-not-allowed"
                              : " bg-navy-blue text-white "
                          }`}
                          onClick={() => handleCreateRefundForCus()}
                          disabled={
                            selectedImages?.length === 0 || reason?.length === 0
                          }
                        >
                          Refund for customer
                        </button>
                      </div>
                    )}
                    {filteredData[0]?.status === "USER_REQUEST_REFUND" && (
                      <div className="mt-4">
                        <button
                          type="button"
                          className={`font-medium p-2 w-full rounded-lg ${
                            selectedImages?.length === 0
                              ? "disabled bg-gray-300 text-gray-700 cursor-not-allowed"
                              : " bg-navy-blue text-white "
                          }`}
                          onClick={() => handleAcceptRefund()}
                          disabled={selectedImages?.length === 0}
                        >
                          Confirm Refund
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ScreenMain.propTypes = {};

export default ScreenMain;
