import {
    BannerContainer,
    BannerContent,
    CardOptionManyStyles,
    CreateTitle,
    TitleIconCardOptions,
} from "../../../styles/createtour/createtour";
import { useStepContext } from '../context/ui/useStepContext';
import { Box, Card, Grid } from '@mui/material';
import React, { useEffect, useState } from "react";
import { DataItem, dataType } from '../dataFake';

const AccomType: React.FC = () => {
    const { currentStep, updateFormValues } = useStepContext();
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const handleCardClick = (data: DataItem) => {
        setSelectedCards((prevSelectedCards) => {
            if (prevSelectedCards.includes(data.id)) {
                return prevSelectedCards.filter((id) => id !== data.id);
            } else {
                return [...prevSelectedCards, data.id];
            }
        });
    };
    useEffect(() => {
        const selectedData = dataType.filter((item) =>
            selectedCards.includes(item.id)
        );
        updateFormValues(2, { AccomType: selectedData });
    }, [selectedCards]);
    if (currentStep !== 4) {
        return null;
    }
    return (
        <BannerContainer>
            <BannerContent>
                <CreateTitle variant="h6">Chooser the vehicle types you want to create for the tour</CreateTitle>
                <Grid container spacing={2}> {/* Use Grid container to create a row with spacing between cards */}
                    {dataType.map((data) => (
                        <Grid key={data.id} item xs={12} sm={6} md={4} style={{ paddingTop: 0 }}> {/* Adjust xs, sm, md, lg, and xl props as per your desired layout */}
                            <Card
                                style={CardOptionManyStyles({ index: data.id, selectedCards: selectedCards })}
                                onClick={() => handleCardClick(data)}
                            >
                                <Box sx={{ margin: 3 }}>
                                    <div style={{ fontSize: 32 }}>{data.icon}</div>
                                    <TitleIconCardOptions>{data?.title}</TitleIconCardOptions>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </BannerContent>
        </BannerContainer>
    )
}
export default AccomType;