import { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
    <div className="relative flex flex-row font-semibokld text-3xl md:items-center md:mx-auto text-navy-blue mb-5 p-4 justify-between">
      <Link to="/" className="flex items-center">
        <img
          src="/src/assets/File-logo-Zest-Travel.svg"
          alt="error"
          className="w-14"
        />{" "}
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
