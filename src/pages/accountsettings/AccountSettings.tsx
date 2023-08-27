import React from "react";
import PropTypes from "prop-types";
import {
  BannerContainer,
  BannerContent,
  BannerPageList,
} from "../../styles/global/StyleGlobal";
import Header from "../../components/header/Header";
import { TitlePage } from "../../components/titlepage/TitlePage";
import { Box, Grid } from "@mui/material";
import { CardList } from "../../components/card/CardList";
import { AiOutlineProfile } from "react-icons/ai";

function AccountSettings() {
  return (
    <React.Fragment>
      <Header />
      <BannerContainer>
        <BannerContent>
          <BannerPageList>
            <TitlePage
              title="Account"
              titleList="thinh dao"
              rest="daothinh1105@gmail.com"
            />
            <Box
              justifyContent="center"
              alignItems="center"
              gap={2}
              marginBottom={3}
              marginTop={8}
            >
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <CardList
                    icon={<AiOutlineProfile />}
                    title="thong tin ca nha"
                    description="cung cap thong tin lien he cho chung toi co the lie he voi ban"
                    to="/account-settings/personal-info"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CardList
                    icon=""
                    title="thong tin ca nha"
                    description="="
                    to=""
                  />
                </Grid>
                <Grid item xs={4}>
                  <CardList
                    icon=""
                    title="thong tin ca nha"
                    description="="
                    to=""
                  />
                </Grid>
              </Grid>
            </Box>
          </BannerPageList>
        </BannerContent>
      </BannerContainer>
    </React.Fragment>
  );
}

AccountSettings.propTypes = {};

export default AccountSettings;
