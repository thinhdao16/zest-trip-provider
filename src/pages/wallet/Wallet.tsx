import { RiSearchLine } from "react-icons/ri";
import Navbar from "../../components/Navbar/Index";
import { AiFillFilter } from "react-icons/ai";
import logo from "../../../src/assets/File-logo-Zest-Travel.svg";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getWalletMe } from "../../store/redux/silce/authSilce";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";
import WalletWithraw from "./WalletWithraw";
function Wallet() {
  const dispatch: AppDispatch = useDispatch();
  const { wallet } = useSelector((state: any) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModalWalletWithRaw = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    getWalletMe();
  }, [dispatch]);
  return (
    <div>
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        <div className="container mx-auto py-4 px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">Balances</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <RiSearchLine className="absolute top-2 left-2" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  className="border border-gray-300 pl-8 py-1 w-24 rounded-md"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="relative bg-white shadow-custom-card-mui border border-gray-300 pl-0 py-1 w-24 rounded-md"
                >
                  <AiFillFilter className="absolute top-2 left-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-white rounded-lg shadow-custom-card-mui flex justify-between">
            <div>
              <div className="flex items-center gap-1">
                <div className=" w-10 h-10 rounded-full bg-navy-blue-opacity-1 shadow-custom-card-mui">
                  <img src={logo} alt="" />
                </div>
                <span className="font-medium">Zest Travel Wallet Balance</span>
              </div>
              <div className="text-sm text-zinc-400 my-2">
                Avaliable balance
              </div>
              <div className="text-3xl font-semibold">
                {formatNumber(parseInt(wallet?.balance))}
              </div>
              <button
                className="px-2 py-1 border border-black rounded-lg text-black mb-3 mt-6"
                onClick={handleOpenModalWalletWithRaw}
              >
                Withdraw all
              </button>
              <WalletWithraw
                dataWallet={wallet}
                open={openModal}
                setOpen={setOpenModal}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Wallet.propTypes = {};

export default Wallet;
