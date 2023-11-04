import React from "react";
import { BannerContent } from "../../styles/global/StyleGlobal";
import { TitlePage } from "../../components/titlepage/TitlePage";
import { Box, Grid } from "@mui/material";
import { CardList } from "../../components/card/CardList";
import { AiOutlineProfile } from "react-icons/ai";

function AccountSettings() {
  return (
    <React.Fragment>
      {/* <BannerContainer> */}
      <BannerContent>
        <div>
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
              <Grid item xs={12} sm={4}>
                <CardList
                  icon={<AiOutlineProfile />}
                  title="Infomation personal"
                  description="cung cap thong tin lien he cho chung toi co the lie he voi ban"
                  to="/account-settings/personal-info"
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </BannerContent>
      {/* </BannerContainer> */}
    </React.Fragment>
  );
}

AccountSettings.propTypes = {};

export default AccountSettings;
