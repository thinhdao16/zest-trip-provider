import { Button, Tab, Typography, styled, Box, Card } from "@mui/material";

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100vw",
  padding: theme.spacing(0, 2), // Padding cơ bản cho mọi kích thước màn hình

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 4), // Padding cho màn hình từ sm trở lên
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 6), // Padding cho màn hình từ md trở lên
  },
}));

export const BannerContent = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(0, 2), // You can adjust the spacing as needed
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0, 4), // Adjust the padding for small screens and above
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 6), // Adjust the padding for medium screens and above
  },
}));
export const BannerHomePageList = styled(Box)(() => ({
  maxWidth: "100vw",
  padding: "64px 0 64px 0",
}));
export const BannerPageList = styled(Box)(({ theme }) => ({
  maxWidth: "100vw",
  padding: "64px 20px", // Padding cơ bản cho mọi kích thước màn hình

  [theme.breakpoints.up('sm')]: {
    padding: "64px 40px", // Padding cho màn hình từ sm trở lên
  },
  [theme.breakpoints.up('md')]: {
    padding: "64px 140px", // Padding cho màn hình từ md trở lên
  },
}));
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
export const BannerTitleList = styled(Typography)(() => ({
  lineHeight: "30px",
  fontSize: "26px",
  fontWeight: "600",
}));
export const ButtonGlobal = styled(Button)(() => ({
  position: "relative",
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
export const ContainerPageFullHalf = styled(Box)(() => ({
  height: "100vh",
  width: "100vw ",
}));

export const ContainerPageFullHalfContent = styled(Box)(() => ({
  height: "89vh",
  display: "flex",
  flexDirection: "column",
  padding: "12px 0 12px 0 ",
}));
