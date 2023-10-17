import React from "react";
import PropTypes from "prop-types";

function NavBar() {
  return (
    <div className="">
      <div className=" border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
        <div className="flex flex-col justify-center ">
          <p className="font-medium pl-5 pb-3">Information</p>
          <div className="h-[60vh] overflow-auto scrollbar-none gap-4 flex flex-col">
            <div className={`flex items-center font-medium pl-1 gap-4`}>
              <div className="w-1.5 h-7 rounded-full bg-navy-blue"></div>
              <p className="mr-4 font-medium text-navy-blue">1.</p>
              <span className="text-navy-blue">kjhgfdsa</span>
            </div>
          </div>
          <div className="flex w-64"></div>
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {};

export default NavBar;
