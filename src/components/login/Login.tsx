import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlinePhone, AiOutlineLock, AiOutlineShop } from "react-icons/ai";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import ContinueGoogle from "../continueGoogle/ContinueGoogle";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
import "./login.scss";
import {
  ButtonGlobal,
  ContainerPageFullHalf,
} from "../../styles/global/StyleGlobal";
import { ContainerPageFullHalfContent } from "../../styles/global/ContainerPageFullHalfContent";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { DataContext } from "../../store/dataContext/DataContext";
import axios from "axios";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { personalInfo } from "../../store/redux/silce/authSilce";
import { BASE_URL } from "../../store/apiInterceptors";

function Login() {
  const navigate = useNavigate();
  const { refeshLogin, setRefeshLogin, setRefeshTour } =
    React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkAccessToken();
  }, [refeshLogin]);

  const checkAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/listtour");
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signin`,
        {
          email: phoneNumber,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("refresh_token", response.data.data.refresh_token);
      setRefeshTour((prev) => !prev);
      setRefeshLogin((prev) => !prev);
      navigate("/listtour");
      if (response.status === 201) {
        if (response !== undefined) {
          const additionalResponse = await axios.get(`${BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${response.data.data.access_token}`,
            },
          });
          if (additionalResponse.status === 200) {
            dispatch(personalInfo(additionalResponse.data));
          }
        } else {
          console.log("Lỗi khi đăng nhập");
        }
      } else {
        console.log("Lỗi khi đăng nhập");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ContainerPageFullHalf>
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: "#f9fbfc",
              borderRadius: "8px 0 0 8px",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Typography
              component="h1"
              fontSize="xl2"
              fontWeight="lg"
              sx={{ mb: 5, display: "flex" }}
            >
              <AiOutlineShop style={{ margin: "8px 8px 0 0 " }} /> DiTour
            </Typography>
            <ul>
              <li>⨀ Exclusive discounts 🎉🎉🎉</li>
              <li>⨀ Tailored recommendation</li>
              <li>⨀ Advance custiomer support</li>
              <li>⨀ Save details for next up </li>
            </ul>
            <div style={{ marginTop: "auto" }}>
              <Link to="/signup">
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e7e7eb",
                    color: "black",
                  }}
                >
                  Don't have an account
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item xs={6}>
            <ContainerPageFullHalfContent>
              <Box
                component="main"
                sx={{
                  my: "auto",
                  py: 2,
                  pb: 5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: 400,
                  maxWidth: "100%",
                  mx: "auto",
                  borderRadius: "sm",
                  "& form": {
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  },
                  [`& .${formLabelClasses.asterisk}`]: {
                    visibility: "hidden",
                  },
                }}
              >
                <div>
                  <Typography component="h1" fontSize="xl2" fontWeight="lg">
                    Sign in to your account
                  </Typography>
                  <Typography level="body-xs" sx={{ my: 1, mb: 1 }}>
                    Enter your credentials to continue
                  </Typography>
                </div>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    event.preventDefault();
                    const formElements = event.currentTarget.elements;
                    const data = {
                      email: formElements.email.value,
                      password: formElements.password.value,
                      persistent: formElements.persistent.checked,
                    };
                    alert(JSON.stringify(data, null, 2));
                    handleSignIn();
                  }}
                >
                  <FormControl required>
                    <FormLabel>Phone Number</FormLabel>
                    <TextField
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      value={phoneNumber}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiOutlinePhone />
                          </InputAdornment>
                        ),
                      }}
                      className="input-form-text-ready"
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <TextField
                      required
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiOutlineLock />
                          </InputAdornment>
                        ),
                      }}
                      className="input-form-text-ready"
                    />
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* <Link
                    fontSize="sm"
                    href="#replace-with-a-link"
                    fontWeight="lg"
                  >
                    Forgot your password
                  </Link> */}
                  </Box>
                  <ButtonGlobal type="submit" fullWidth onClick={handleSignIn}>
                    Sign in
                  </ButtonGlobal>
                </form>
                <Box sx={{ position: "relative", margin: 0.5 }}>
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "#fff",
                      padding: "0 10px 0 10px",
                    }}
                  >
                    or
                  </span>
                  <hr
                    style={{
                      borderColor: "#000",
                      borderTop: "1px solid #dfdfdf",
                      width: "100%",
                      marginTop: 3,
                    }}
                  />
                </Box>
                <ContinueGoogle />
              </Box>
            </ContainerPageFullHalfContent>
            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-md" textAlign="center">
                © DiTour {new Date().getFullYear()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ContainerPageFullHalf>
    </>
  );
}

export default Login;
