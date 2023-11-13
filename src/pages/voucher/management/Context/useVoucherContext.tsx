import { useContext } from "react";
import { VoucherContext, VoucherContextType } from "./VoucherContext";

export const useVoucherContext = (): VoucherContextType => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};
