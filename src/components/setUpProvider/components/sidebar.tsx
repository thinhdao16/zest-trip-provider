import { FaRegCircleDot } from "react-icons/fa6";
import { Box } from "@mui/material";
import "../styles/sidebar.css";
import { SiInstapaper } from "react-icons/si";
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
    title: "Contract",
  },
];
export const Sidebar = ({ currentStep, handleNextStep }: SidebarProps) => {
  return (
    <>
      {steps.map((step) => (
        <Box my={0} key={step.step} style={{ textAlign: "center" }}>
          {currentStep === step.step ? (
            <Box
              className="sidebar-setupPovider-container-chosen"
              onClick={() => handleNextStep(step.step)}
            >
              <FaRegCircleDot />
              <span className="sidebar-setup-title">{step?.title}</span>
            </Box>
          ) : currentStep > step.step ? (
            <Box
              className="sidebar-setupPovider-container-chosen"
              onClick={() => handleNextStep(step.step)}
            >
              <FaRegCircleDot />
              <span className="sidebar-setup-title">{step?.title}</span>
            </Box>
          ) : (
            <Box
              className="sidebar-setupPovider-container-unchosen"
              onClick={() => handleNextStep(step.step)}
            >
              <FaRegCircleDot />
              <span className="sidebar-setup-title">{step?.title}</span>
            </Box>
          )}
          <SiInstapaper />
        </Box>
      ))}
    </>
  );
};
