import { useContext } from "react";
import { StepContext, StepContextType } from "./StepContext";

export const useStepContext = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};
