import {  Typography } from "@mui/material";
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
        <BannerContainer>
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
            <BannerImage src="https://s3-alpha-sig.figma.com/img/bc80/81b9/f6c15593d46f307d4b91e961c2544ead?Expires=1691971200&Signature=cUGsry9dPs7dQ7lUsOVyIHvbbdxEZYEtERkyew2M~34bWSFiSUDvJIwtgb~7g~oWeedlxK6JBLijzySZIuzpk6nilquBts2b4bZ2aKzkUrah8YPQKNAuELKz8Pkv2ekh8z4FuAacTH7r2PBd-lnp~C5TcWto-iCABG7MjfHoAEeKqtznssO92Wdm13aLq0UEpjwqGsEwSYW5eG-XyeBWUymLQBld3dhvqLUhM0oEQDlkWKUsy~kXQeu~i~bBi7tPIfIaDVmle7NhLF1a-jEske66taya8JdbDK7KOQiyIkuYWDKU-vxHzxANa0C7O9hxyhx3WbQiAcJ3oo2u5qK25Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        </BannerContainer>
    );
}
