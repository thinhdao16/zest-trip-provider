import {
  BannerContainer,
  BannerContent,
  CardOptionManyStyles,
  CreateTitle,
  TitleIconCardOptions,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataSelectCard, StateTour } from "../types/index.t";
import { TourTag } from "../../../components/icon/tour/tag";

const AccomType: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const tagTour = useSelector((state: StateTour) => state.tour.tagTour);

  const handleCardClick = (data: DataSelectCard) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(data.id)) {
        return prevSelectedCards.filter((id) => id !== data.id);
      } else {
        return [...prevSelectedCards, data.id];
      }
    });
  };
  useEffect(() => {
    const selectedData = tagTour
      .filter((item: DataSelectCard) => selectedCards.includes(item.id))
      .map((item: DataSelectCard) => ({ id: item.id, name: item.name }));
    updateFormValues(2, { AccomType: selectedData });
  }, [selectedCards]);
  if (currentStep !== 5) {
    return null;
  }
  return (
    <BannerContainer>
      <BannerContent>
        <CreateTitle variant="h6">
          Choose the type of tour you are providing
        </CreateTitle>
        <Grid container spacing={2}>
          {" "}
          {/* Use Grid container to create a row with spacing between cards */}
          {tagTour.map((data: DataSelectCard) => (
            <Grid
              key={data.id}
              item
              xs={12}
              sm={6}
              md={4}
              style={{ paddingTop: 0 }}
            >
              {" "}
              {/* Adjust xs, sm, md, lg, and xl props as per your desired layout */}
              <Card
                style={CardOptionManyStyles({
                  index: data.id,
                  selectedCards: selectedCards,
                })}
                onClick={() => handleCardClick(data)}
              >
                <Box sx={{ margin: 3 }}>
                  <TourTag field={data?.name} style="w-8 h-8" />
                  <TitleIconCardOptions>{data?.name}</TitleIconCardOptions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </BannerContent>
    </BannerContainer>
  );
};
export default AccomType;
