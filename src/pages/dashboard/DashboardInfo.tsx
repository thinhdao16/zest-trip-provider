import { AiOutlineDown } from "react-icons/ai";

function DashboardInfo() {
  return (
    <div className="px-4">
      <div className="grid gap-3">
        <div className="flex items-center justify-between pr-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-14 h-14 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-lg">thinhdao</span>
              <div className="flex text-gray-500 gap-1 text-sm">
                Provider <span className="text-navy-blue">Pro +</span>
              </div>
            </div>
          </div>
          <AiOutlineDown style={{ fontWeight: "800" }} />
        </div>
        <div className="text-gray-500 flex gap-1 text-sm">
          Please, Finish your profile !
          <p className="text-navy-blue">Edit now</p>
        </div>
        <hr />
      </div>
      <div className="mt-5">
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
      </div>
      <div className="mt-5">
        <p className="font-medium text-xl mb-4">Done Trip</p>
        <div
          className="grid gap-3 global-scrollbar"
          style={{ maxHeight: "30vh", overflow: "auto" }}
        >
          <div className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3 ">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col justify-center py-2">
              <span className="font-medium">Sai gon</span>
              <span className="text-gray-500 text-sm">
                {" "}
                08- 14 september 2023
              </span>
            </div>
          </div>
          <div className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3 ">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col justify-center py-2">
              <span className="font-medium">Sai gon</span>
              <span className="text-gray-500 text-sm">
                {" "}
                08- 14 september 2023
              </span>
            </div>
          </div>
          <div className="border border-solid border-gray-200 p-3 rounded-xl flex gap-3 ">
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
              alt="error"
              className="object-cover w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col justify-center py-2">
              <span className="font-medium">Sai gon</span>
              <span className="text-gray-500 text-sm">
                {" "}
                08- 14 september 2023
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
