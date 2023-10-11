import React from "react";
import Header from "../../../components/header/Header";
import {
  BannerContainer,
  BannerContent,
  BannerPageList,
} from "../../../styles/global/StyleGlobal";
import { Box, Breadcrumbs, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserLarge, FaWallet } from "react-icons/fa6";
import { DetailAccountSettings } from "../../../components/accountSettings/DetailAccountSettings";
import { useSelector } from "react-redux";

function PersonalInfo() {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const [isEditing, setIsEditing] = React.useState(false);
  const { personalInfo } = useSelector((state: any) => state.auth);
  const [editedValue, setEditedValue] = React.useState(
    personalInfo?.full_name || "please input name"
  ); // Initial value

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleEditLegalName = (e: any) => {
    setEditedValue(e);
  };
  return (
    <React.Fragment>
      <div>
        <div>
          <BannerPageList>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                <Link
                  className="flex items-center gap-1"
                  to="/account-settings"
                >
                  <FaWallet fontSize="inherit" />
                  <p className="font-medium">Account</p>
                </Link>
                <p className="flex items-center gap-1 font-medium">
                  <FaUserLarge sx={{ mr: 0.5 }} fontSize="inherit" />
                  Personal Infomation
                </p>
              </Breadcrumbs>
            </div>
            <Box mb={5} mt={2}>
              <p className="text-4xl font-medium ">Personal infomation</p>
            </Box>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={7.5}>
                <div className="border-b border-gray-300 border-solid">
                  <Box style={{ padding: "24px 0" }}>
                    <Box style={{ display: "flex" }}>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          flex: 1,
                          width: "100%",
                        }}
                      >
                        <p className="font-medium">Legal name</p>
                        {isEditing ? (
                          <React.Fragment>
                            <p
                              style={{
                                marginTop: "4px",
                                color: "#717171",
                                fontSize: "14px",
                              }}
                            >
                              {" "}
                              Đây là tên trên giấy tờ thông hành của bạn, có thể
                              là giấy phép hoặc hộ chiếu.
                            </p>
                          </React.Fragment>
                        ) : (
                          <p className="text-gray-600">{editedValue}</p>
                        )}
                      </Box>
                      <Box style={{ textAlign: "right", marginLeft: "16px" }}>
                        {isEditing ? (
                          <button
                            className="border border-navy-blue py-2 px-4 rounded-lg text-navy-blue hover:bg-navy-blue hover:text-white"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            className="bg-navy-blue py-2 text-white px-4 rounded-lg hover:bg-white hover:border-navy-blue border  hover:text-navy-blue"
                            onClick={handleEdit}
                          >
                            Edit
                          </button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {isEditing ? (
                    <Box style={{ paddingBottom: "24px" }}>
                      <div className="relative mb-5">
                        <FaUserLarge className="absolute top-3.5 left-4 " />
                        <input
                          onChange={(e) => {
                            handleEditLegalName(e.target.value);
                          }}
                          value={editedValue}
                          className="border pl-10 border-gray-300 rounded-md py-2 px-4 w-full hover:border-navy-blue focus:border-navy-blue focus:outline-none"
                        />
                      </div>
                      <button
                        className="bg-navy-blue py-2 text-white px-4 rounded-lg hover:bg-white hover:border-navy-blue border  hover:text-navy-blue"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </Box>
                  ) : (
                    <></>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <Box
                  style={{
                    border: "1px solid #DDDDDD",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <DetailAccountSettings
                    icon={<AiFillHome />}
                    title="Tại sao thông tin của tôi không được hiển thị ở đây?"
                    description="Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính của bạn."
                  />
                  <hr style={{ margin: "32px 0" }} />
                  <DetailAccountSettings
                    icon={<AiFillHome />}
                    title="Tại sao thông tin của tôi không được hiển thị ở đây?"
                    description="Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính của bạn."
                  />
                </Box>
              </Grid>
            </Grid>
          </BannerPageList>
        </div>
      </div>
    </React.Fragment>
  );
}

PersonalInfo.propTypes = {};

export default PersonalInfo;
