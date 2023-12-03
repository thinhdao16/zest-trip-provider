import { createContext, useState } from "react";

type RefeshLogin = boolean;
type RefeshTour = boolean;
type RefeshTourDetail = boolean;

interface AuthContextValue {
  refeshLogin: RefeshLogin | null;
  setRefeshLogin: React.Dispatch<React.SetStateAction<RefeshLogin | null>>;
  refeshTour: RefeshTour | null;
  setRefeshTour: React.Dispatch<React.SetStateAction<RefeshTour | null>>;
  refreshTourDetail: RefeshTourDetail | null;
  setRefreshTourDetail: React.Dispatch<
    React.SetStateAction<RefeshTourDetail | null>
  >;
  dataManyBookFake: any;
  setDataManyBookFake: any;
  voucherView: any;
  setVoucherView: any;
  loading: any;
  setLoading: any;
  dataTicketCreate: any;
  setDataTicketCreate: any;
}

export const DataContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [refeshLogin, setRefeshLogin] = useState<RefeshLogin | null>(null);
  const [refeshTour, setRefeshTour] = useState<RefeshTour | null>(null);
  const [refreshTourDetail, setRefreshTourDetail] =
    useState<RefeshTourDetail | null>(null);
  const [dataManyBookFake, setDataManyBookFake] = useState<any>();
  const [voucherView, setVoucherView] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataTicketCreate, setDataTicketCreate] = useState<any>([]);
  return (
    <DataContext.Provider
      value={{
        loading,
        setLoading,
        refeshLogin,
        setRefeshLogin,
        refeshTour,
        setRefeshTour,
        refreshTourDetail,
        setRefreshTourDetail,
        dataManyBookFake,
        setDataManyBookFake,
        voucherView,
        setVoucherView,
        dataTicketCreate,
        setDataTicketCreate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
