import Navbar from "../../components/Navbar/Index";
import {
  AiFillFilter,
  AiOutlineDown,
  AiOutlinePlusCircle,
  AiOutlineUp,
} from "react-icons/ai";
import { Backdrop, CircularProgress, Fade } from "@mui/material";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Data } from "./data";
import { useState } from "react";

function Voucher() {
  const [expandedItems, setExpandedItems] = useState<any>({});
  const toggleContentVisibility = (index: any) => {
    const newExpandedItems = { ...expandedItems };
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };
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
              <h1 className="text-2xl font-semibold ">List of Voucher</h1>
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
          <div className="container flex flex-col gap-4">
            <div className="bg-white p-3 rounded-lg shadow-custom-card-mui">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-3">
                  <span className="font-medium">Title</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Discount</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Quantity</span>
                </div>
                <div className="col-span-3">
                  <span className="font-medium">Apply condition</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium"> Expired</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {Data?.length > 0 ? (
                Array.isArray(Data) &&
                Data?.map((dataVoucher: any, index: number) => (
                  <>
                    <div
                      key={index}
                      className="shadow-custom-card-mui bg-white rounded-lg relative"
                    >
                      <div className=" px-4 py-6  mb-2  relative ">
                        {!expandedItems[index] ? (
                          <div className="absolute bottom-2 right-2 text-xs flex items-center gap-1">
                            <span
                              onClick={() => toggleContentVisibility(index)}
                            >
                              See tour
                            </span>
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
                        )}
                        <div className="grid grid-cols-12 gap-3 ">
                          <div className="col-span-3 flex items-center ">
                            <div className="">
                              <span className="font-medium">
                                {dataVoucher?.name}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center ">
                            <div className="flex gap-1">
                              <span>{dataVoucher?.discount}</span>
                              <span>
                                {dataVoucher?.discount_type === "PERCENT"
                                  ? "%"
                                  : dataVoucher?.discount_type === "AMOUNT"
                                  ? "VNĐ"
                                  : ""}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center ">
                            <div className="flex flex-wrap gap-3">
                              <span>{dataVoucher?.quantity}</span>
                            </div>
                          </div>
                          <div className="col-span-3 flex items-center">
                            <div className="flex flex-wrap gap-3">
                              {dataVoucher?.apply_condition &&
                                Object.entries(dataVoucher.apply_condition).map(
                                  ([key, value]) => (
                                    <p key={key}>
                                      {key}: {value as any}
                                    </p>
                                  )
                                )}
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div>{dataVoucher?.expired_date}</div>
                          </div>
                        </div>
                      </div>
                      {expandedItems[index] && (
                        <Fade in={expandedItems[index]} timeout={700}>
                          <div>
                            <hr className="mb-4" />
                            {dataVoucher?.TourVoucher?.map(
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
                            )}
                          </div>
                        </Fade>
                      )}
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

export default Voucher;
