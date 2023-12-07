import Navbar from "../../components/Navbar/Index";
import logo from "../../../src/assets/File-logo-Zest-Travel.svg";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getWalletTransactionMe } from "../../store/redux/silce/authSilce";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";
import WalletWithraw from "./WalletWithraw";
import dayjs from "dayjs";
import { StatusWithDrawTransaction } from "../../styles/status/withdrawTransaction";
import { Input, Select } from "antd";

const { Search } = Input;

function Wallet() {
  const dispatch: AppDispatch = useDispatch();
  const { wallet, walletTransaction } = useSelector((state: any) => state.auth);
  const [walletHistories, setWalletHistories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModalWalletWithRaw = () => {
    setOpenModal(true);
  };
  const handleChangeFilterStatus = (value: string) => {
    if (value === "") {
      setWalletHistories(walletTransaction);
    } else {
      const filteredData = walletTransaction?.filter(
        (item: { status: string }) => item.status === value
      );
      setWalletHistories(filteredData);
    }
  };
  const handleSearch = () => {
    if (searchTerm.length > 0) {
      const filteredData = walletTransaction.filter((item: any) => {
        const statusMatch = item.status
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const amountMatch = item.amount.includes(searchTerm);
        const bankNameMatch = item.metadata.bankName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const bankNumberMatch = item.metadata.bankAccountNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        console.log(item);
        return statusMatch || amountMatch || bankNameMatch || bankNumberMatch;
      });

      setWalletHistories(filteredData);
    } else {
      setWalletHistories(walletTransaction);
    }
  };
  console.log(walletTransaction);
  useEffect(() => {
    dispatch(getWalletTransactionMe());
  }, [dispatch]);
  useEffect(() => {
    setWalletHistories(walletTransaction);
  }, [walletTransaction]);
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
              <Search
                type="text"
                defaultValue={searchTerm}
                placeholder="input search text"
                onSearch={handleSearch}
                style={{ width: 200 }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div>
                <Select
                  defaultValue=""
                  onChange={handleChangeFilterStatus}
                  style={{ width: 120 }}
                  allowClear
                  options={[
                    { value: "", label: "Filter" },
                    { value: "ACCEPTED", label: "Accepted" },
                    { value: "REJECT", label: "Reject" },
                  ]}
                />
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
          <div className="p-3 bg-white rounded-md shadow-custom-card-mui my-4">
            <div className="grid grid-cols-5">
              <div>
                <span className="font-medium">Date</span>
              </div>
              <div>
                <span className="font-medium">Bank Name</span>
              </div>
              <div>
                <span className="font-medium">Bank Number</span>
              </div>
              <div>
                <span className="font-medium">Amount</span>
              </div>
              <div>
                <span className="font-medium">Status</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {walletHistories?.map(
              (transaction: {
                updated_at: string;
                amount: string;
                status: string;
                metadata: { bankName: string; bankAccountNumber: string };
              }) => (
                <div className="px-3 py-5 grid grid-cols-5 bg-white rounded-md  shadow-custom-card-mui">
                  <div>
                    <span>
                      {dayjs(transaction?.updated_at).format("YYYY-MM-DD")}
                    </span>
                  </div>
                  <div>
                    <span>{transaction?.metadata?.bankName}</span>
                  </div>
                  <div>
                    <span>{transaction?.metadata?.bankAccountNumber}</span>
                  </div>
                  <div>
                    <span>{formatNumber(parseInt(transaction?.amount))}</span>
                  </div>
                  <div>
                    <button>
                      <StatusWithDrawTransaction>
                        {transaction?.status}
                      </StatusWithDrawTransaction>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

Wallet.propTypes = {};

export default Wallet;
