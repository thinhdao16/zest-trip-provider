import { Link } from "react-router-dom";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import SliceEmailToName from "../../utils/SliceEmailToName";

interface DashboardHeaderProps {
  user: {
    name: string;
  } | null;
  avatar: string;
  toggle: () => void;
}

function DashboardHeader({ toggle }: DashboardHeaderProps): JSX.Element {
  const handleToggleClick = () => {
    toggle();
  };

  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  const email = personalInfo?.email;

  return (
    <div className=" flex flex-wrap w-full justify-between items-center">
      <div className="flex flex-row ">
        <div id="nameSection">
          <h1 className="font-semibold  text-3xl text-black mb-1">
            {personalInfo?.full_name || <SliceEmailToName email={email} />}
          </h1>
          <span className="text-gray-700 font-medium text-lg">
            Welcome back
          </span>
        </div>
      </div>
      <div className="avaterSection flex items-center gap-2 sm:gap-6 text-slate-400">
        <div className="hidden md:flex flex-row gap-4 text-xl">
          {/* <Link to="/">
            <FontAwesomeIcon icon={faBell} />
          </Link> */}
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
