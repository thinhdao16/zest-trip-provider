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
                <Grid item xs={12} sm={4}>
                  <CardList
                    icon={<AiOutlineProfile />}
                    title="thong tin ca nha"
                    description="cung cap thong tin lien he cho chung toi co the lie he voi ban"
                    to="/account-settings/personal-info"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CardList
                    icon=""
                    title="thong tin ca nha"
                    description="="
                    to=""
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CardList
                    icon=""
                    title="thong tin ca nha"
                    description="="
                    to=""
                  />
                </Grid>
              </Grid>
            </Box>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-10">
              {/* Component Start */}
              <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                  <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod.
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.{" "}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.{" "}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt.
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.{" "}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">Lorem ipsum dolor sit.</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        2 min ago
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                </div>

                <div className="bg-gray-300 p-4">
                  <input
                    className="flex items-center h-10 w-full rounded px-3 text-sm"
                    type="text"
                    placeholder="Type your message…"
                  />
                </div>
              </div>
              {/* Component End  */}
            </div>
          </BannerPageList>
        </BannerContent>
      </BannerContainer>
    </React.Fragment>
  );
}

AccountSettings.propTypes = {};

export default AccountSettings;
