import React, { ChangeEvent, useState } from 'react';
import { BannerContainer, BannerContent, CreateDescription, CreateTitleNullDes } from '../../../styles/createtour/createtour';
import { useStepContext } from '../context/ui/useStepContext';
import { Input } from './input';
import { dataTypePrice } from '../dataFake';

interface InputValue {
    labelMain: string;
    value: string;
}

interface PriceData {
    [key: string]: string;
}

const Price: React.FC = () => {
    const { currentStep, updateFormValues } = useStepContext()
    const initialInputValues: InputValue[] = dataTypePrice.map(data => ({ labelMain: data.labelMain, value: '' }));
    const [inputValues, setInputValues] = useState<InputValue[]>(initialInputValues);

    const handleInput = (index: number, value: string) => {
        const updatedInputValues = [...inputValues];
        updatedInputValues[index].value = value;
        setInputValues(updatedInputValues);
    };

    React.useEffect(() => {
        if (currentStep === 8) {
            const priceData: PriceData = inputValues.reduce((data, input) => {
                data[input.labelMain] = input.value;
                return data;
            }, {} as PriceData);
            updateFormValues(6,  priceData);
        }
    }, [ inputValues]);
    

    if (currentStep !== 8) {
        return null;
    }

    return (
        <BannerContainer>
            <BannerContent>
                <CreateTitleNullDes>
                    Setting price and tickets
                </CreateTitleNullDes>
                <CreateDescription>
                    Enter the pricing information
                </CreateDescription>
                {dataTypePrice.map((data, index) => (
                    <Input
                        key={index}
                        labelMain={data.labelMain}
                        labelSP={data.labelSp}
                        placeholder='inputs'
                        type='text'
                        icon={data.icon}
                        onChange={(e) => handleInput(index, e.target.value)}
                    />
                ))}
            </BannerContent>
        </BannerContainer>
    )
}

export default Price;
