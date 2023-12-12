import Navbar from "../../components/Navbar/Index";
import {
  AiOutlineDown,
  AiOutlinePlusCircle,
  AiOutlineUp,
} from "react-icons/ai";
import { Fade } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { getVoucher } from "../../store/redux/silce/providerSlice";
import dayjs from "dayjs";
import { formatNumber } from "../../utils/formatNumber";
import { DataContext } from "../../store/dataContext/DataContext";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import { Input, Select } from "antd";

const { Search } = Input;

function Voucher() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<any>({});
  const { setVoucherView } = useContext(DataContext);

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const [selectedDiscountType, setSelectedDiscountType] = useState("");

  console.log(scrollPosition);
  const { voucher, loadingProvider } = useSelector(
    (state: any) => state.provider
  );
  console.log(voucher);
  const [filterVouchers, setFilterVouchers] = useState(voucher);

  const [searchTerm, setSearchTerm] = useState("");

  const toggleContentVisibility = (index: any) => {
    const newExpandedItems = { ...expandedItems };
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };
  const handleApplyVoucher = (data: any) => {
    if (data) {
      setVoucherView(data);
      localStorage.setItem("voucher_view", JSON.stringify(data));
      navigate(`/voucher-view`);
    }
  };

  const handleChangeDiscountType = (value: string) => {
    setSelectedDiscountType(value);
    filterVouchersList(searchTerm, value);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterVouchersList(value, selectedDiscountType);
  };

  const filterVouchersList = (search: string, discountType: string) => {
    const filteredVouchers = voucher.filter((v: any) => {
      const matchDiscountType =
        !discountType || v.discount_type === discountType;
      const matchSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase());

      return matchDiscountType && matchSearch;
    });

    setFilterVouchers(filteredVouchers);
  };

  useEffect(() => {
    dispatch(getVoucher());
  }, [dispatch]);

  useEffect(() => {
    setFilterVouchers(voucher);
  }, [voucher]);

  useEffect(() => {
    const handleWheel = () => {
      setScrollPosition(window.scrollY);
      scrollTo();
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [setScrollPosition]);

  const scrollTo = () => {
    console.log("s");
  };

  return (
    <>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      {loadingProvider ? (
        <LoadingFullScreen loading={loadingProvider} />
      ) : (
        <>
          <Navbar />

          <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
            <div className="container mx-auto py-4 px-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold ">List of Voucher</h1>
                </div>
                <div className="flex items-center gap-3">
                  <Search
                    allowClear
                    type="text"
                    placeholder="Input search text"
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                  />
                  <div>
                    <Select
                      defaultValue={selectedDiscountType}
                      onChange={handleChangeDiscountType}
                      style={{ width: 120 }}
                      allowClear
                      options={[
                        { value: "", label: "All Discount Types" },
                        { value: "PERCENT", label: "Percent" },
                        { value: "AMOUNT", label: "Amount" },
                      ]}
                    />
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
                <div className="bg-navy-blue text-white p-3 rounded-lg shadow-custom-card-mui">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                      <span className="font-medium">Title</span>
                    </div>
                    <div className="col-span-9">
                      <div className="grid grid-cols-5">
                        <div className="text-center">
                          <span className="font-medium">Discount</span>
                        </div>
                        <div className="text-center">
                          <span className="font-medium">Quantity</span>
                        </div>
                        <div className="text-center">
                          <span className="font-medium">Apply condition</span>
                        </div>
                        <div className="text-center">
                          <span className="font-medium">Quanity tour</span>
                        </div>
                        <div className="text-center">
                          <span className="font-medium"> Expired</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {filterVouchers?.length > 0 ? (
                    Array.isArray(filterVouchers) &&
                    filterVouchers?.map((dataVoucher: any, index: number) => (
                      <>
                        <div
                          key={index}
                          className="shadow-custom-card-mui bg-white rounded-lg relative"
                        >
                          <div className=" px-4 py-6  mb-2  relative ">
                            {!expandedItems[index] ? (
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
                            )}
                            <div className="grid grid-cols-12 gap-3 ">
                              <div className="col-span-3 flex items-center ">
                                <div className="">
                                  <span className="font-medium">
                                    {dataVoucher?.name}
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-9">
                                <div className="grid grid-cols-5">
                                  <div className=" flex items-center justify-center  ">
                                    <div className="flex gap-1">
                                      <span>
                                        {dataVoucher?.discount_type ===
                                        "PERCENT"
                                          ? `${dataVoucher?.discount} %`
                                          : dataVoucher?.discount_type ===
                                            "AMOUNT"
                                          ? `${formatNumber(
                                              parseInt(dataVoucher?.discount)
                                            )}`
                                          : ""}
                                      </span>
                                    </div>
                                  </div>
                                  <div className=" flex items-center justify-center">
                                    <div className="flex flex-wrap gap-3">
                                      <span>{dataVoucher?.quantity}</span>
                                    </div>
                                  </div>
                                  <div className=" flex items-center justify-center">
                                    <div className="flex flex-wrap gap-3">
                                      <span>
                                        {formatNumber(
                                          dataVoucher?.apply_condition
                                            ?.minimum_price
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                  <div className=" flex items-center justify-center">
                                    <div className="flex flex-wrap gap-3">
                                      <span>{dataVoucher?.tours?.length}</span>
                                    </div>
                                  </div>
                                  <div className=" flex items-center justify-center">
                                    <div>
                                      {dayjs(dataVoucher?.expired_date).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {expandedItems[index] && (
                            <Fade in={expandedItems[index]} timeout={700}>
                              <div>
                                {dataVoucher?.tours?.length > 0 && (
                                  <hr className="mb-4" />
                                )}
                                {
                                  // dataVoucher?.tours?.length > 0 ? (
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
                                            <p className="">
                                              {voucherTour?.name}
                                            </p>
                                            <p className="text-gray-500">
                                              {voucherTour?.address_district},{" "}
                                              {voucherTour?.address_province},{" "}
                                              {voucherTour?.address_country}
                                            </p>
                                          </div>
                                        </div>

                                        {index <
                                          dataVoucher?.tours?.length - 1 && (
                                          <hr className="mt-4" />
                                        )}
                                      </div>
                                    )
                                  )
                                  // ) : (

                                  // )
                                }
                                <hr className="mb-4" />
                                <div className="flex items-center justify-center pb-6 pt-2 ">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleApplyVoucher(dataVoucher)
                                    }
                                    className="bg-main p-1 rounded-lg shadow-custom-card-mui border border-gray-300 border-solid font-medium"
                                  >
                                    Apply voucher for more tour
                                  </button>
                                </div>
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
      )}
    </>
  );
}

export default Voucher;
