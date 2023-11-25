import React, { useState } from "react";
import { Card } from "@mui/material";
import { useStepContext } from "../context/ui/useStepContext";
import {
  BannerContainer,
  BannerContent,
  CardOptionStyles,
  CreateChooseContent,
  CreateTitle,
  DescriptionCardOptions,
  TitleCardOptions,
} from "../../../styles/createtour/createtour";
import { AiFillBank } from "react-icons/ai";
import { FaEarthAfrica } from "react-icons/fa6";

const TourType: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();

  const [selectedCard, setSelectedCard] = useState<number>(-1);

  const handleCardClick = (indexId: number) => {
    setSelectedCard((prevSelectedCard) =>
      prevSelectedCard === indexId ? -1 : indexId
    );
    updateFormValues(0, {
      TypeTour: selectedCard === indexId ? undefined : indexId,
    });
  };

  if (currentStep !== 2) {
    return null;
  }
  const dataClickType = [
    {
      id: 0,
      title: "Domestic",
      description:
        "All bookings are protected for free in the event of Landlord cancellations, incorrect listing information and other",
      icon: <AiFillBank />,
    },
    {
      id: 1,
      title: "International ",
      description:
        "All bookings are protected for free in the event of Landlord cancellations, incorrect listing information and other",
      icon: <FaEarthAfrica />,
    },
  ];

  return (
    <BannerContainer>
      <div className="items-center flex justify-center h-full  ">
        <BannerContent>
          <CreateTitle>
            Choose the type of tour that best describes the type of tour you
            want to create
          </CreateTitle>
          <div className="h-[50vh] overflow-auto">
            {dataClickType.map((data) => (
              <div
                key={data.id}
                style={CardOptionStyles({
                  index: data.id,
                  selectedCard: selectedCard,
                })}
                onClick={() => handleCardClick(data.id)}
                className="shadow-custom-card-mui"
              >
                <CreateChooseContent sx={{ margin: 3 }}>
                  <div>
                    <TitleCardOptions>{data?.title}</TitleCardOptions>
                    <DescriptionCardOptions>
                      {data?.description}
                    </DescriptionCardOptions>
                  </div>
                  <p className="text-xl">{data.icon}</p>
                </CreateChooseContent>
              </div>
            ))}
          </div>
        </BannerContent>
      </div>
    </BannerContainer>
  );
};

export default TourType;
