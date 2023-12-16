import {
  BannerContainer,
  BannerContent,
  CardOptionManyStyles,
  CreateTitle,
  TitleIconCardOptions,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataSelectCard, StateTour } from "../types/index.t";
import { VehicleTag } from "../../../components/icon/tour/vehicle";
import { message } from "antd";

const TransportType: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const vehicleTour = useSelector((state: StateTour) => state.tour.vehicleTour);
  const handleCardClick = (data: DataSelectCard) => {
    setSelectedCards((prevSelectedCards) => {
      if (
        prevSelectedCards.length === 4 &&
        !prevSelectedCards.includes(data.id)
      ) {
        message.warning("Please only select a maximum of 4 transports");
        return prevSelectedCards;
      }

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
    <>
      <BannerContainer className="global-scrollbar">
        <div className="items-center flex justify-center ">
          <BannerContent>
            <CreateTitle variant="h6">
              Choose the transportations included in the tour
            </CreateTitle>
            <div className="mt-1 mb-10 relative">
              <span className="text-gray-600 font-medium">
                Explore Diverse Transportation Choices Included in Your Tour
                Experience
              </span>
              {selectedCards?.length === 0 && (
                <span className="text-xs text-red-500 absolute top-6 left-0">
                  *Select at least 1 transportations
                </span>
              )}
            </div>

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
                  <div
                    style={CardOptionManyStyles({
                      index: data.id,
                      selectedCards: selectedCards,
                    })}
                    onClick={() => handleCardClick(data)}
                    className="transition-effect-hover"
                  >
                    <Box sx={{ margin: 3 }}>
                      <VehicleTag field={data?.name} style="w-8 h-8" />
                      <TitleIconCardOptions>{data?.name}</TitleIconCardOptions>
                    </Box>
                  </div>
                </Grid>
              ))}
            </Grid>
          </BannerContent>
        </div>
      </BannerContainer>
    </>
  );
};
export default TransportType;
