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
import { VehicleTag } from "../../../components/icon/tour/tag";

const TransportType: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const vehicleTour = useSelector((state: StateTour) => state.tour.vehicleTour);
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
    const selectedData = vehicleTour
      .filter((item: DataSelectCard) => selectedCards.includes(item.id))
      .map((item: DataSelectCard) => ({ id: item.id, name: item.name }));
    updateFormValues(1, { TransportType: selectedData });
  }, [selectedCards]);

  if (currentStep !== 4) {
    return null;
  }
  return (
    <BannerContainer className="global-scrollbar">
      <div className="items-center flex justify-center ">
        <BannerContent>
          <CreateTitle variant="h6">
            Choose the transportations included in the tour
          </CreateTitle>
          <Grid container spacing={2}>
            {vehicleTour.map((data: DataSelectCard) => (
              <Grid
                key={data.id}
                item
                xs={12}
                sm={6}
                md={4}
                style={{ paddingTop: 0 }}
              >
                <Card
                  style={CardOptionManyStyles({
                    index: data.id,
                    selectedCards: selectedCards,
                  })}
                  onClick={() => handleCardClick(data)}
                >
                  <Box sx={{ margin: 3 }}>
                    {/* <img
                    src="src\assets\tour\iconTag\airplane.svg"
                    className="h-2"
                    alt=""
                  /> */}
                    <VehicleTag field={data?.name} style="w-8 h-8" />
                    <TitleIconCardOptions>{data?.name}</TitleIconCardOptions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </BannerContent>
      </div>
    </BannerContainer>
  );
};
export default TransportType;
