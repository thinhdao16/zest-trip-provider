import { ChangeEvent, MouseEvent, RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTimes,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarSearchProps {
  scButton: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  search: RefObject<HTMLInputElement>;
}

function SidebarSearch({
  scButton,
  handleChange,
  clearSearch,
  search,
}: SidebarSearchProps) {
  const handleClearSearch = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    clearSearch();
  };

  return (
    <div className="px-4">
      <div className="w-full py-4 px-2 items-center flex relative">
        <input
          type="text"
          name=""
          placeholder="Cari Menu"
          id=""
          onChange={handleChange}
          ref={search}
          className="border rounded-full text-sm w-full px-3 py-2 focus:outline-none focus:border-green-300 bg-main"
        />

        {!scButton && (
          <FontAwesomeIcon
            className="absolute right-6 text-slate-500"
            icon={faMagnifyingGlass as IconDefinition}
          />
        )}

        {scButton && (
          <FontAwesomeIcon
            icon={faTimes as IconDefinition}
            className="absolute right-6 cursor-pointer text-slate-500"
            onClick={handleClearSearch}
          />
        )}
      </div>
    </div>
  );
}

export default SidebarSearch;
