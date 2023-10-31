import { useContext } from "react";
import { EditContext, EditContextType } from "./EditContext";

export const useEditContext = (): EditContextType => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};
