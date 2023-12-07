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
  return items.map((item: any, index: number) =>
    item.items ? (
      <Menu.SubMenu key={item.key || index} title={item.label} icon={item.icon}>
        {renderMenuItems(item.items)}
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
    items: [
      {
        key: "listtour",
        label: "List of tour",
      },
      {
        key: "createtour",
        label: "Create tour",
      },
      {
        key: "ticket management",
        label: "Ticket",
        items: [{ key: "ticket", label: "List" }],
      },
      {
        key: "availability management",
        label: "Availability",
        items: [{ key: "availability", label: "List" }],
      },
    ],
  },
  {
    key: "sub2",
    icon: <AppstoreOutlined />,
    label: "Management booking",
    items: [
      { key: "review", label: "Review" },
      {
        key: "booking management",
        label: "Booking",
        items: [
          { key: "booking", label: "List" },
          { key: "booking/all", label: "All" },
        ],
      },
    ],
  },
  { type: "divider" },
  {
    key: "sub4",
    icon: <SettingOutlined />,
    label: "Marketing",
    items: [{ key: "voucher", label: "Voucher" }],
  },
  {
    key: "financials",
    icon: <SettingOutlined />,
    label: "Financials",
    items: [
      { key: "payment", label: "Payment" },
      { key: "payment/wallet", label: "Wallet" },
    ],
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