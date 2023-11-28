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
import { SnackbarNoti } from "./Title/Snackbar";
import { VehicleTag } from "../../../components/icon/tour/vehicle";

const TransportType: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const { openSnackbar, setOpenSnackbar } = useStepContext();
  const vehicleTour = useSelector((state: StateTour) => state.tour.vehicleTour);
  const handleCardClick = (data: DataSelectCard) => {
    setSelectedCards((prevSelectedCards) => {
      if (
        prevSelectedCards.length === 4 &&
        !prevSelectedCards.includes(data.id)
      ) {
        setOpenSnackbar(true);
        return prevSelectedCards;
      }

      if (prevSelectedCards.includes(data.id)) {
        return prevSelectedCards.filter((id) => id !== data.id);
      } else {
        return [...prevSelectedCards, data.id];
      }
    });
  };
  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleUndoButtonClick = () => {
    setOpenSnackbar(false);
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
      <SnackbarNoti
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Please only select a maximum of 4 transports"
        actionButtonLabel="UNDO"
        onActionButtonClick={handleUndoButtonClick}
      />
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
    </>
  );
};
export default TransportType;
