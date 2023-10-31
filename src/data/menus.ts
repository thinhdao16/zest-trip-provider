import { faPage4 } from "@fortawesome/free-brands-svg-icons";
import { faTachometer, faLock } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface MenuItem {
  label: string;
  path?: string;
  icon?: IconDefinition;
  name?: string; // Thêm thuộc tính 'name' nếu bạn cần nó
}

const initMenu: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
    name: "Dashboard", // Thêm 'name' cho mục này
  },
  {
    label: "Halaman",
  },
  // {
  //   label: "Blank",
  //   path: "/blank",
  //   icon: faPage4,
  //   name: "Blank",
  // },
  {
    label: "Listtour",
    path: "/listtour",
    icon: faPage4,
    name: "Listtour", // Thêm 'name' cho mục này
  },
  {
    label: "Review",
    path: "/review",
    icon: faPage4,
    name: "Listtour", // Thêm 'name' cho mục này
  },
  {
    label: "Create Tour",
    path: "/createtour",
    icon: faPage4,
    name: "Create Tour", // Thêm 'name' cho mục này
  },
  {
    label: "Booker",
    path: "/booker",
    icon: faPage4,
    name: "Booker", // Thêm 'name' cho mục này
  },
  {
    label: "Otentikasi",
  },
  // {
  //   label: "Login",
  //   path: "/auth/login",
  //   icon: faLock,
  //   name: "Login",
  // },
];

export default initMenu;
