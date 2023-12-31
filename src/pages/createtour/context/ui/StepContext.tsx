import React, { createContext, useState } from "react";

export type StepContextType = {
  currentStep: number;
  totalSteps: number;
  formValues: any[];
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateFormValues: (stepIndex: any, data: any) => void;
  isNextClicked: boolean;
  selectedCard: number;
  chooseStep: (step: number) => void;
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>; // Add the setSelectedCard type
  openSnackbar: any;
  setOpenSnackbar: any;
};

export const StepContext = createContext<StepContextType | undefined>(
  undefined
);

interface StepProviderProps {
  totalSteps: number;
  children: React.ReactNode;
}

export const StepProvider: React.FC<StepProviderProps> = ({
  totalSteps,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<any[]>([]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [selectedCard, setSelectedCard] = useState(-1);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const goToNextStep = () => {
    setIsNextClicked(true);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };
  const chooseStep = (step: number) => {
    setCurrentStep(step);
  };
  const updateFormValues = (stepIndex: any, data: any) => {
    setFormValues((prevFormValues) => {
      const updatedValues = [...prevFormValues];
      updatedValues[stepIndex] = data;
      return updatedValues;
    });
  };

  return (
    <StepContext.Provider
      value={{
        currentStep,
        totalSteps,
        formValues,
        goToNextStep,
        goToPreviousStep,
        updateFormValues,
        isNextClicked,
        selectedCard,
        setSelectedCard,
        chooseStep,
        openSnackbar,
        setOpenSnackbar,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
