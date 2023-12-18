import { useMemo, useState } from "react";
import { DataPromotionChoose } from "../data";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { DataContext } from "../../../store/dataContext/DataContext";
import { fetchTours } from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import { Skeleton } from "@mui/material";
import { GoDotFill } from "react-icons/go";
import { TourTag } from "../../../components/icon/tour/tag";
import {
  boostTour,
  getProviderTourBoost,
} from "../../../store/redux/silce/promotion";
import LoadingFullScreen from "../../../styles/loading/LoadingFullScreen";
import { IoIosArrowBack } from "react-icons/io";
import { VehicleTag } from "../../../components/icon/tour/vehicle";
import { getBoostPrice } from "../../../store/redux/silce/authSilce";
import { formatNumber } from "../../../utils/formatNumber";

function PromotionPlan() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { boost } = useSelector(
    (state: { auth: { boost: number } }) => state.auth
  );
  const [createTourId, setCreateTourId] = useState<any>([]);
  const promotionType: DataPromotionChoose = useMemo(() => {
    const getPromotionDetail = localStorage.getItem("data_type_promotion");
    const parse = JSON.parse(getPromotionDetail || "{}");
    return parse;
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { refeshTour } = React.useContext(DataContext);
  const { tours } = useSelector((state: any) => state.tour);
  const { providerTourBoost, loadingPromotion } = useSelector(
    (state: any) => state.promotion
  );
  const [checkedTours, setCheckedTours] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectAll, setSelectAll] = useState(false);
  const dataTours = tours?.tours;
  const filteredTours = dataTours?.filter(
    (tour: { id: string; status: string }) => {
      const isDuplicate = providerTourBoost.includes(tour.id);
      return tour.status === "PUBLISHED" && !isDuplicate;
    }
  );

  const countTours = tours?.total_count;
  React.useEffect(() => {
    const pagination = { pageSize, currentPage };
    dispatch(fetchTours(pagination));
    dispatch(getProviderTourBoost());
    dispatch(getBoostPrice());
  }, [dispatch, refeshTour, currentPage, pageSize]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };

  const handleCheckboxChange = (tourId: string) => {
    setCheckedTours((prevCheckedTours) => {
      return { ...prevCheckedTours, [tourId]: !prevCheckedTours[tourId] };
    });
  };
  const handleTourClick = (tourId: string) => {
    if (promotionType.type === "many") {
      setCreateTourId((prevIds: string[]) => {
        const isTourSelected = prevIds.includes(tourId);
        const newCheckedTours = { ...checkedTours, [tourId]: !isTourSelected };

        setCheckedTours(newCheckedTours);

        return isTourSelected
          ? prevIds.filter((id: string) => id !== tourId)
          : [...prevIds, tourId];
      });
    } else {
      setCreateTourId([tourId]);
      setCheckedTours({ [tourId]: !checkedTours[tourId] });
    }
  };
  const handleSelectAll = () => {
    const updatedCheckedTours: { [key: string]: boolean } = {};
    const updatedCreateTourId: string[] = [];

    filteredTours?.forEach((data: any) => {
      updatedCheckedTours[data.id] = !selectAll;

      if (!selectAll) {
        updatedCreateTourId.push(data.id);
      }
    });

    setCheckedTours(updatedCheckedTours);

    if (!selectAll) {
      setCreateTourId(updatedCreateTourId);
    } else {
      setCreateTourId([]);
    }

    setSelectAll(!selectAll);
  };

  const handleChangePackage = () => {
    localStorage.removeItem("data_type_promotion");
    navigate("/promotion");
  };
  const handleBoostPromotion = () => {
    const data = {
      tour_ids: createTourId,
    };
    dispatch(boostTour(data));
  };
  const handleGoBack = () => {
    navigate("/promotion");
  };
  return (
    <>
      {loadingPromotion ? (
        <LoadingFullScreen loading={loadingPromotion} />
      ) : (
        <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg  px-8 py-11 relative">
          <div
            className="flex gap-1 items-center absolute top-11 left-6"
            onClick={handleGoBack}
          >
            <IoIosArrowBack />
            <span className="font-medium">Back</span>
          </div>
          {/* Main Content */}
          <div className="flex justify-center">
            {" "}
            <div className="w-1/2">
              <div className="mb-6">
                <div className="mb-4 flex items-center  justify-between">
                  <h1 className="text-2xl font-semibold ">You choose</h1>
                  <button type="button" onClick={() => handleChangePackage()}>
                    <span className="text-gray-500 underline">
                      Change package
                    </span>
                  </button>
                </div>
                <div className="shadow-custom-card-mui rounded-xl">
                  <div className="p-4 rounded-t-xl bg-navy-blue-opacity-5 flex flex-col gap-2">
                    <span className="font-medium">
                      Promotion {promotionType?.title}
                    </span>
                    <span className="text-xs">
                      {promotionType?.titleInfo[1]}
                    </span>
                  </div>
                  <div className="bg-white rounded-b-xl p-4">
                    <span className="text-xs">
                      Terms and conditions apply. Only for those who have not
                      tried the Premium package.
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h1 className="text-lg font-semibold ">Register</h1>
                  <span>Automatically renews monthly, cancel anytime.</span>
                </div>
                <div className="p-4 rounded-lg border border-solid border-gray-300 hover:shadow-custom-0">
                  <button
                    type="button"
                    className="bg-navy-blue-opacity-5 p-1 rounded-md text-navy-blue mb-4"
                  >
                    {promotionType?.package[0]?.titlePack}
                  </button>
                  <div>
                    <p className="font-medium mb-4">
                      Sign up with a credit card or wallet
                    </p>
                    <span>
                      {formatNumber(boost)}
                      {promotionType?.titleInfo[0]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center my-4">
                <button
                  type="button"
                  className={`font-medium px-4 py-2 rounded-lg ${
                    createTourId?.length > 0
                      ? `bg-navy-blue text-white`
                      : `bg-gray-300 cursor-not-allowed`
                  }  `}
                  onClick={() => handleBoostPromotion()}
                >
                  Boots now
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <span className="font-medium">Tour for boots(optional)</span>
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    id="selectAllCheckbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <label className="font-medium" htmlFor="selectAllCheckbox">
                    Select All
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  {filteredTours?.length > 0 ? (
                    Array?.isArray(filteredTours) &&
                    [...filteredTours]
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
                            createTourId?.includes(data.id)
                              ? " bg-zinc-100 border-gray-500"
                              : "bg-white border-white" // Thêm border cho tour được chọn
                          }`}
                          onClick={() => handleTourClick(data.id)}
                        >
                          <div className=" grid grid-cols-8 gap-3 p-4 ">
                            <div className="col-span-1 flex items-start gap-2">
                              {promotionType.type === "many" && (
                                <input
                                  type="checkbox"
                                  checked={checkedTours[data?.id] || false}
                                  onChange={() =>
                                    handleCheckboxChange(data?.id)
                                  }
                                />
                              )}
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

                            <div className="col-span-5 grid gap-2 ">
                              <div>
                                <p className="">{data.name}</p>
                              </div>

                              <div className="flex items-center flex-wrap gap-3 text-sm">
                                {data?.tag_id?.map(
                                  (
                                    dataTag: { name: string },
                                    index: string
                                  ) => (
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
                    {filteredTours?.length > 0 && (
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
            </div>{" "}
          </div>
        </main>
      )}
    </>
  );
}

export default PromotionPlan;
