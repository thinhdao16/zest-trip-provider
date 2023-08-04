import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
    BannerContainer,
    BannerContent,
    BannerDescription,
    BannerImage,
    BannerShopButton,
    BannerTitle,
} from "../../../styles/homepage/banner/banner";

export default function Banner() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <BannerContainer>
            {/* <BannerImage src="https://travelgear.vn/blog/wp-content/uploads/2019/03/tour-la-gi1.jpg" /> */}
            <BannerContent>
                <Typography variant="h6">Huge Collection</Typography>
                <BannerTitle variant="h2">
                    New Bags
                </BannerTitle>

                <BannerDescription variant="subtitle1">
                    Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
                    tempor incididunt ut labore et dolore magna
                </BannerDescription>

                <BannerShopButton color="primary">Shop Now</BannerShopButton>
            </BannerContent>
        </BannerContainer>
    );
}
