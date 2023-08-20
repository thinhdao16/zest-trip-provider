import { Tab, Typography, styled } from "@mui/material";

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
export const BannerTitleList = styled(Typography)(({  theme }) => ({
  lineHeight: "30px",
  fontSize: "26px",
  fontWeight:"600",
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',    
  }
}));
