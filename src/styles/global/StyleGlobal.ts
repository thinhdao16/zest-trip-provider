import { Button, Tab, Typography, styled, Box } from "@mui/material";

export const BannerHomePageButtonListTab = styled(Tab)(() => ({
  padding: "-10px 14px !important",
  borderRadius: "25px",
  borderStyle: "solid",
  border: "1px solid #e6e6e6",
  fontSize: "15px",
  textTransform: "none",
  color: "black",
  fontWeight: "300",
  textAlign: "center",
  marginRight: "25px",
  height: "38px !important",
  minHeight: "38px !important",
  transition: "border-color 0.7s, color 0.7s", // Add a smooth transition for the border color change
  cursor: "pointer",
  "&:hover": {
    borderColor: "#8fcaf7",
    color: "#8fcaf7",
  },
  "&:focus": {
    outline: "none",
  },
}));
export const BannerTitleList = styled(Typography)(({ theme }) => ({
  lineHeight: "30px",
  fontSize: "26px",
  fontWeight: "600",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
  },
}));
export const ButtonGlobal = styled(Button)(({ theme }) => ({
  position: "relative", // Cần thiết để xác định vị trí tương đối
  backgroundColor: "#8fcaf7",
  color: "white",
  borderRadius: "8px",
  fontSize: "15px",
  textTransform: "none",
  transition:
    "background-color 0.7s, color 0.7s, border 0.7s, border-radius 0.7s, transform 0.7s ease", // Thêm transition

  "&:hover": {
    backgroundColor: "white",
    color: "black",
    border: "1px solid #8fcaf7",
    borderRadius: "8px",
  },
}));
export const ContainerPageFullHalf = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw ",
}));

export const ContainerPageFullHalfContent = styled(Box)(({ theme }) => ({
  height: "87vh",
  display: "flex",
  flexDirection: "column",
  padding:"12px 0 12px 0 "
}));
