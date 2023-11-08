import { faPage4 } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faList,
  faCommenting,
  faPlusSquare,
  faBookmark,
  faCalendar,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
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
    icon: faList,
    name: "Listtour", // Thêm 'name' cho mục này
  },
  {
    label: "Review",
    path: "/review",
    icon: faCommenting,
    name: "Listtour", // Thêm 'name' cho mục này
  },
  {
    label: "Create Tour",
    path: "/createtour",
    icon: faPlusSquare,
    name: "Create Tour", // Thêm 'name' cho mục này
  },
  {
    label: "Booker",
    path: "/booker",
    icon: faBookmark,
    name: "Booker", // Thêm 'name' cho mục này
  },
  {
    label: "Availability",
    path: "/availability",
    icon: faCalendar,
    name: "Availability",
  },
  {
    label: "Voucher",
    path: "/voucher",
    icon: faTicket,
    name: "Voucher",
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
