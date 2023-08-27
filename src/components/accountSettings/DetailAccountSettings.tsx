import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface Detail {
  icon: ReactNode;
  title: string;
  description: string;
}

export const DetailAccountSettings: React.FC<Detail> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Box>
      <Box style={{ fontSize: "48px" }}>{icon}</Box>
      <p
        style={{
          marginTop: "16px",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        {title}
      </p>
      <p
        style={{
          marginTop: "16px",
          fontSize: "16px",
          color: "#717171 !important",
        }}
      >
        {description}
      </p>
    </Box>
  );
};

DetailAccountSettings.propTypes = {};
