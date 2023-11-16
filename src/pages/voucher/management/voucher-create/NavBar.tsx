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
import { createVoucher } from "../../../../store/redux/silce/providerSlice";
function NavBar() {
  const {
    createName,
    createDescription,
    createDiscount,
    createDiscountType,
    createquantity,
    createApplyCondition,
    createExpiredDate,
    createTourId,
  } = useVoucherContext();
  const dispatch: AppDispatch = useDispatch();
  // const dataValueCreate = {
  //   name: createName,
  //   description: createDescription,
  //   discount: parseInt(createDiscount),
  //   discount_type: createDiscountType,
  //   quantity: parseInt(createquantity),
  //   apply_condition: {
  //     type: createApplyCondition?.type,
  //     value: createApplyCondition?.value,
  //   },
  //   expired_date: createExpiredDate,
  // };
  const handleCreateVoucher = () => {
    let tourIdPayload = {};

    if (createTourId && createTourId.length > 0) {
      tourIdPayload = { tour_id: createTourId };
    }
    const dataValueCreate = {
      name: createName,
      description: createDescription,
      discount: parseInt(createDiscount),
      discount_type: createDiscountType,
      quantity: parseInt(createquantity),
      apply_condition: {
        type: createApplyCondition?.type,
        value: createApplyCondition?.value,
      },
      expired_date: createExpiredDate,

      ...tourIdPayload,
    };
    dispatch(createVoucher(dataValueCreate));
  };

  return (
    <div className="">
      <div className=" border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
        <div className="flex flex-col justify-center ">
          <div className="h-[75vh] overflow-auto scrollbar-none gap-10 flex flex-col pt-2">
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createName.length === 0 ? "text-gray-500" : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createName.length === 0 ? "bg-gray-500" : "bg-navy-blue"
                }`}
              ></div>
              <MdTitle
                className={` ${
                  createName.length === 0 ? "text-gray-500" : "text-navy-blue"
                }`}
              />
              <span className="">Name</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createDescription?.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createDescription.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <MdOutlineDescription
                className={` ${
                  createDescription.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Description</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createDiscount.length === 0 ? "text-gray-500" : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createDiscount.length === 0 ? "bg-gray-500" : "bg-navy-blue"
                }`}
              ></div>
              <MdDiscount
                className={` ${
                  createDiscount.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Discount</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createDiscountType === undefined
                  ? //  ||
                    // createDiscountType?.length === 0
                    "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createDiscountType === undefined
                    ? //  ||
                      // createDiscountType?.length === 0
                      "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <MdOutlineDiscount
                className={` ${
                  createDiscountType === undefined
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
                createquantity.length === 0 ? "text-gray-500" : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createquantity.length === 0 ? "bg-gray-500" : "bg-navy-blue"
                }`}
              ></div>
              <MdProductionQuantityLimits
                className={` ${
                  createquantity.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Quantity</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createExpiredDate.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createExpiredDate.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <GoDiscussionOutdated
                className={` ${
                  createExpiredDate.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Expired date</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>{" "}
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createApplyCondition?.type?.length === 0 ||
                createApplyCondition?.value?.length === 0
                  ? "text-gray-500"
                  : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createApplyCondition?.type?.length === 0 ||
                  createApplyCondition?.value?.length === 0
                    ? "bg-gray-500"
                    : "bg-navy-blue"
                }`}
              ></div>
              <IoIosConstruct
                className={` ${
                  createApplyCondition?.type?.length === 0 ||
                  createApplyCondition?.value?.length === 0
                    ? "text-gray-500"
                    : "text-navy-blue"
                }`}
              />
              <span className="">Apply Condition</span>
              <AiOutlineCheckCircle className="absolute top-2 right-5" />
            </div>
            <div
              className={`flex items-center font-medium pl-1 gap-7 relative  ${
                createTourId.length === 0 ? "text-gray-500" : "text-navy-blue"
              }`}
              // onClick={() => scrollToElement("information_basic")}
            >
              <div
                className={`w-1.5 h-7 rounded-full ${
                  createTourId.length === 0 ? "bg-gray-500" : "bg-navy-blue"
                }`}
              ></div>
              <LuConstruction
                className={` ${
                  createTourId.length === 0 ? "text-gray-500" : "text-navy-blue"
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
