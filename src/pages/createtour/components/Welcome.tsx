import { Typography } from "@mui/material";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  WelcomTitle,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";

export default function Welcome() {
  const { currentStep } = useStepContext();
  if (currentStep !== 1) {
    return null;
  }

  return (
    <BannerContainer style={{paddingTop:"12vh"}}>
      <BannerContent>
        <Typography variant="h6">Step 1</Typography>
        <WelcomTitle variant="h6">
          Share your tour information with us
        </WelcomTitle>
        <BannerDescription variant="subtitle1">
          Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
          tempor incididunt ut labore et dolore magna
        </BannerDescription>
      </BannerContent>
      <BannerImage src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8JQ7zxwLF4drUpLeYn98SZCAj44y0lmhCYPmYdnfFMH-n1aw9vBVwULWEJGC451D268t9OOMOuQMrhX5n0AYBI6GE8r3_RgzTwdCxQytqb8Cq_Be04fK8VeZiJBNHaV1IWwCHOFQb77yrzZ5ynFRxcrz8tmIgRP8pplCbQFJYcM-nVCY5goNSrw2v/w680/school-tour-guidelines.png" />
    </BannerContainer>
  );
}
