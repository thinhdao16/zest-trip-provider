import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWalletMe } from "../../store/redux/silce/authSilce";
import { useSelector } from "react-redux";
import { CiWallet } from "react-icons/ci";
import { formatNumber } from "../../utils/formatNumber";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { IoChevronDown, IoPersonOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

function Index(): JSX.Element {
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { wallet } = useSelector((state: any) => state.auth);
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);

  const handleLogOut = () => {
    localStorage.clear();
    navigation("/login");
  };
  useEffect(() => {
    dispatch(getWalletMe());
  }, [dispatch]);
  const items: any = [
    {
      label: (
        <Link to="/account-settings">
          <div className="flex items-center gap-1">
            <IoPersonOutline />
            Profile
          </div>
        </Link>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <IoIosLogOut />
          Log out
        </div>
      ),
      key: "3",
      onClick: handleLogOut,
    },
  ];
  return (
    <>
      <header className="">
        <div className=" ">
          <div className=" bg-white flex w-full items-center px-8 py-2.5 shadow-custom-card-mui justify-end gap-3">
            <Link to="/payment/wallet">
              <div className="flex border border-solid border-gray-300 rounded-md px-2 py-1.5 items-center gap-1">
                <CiWallet />
                <span>{formatNumber(parseInt(wallet?.balance))}</span>
              </div>
            </Link>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()} className="flex">
                <Space>
                  <div className=" flex items-center gap-1 bg-black py-1.5 px-3 rounded-md text-white">
                    <img
                      className="rounded-full h-6 w-6 border cursor-pointer"
                      src={personalInfo?.avatar_image_url}
                      alt="Avatar"
                    />
                    <span>{personalInfo?.company_name}</span>

                    <IoChevronDown />
                  </div>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}

export default Index;
