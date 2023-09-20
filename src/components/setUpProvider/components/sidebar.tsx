import { FaRegCircleDot } from "react-icons/fa6";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import "../styles/sidebar.css";
import { SiInstapaper } from "react-icons/si";
import { AiOutlineRight } from "react-icons/ai";
interface SidebarProps {
  currentStep: number;
  handleNextStep: (step: number) => void;
}
const steps = [
  {
    step: 1,
    title: "Company Informationd",
  },
  {
    step: 2,
    title: "Service information",
  },
  {
    step: 3,
    title: "Contact information",
  },
  {
    step: 4,
    title: "Review Information",
  },
  {
    step: 5,
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
                <StepLabel onClick={() => handleNextStep(label.step)}>
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
