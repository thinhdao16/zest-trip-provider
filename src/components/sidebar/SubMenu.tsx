import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

interface SubMenuItem {
  label: string;
  path: string;
}

interface MenuItem {
  label: string;
  path: string;
  icon?: IconDefinition;
  submenu: SubMenuItem[]; // Đảm bảo kiểu phù hợp với SubMenuItem[]
}

interface SubMenuProps {
  menu: MenuItem;
  props: {
    toggle: () => void;
  };
}

function SubMenu({ menu, props }: SubMenuProps) {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(pathname.includes(menu.path));

  const handleSubMenuClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className={``} key={menu.label}>
      <li
        key={menu.label}
        className={`link ${pathname.includes(menu.path) ? "active" : ""} `}
        onClick={handleSubMenuClick}
      >
        {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
        <p className="flex-1">{menu.label}</p>
        <FontAwesomeIcon
          icon={faAngleRight as IconDefinition}
          className={`${subMenuOpen ? "rotate-90" : ""} duration-200 w-4 h-4`}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex flex-col pl-[39px] text-[0.7rem] h-0 overflow-hidden"
      >
        {menu.submenu.map((sm) => (
          <li key={sm.label} onClick={props.toggle}>
            <NavLink to={`${menu.path}/${sm.path}`} className="link">
              {sm.label}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export default SubMenu;
