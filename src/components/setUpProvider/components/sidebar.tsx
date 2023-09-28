import { Step, StepLabel, Stepper } from "@mui/material";
import "../styles/sidebar.css";

interface SidebarProps {
  currentStep: number;
  handleNextStep: (step: number) => void;
}
const steps = [
  {
    step: 1,
    title: "Company Information",
  },
  {
    step: 2,
    title: "Contact information",
  },
  {
    step: 3,
    title: "Review Information",
  },
  {
    step: 4,
    title: "Contractor Information",
  },
];

export const Sidebar = ({ currentStep, handleNextStep }: SidebarProps) => {
  return (
    <>
      <div>
        <div className="mb-3">
          <p className="font-semibold mb-4 text-4xl">
            Tell us more about yourself
          </p>
          <Stepper activeStep={currentStep - 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label?.step}>
                <StepLabel
                  onClick={() => handleNextStep(label.step)}
                  style={{
                    color: label.step === currentStep ? "red" : "black",
                  }}
                >
                  <p>{label?.title}</p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <hr />
      </div>
    </>
  );
};
