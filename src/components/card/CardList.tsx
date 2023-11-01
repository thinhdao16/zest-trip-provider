import React, { ReactNode } from "react";
import { Box, Card } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

interface CardHoverList {
  icon: ReactNode;
  title: string;
  description: string;
  to: string;
}

// Define a styled Card component with the hover effect
const StyledCard = styled(Card)(() => ({
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.12) !important",
  minHeight: "156px",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2) !important",
  },
}));

export const CardList: React.FC<CardHoverList> = ({
  icon,
  title,
  description,
  to,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(to);
  };
  return (
    <React.Fragment>
      <StyledCard onClick={handleCardClick}>
        <Box style={{ marginBottom: "16px", fontSize: "32px" }}>{icon}</Box>
        <Box>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              color: "#717171",
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        </Box>
      </StyledCard>
    </React.Fragment>
  );
};

CardList.propTypes = {};
