import { Button, Input, Modal, Select } from "antd";
import list_bank from "./ListBank.json";
import { useState } from "react";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { postWithDraw } from "../../store/redux/silce/authSilce";

function WalletWithraw({
  dataWallet,
  open,
  setOpen,
}: {
  dataWallet: any;
  open: boolean;
  setOpen: any;
}) {
  console.log(dataWallet);
  const dispatch: AppDispatch = useDispatch();
  const bank = list_bank?.data;
  const [bankName, setBankName] = useState<any>();
  const [bankAccountNumber, setBankAccountNumber] = useState<any>();
  const [bankAccountName, setBankAccountName] = useState<string>();
  console.log(bankName);
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleChange = (value: string) => {
    setBankName(value);
  };
  const handleWithDraww = () => {
    const data = {
      bankName: bankName?.label.toString(),
      bankAccountNumber: bankAccountNumber.toString(),
      bankAccountName: bankAccountName,
    };
    dispatch(postWithDraw(data));
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
      </div>

      <Button className="block" onClick={handleWithDraww}>
        cancel
      </Button>
    </Modal>
  );
}

WalletWithraw.propTypes = {};

export default WalletWithraw;
