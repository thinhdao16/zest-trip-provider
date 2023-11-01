import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineDown,
} from "react-icons/ai";
function DashBoardOverview() {
  return (
    <div className="grid gap-4">
      <p className="text-xl font-medium check">Overview</p>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white shadow-custom-card-mui rounded-xl">
            <div className="flex justify-between">
              <p className="text-gray-500 ">Clients</p>
              <p className="text-green-700 font-medium">+ 14.2%</p>
            </div>
            <div className="flex justify-between items-center my-3">
              <p className="text-3xl text-navy-blue">1236</p>
              <AiOutlineArrowUp className="text-3xl text-green-700" />
            </div>
          </div>
          <div className="p-3 bg-white shadow-custom-card-mui rounded-xl">
            <div className="flex justify-between">
              <p className="text-gray-500 ">Clients</p>
              <p className="text-red-700 font-medium">+ 14.2%</p>
            </div>
            <div className="flex justify-between items-center my-3">
              <p className="text-3xl text-navy-blue">1236</p>
              <AiOutlineArrowDown className="text-3xl text-red-700" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 bg-white rounded-xl shadow-custom-card-mui">
        <p className="text-gray-500">Operator's rating</p>
        <div className="pr-6 h-[43vh] overflow-y-scroll global-scrollbar">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg"
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div className="flex flex-col p-3">
                <p className="font-medium">Thinhdao</p>
                <p className="text-gray-500 text-sm">
                  To fix this issue, we need
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-navy-blue font-medium ">82.4%</p>
              <AiOutlineDown className="ml-3 text-navy-blue font-medium" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg"
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div className="flex flex-col p-3">
                <p className="font-medium">Thinhdao</p>
                <p className="text-gray-500 text-sm">
                  To fix this issue, we need
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-navy-blue font-medium ">82.4%</p>
              <AiOutlineDown className="ml-3 text-navy-blue font-medium" />
            </div>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg"
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div className="flex flex-col p-3">
                <p className="font-medium">Thinhdao</p>
                <p className="text-gray-500 text-sm">
                  To fix this issue, we need
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-navy-blue font-medium ">82.4%</p>
              <AiOutlineDown className="ml-3 text-navy-blue font-medium" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg"
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div className="flex flex-col p-3">
                <p className="font-medium">Thinhdao</p>
                <p className="text-gray-500 text-sm">
                  To fix this issue, we need
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-navy-blue font-medium ">82.4%</p>
              <AiOutlineDown className="ml-3 text-navy-blue font-medium" />
            </div>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg"
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div className="flex flex-col p-3">
                <p className="font-medium">Thinhdao</p>
                <p className="text-gray-500 text-sm">
                  To fix this issue, we need
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-navy-blue font-medium ">82.4%</p>
              <AiOutlineDown className="ml-3 text-navy-blue font-medium" />
            </div>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg"
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div className="flex flex-col p-3">
                <p className="font-medium">Thinhdao</p>
                <p className="text-gray-500 text-sm">
                  To fix this issue, we need
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-navy-blue font-medium ">82.4%</p>
              <AiOutlineDown className="ml-3 text-navy-blue font-medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardOverview;
