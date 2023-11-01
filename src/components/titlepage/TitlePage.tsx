import { Box } from "@mui/material";
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
      <Box textAlign={"center"}>
        <p className="font-medium" style={{ fontSize: "40px" }}>
          {title}
        </p>
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
          <p className="text-3xl font-semibold">{titleList}</p>
        </Box>
        <Box
          className="border-b-2 border-black"
          style={{ flexGrow: 1, textAlign: "right" }}
        >
          <p className="font-medium underline decoration-navy-blue ">{rest}</p>
        </Box>
      </Box>
    </div>
  );
};
