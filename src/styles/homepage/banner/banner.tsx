import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme/theme";

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100vw",
  // height: "100%",
  padding: "0px 50px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const BannerContent = styled(Box)(() => ({
  width: "100%",
  padding: "0 60px",
}));

export const BannerHomePageList = styled(Box)(() => ({
  maxWidth: "100vw",
  padding: "64px 0 64px 0",
}));

export const BannerHomePageListFirst = styled(Box)(() => ({
  maxWidth: "100vw",
  paddingTop: "64px",
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

export const BannerTitle = styled(Typography)(({  theme }) => ({
  lineHeight: "36px",
  fontSize: "32px",
  fontWeight:"600",
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',    
  }
}));




export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: "3em",
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
  borderRadius:"25px",
  borderStyle:"solid",
  border:"1px solid #e6e6e6",
  fontSize:"15px",
  textTransform:"none",
  color:"black",
  fontWeight:"300",
  textAlign:"center",
}));


