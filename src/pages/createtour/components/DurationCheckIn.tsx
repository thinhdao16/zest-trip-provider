import React, { useState } from 'react';
import { BannerContainer, BannerContent, CreateChooseContent, CreateDescription, CreateDurationContent, CreateKnotHidden, CreateKnotPre, CreateTitleNullDes } from '../../../styles/createtour/createtour';
import { useStepContext } from '../context/ui/useStepContext';
import {  Typography } from '@mui/material';
import { GoNoEntry, GoPlusCircle } from 'react-icons/go';
import { dataTypeDuration } from '../dataFake';

const DurationCheckIn: React.FC = () => {
    const { currentStep, updateFormValues } = useStepContext()
    const [dataDuration, setDataDuration] = useState(dataTypeDuration);
    const handleIncrement = (id: number) => {
        const updatedData = dataDuration.map((item) =>
            item.id === id ? { ...item, no: item.no + 1 } : item
        );
        setDataDuration(updatedData);
    };
    const handleDecrement = (id: number) => {
        const updatedData = dataDuration.map((item) =>
            item.id === id && item.no > 1 ? { ...item, no: item.no - 1 } : item
        );
        setDataDuration(updatedData);
    };
    React.useEffect(() => {
        updateFormValues(4, { DurationCheckIn: dataDuration });
    }, [dataDuration]);
    if (currentStep !== 6) {
        return null;
    }
    return (
        <BannerContainer>
            <BannerContent>
                <CreateTitleNullDes>
                    Share some basic information about the checkin period
                </CreateTitleNullDes>
                <CreateDescription>
                    Your address is only shared with guests after they have successfully.
                </CreateDescription>
                {dataDuration.map((data) => (
                    <CreateDurationContent key={data?.id}>
                        <CreateChooseContent>
                            <Typography>{data?.title}</Typography>
                            <div>
                                <CreateChooseContent key={data?.id}>
                                    {data?.no > 1 ? (
                                        <CreateKnotPre onClick={() => handleDecrement(data.id)}>
                                            <GoNoEntry />
                                        </CreateKnotPre>
                                    ) : (
                                        <CreateKnotHidden>
                                            <GoNoEntry />
                                        </CreateKnotHidden>
                                    )}
                                    <Typography sx={{ marginX: 2 }}>{data?.no}</Typography>
                                    <CreateKnotPre onClick={() => handleIncrement(data?.id)}>
                                        <GoPlusCircle />
                                    </CreateKnotPre>
                                </CreateChooseContent>
                            </div>
                        </CreateChooseContent>

                    </CreateDurationContent>


                ))}

            </BannerContent>
        </BannerContainer>
    )
}


export default DurationCheckIn