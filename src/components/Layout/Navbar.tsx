import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const renderMenuItems = (items: any) => {
  const currentPath = window.location.pathname;
  return items.map((item: any) =>
    item.children ? (
      <Menu.SubMenu
        key={item.key}
        title={item.label}
        icon={item.icon}
        className="active:bg-black"
      >
        {renderMenuItems(item.children)}
      </Menu.SubMenu>
    ) : item.type === "divider" ? (
      <Menu.Divider key={item.key} />
    ) : (
      <Menu.Item
        key={item.key}
        icon={item.icon}
        className={currentPath === `/${item.key}` ? "active-menu-item" : ""}
      >
        <Link to={`/${item.key}`}>{item.label}</Link>
      </Menu.Item>
    )
  );
};

const items = [
  {
    key: "",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
  },
  {
    key: "sub1",
    icon: <MailOutlined />,
    label: "Management tour",
    children: [
      {
        key: "listtour",
        label: "List of tour",
      },
      {
        key: "createtour",
        label: "Create tour",
      },
      {
        key: "ticket",
        label: "Ticket",
        children: [{ key: "ticket", label: "List" }],
      },
      {
        key: "availability",
        label: "Availability",
        children: [{ key: "availability", label: "List" }],
      },
    ],
  },
  {
    key: "sub2",
    icon: <AppstoreOutlined />,
    label: "Management booking",
    children: [
      { key: "review", label: "Review" },
      {
        key: "booking",
        label: "Booking",
        children: [{ key: "booking", label: "List" }],
      },
    ],
  },
  { type: "divider" },
  {
    key: "sub4",
    icon: <SettingOutlined />,
    label: "Marketing",
    children: [{ key: "voucher", label: "Voucher" }],
  },
  {
    key: "payment",
    icon: <AppstoreOutlined />,
    label: "Payment",
  },
];

const Navbar: React.FC = () => {
  const onClick = (e: any) => {
    console.log("click ", e);
  };

  // const allOpenKeys = items.reduce((keys, item:any) => {
  //   if (item.children) {
  //     keys.push(item.key);
  //     item.children.forEach((child:any) => {
  //       if (child.children) {
  //         keys.push(child.key);
  //       }
  //     });
  //   }
  //   return keys;
  // }, []);

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["dashboard"]}
      // defaultOpenKeys={allOpenKeys}
      mode="inline"
    >
      {renderMenuItems(items)}
    </Menu>
  );
};

export default Navbar;
