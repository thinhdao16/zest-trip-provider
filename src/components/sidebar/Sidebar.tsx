import { faLeaf, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import initMenus from "../../data/menus.ts";
import "./sidebar.css";
import SidebarLogo from "./SidebarLogo.js";
import MenuList from "./MenuList";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../store/dataContext/DataContext.tsx";
import { AppDispatch } from "../../store/redux/store.ts";
import { useDispatch } from "react-redux";
import { getPersonalInfo } from "../../store/redux/silce/authSilce.ts";
import { MdOutlineWorkspacePremium } from "react-icons/md";

function Sidebar({ ...props }) {
  const navigation = useNavigate();
  const { setRefeshLogin } = useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();

  const [, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menus] = useState(initMenus);
  const handleLogout = () => {
    // setAnchorEl(null);
    // localStorage.clear();
    // setRefeshLogin((prev) => !prev);
    navigation("/promotion");
    // window.open("/promotion", "_blank");
  };
  useEffect(() => {
    dispatch(getPersonalInfo());
  }, [dispatch]);
  return (
    <>
      <aside
        id="sidebar"
        className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className} border-r-2 border-solid border-gray-200 mr-4`}
      >
        <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
          <SidebarLogo toggle={props.toggle} icon={faLeaf} text="Zest Travel" />
          <MenuList menus={menus} toggle={props.toggle} />
          <div className="pt-2 border-t border-gray-300">
            <div className="px-8 py-4">
              <button
                className=" py-2 px-2 font-medium text-white bg-navy-blue w-full rounded-xl flex items-center  border border-navy-blue gap-3 hover:bg-white hover:text-navy-blue"
                onClick={() => handleLogout()}
              >
                <MdOutlineWorkspacePremium className="w-4 h-4" /> Explore
                Promotions
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
