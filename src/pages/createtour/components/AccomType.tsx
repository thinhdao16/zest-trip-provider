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
import { message } from "antd";

const AccomType: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const tagTour = useSelector((state: StateTour) => state.tour.tagTour);

  const handleCardClick = (data: DataSelectCard) => {
    setSelectedCards((prevSelectedCards) => {
      if (
        prevSelectedCards.length === 4 &&
        !prevSelectedCards.includes(data.id)
      ) {
        message.warning(" Please only select a maximum of 4 category");
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
    const selectedData = tagTour
      .filter((item: DataSelectCard) => selectedCards.includes(item.id))
      .map((item: DataSelectCard) => ({ id: item.id, name: item.name }));
    updateFormValues(2, { AccomType: selectedData });
  }, [selectedCards]);
  if (currentStep !== 5) {
    return null;
  }
  return (
    <>
      <BannerContainer className="global-scrollbar">
        <div className="flex items-center justify-center">
          <BannerContent>
            <CreateTitle variant="h6">
              Choose the type of tour you are providing
            </CreateTitle>
            <div className="mt-1 mb-10 relative">
              <span className="text-gray-600 font-medium">
                Select the tour type you provide and tailor your offerings to
                suit tour.
              </span>
              {selectedCards?.length === 0 && (
                <span className="text-xs text-red-500 absolute top-6 left-0">
                  *Select at least 1 transportations
                </span>
              )}
            </div>
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
        </div>
      </BannerContainer>
    </>
  );
};
export default AccomType;
