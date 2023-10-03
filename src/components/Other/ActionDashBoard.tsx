import React from "react";
import PropTypes from "prop-types";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSliders } from "react-icons/fa6";

function ActionDashBoard() {
  return (
    <div className=" flex flex-wrap w-full justify-between items-center">
      <div className="flex flex-row ">
        <p className="flex-shrink-0 rounded-full block md:hidden border border-emerald-400 p-[3px] shadow-lg"></p>
        <div id="nameSection" className="relative">
          <AiOutlineSearch
            className="absolute top-3 left-6 text-slate-500"
            style={{ fontSize: "1.75rem" }}
          />
          <input
            type="search"
            placeholder="Search for you favorite destination"
            className="py-3 pr-3 pl-16 rounded-lg focus:outline-navy-blue"
          />
        </div>
      </div>
      <div className="avaterSection flex items-center gap-2 sm:gap-6 ">
        <div className="hidden md:flex flex-row gap-4 text-xl">
          <button className="p-3 rounded-lg bg-navy-blue text-white">
            <FaSliders />
          </button>
          <button className="py-3 px-8 rounded-lg bg-navy-blue text-white text-sm">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

ActionDashBoard.propTypes = {};

export default ActionDashBoard;
