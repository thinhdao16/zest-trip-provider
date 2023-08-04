import React, { ChangeEvent, FormEvent, useState } from 'react';
import { BannerContainer, BannerContent, CreateDescription, CreateTitleNullDes } from '../../../styles/createtour/createtour';
import { useStepContext } from '../context/ui/useStepContext';
import { GoLocation } from "react-icons/go";
import { Input } from '../../../components/setUpProvider/components/input';
import { AiOutlineLock } from 'react-icons/ai';

const Title: React.FC = () => {
    const { currentStep, updateFormValues } = useStepContext()
    const [capacity, setCapacity] = useState('');
    const handlePersonalInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const inputData = e.target.value;
        setCapacity(inputData);
    };
    React.useEffect(() => {
        updateFormValues(8, { Capacity: capacity });
    }, [capacity]);

    if (currentStep !== 10) {
        return null;
    }
    return (
        <BannerContainer>
            <BannerContent>
                <CreateTitleNullDes>
                    Title & Description
                </CreateTitleNullDes>
                <CreateDescription>
                    Share what makes your place special.
                </CreateDescription>

                <Input 
                labels="Title tour"
                    placeholder="e.g. Stephen King"
                    icon={<AiOutlineLock />}
                    // showRequired={ userInfo.nameCompany}
                    onChange={handlePersonalInfo} />

            </BannerContent>
        </BannerContainer>
    )
}


export default Title