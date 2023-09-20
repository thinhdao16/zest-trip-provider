import { styled, Box } from "@mui/material";

export const ContainerPageFullHalfContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "12px 0 12px 0",
  overflow: "auto",
  maxHeight: "100vh",

  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#F5F5F5",
  },
  "&::-webkit-scrollbar": {
    width: "5px",
    backgroundColor: "#F5F5F5",
    scrollbarWidth: "2px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#000000",
    border: "2px solid #555555",
  },
}));
