import { faLeaf, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import initMenus from "../../data/menus.ts";
import "./sidebar.css";
import SidebarLogo from "./SidebarLogo.jsx";
import SidebarSearch from "./SidebarSearch.jsx";
import MenuList from "./MenuList.js";
import { useNavigate } from "react-router-dom";

function Sidebar({ ...props }) {
  const navigate = useNavigate();
  const [menus, setMenus] = useState(initMenus);
  const [scButton, setScButton] = useState(false);
  const search: React.MutableRefObject<HTMLInputElement | string> = useRef("");

  const handleChange = (e: { target: { value: string } }) => {
    if (e.target.value) {
      setScButton(true);
      setMenus(
        menus.filter((el: any) => {
          return el.label.toLowerCase().includes(e.target.value.toLowerCase());
        })
      );
    } else {
      setScButton(false);
      setMenus(initMenus);
    }
  };

  const clearSearch = () => {
    if (typeof search.current === "string") {
      // Xử lý nếu search.current là kiểu string
      // (ví dụ: search.current là chuỗi)
      search.current = "";
    } else {
      // Xử lý nếu search.current là kiểu HTMLInputElement
      // (ví dụ: search.current là một phần tử input)
      search.current.value = "";
    }
    setMenus(initMenus);
    setScButton(false);
  };

  const logout = () => {
    navigate("/auth/login");
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className}`}
      >
        {/* Sidebar wrapper */}
        <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
          {/* Logo */}
          <SidebarLogo toggle={props.toggle} icon={faLeaf} text="Laravel" />

          {/* Search Menu */}
          {/* <SidebarSearch
            clearSearch={clearSearch}
            handleChange={handleChange}
            scButton={scButton}
            search={search}
          /> */}

          {/* Menu */}
          <MenuList menus={menus} toggle={props.toggle} />

          {/* Profile */}
          <div className="pt-2 border-t border-gray-300">
            <div className="px-8 py-4">
              {/* Logout Button */}
              <button
                className=" py-3.5 px-5 font-medium text-navy-blue w-full rounded-xl flex items-center  border border-navy-blue gap-3 hover:bg-navy-blue hover:text-white"
                onClick={() => logout()}
              >
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {props.className === "mobile" && (
        <div
          id="overlaySidebar"
          onClick={props.toggle}
          className="hidden absolute w-full h-screen bg-black z-10 inset-0 opacity-60"
        >
          <div></div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
