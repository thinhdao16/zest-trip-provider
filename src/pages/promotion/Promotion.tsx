import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io";
import { DataPromotionChoose, dataPromotionChoose } from "./data";
import { useNavigate } from "react-router-dom";
import { FaHouseMedical } from "react-icons/fa6";

function Promotion() {
  const navigate = useNavigate();
  const handleChooseTypePromotion = (data: DataPromotionChoose) => {
    localStorage.setItem("data_type_promotion", JSON.stringify(data));
    navigate("/promotion/plan");
  };
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg  px-8 py-11 relative">
        {/* Main Content */}

        <div
          className="flex gap-1 items-center absolute top-11 left-6"
          onClick={handleGoBack}
        >
          <FaHouseMedical />
          <span className="font-medium">Home</span>
        </div>

        <div className="flex justify-center">
          {" "}
          <div className="w-3/4">
            <div className="mb-8 flex items-center  justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-semibold ">
                  Choose your Promotion package
                </h1>
                <span className="text-gray-500">
                  When you want to get more attention from more people
                </span>
              </div>
            </div>
            <div className=" justify-center items-center flex ">
              <div className="w-96">
                {dataPromotionChoose?.map((promotion, indexPro: number) => (
                  <div
                    className="p-4 shadow-custom-0 rounded-xl pt-6"
                    key={indexPro}
                  >
                    <div className="flex flex-col h-44">
                      {promotion?.package.map((packagePro, indexPack) => (
                        <div key={indexPack}>
                          {packagePro?.titlePackAdd && (
                            <div className=" mb-4">
                              <span className="p-1 rounded-md border  border-solid bg-blue-600 border-blue-600 text-white  font-medium">
                                {" "}
                                {packagePro?.titlePackAdd}
                              </span>
                            </div>
                          )}

                          <div className=" mb-2">
                            <span className="p-1 rounded-md border border-blue-600 border-solid text-blue-600 font-medium">
                              {" "}
                              {packagePro?.titlePack}
                            </span>
                          </div>
                        </div>
                      ))}

                      <span className="font-medium text-2xl">
                        {promotion?.title}
                      </span>
                      {promotion?.titleInfo?.map((titleInfo, indexTitle) => (
                        <span key={indexTitle}>{titleInfo}</span>
                      ))}
                    </div>
                    <hr />
                    <div className="mt-4 flex flex-col gap-3 h-44">
                      {promotion?.desctiption?.map(
                        (descriptionPro, indexDes) => (
                          <div
                            className="flex items-center gap-1"
                            key={indexDes}
                          >
                            <IoMdCheckmark />
                            <span>{descriptionPro}</span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="h-28">
                      <button
                        type="button"
                        className="flex bg-navy-blue w-full rounded-xl p-2 text-center items-center justify-center text-white font-medium transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-10  duration-200"
                        onClick={() => handleChooseTypePromotion(promotion)}
                      >
                        Start
                      </button>
                      <div className="mt-4 flex">
                        <p className="text-xs text-gray-500 ">
                          <span className="text-xs text-gray-500 underline">
                            {promotion?.policy?.title}
                          </span>{" "}
                          {promotion?.policy?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>{" "}
        </div>
      </main>
    </>
  );
}

export default Promotion;
