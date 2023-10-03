import { Link } from "react-router-dom";
import {
  faBars,
  faBell,
  faCog,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DashboardHeaderProps {
  user: {
    name: string;
  } | null;
  avatar: string;
  toggle: () => void;
}

function DashboardHeader({
  user,
  avatar,
  toggle,
}: DashboardHeaderProps): JSX.Element {
  const handleToggleClick = () => {
    toggle();
  };

  return (
    <div className=" flex flex-wrap w-full justify-between items-center">
      <div className="flex flex-row ">
        <p className="flex-shrink-0 rounded-full block md:hidden border border-emerald-400 p-[3px] shadow-lg"></p>
        <div id="nameSection">
          <h1 className="font-semibold  text-3xl text-black mb-1">
            {user?.name}
          </h1>
          <span className="text-gray-400">
            Welcome back and explore the world
          </span>
        </div>
      </div>
      <div className="avaterSection flex items-center gap-2 sm:gap-6 text-slate-400">
        <div className="hidden md:flex flex-row gap-4 text-xl">
          <Link to="/">
            <FontAwesomeIcon icon={faBell} />
          </Link>
        </div>
        <p
          className="cursor-pointer md:hidden text-2xl"
          onClick={handleToggleClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;
