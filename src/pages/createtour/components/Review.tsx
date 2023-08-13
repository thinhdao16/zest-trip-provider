import React, { ChangeEvent, useState } from 'react';
import { BannerContainer, BannerContentHaveImage, CreateDescription, CreateTitleNullDes, TitleCardOptions, TitleIconCardOptions } from '../../../styles/createtour/createtour';
import { useStepContext } from '../context/ui/useStepContext';
import { dataTypePrice } from '../dataFake';
import { Box, Card, CardContent, Grid } from '@mui/material';

interface InputValue {
    labelMain: string;
    value: string;
}

interface PriceData {
    [key: string]: string;
}

const Review: React.FC = () => {
    const { currentStep, updateFormValues, formValues } = useStepContext()
    console.log(formValues)
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
            updateFormValues(6, priceData);
        }
    }, [inputValues]);


    if (currentStep !== 11) {
        return null;
    }

    return (
        <BannerContainer>
            <BannerContentHaveImage>
                <CreateTitleNullDes>
                    Review your tour
                </CreateTitleNullDes>
                <CreateDescription>
                    Below is the information that we will display to guests. Make sure everything is okay.
                </CreateDescription>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <img src={formValues?.[7]?.Media?.[0]?.url} />
                                    <TitleIconCardOptions>
                                        {formValues?.[8]?.Title?.[0]}
                                    </TitleIconCardOptions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <TitleCardOptions>
                                what is next?
                            </TitleCardOptions>
                        </Grid>
                    </Grid>
                </Box>
            </BannerContentHaveImage>
        </BannerContainer>
    )
}

export default Review;
