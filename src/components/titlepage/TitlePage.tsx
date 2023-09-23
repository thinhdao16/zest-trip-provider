import { Box, Typography } from "@mui/material";
import React from "react";

interface CustomTitleProps {
  title: string;
  titleList: string;
  rest: string;
}
export const TitlePage: React.FC<CustomTitleProps> = ({
  title,
  titleList,
  rest,
}) => {
  return (
    <div>
      <Box textAlign={"center"} mb={8}>
        <p style={{ fontSize: "40px" }}>{title}</p>
        <Box
          style={{
            padding: "4px 12px",
            backgroundColor: "black",
            display: "inline-block",
            borderRadius: "0 0 4px 4px",
          }}
        ></Box>
      </Box>
      <Box style={{ marginBottom: "36px", display: "flex" }}>
        <Box style={{ flexGrow: 1 }}>
          <p className="text-2xl font-semibold">{titleList}</p>
        </Box>
        <Box style={{ flexGrow: 1, textAlign: "right" }}>
          <p>{rest}</p>
        </Box>
      </Box>
    </div>
  );
};
