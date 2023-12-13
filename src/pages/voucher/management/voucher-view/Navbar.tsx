import { useVoucherContext } from "../Context/useVoucherContext";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  MdDiscount,
  MdOutlineDescription,
  MdOutlineDiscount,
  MdProductionQuantityLimits,
  MdTitle,
} from "react-icons/md";
import { GoDiscussionOutdated } from "react-icons/go";
import { IoIosConstruct } from "react-icons/io";
import { LuConstruction } from "react-icons/lu";
import { AppDispatch } from "../../../../store/redux/store";
import { useDispatch } from "react-redux";
import {
  updateVoucher,
  updateVoucherMapTour,
} from "../../../../store/redux/silce/providerSlice";
import { useMemo } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const {
    createNameEdit,
    createDescriptionEdit,
    createDiscountEdit,
    createDiscountTypeEdit,
    createquantityEdit,
    createApplyConditionEdit,
    createExpiredDateEdit,
    createTourIdEdit,
  } = useVoucherContext();
  const dispatch: AppDispatch = useDispatch();
  const voucherView: any = useMemo(() => {
    const getVoucherDetail = localStorage.getItem("voucher_view");
    const parse = JSON.parse(getVoucherDetail || "{}"); // Provide a default empty object if null
    return parse;
  }, []);
  console.log(voucherView);
  const navigate = useNavigate();
  const handleCreateVoucher = () => {
    let tourIdPayload = {};

    if (createTourIdEdit && createTourIdEdit.length > 0) {
      tourIdPayload = { tour_id: createTourIdEdit };
    }
    const dataValueCreate = {
      id: voucherView?.id,
      name: createNameEdit,
      description: createDescriptionEdit,
      discount: parseInt(createDiscountEdit),
      discount_type: createDiscountTypeEdit,
      quantity: parseInt(createquantityEdit),
      apply_condition: {
        minimum_price: parseInt(createApplyConditionEdit?.value),
      },
      expired_date: createExpiredDateEdit,

      ...tourIdPayload,
    };
    const dataUpdateMapTour = {
      voucher_id: voucherView?.id,
      ...tourIdPayload,
    };
    dispatch(updateVoucher(dataValueCreate));
    dispatch(updateVoucherMapTour(dataUpdateMapTour)).then((response) => {
      if (updateVoucherMapTour.fulfilled.match(response)) {
        message.success("Add tour successfully");
        navigate("/voucher");
      }
    });
  };

  return (
    <div className="">
      <div className=" border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
        <div className="flex flex-col justify-center ">
          <div className="h-[75vh] overflow-auto scrollbar-none gap-10 flex flex-col pt-2">
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createNameEdit.length === 0 ? "text-gray-500" : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createNameEdit.length === 0 ? "bg-gray-500" : "bg-navy-blue"
                }`}
              ></div>
              <MdTitle
                className={` ${
                  createNameEdit.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Name</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createDescriptionEdit?.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createDescriptionEdit?.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <MdOutlineDescription
                className={` ${
                  createDescriptionEdit?.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Description</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createDiscountEdit.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createDiscountEdit.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <MdDiscount
                className={` ${
                  createDiscountEdit.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Discount</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createDiscountTypeEdit === undefined
                  ? //  ||
                    // createDiscountType?.length === 0
                    "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createDiscountTypeEdit === undefined
                    ? //  ||
                      // createDiscountType?.length === 0
                      "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <MdOutlineDiscount
                className={` ${
                  createDiscountTypeEdit === undefined
                    ? // ||
                      // createDiscountType?.length === 0
                      "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Discount Type</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createquantityEdit.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createquantityEdit.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <MdProductionQuantityLimits
                className={` ${
                  createquantityEdit.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Quantity</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createExpiredDateEdit?.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createExpiredDateEdit?.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <GoDiscussionOutdated
                className={` ${
                  createExpiredDateEdit?.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Expired date</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createApplyConditionEdit?.type?.length === 0 ||
                createApplyConditionEdit?.value?.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createApplyConditionEdit?.type?.length === 0 ||
                  createApplyConditionEdit?.value?.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <IoIosConstruct
                className={` ${
                  createApplyConditionEdit?.type?.length === 0 ||
                  createApplyConditionEdit?.value?.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Apply Condition</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createTourIdEdit.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createTourIdEdit.length === 0 ? "bg-gray-500" : "bg-navy-blue"
                }`}
              ></div>
              <LuConstruction
                className={` ${
                  createTourIdEdit.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Tour for voucher</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>
          </div>
          <div className="flex w-64 items-center  justify-center">
            <button
              type="button"
              className="bg-navy-blue text-white p-2 rounded-lg"
              onClick={handleCreateVoucher}
            >
              Save change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {};

export default NavBar;
