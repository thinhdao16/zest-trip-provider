import React from 'react'
import { useStepContext } from '../context/ui/useStepContext';

const Congratulation :React.FC =() => {
    const { currentStep } = useStepContext()
    if (currentStep !== 12) {
        return null;
    }

    return (
        <div>Congratulation</div>
    )
}

export default Congratulation
