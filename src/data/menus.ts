import {
  faTachometer,
  faList,
  faCommenting,
  faPlusSquare,
  faBookmark,
  faCalendar,
  faTicket,
  faCreditCard,
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
    label: "List of tour",
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
    label: "Booking",
    path: "/booking",
    icon: faBookmark,
    name: "Booking", // Thêm 'name' cho mục này
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
    label: "Payment",
    path: "/payment",
    icon: faCreditCard,
    name: "Payment",
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
