
import { Box, Card, CardMedia, Grid, } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    BannerContainer,
    BannerContent,
    BannerHomePageButtonList,
    BannerHomePageButtonListTab,
    BannerHomePageList,
    BannerHomePageListFirst,
    BannerTitle,
    BannerTitleList,
} from "../../../styles/homepage/banner/banner";
import React from "react";


export default function Banner() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <BannerContainer>
            <BannerContent>
                <BannerHomePageListFirst>
                    <BannerTitle variant="h6">
                        Welcome back , Dao
                    </BannerTitle>
                </BannerHomePageListFirst>
                <BannerHomePageList>
                    <Box style={{ marginBottom: "16px" }}>
                        <BannerTitleList variant="subtitle1">
                            All tour of you
                        </BannerTitleList>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" gap={2} marginBottom={1} marginTop={2}>
                    <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <BannerHomePageButtonListTab  label="Item One" value="1" />
                                    <BannerHomePageButtonListTab  label="Item Two" value="2" />
                                    <BannerHomePageButtonListTab  label="Item Three" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">Item One</TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </Box>

                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Card>
                                    <CardMedia sx={{ height: "100px" }} image="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720" />
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card>
                                    <CardMedia sx={{ height: "100px" }} image="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720" />
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card>
                                    <CardMedia sx={{ height: "100px" }} image="https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=720" />
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                 
                </BannerHomePageList>



            </BannerContent>
        </BannerContainer>
    );
}
