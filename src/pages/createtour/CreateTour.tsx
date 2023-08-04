import React from "react";
import Headers from "./components/Headers";
import { LinearProgress } from "@mui/joy";
import { StepProvider } from "./context/ui/StepContext";
import Tourtype from "./components/TourType";
import { useStepContext } from "./context/ui/useStepContext";
import Welcome from "./components/Welcome";
import { Button } from "@mui/material";
import TransportType from "./components/TransportType";
import AccomType from "./components/AccomType";
import Location from "./components/Location";
import DurationCheckIn from "./components/DurationCheckIn";
import Capacity from "./components/Capacity";
import Price from "./components/Price";
import Media from "./components/Media";
import Title from "./components/Title";

const steps = [Welcome, Tourtype, TransportType, AccomType,Location, DurationCheckIn, Capacity, Price,Media,Title];

const CreateTour: React.FC = () => {
    return (
        <>
            <StepProvider totalSteps={steps.length}>
                <div>
                    <StepRenderer />
                </div>
            </StepProvider>
        </>
    );
};

export default CreateTour;

const StepRenderer: React.FC = () => {
    const {
        currentStep,
        totalSteps,
        goToNextStep,
        isNextClicked,
        goToPreviousStep,
    } = useStepContext();
    const StepsToRender = (
        <>
            {steps.map(
                (Step, index) =>
                    (index === currentStep - 1 || isNextClicked) && <Step key={index} />
            )}
        </>
    );
    return (
        <>
            <Headers />
            {StepsToRender}
            <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', background: "white" }}>
                <LinearProgress determinate value={(currentStep / totalSteps) * 100} />
                {currentStep === totalSteps ? (
                    <>
                        <Button onClick={goToPreviousStep} disabled={currentStep !== totalSteps}>
                            Previous Step
                        </Button>
                        <Button onClick={goToPreviousStep} disabled={currentStep !== totalSteps}>
                            Get Started
                        </Button>
                    </>
                ) : currentStep === 1 ? (
                    <Button onClick={goToNextStep} disabled={currentStep === totalSteps}>
                        Next Step
                    </Button>
                ) : (
                    <>
                        <Button onClick={goToPreviousStep} disabled={currentStep === totalSteps}>
                            Previous Step
                        </Button>
                        <Button onClick={goToNextStep} disabled={currentStep === totalSteps}>
                            Next Step
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};
