import { ReactNode } from "react";
import { Box } from "@mui/material";
interface InfomationSum {
  icon: ReactNode;
  title: string;
  description: string;
}

export const InformationSum = ({ icon, title, description }: InfomationSum) => {
  return (
    <Box style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
      <p style={{ fontSize: "25px", marginRight: "12px" }}> {icon}</p>
      <Box>
        <p style={{ fontWeight: 500, marginBottom: "2px" }}>{title}</p>
        <p>{description}</p>
      </Box>
      <hr />
    </Box>
  );
};

