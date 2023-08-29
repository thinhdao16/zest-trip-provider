import React from "react";
import Header from "../../../components/header/Header";
import {
  BannerContainer,
  BannerContent,
  BannerPageList,
} from "../../../styles/global/StyleGlobal";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserLarge } from "react-icons/fa6";
import { DetailAccountSettings } from "../../../components/accountSettings/DetailAccountSettings";

function PersonalInfo() {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState("Thinhdao"); // Initial value

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {

    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <React.Fragment>
      <Header />
      <BannerContainer>
        <BannerContent>
          <BannerPageList>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                <Link className="flex items-center" to="/account-settings">
                  <AiFillHome sx={{ mr: 0.5 }} fontSize="inherit" />
                  <p>Account</p>
                </Link>
                <p className="flex items-center">
                  <FaUserLarge sx={{ mr: 0.5 }} fontSize="inherit" />
                  Personal Infomation
                </p>
              </Breadcrumbs>
            </div>
            <Box mb={5} mt={2}>
              <p style={{ fontSize: "40px" }}>abc</p>
            </Box>
            <Grid container spacing={10}>
              <Grid item xs={7.5}>
                <Box style={{ borderBottom: "1px solid black" }}>
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
                        <p style={{ fontSize: "16px" }}>ten phap ly</p>
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
                          <p
                            style={{
                              color: "#717171",
                              fontSize: "16px",
                              marginTop: "4px",
                            }}
                          >
                            {editedValue}
                          </p>
                        )}
                      </Box>
                      <Box style={{ textAlign: "right", marginLeft: "16px" }}>
                        {isEditing ? (
                          <Button onClick={handleCancel}>cancel</Button>
                        ) : (
                          <Button onClick={handleEdit}>edit</Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                    {isEditing ? (
                      <Box style={{ paddingBottom: "24px" }}>
                        <Box style={{ marginBottom: "16px" }}>
                          <TextField
                            label="Full Name"
                            fullWidth
                            value={editedValue}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FaUserLarge />
                                </InputAdornment>
                              ),
                            }}
                            className="input-form-text-ready"
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                        </Box>
                        <Button onClick={handleSave}>save</Button>
                      </Box>
                    ) : (
                      <></>
                    )}
                </Box>
              </Grid>
              <Grid item xs={4.5}>
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
        </BannerContent>
      </BannerContainer>
    </React.Fragment>
  );
}

PersonalInfo.propTypes = {};

export default PersonalInfo;
