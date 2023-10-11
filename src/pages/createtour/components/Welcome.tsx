import {
  BannerContainer,
  BannerContent,
  BannerImage,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";

export default function Welcome() {
  const { currentStep } = useStepContext();
  if (currentStep !== 9) {
    return null;
  }

  return (
    <BannerContainer>
      <div className="items-center flex justify-center h-full">
        <BannerContent>
          <div className="text-lg">Let's get started</div>
          <p className="font-semibold text-5xl leading-tight text-black">
            Share your tour information with us
          </p>
        </BannerContent>
        <BannerImage src="src\assets\tour\welcome\Tour-PNG-Download-Image.png" />
      </div>
    </BannerContainer>
  );
}
