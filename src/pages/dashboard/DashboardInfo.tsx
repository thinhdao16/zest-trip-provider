import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { getAllTours } from "../../store/redux/silce/tourSlice";
import { getProviderTourBoost } from "../../store/redux/silce/promotion";
import "dayjs/locale/en";
import dayjs from "dayjs";
import LoadingFullScreen from "../../styles/loading/LoadingFullScreen";
import SliceEmailToName from "../../utils/SliceEmailToName";
import { Dropdown, Space } from "antd";
import { IoChevronDown, IoPersonOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
function DashboardInfo() {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigate();
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  const { allTours } = useSelector((state: any) => state.tour);
  const { providerTourBoost, loadingPromotion } = useSelector(
    (state: any) => state.promotion
  );

  const email = personalInfo?.email;

  const handleLogOut = () => {
    localStorage.clear();
    navigation("/login");
  };

  const filteredTours = allTours?.tours?.filter(
    (tour: { id: string; status: string }) => {
      const isDuplicate = providerTourBoost.includes(tour.id);
      return tour.status === "PUBLISHED" && isDuplicate;
    }
  );

  React.useEffect(() => {
    dispatch(getAllTours());
    dispatch(getProviderTourBoost());
  }, [dispatch]);

  const items: any = [
    {
      label: (
        <Link to="/account-settings">
          <div className="flex items-center gap-1">
            <IoPersonOutline />
            Profile
          </div>
        </Link>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <IoIosLogOut />
          Log out
        </div>
      ),
      key: "3",
      onClick: handleLogOut,
    },
  ];
  return (
    <>
      {loadingPromotion ? (
        <LoadingFullScreen loading={loadingPromotion} />
      ) : (
        <div className="px-4">
          <div className="grid gap-3">
            <div className="flex items-center justify-between pr-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    personalInfo?.avatar_image_url ||
                    "https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
                  }
                  alt="error"
                  className="object-cover w-14 h-14 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-lg">
                    {personalInfo?.company_name || (
                      <SliceEmailToName email={email} />
                    )}
                  </span>
                  {/* <div className="flex text-gray-500 gap-1 text-sm">
                    Provider <span className="text-navy-blue">Pro +</span>
                  </div> */}
                </div>
              </div>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()} className="flex">
                  <Space>
                    <IoChevronDown />
                  </Space>
                </a>
              </Dropdown>
            </div>

            <hr />
          </div>
          {/* <div className="mt-5">
    <p className="font-medium text-xl mb-4">Agenda</p>
    <div className="border border-solid border-gray-200 rounded-xl p-3">
      <div className="mb-3">
        <span className="text-gray-500 ">10 september 2023</span>
      </div>
      <div
        className="gap-2 grid   h-[20vh] overflow-y-scroll global-scrollbar "
        // style={{ height: "20vh ", overflow: "auto" }}
      >
        <div className="flex items-baseline gap-3">
          <div className="w-2.5 h-2.5 bg-navy-blue rounded-sm"></div>
          <div className="flex flex-col">
            <span className="font-medium">Call with tao</span>
            <span className="text-gray-500 text-sm">9:30</span>
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <div className="w-2.5 h-2.5 bg-navy-blue rounded-sm"></div>
          <div className="flex flex-col">
            <span className="font-medium">Call with tao</span>
            <span className="text-gray-500 text-sm">9:30</span>
          </div>
        </div>{" "}
        <div className="flex items-baseline gap-3">
          <div className="w-2.5 h-2.5 bg-navy-blue rounded-sm"></div>
          <div className="flex flex-col">
            <span className="font-medium">Call with tao</span>
            <span className="text-gray-500 text-sm">9:30</span>
          </div>
        </div>
      </div>
    </div>
  </div> */}
          <div className="mt-5">
            <p className="font-medium text-xl mb-4">Tour Promotion</p>
            <div
              className="grid gap-3 global-scrollbar"
              style={{ maxHeight: "70vh", overflow: "auto" }}
            >
              {filteredTours && filteredTours.length > 0 ? (
                filteredTours.map(
                  (
                    promotion: {
                      tour_images: string[];
                      address_district: string;
                      updated_at: string;
                    },
                    index: number
                  ) => (
                    <div
                      className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3"
                      key={index}
                    >
                      <img
                        src={promotion?.tour_images[0]}
                        alt="error"
                        className="object-cover w-16 h-16 rounded-xl"
                      />
                      <div className="flex flex-col justify-center py-2">
                        <span className="font-medium">
                          {promotion?.address_district}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {dayjs(promotion?.updated_at)
                            .locale("en")
                            .format("D MMMM YYYY")}
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="text-gray-700 flex items-center justify-center">
                  <span className=" bg-zinc-300 p-2 rounded-lg">
                    No promotion
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardInfo;
