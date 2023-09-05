import { Box, Typography } from "@mui/material";
import { BannerTitleList } from "../../styles/global/StyleGlobal";
import React from "react";

interface CustomTitleProps {
  title: string;
  titleList: string;
  rest: string
}
export const TitlePage: React.FC<CustomTitleProps> = ({
  title,
  titleList,
  rest
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
          <BannerTitleList variant="subtitle1">{titleList}</BannerTitleList>
        </Box>
        <Box style={{ flexGrow: 1, textAlign: "right" }}>
          <Typography variant="subtitle1">{rest}</Typography>
        </Box>
      </Box>
    </div>
  );
};
