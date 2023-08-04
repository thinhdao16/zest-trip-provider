import React, { ChangeEvent, FormEvent, useState } from 'react';
import { BannerContainer, BannerContent, CreateDescription, CreateTitleNullDes } from '../../../styles/createtour/createtour';
import { useStepContext } from '../context/ui/useStepContext';
import { Input } from '../../../components/setUpProvider/components/input';
import { AiOutlineLock } from 'react-icons/ai';
import { Box, Card, FormControl, FormLabel, Grid, TextField, TextareaAutosize } from '@mui/material';
import InputArea from '../../../components/setUpProvider/components/inputArea';
import { IoAddCircleOutline } from 'react-icons/io5';
import FormModal from './Title/FormModal';
export interface BoxData {
    data: string;
    fromTime: string;
    toTime: string;
}
const Title: React.FC = () => {
    const { currentStep, updateFormValues } = useStepContext()
    const [capacity, setCapacity] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formEntries, setFormEntries] = useState<BoxData[]>([]);
    console.log(formEntries)
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleFormSubmit = (data: BoxData[]) => {
        // Process the data or update state as needed
        console.log(data); // This should be an array of BoxData
        setFormEntries([...formEntries, ...data]);
    };

    const handlePersonalInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const inputData = e.target.value;
        setCapacity(inputData);
    };
    const handlePersonalInfos = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
                <Box style={{ width: "38vw", marginBottom: "30px" }}>
                    <Input
                        labels="Title tour"
                        placeholder="e.g. Stephen King"
                        icon={<AiOutlineLock />}
                        // showRequired={ userInfo.nameCompany}
                        onChange={handlePersonalInfo} />

                    <InputArea
                        label="Description"
                        onChange={handlePersonalInfos}
                        icon={<AiOutlineLock />}
                        placeholder="Description"
                        maxLength={500}

                    />
                </Box>
                <Box>
                    <CreateTitleNullDes>
                        Tour Schedule
                    </CreateTitleNullDes>
                    <Card style={{ border: "1px solid", padding: "50px" }} >
                        <div>
                            <Grid container spacing={2}>
                                {formEntries.map((data, index) => (
                                    <Grid item xs={6}>
                                        <IoAddCircleOutline />
                                        <div key={index}>{index+1}</div>
                                        <div key={index}>{data?.fromTime}</div>
                                    </Grid>
                                ))}
                                <Grid item xs={6}>
                                    <IoAddCircleOutline onClick={handleModalOpen} />
                                </Grid>
                            </Grid>
                            <FormModal
                                open={modalOpen}
                                onClose={handleModalClose}
                                onSubmit={handleFormSubmit}
                            />
                        </div>
                    </Card>
                </Box>
            </BannerContent>
        </BannerContainer>
    )
}


export default Title