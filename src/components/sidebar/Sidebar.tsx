import { faLeaf, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import initMenus from "../../data/menus.ts";
import "./sidebar.css";
import SidebarLogo from "./SidebarLogo.jsx";
import MenuList from "./MenuList.js";
import { useNavigate } from "react-router-dom";

function Sidebar({ ...props }) {
  const navigate = useNavigate();
  const [menus] = useState(initMenus);

  const logout = () => {
    navigate("/auth/login");
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className}`}
      >
        <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
          <SidebarLogo toggle={props.toggle} icon={faLeaf} text="Zest Travel" />
          <MenuList menus={menus} toggle={props.toggle} />
          <div className="pt-2 border-t border-gray-300">
            <div className="px-8 py-4">
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
          className="hidden absolute w-full h-screen xz-10 inset-0 opacity-60"
        >
          <div></div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
