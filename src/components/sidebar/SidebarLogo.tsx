import { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { HomeIcon } from "../../assets/component/logo-zest";
import "./sidebar.css";
interface SidebarLogoProps {
  icon: IconDefinition;
  text: string;
  toggle: () => void;
}

function SidebarLogo({ text, toggle }: SidebarLogoProps) {
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggle();
  };

  return (
    <div className="relative flex  flex-row font-medium text-3xl md:items-center md:mx-auto text-navy-blue mb-5 py-4 pr-4 justify-between">
      <Link to="/" className="flex items-center font-family-sidebar-headers">
        <HomeIcon className="w-14 h-14" />
        {text}
      </Link>
      <button
        onClick={handleButtonClick}
        className="border border-emerald-300 text-xl font-medium py-2 px-4 block md:hidden absolute right-1 top-3"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default SidebarLogo;
