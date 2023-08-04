import React, { useState } from 'react';
import { Box, Card } from '@mui/material';
import { useStepContext } from '../context/ui/useStepContext';
import { BannerContainer, BannerContent, CardOptionStyles, CreateChooseContent, CreateTitle, DescriptionCardOptions, TitleCardOptions,  } from '../../../styles/createtour/createtour';
import { AiFillBank } from 'react-icons/ai';

const TourType: React.FC = () => {
  const { currentStep, updateFormValues } =
    useStepContext();

  const [selectedCard, setSelectedCard] = useState<number>(-1);

  const handleCardClick = (index: object, indexId: number) => {
    setSelectedCard(indexId === selectedCard ? -1 : indexId);
    updateFormValues(0, { TypeTour: index });
  };


  if (currentStep !== 2) {
    return null;
  }
  const dataClickType = [
    {
      id: 0,
      title: "tour in country",
      description: "All bookings are protected for free in the event of Landlord cancellations, incorrect listing information and other",
      icon: <AiFillBank />
    },
    {
      id: 1,
      title: "overseas tour",
      description: "All bookings are protected for free in the event of Landlord cancellations, incorrect listing information and other",
      icon: <AiFillBank />
    }

  ]
  return (
    <BannerContainer>
      <BannerContent>
        <CreateTitle>
          Choose the type of tour that best describes the type of tour you want to create
        </CreateTitle>
        <Box sx={{ display: 'block', alignItems: 'center' }}>
          {dataClickType.map((data) => (
            <Card key={data.id} style={CardOptionStyles({ index: data.id, selectedCard: selectedCard })} onClick={() => handleCardClick(data, data.id)}>
                <CreateChooseContent sx={{margin:3}}>
                <div>
                  <TitleCardOptions>{data?.title}</TitleCardOptions>
                  <DescriptionCardOptions>{data?.description}</DescriptionCardOptions>
                </div>
                {data.icon}
                </CreateChooseContent>
            </Card>
          ))}
        </Box>
      </BannerContent>
    </BannerContainer>
  );
};

export default TourType;
