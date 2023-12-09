import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import "./sidebar.css";
import SidebarLogo from "./SidebarLogo.js";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/redux/store.ts";
import { useDispatch } from "react-redux";
import { getPersonalInfo } from "../../store/redux/silce/authSilce.ts";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { DataContext } from "../../store/dataContext/DataContext.tsx";
import Navbar from "../Navbar/Navbar.tsx";

function Sidebar({ ...props }) {
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { setRefeshLogin } = React.useContext(DataContext);

  const handleLogout = () => {
    navigation("/promotion");
  };
  useEffect(() => {
    dispatch(getPersonalInfo())
      .then((action) => {
        if (getPersonalInfo.fulfilled.match(action)) {
          if (action?.payload?.status === "PROCESSING") {
            localStorage.clear();
            setRefeshLogin((prev) => !prev);
            navigation("/provider-processing");
          }
          setRefeshLogin((prev) => !prev);
        }
        if (getPersonalInfo.rejected.match(action)) {
          localStorage.clear();
          setRefeshLogin((prev) => !prev);
          navigation("/login");
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });
  }, [dispatch]);
  return (
    <>
      <aside
        id="sidebar"
        className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className} border-r-2 border-solid border-gray-200 mr-4`}
      >
        <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
          <SidebarLogo toggle={props.toggle} icon={faLeaf} text="Zest Travel" />
          <div className="navWrapper ">
            <Navbar />
          </div>
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
