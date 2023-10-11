import React from "react";
import PropTypes from "prop-types";

function NavBar() {
  return (
    <div className="">
      <div className=" border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
        <div className="flex flex-col justify-center px-8 py-4">
          <p className="font-medium pl-5 pb-3">Information</p>
          <div className="h-[60vh] overflow-auto scrollbar-none gap-4 grid">
            <div
              className={`flex items-center justify-start font-base py-3.5 px-5 w-full rounded-xl border  relative `}
            >
              <p className="mr-4 font-medium">1.</p>
              kjhgfdsa
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
