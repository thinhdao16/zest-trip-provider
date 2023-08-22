import {
  BannerContainer,
  BannerContent,
  BannerHomePageList,
} from "../../../styles/homepage/banner/banner";
import { TitlePage } from "../../../components/titlepage/TitlePage";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { BannerHomePageButtonListTab } from "../../../styles/global/StyleGlobal";
import Header from "../../../components/header/Header";

function ListWork() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
   <>
   <Header />
    <BannerContainer>
      <BannerContent>
        <BannerHomePageList>
          <TitlePage
            title="List Work"
            titleList="Work todday"
            rest="all work(0)"
          />
          <Box
            justifyContent="center"
            alignItems="center"
            gap={2}
            marginBottom={1}
            marginTop={2}
          >
            <TabContext value={value}>
              <Box sx={{}}>
                <TabList
                  className="tab-list-mui"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <BannerHomePageButtonListTab
                    label="Sap tra phong (0)"
                    value="1"
                  />
                  <BannerHomePageButtonListTab label="Item Two" value="2" />
                  <BannerHomePageButtonListTab label="Item Three" value="3" />
                </TabList>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained">Load new activity</Button>
              </Box>

              <Box className="tab-list-data-mui">
                <TabPanel value="1">
                  <Box>
                    <Box>
                      <Typography>TODAY</Typography>
                    </Box>
                    <Box>
                      <Button
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                      >
                        <Box style={{ display: "flex" }}>
                          <Box mr={2}>
                            <img
                              style={{ width: "25px", borderRadius: "6px" }}
                              src="https://thecodeduck.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10412?size=medium"
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            style={{
                              color: "black",
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          >
                            sdas
                          </Typography>
                          <Box
                            style={{
                              display: "flex",
                              color: "#6b778c",
                              fontSize: "11px !important",
                            }}
                          >
                            <Typography style={{ fontSize: "11px" }}>
                              adasd
                            </Typography>
                            <Box mx={2}>º</Box>
                            <Typography style={{ fontSize: "11px" }}>
                              adasd
                            </Typography>
                          </Box>
                        </Box>
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                      >
                        <Box style={{ display: "flex" }}>
                          <Box mr={2}>
                            <img
                              style={{ width: "25px", borderRadius: "6px" }}
                              src="https://thecodeduck.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10412?size=medium"
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            style={{
                              color: "black",
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          >
                            sdas
                          </Typography>
                          <Box
                            style={{
                              display: "flex",
                              color: "#6b778c",
                              fontSize: "11px !important",
                            }}
                          >
                            <Typography style={{ fontSize: "11px" }}>
                              adasd
                            </Typography>
                            <Box mx={2}>º</Box>
                            <Typography style={{ fontSize: "11px" }}>
                              adasd
                            </Typography>
                          </Box>
                        </Box>
                      </Button>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  {/* <TransitionGroup component={Grid} container spacing={2}> */}

                  {/* Add more Grid items for content under TabPanel value="2" */}
                  {/* </TransitionGroup> */}
                </TabPanel>
                <TabPanel value="3"></TabPanel>
              </Box>
            </TabContext>
          </Box>
        </BannerHomePageList>
      </BannerContent>
    </BannerContainer>
   </>
  );
}

ListWork.propTypes = {};

export default ListWork;
