import { useMemo } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { DataPromotionChoose } from "../data";

function PromotionPlan() {
  const promotionType: DataPromotionChoose = useMemo(() => {
    const getPromotionDetail = localStorage.getItem("data_type_promotion");
    const parse = JSON.parse(getPromotionDetail || "{}"); // Provide a default empty object if null
    return parse;
  }, []);
  console.log(promotionType);
  return (
    <>
      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg  px-8 py-11">
        {/* Main Content */}
        <div className="flex justify-center">
          {" "}
          <div className="w-1/3">
            <div className="mb-6">
              <div className="mb-4 flex items-center  justify-between">
                <h1 className="text-2xl font-semibold ">You choose</h1>
                <span className="text-gray-500 underline">Change package</span>
              </div>
              <div className="shadow-custom-card-mui rounded-xl">
                <div className="p-4 rounded-t-xl bg-navy-blue-opacity-5 flex flex-col gap-2">
                  <span className="font-medium">
                    Promotion {promotionType?.title}
                  </span>
                  <span className="text-xs">{promotionType?.titleInfo[1]}</span>
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
                  <span>{promotionType?.titleInfo[0]}</span>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </main>
    </>
  );
}

export default PromotionPlan;
