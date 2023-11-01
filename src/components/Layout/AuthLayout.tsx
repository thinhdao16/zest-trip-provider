import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { sidebarToggle } from "../../utils/toggler";
import BottomNavbar from "../BottomNavbar/Index";
import Sidebar from "../Sidebar/Sidebar.ts";

function AuthLayout(): JSX.Element {
  const isDesktop = (): boolean => document.body.clientWidth > 768;
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarStatus(isDesktop());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="adminLayout">
      {/* Sidebar */}
      <Sidebar
        toggle={sidebarToggle}
        className={sidebarStatus ? "" : "mobile"}
      />

      {/* Main Wrapper */}
      <div className="mainWrapper">
        <Outlet context={[sidebarToggle]} />
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}

export default AuthLayout;
