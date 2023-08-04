import React, { ChangeEvent, useState } from 'react';
import { BannerContainer, BannerContent, CreateDescription, CreateTitleNullDes } from '../../../styles/createtour/createtour';
import { useStepContext } from '../context/ui/useStepContext';
import { GoLocation } from "react-icons/go";
import { Input } from './input';

const Capacity: React.FC = () => {
    const { currentStep, updateFormValues } = useStepContext()
    const [capacity, setCapacity] = useState('');
    const handlePersonalInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const inputData = e.target.value;
        setCapacity(inputData);
    };
    React.useEffect(() => {
        updateFormValues(5, { Capacity: capacity });
    }, [capacity]);

    if (currentStep !== 7) {
        return null;
    }
    return (
        <BannerContainer>
            <BannerContent>
                <CreateTitleNullDes>
                    Capacity of tour
                </CreateTitleNullDes>
                <CreateDescription>
                    How many people can stay here?
                </CreateDescription>
                <Input labelMain='Capacity' labelSP='number' placeholder='inputs' type='text' icon={<GoLocation />} onChange={handlePersonalInfo} />
            </BannerContent>
        </BannerContainer>
    )
}


export default Capacity