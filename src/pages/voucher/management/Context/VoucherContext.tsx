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
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};
