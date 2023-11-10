import { FcFactoryBreakdown } from "react-icons/fc";

function NavBar() {
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="">
      <div className=" border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
        <div className="flex flex-col justify-center ">
          <div className="h-[60vh] overflow-auto scrollbar-none gap-10 flex flex-col pt-6">
            <div
              className={`flex items-center font-medium pl-1 gap-7`}
              onClick={() => scrollToElement("booking")}
            >
              <div className="w-1.5 h-7 rounded-full bg-navy-blue"></div>
              <p className=" font-medium text-navy-blue">
                <FcFactoryBreakdown />
              </p>
              <span className="text-navy-blue">Booking</span>
            </div>
            <div
              className={`flex items-center font-medium pl-1 gap-7`}
              onClick={() => scrollToElement("revenue")}
            >
              <div className="w-1.5 h-7 rounded-full bg-navy-blue"></div>
              <p className=" font-medium text-navy-blue">
                <FcFactoryBreakdown />
              </p>
              <span className="text-navy-blue">Total revenue</span>
            </div>
            <div
              className={`flex items-center font-medium pl-1 gap-7`}
              onClick={() => scrollToElement("information_basic")}
            >
              <div className="w-1.5 h-7 rounded-full bg-navy-blue"></div>
              <p className=" font-medium text-navy-blue">
                <FcFactoryBreakdown />
              </p>
              <span className="text-navy-blue">Information basic</span>
            </div>
          </div>
          <div className="flex w-64 items-center  justify-center">
            <button
              type="button"
              className="bg-navy-blue text-white p-2 rounded-lg"
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
