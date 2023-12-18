import {
  MdDiscount,
  MdOutlineDescription,
  MdOutlineDiscount,
  MdProductionQuantityLimits,
  MdTitle,
} from "react-icons/md";
import { useVoucherContext } from "../Context/useVoucherContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/redux/store";
import { useEffect, useMemo, useState } from "react";
import { fetchTours } from "../../../../store/redux/silce/tourSlice";
import React from "react";
import { DataContext } from "../../../../store/dataContext/DataContext";
import { Skeleton } from "@mui/material";
import { GoDotFill } from "react-icons/go";
import { TourTag } from "../../../../components/icon/tour/tag";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Pagination } from "antd";
import { BsFiletypeAac } from "react-icons/bs";
import { ConstructionTitletext } from "../voucher-create/voucher-create-const/Construction";
import AutoResizableTextarea from "../voucher-create/voucher-create-const/AutoResizableTextarea";
import { VehicleTag } from "../../../../components/icon/tour/vehicle";
import { formatNumberWithCommas } from "../../../../utils/formatNumberFor";

function ScreenMain() {
  const dispatch: AppDispatch = useDispatch();

  const {
    createNameEdit,
    setCreateNameEdit,
    createDescriptionEdit,
    setCreateDescriptionEdit,
    createDiscountEdit,
    setCreateDiscountEdit,
    createDiscountTypeEdit,
    setCreateDiscountTypeEdit,
    createquantityEdit,
    setCreatequantityEdit,
    createApplyConditionEdit,
    setCreateApplyConditionEdit,
    createExpiredDateEdit,
    setCreateExpiredDateEdit,
    createTourIdEdit,
    setCreateTourIdEdit,
  } = useVoucherContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { refeshTour } = React.useContext(DataContext);
  const voucherView: any = useMemo(() => {
    const getVoucherDetail = localStorage.getItem("voucher_view");
    const parse = JSON.parse(getVoucherDetail || "{}"); // Provide a default empty object if null
    return parse;
  }, []);
  const { tours } = useSelector((state: any) => state.tour);
  const handleChange = (field: string, value: string) => {
    setCreateApplyConditionEdit((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const dataTours = tours?.tours;
  const countTours = tours?.total_count;
  React.useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
  }, [dispatch, refeshTour, currentPage, pageSize]);
  useEffect(() => {
    if (voucherView && voucherView.tours && voucherView.tours.length > 0) {
      const allTourIds = voucherView.tours.map(
        (tour: { id: string }) => tour.id
      );
      setCreateTourIdEdit(allTourIds);
    }
    if (voucherView && voucherView.id) {
      setCreateNameEdit(voucherView.name),
        setCreateDescriptionEdit(voucherView.description),
        setCreateDiscountEdit(voucherView.discount),
        setCreateDiscountTypeEdit(voucherView.discount_type),
        setCreatequantityEdit(voucherView.quantity),
        setCreateApplyConditionEdit("minimum_price"),
        setCreateApplyConditionEdit((prevState: any) => ({
          ...prevState,
          type: "minimum_price",
          value: voucherView?.apply_condition?.minimum_price,
        }));
      setCreateExpiredDateEdit(voucherView.expired_date);
    }
  }, [
    setCreateApplyConditionEdit,
    setCreateDescriptionEdit,
    setCreateDiscountEdit,
    setCreateDiscountTypeEdit,
    setCreateExpiredDateEdit,
    setCreateNameEdit,
    setCreateTourIdEdit,
    setCreatequantityEdit,
    voucherView,
  ]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };
  const handleTourClick = (tourId: string) => {
    setCreateTourIdEdit((prevIds: string[]) => {
      const isTourSelected = prevIds.includes(tourId);
      return isTourSelected
        ? prevIds.filter((id) => id !== tourId)
        : [...prevIds, tourId];
    });
  };
  const tomorrow = dayjs().add(1, "day");
  return (
    <>
      <div
        className="bg-main rounded-xl p-4 h-full overflow-y-auto global-scrollbar"
        // onClick={handleDataChange}
      >
        <div className="flex justify-center">
          <div className="w-2/3  flex flex-col justify-center gap-1">
            <div className="text-2xl font-medium mb-2">
              Create voucher for tour or spent for tour future
            </div>
            <div>
              <ConstructionTitletext>Title </ConstructionTitletext>
              <div className="relative">
                <MdTitle className="absolute top-3 left-3 " />
                <input
                  className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                  defaultValue={createNameEdit}
                  onChange={(e) => setCreateNameEdit(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div>
              <ConstructionTitletext>Description </ConstructionTitletext>
              <div className="relative">
                <MdOutlineDescription className="absolute top-3 left-3 " />
                <AutoResizableTextarea
                  defaultValue={createDescriptionEdit}
                  onChange={(e: any) => setCreateDescriptionEdit(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ConstructionTitletext>Discount</ConstructionTitletext>
                <div className="relative">
                  <MdDiscount className="absolute top-3 left-3 " />
                  <input
                    className="border border-gray-300 rounded-lg py-2 pl-8 w-full"
                    value={formatNumberWithCommas(createDiscountEdit)}
                    type="text"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const newValue = e.target.value.replace(/,/g, "");

                      if (
                        createDiscountTypeEdit === "PERCENT" &&
                        parseInt(newValue, 10) > 100
                      ) {
                        setCreateDiscountEdit("100");
                      } else {
                        setCreateDiscountEdit(inputValue);
                      }
                    }}
                  />
                </div>
              </div>{" "}
              <div>
                <ConstructionTitletext>Discount Type</ConstructionTitletext>
                <div className=" relative">
                  <MdOutlineDiscount className="absolute top-3 left-3 " />

                  <select
                    value={createDiscountTypeEdit}
                    onChange={(e) => setCreateDiscountTypeEdit(e.target.value)}
                    className="rounded-lg py-2 px-8 bg-white border border-gray-300  border-solid w-full shadow-custom-card-mui"
                  >
                    <option value=""> </option>
                    <option value="PERCENT">Percent</option>
                    <option value="AMOUNT">Amount</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ConstructionTitletext>Quantity</ConstructionTitletext>
                <div className="relative">
                  <MdProductionQuantityLimits className="absolute top-3 left-3 " />
                  <input
                    className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                    defaultValue={createquantityEdit}
                    onChange={(e) => setCreatequantityEdit(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <ConstructionTitletext>Expired date</ConstructionTitletext>
                <div className="create-tour-valid-date">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "DatePicker",
                        "DateTimePicker",
                        "DateRangePicker",
                      ]}
                    >
                      <DemoItem>
                        <DatePicker
                          value={dayjs(createExpiredDateEdit)}
                          minDate={tomorrow}
                          onChange={(e) =>
                            setCreateExpiredDateEdit(
                              dayjs(e).format("YYYY-MM-DD")
                            )
                          }
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div>
              <ConstructionTitletext>Apply Condition</ConstructionTitletext>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex gap-1 items-center">
                  <span className="font-medium text-gray-500">Type:</span>
                  <div className="relative">
                    <BsFiletypeAac className="absolute top-3 left-3" />

                    <select
                      value={createApplyConditionEdit.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                      className=" rounded-lg py-2 px-8 bg-white border border-gray-300 border-solid w-full shadow-custom-card-mui"
                    >
                      <option value="">Choose type</option>
                      <option value="minimum_price">Minimum price</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="font-medium text-gray-500">Value:</span>
                  <div className="relative">
                    <MdTitle className="absolute top-3 left-3 " />
                    <input
                      className="border border-gray-300 rounded-lg py-2 pl-8 w-full"
                      value={formatNumberWithCommas(
                        createApplyConditionEdit.value
                      )}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/,/g, "");
                        handleChange("value", newValue);
                      }}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <span className="font-medium">Tour for voucher(optional)</span>
              <div className="flex flex-col gap-4">
                {dataTours?.length > 0 ? (
                  Array?.isArray(dataTours) &&
                  [...dataTours]
                    .sort((a, b) => {
                      return (
                        new Date(b?.updated_at).getTime() -
                        new Date(a?.updated_at).getTime()
                      );
                    })
                    .map((data: any, index: number) => (
                      <div
                        key={index}
                        className={`shadow-custom-card-mui rounded-lg border  border-solid ${
                          Array.isArray(createTourIdEdit) &&
                          createTourIdEdit.includes(data?.id)
                            ? " bg-gray-100 border-gray-500"
                            : "bg-white border-white" // Thêm border cho tour được chọn
                        }`}
                        onClick={() => handleTourClick(data.id)}
                      >
                        <div className=" grid grid-cols-12 p-4 gap-3 ">
                          <div className="col-span-1">
                            <img
                              style={{
                                width: "55px",
                                borderRadius: "5px",
                                objectFit: "cover",
                                height: "55px",
                              }}
                              src={data?.tour_images[0]}
                              alt="nothing"
                            />
                          </div>

                          <div className="col-span-9 grid gap-2 ">
                            <div>
                              <p className="">{data.name}</p>
                            </div>

                            <div className="flex items-center flex-wrap gap-3 text-sm">
                              {data?.tag_id?.map(
                                (dataTag: { name: string }, index: string) => (
                                  <button
                                    key={index}
                                    className=" border px-1 rounded-md shadow-custom-card-mui text-navy-blue hover:text-black   flex items-center gap-1"
                                  >
                                    <TourTag
                                      field={dataTag?.name}
                                      style="w-4 h-4"
                                    />
                                    <p>{dataTag?.name}</p>
                                  </button>
                                )
                              )}
                              <span className="w-0.5 h-5 bg-gray-300 rounded-full"></span>
                              {data?.vehicle_id?.map(
                                (
                                  dataVehicle: { name: string },
                                  index: string
                                ) => (
                                  <button
                                    key={index}
                                    className=" border px-1 rounded-md shadow-custom-card-mui text-navy-blue hover:text-black  flex items-center gap-1"
                                  >
                                    <VehicleTag
                                      field={dataVehicle?.name}
                                      style="w-4 h-4"
                                    />
                                    <p>{dataVehicle?.name}</p>
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex gap-2 justify-between">
                              <div>
                                <button
                                  type="button"
                                  className={`text-sm flex gap-1 items-center p-1 rounded-md ${
                                    data?.status === "PUBLISHED"
                                      ? "bg-navy-blue-opacity-5 text-navy-blue" // Màu xanh cho Published
                                      : data?.status === "HIDDEN"
                                      ? "bg-red-300 text-red-900" // Màu đỏ cho Hidden
                                      : data?.status === "DRAFT"
                                      ? "bg-yellow-300 text-yellow-900" // Màu vàng cho Draft
                                      : ""
                                  }`}
                                >
                                  <GoDotFill />
                                  {data?.status}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <>
                    <div></div>
                    <div>
                      <p
                        style={{
                          color: "#091f44",
                          fontSize: "24px",
                          lineHeight: "1.5",
                          margin: "8px 0 16px 0",
                        }}
                      >
                        <Skeleton width={200} className="rounded-2xl" />
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: 300,
                        opacity: "0.8",
                        paddingBottom: "8px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={50}
                        animation="wave"
                        className="rounded-lg"
                      />
                    </p>
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 300,
                        }}
                      >
                        <Skeleton width={60} className="rounded-3xl" />
                      </p>
                    </div>
                  </>
                )}
                <div className="flex justify-center">
                  {dataTours?.length > 0 && (
                    <Pagination
                      current={currentPage}
                      total={countTours}
                      pageSize={pageSize}
                      pageSizeOptions={[5, 10, 20, 30, 40]}
                      showSizeChanger
                      onChange={handlePageChange}
                      onShowSizeChange={(current, size) =>
                        handlePageSizeChange(current, size)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScreenMain;
