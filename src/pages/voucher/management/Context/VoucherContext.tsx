import React, { createContext, useState } from "react";

export type VoucherContextType = {
  createName: any;
  setCreateName: any;
  createDescription: any;
  setCreateDescription: any;
  createDiscount: any;
  setCreateDiscount: any;
  createDiscountType: any;
  setCreateDiscountType: any;
  createquantity: any;
  setCreatequantity: any;
  createApplyCondition: any;
  setCreateApplyCondition: any;
  createExpiredDate: any;
  setCreateExpiredDate: any;
  createTourId: any;
  setCreateTourId: any;
  //edit
  createNameEdit: any;
  setCreateNameEdit: any;
  createDescriptionEdit: any;
  setCreateDescriptionEdit: any;
  createDiscountEdit: any;
  setCreateDiscountEdit: any;
  createDiscountTypeEdit: any;
  setCreateDiscountTypeEdit: any;
  createquantityEdit: any;
  setCreatequantityEdit: any;
  createApplyConditionEdit: any;
  setCreateApplyConditionEdit: any;
  createExpiredDateEdit: any;
  setCreateExpiredDateEdit: any;
  createTourIdEdit: any;
  setCreateTourIdEdit: any;
};

export const VoucherContext = createContext<VoucherContextType | undefined>(
  undefined
);

interface VoucherContextProps {
  children: React.ReactNode;
}

export const VoucherContextProvider: React.FC<VoucherContextProps> = ({
  children,
}) => {
  const [createName, setCreateName] = useState<any>("");
  const [createDescription, setCreateDescription] = useState<any>("");
  const [createDiscount, setCreateDiscount] = useState<any>("");
  const [createDiscountType, setCreateDiscountType] = useState<any>();
  const [createquantity, setCreatequantity] = useState<any>("");
  const [createApplyCondition, setCreateApplyCondition] = useState<any>({
    type: "",
    value: "",
  });
  const [createExpiredDate, setCreateExpiredDate] = useState<any>("");
  const [createTourId, setCreateTourId] = useState<string[]>([]);
  //edit
  const [createNameEdit, setCreateNameEdit] = useState<any>("");
  const [createDescriptionEdit, setCreateDescriptionEdit] = useState<any>("");
  const [createDiscountEdit, setCreateDiscountEdit] = useState<any>("");
  const [createDiscountTypeEdit, setCreateDiscountTypeEdit] = useState<any>();
  const [createquantityEdit, setCreatequantityEdit] = useState<any>("");
  const [createApplyConditionEdit, setCreateApplyConditionEdit] = useState<any>(
    {
      type: "",
      value: "",
    }
  );
  const [createExpiredDateEdit, setCreateExpiredDateEdit] = useState<any>("");
  const [createTourIdEdit, setCreateTourIdEdit] = useState<string[]>([]);

  return (
    <VoucherContext.Provider
      value={{
        createName,
        setCreateName,
        createDescription,
        setCreateDescription,
        createDiscount,
        setCreateDiscount,
        createDiscountType,
        setCreateDiscountType,
        createquantity,
        setCreatequantity,
        createApplyCondition,
        setCreateApplyCondition,
        createExpiredDate,
        setCreateExpiredDate,
        createTourId,
        setCreateTourId,
        //edit
        createNameEdit,
        setCreateNameEdit,
        createDescriptionEdit,
        setCreateDescriptionEdit,
        createDiscountEdit,
        setCreateDiscountEdit,
        createDiscountTypeEdit,
        setCreateDiscountTypeEdit,
        createquantityEdit,
        setCreatequantityEdit,
        createApplyConditionEdit,
        setCreateApplyConditionEdit,
        createExpiredDateEdit,
        setCreateExpiredDateEdit,
        createTourIdEdit,
        setCreateTourIdEdit,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};
