import Navbar from "../../components/Navbar/Index";
import { AiFillFilter, AiOutlinePlusCircle } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import BillingDetail from "./BillingDetail";
import { getBooking } from "../../store/redux/silce/booking";
import { formatNumber } from "../../utils/formatNumber";
import { StatusBooking } from "../../styles/status/booking";

function Payment() {
  const dispatch: AppDispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState<any>({});

  const { booking } = useSelector((state: any) => state.booking);

  console.log(booking);
  const toggleContentVisibility = (index: number) => {
    const newExpandedItems = { ...expandedItems };
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };
  useEffect(() => {
    dispatch(getBooking()).then((response) => {
      if (getBooking.fulfilled.match(response)) {
        toast.success("This is payment!");
      }
    });
  }, [dispatch]);
  return (
    <>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        <div className="container mx-auto py-4 px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">Payment method</h1>
              <span className="text-gray-500">
                When provider have voucher new, they open here
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <RiSearchLine className="absolute top-2 left-2" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  className="border border-gray-300 pl-8 py-1 w-24 rounded-md"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="relative bg-white shadow-custom-card-mui border border-gray-300 pl-0 py-1 w-24 rounded-md"
                >
                  <AiFillFilter className="absolute top-2 left-2" />
                  Filter
                </button>
              </div>
              <div>
                <Link to="/voucher-create">
                  <button
                    type="button"
                    className="relative bg-navy-blue text-white shadow-custom-card-mui py-1 pr-2 pl-8 rounded-md  border"
                  >
                    <AiOutlinePlusCircle className="absolute top-2 left-2" />
                    New Voucher
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <BillingDetail />
          </div>
          <div className="text-lg font-medium pb-2"> Payment history</div>
          <div className="container flex flex-col gap-4">
            <div className="bg-white p-3 rounded-lg shadow-custom-card-mui">
              <div className="grid grid-cols-5 gap-3">
                <div className="">
                  <span className="font-medium">Date</span>
                </div>
                <div className="">
                  <span className="font-medium">Paid original</span>
                </div>
                <div className="">
                  <span className="font-medium">Paid price</span>
                </div>
                <div className="">
                  <span className="font-medium">Refund amount</span>
                </div>
                <div className="">
                  <span className="font-medium"> Status</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {booking?.length > 0 ? (
                Array.isArray(booking) &&
                booking?.map((dataVoucher: any, index: number) => (
                  <>
                    <div
                      key={index}
                      className="shadow-custom-card-mui bg-white rounded-lg relative"
                      onClick={() => toggleContentVisibility(index)}
                    >
                      <div className=" px-4 py-6 relative ">
                        {/* {!expandedItems[index] ? (
                          <div
                            className="absolute bottom-2 right-2 text-xs flex items-center gap-1"
                            onClick={() => toggleContentVisibility(index)}
                          >
                            <span>See tour</span>
                            <AiOutlineDown />
                          </div>
                        ) : (
                          <div className="absolute bottom-2 right-2 text-xs flex items-center gap-1">
                            <span
                              onClick={() => toggleContentVisibility(index)}
                            >
                              See less
                            </span>
                            <AiOutlineUp />
                          </div>
                        )} */}
                        <div className="grid grid-cols-5 gap-3 ">
                          <div className=" flex items-center ">
                            <div className="">
                              <span className="">
                                {dayjs(dataVoucher?.updated_at).format(
                                  "YYYY-MM-DD"
                                )}
                              </span>
                            </div>
                          </div>
                          <div className=" flex items-center ">
                            <span className="">
                              {formatNumber(
                                parseInt(dataVoucher?.original_price)
                              )}
                            </span>
                          </div>
                          <div className=" flex items-center ">
                            <div className="flex flex-wrap gap-3">
                              <span className="">
                                {formatNumber(
                                  parseInt(dataVoucher?.paid_price)
                                )}
                              </span>
                            </div>
                          </div>
                          <div className=" flex items-center">
                            <div className="flex flex-wrap gap-3">
                              <span className="">
                                {formatNumber(
                                  parseInt(dataVoucher?.refund_ammount)
                                )}
                              </span>
                            </div>
                          </div>
                          <div className=" flex items-center">
                            <StatusBooking>{dataVoucher?.status}</StatusBooking>
                          </div>
                        </div>
                      </div>
                      {/* {expandedItems[index] && (
                        <Fade in={expandedItems[index]} timeout={700}>
                          <div>
                            <hr className="mb-4" />
                            {dataVoucher?.tours?.length > 0 ? (
                              dataVoucher?.tours?.map(
                                (voucherTour: any, index: number) => (
                                  <div
                                    className=" px-4  mb-4  relative "
                                    key={index}
                                  >
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={voucherTour?.tour_images[0]}
                                        className="w-12 h-12 rounded-lg"
                                        alt=""
                                      />
                                      <div>
                                        <p className="">{voucherTour?.name}</p>
                                        <p className="text-gray-500">
                                          {voucherTour?.address_district},{" "}
                                          {voucherTour?.address_province},{" "}
                                          {voucherTour?.address_country}
                                        </p>
                                      </div>
                                    </div>

                                    {index <
                                      dataVoucher?.TourVoucher?.length - 1 && (
                                      <hr className="mt-4" />
                                    )}
                                  </div>
                                )
                              )
                            ) : (
                              <div className="flex items-center justify-center pb-6 pt-2">
                                <p className="bg-main p-1 rounded-lg shadow-custom-card-mui border border-gray-300 border-solid font-medium">
                                  Add tour for voucher
                                </p>
                              </div>
                            )}
                          </div>
                        </Fade>
                      )} */}
                    </div>
                  </>
                ))
              ) : (
                <button
                  type="button"
                  className="bg-main rounded-md py-1 px-2 shadow-custom-card-mui font-medium"
                >
                  {/* {loading ? "Loading..." : "No tours available"} */}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Payment;
