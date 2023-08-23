import { FaRegCircleCheck } from "react-icons/fa6";
import { Box } from "@mui/material";
import "../styles/sidebar.css";
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
        <Box my={1} key={step.step}>
          {currentStep === step.step ? (
            <Box
              className="sidebar-setupPovider-container-chosen"
              onClick={() => handleNextStep(step.step)}
            >
              <FaRegCircleCheck style={{ color: "blue" }} />
              <span className="sidebar-setup-title">{step?.title}</span>
            </Box>
          ) : (
            <Box
              className="sidebar-setupPovider-container-unchosen"
              onClick={() => handleNextStep(step.step)}
            >
              <FaRegCircleCheck />
              <span className="sidebar-setup-title">{step?.title}</span>
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};
