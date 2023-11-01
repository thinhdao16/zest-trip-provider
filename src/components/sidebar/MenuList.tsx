import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";

interface MenuListProps {
  menus: any; // Đảm bảo rằng mỗi phần tử có thuộc tính path
  toggle: () => void;
}

function MenuList({ menus, ...props }: MenuListProps): JSX.Element {
  return (
    <div className="navWrapper px-0.5 py-4">
      <ul id="menu" className="">
        {menus?.map(
          (menu: any) =>
            menu.submenu ? (
              <SubMenu key={menu.label} menu={menu} props={props} />
            ) : (
              menu.path && (
                <li key={menu.label} className="my-1" onClick={props.toggle}>
                  <div className="flex items-center">
                    <NavLink to={`${menu.path}`} className="link">
                      <div className="h-7 w-1.5 rounded-full"></div>
                      {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
                      {menu.label}
                    </NavLink>
                  </div>
                </li>
              )
            )
          // : (
          //   <li key={menu.label} className="mt-5 mb-3">
          //     <span className="text-gray-500 font-medium uppercase text-xs mx-2">
          //       {menu.label} {menu.role}
          //     </span>
          //   </li>
          // )
        )}
      </ul>
    </div>
  );
}

export default MenuList;
