import { Button, Input, Modal, Popconfirm, Select, message } from "antd";
import list_bank from "./ListBank.json";
import { useContext, useState } from "react";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { postWithDraw } from "../../store/redux/silce/authSilce";
import { formatNumber } from "../../utils/formatNumber";
import { DataContext } from "../../store/dataContext/DataContext";

function WalletWithraw({
  dataWallet,
  open,
  setOpen,
}: {
  dataWallet: any;
  open: boolean;
  setOpen: any;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { setReload } = useContext(DataContext);
  const bank = list_bank?.data;
  const [bankName, setBankName] = useState<any>();
  const [bankAccountNumber, setBankAccountNumber] = useState<any>();
  const [bankAccountName, setBankAccountName] = useState<string>();
  const handleCloseModal = () => {
    setOpen(false);
  };
  console.log(dataWallet);
  const handleChange = (value: string) => {
    setBankName(value);
  };
  console.log(bankAccountNumber);
  const handleWithDraww = () => {
    if (
      bankName === undefined ||
      bankAccountNumber === 0 ||
      Number.isNaN(bankAccountNumber) ||
      bankAccountName?.length === 0 ||
      bankAccountName === undefined
    ) {
      message.error("cannot be left blank");
    } else {
      const data = {
        bankName: bankName?.label?.toString(),
        bankAccountNumber: bankAccountNumber?.toString(),
        bankAccountName: bankAccountName,
      };
      dispatch(postWithDraw(data)).then((response) => {
        if (postWithDraw.fulfilled.match(response)) {
          setOpen(false);
          setReload((prev: any) => !prev);
        }
      });
    }
  };
  const options = [
    // eslint-disable-next-line no-unsafe-optional-chaining
    ...bank?.map((item) => ({
      value: item?.id,
      label: item?.shortName,
      code: item?.code,
      name: item?.name,
      img: item?.logo,
    })),
  ];

  return (
    <Modal
      title="Withdraw Wallet"
      open={open}
      footer={null}
      onCancel={handleCloseModal}
    >
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-medium">Choose a bank</span>
          <Select
            showSearch
            className="w-full"
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option: any) =>
              (option?.label?.toLowerCase() ?? "").includes(
                input.toLowerCase()
              ) ||
              (option?.code?.toLowerCase() ?? "").includes(
                input.toLowerCase()
              ) ||
              (option?.name?.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={options}
            value={bankName}
            onChange={handleChange}
            labelInValue
            optionLabelProp="label"
          />
        </div>
        <div className="">
          <span className="font-medium">Bank account number</span>
          <Input
            type="number"
            defaultValue={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(parseInt(e.target.value))}
          />
        </div>
        <div>
          <span className="font-medium">Recipient's full name</span>
          <Input
            defaultValue={bankAccountName}
            onChange={(e) => setBankAccountName(e.target.value)}
          />
        </div>
        <div>
          <span className="font-medium">Amount of money</span>
          <div className="border border-solid border-gray-300 py-1.5 px-3 rounded-md bg-main">
            {formatNumber(parseInt(dataWallet?.balance))}
          </div>
        </div>
      </div>
      <Popconfirm
        title="Withdraw Bank"
        description="Are you sure to withdraw ?"
        onConfirm={handleWithDraww}
        okText="Yes"
        cancelText="No"
      >
        <Button className="block mt-4 bg-navy-blue text-white hover:bg-white">
          Withdraw All
        </Button>
      </Popconfirm>
    </Modal>
  );
}

WalletWithraw.propTypes = {};

export default WalletWithraw;
