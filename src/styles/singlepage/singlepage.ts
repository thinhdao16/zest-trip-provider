import { Box, Button, Tab, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../homepage/theme/theme";

export const BannerHomePageList = styled(Box)(() => ({
  maxWidth: "100vw",
  padding: "64px 0 64px 0",
}));
export const BannerTitleExtra = styled(Box)(() => ({
  display: "flex",
  padding:"10px 0",
}));
export const BannerHomePageListFirst = styled(Box)(() => ({
  maxWidth: "100vw",
//   paddingTop: "24px",
}));
export const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "500px",
  [theme.breakpoints.down("md")]: {
    width: "350px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "320px",
    height: "300px",
  },
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: "36px",
  fontSize: "32px",
  fontWeight: "600",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
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

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 0.7,
  color:"#7d868f",
  fontSize:"14px",
  fontWeight:"500",
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: "1.5em",
  },
}));

export const BannerShopButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
  name: "MyShopButton",
  slot: "Root",
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})(({ theme }) => ({
  padding: "20px 0px",
  color: Colors.white,
  fontWeight: "bold",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0px",
    fontSize: "14px",
  },
}));
export const BannerHomePageButtonList = styled(Button)(() => ({
  padding: "4px 16px",
  borderRadius: "25px",
  borderStyle: "solid",
  border: "1px solid #e6e6e6",
  fontSize: "15px",
  textTransform: "none",
  color: "black",
  fontWeight: "300",
  textAlign: "center",
}));
export const BannerHomePageButtonListTab = styled(Tab)(() => ({
  padding: "4px 16px",
  borderRadius: "25px",
  borderStyle: "solid",
  border: "1px solid #e6e6e6",
  fontSize: "15px",
  textTransform: "none",
  color: "black",
  fontWeight: "300",
  textAlign: "center",
}));
