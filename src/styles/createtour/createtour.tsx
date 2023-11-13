import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "./theme/theme";

export const BannerContainer = styled(Box)(({ theme }) => ({
  background: "#fafafa",
  justifyContent: "center",
  width: "100%",
  height: "82vh",
  overflow: "auto",
  padding: "0px 0px",
  // marginTop: "30px",
  borderRadius: "12px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));
export const BannerContent = styled(Box)(() => ({
  flexDirection: "column",
  justifyContent: "center",
  padding: "30px",
  maxWidth: "43vw",
  alignItems: "center",
}));
export const BannerContentPrice = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "30px",
  maxWidth: "70%",
}));
export const BannerContentHaveImage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "48vw",
  padding: "30px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100vW",
    flexDirection: "column",
    alignItems: "center",
    padding: 0,
  },
}));
export const BannerContentReview = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "78vw",
  padding: "30px",
}));
export const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "400px",
  height: "400px",
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    width: "350px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "320px",
    height: "300px",
  },
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: "72px",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
  },
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

export const WelcomTitle = styled(Typography)(() => ({
  lineHeight: "54px",
  fontWeight: "600",
  fontSize: "48px",
  marginBottom: "20px",
  color: "black",
}));
export const CreateDescription = styled(Typography)(() => ({
  lineHeight: "24px",
  fontSize: "18px",
  fontWeight: "500",
  marginBottom: "30px",
  color: "#717171",
}));
export const CreateTitle = styled(Typography)(({ theme }) => ({
  lineHeight: "normal",
  fontSize: "30px",
  fontWeight: "600",
  marginBottom: "30px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
  },
}));
export const CreateTitleNullDes = styled(Typography)(({ theme }) => ({
  lineHeight: "normal",
  fontSize: "30px",
  fontWeight: "600",
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
  },
}));
export const CreateTitleImage = styled(Typography)(({ theme }) => ({
  lineHeight: "normal",
  fontSize: "25px",
  fontWeight: "600",
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
  },
}));
export const TitleCardOptions = styled(Typography)(() => ({
  fontSize: "18px",
  lineHeight: "20px",
  fontWeight: "600",
  color: "#222222",
}));
export const TitleIconCardOptions = styled(Typography)(() => ({
  fontSize: "18px",
  lineHeight: "20px",
  fontWeight: "600",
  color: "#222222",
  marginTop: "4px",
}));
export const DescriptionCardOptions = styled(Typography)(() => ({
  fontSize: "14px",
  lineHeight: "18px",
  fontWeight: "400",
  color: "rgb(113, 113, 113) !important",
}));

export const BannerMapContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "20vw",
  // padding: "34px",
  // background: Colors.white,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  marginBottom: "30px",
  // backgroundImage: `url(https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "18px",

  // Thêm lớp phía dưới với opacity
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.25)",
    zIndex: -1,
    opacity: 0.1,
  },
}));
export const CreateIconContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  fontSize: "50px",
  color: "white",
}));
export const CreateDurationContent = styled(Box)(() => ({
  display: "block",
  // borderBottom: "1px solid #e0e0e0",
  padding: "25px 0 25px 0",
}));

export const CreateChooseContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: "1",
}));
export const CreateKnotPre = styled(Box)(() => ({
  fontSize: "32px",
  color: "#838383",
}));
export const CreateKnotHidden = styled(Box)(() => ({
  fontSize: "32px",
  color: "#f3f3f3",
}));
interface CardProps {
  index: number;
  selectedCard: number;
}
export const CardOptionStyles = ({ index, selectedCard }: CardProps) => ({
  border: selectedCard === index ? "1px solid #05445E" : "1px solid #ccc",
  backgroundColor: selectedCard === index ? "#f7f7f7" : "white",
  cursor: "pointer",
  borderRadius: "12px",
  margin: "10px 0 5px 0",
});

interface CardOptionStylesProps {
  index: number;
  selectedCards: number[];
}
export const CardOptionManyStyles = ({
  index,
  selectedCards,
}: CardOptionStylesProps) => ({
  border: selectedCards.includes(index)
    ? "2px solid #05445E"
    : "1px solid #ccc",
  backgroundColor: selectedCards.includes(index) ? "#f7f7f7" : "white", // Add background color here
  padding: "10px",
  cursor: "pointer",
  height: "113px",
  borderRadius: "12px",
  margin: "10px 0 5px 0",
});
