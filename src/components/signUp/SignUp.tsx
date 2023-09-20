import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlinePhone, AiOutlineShop, AiOutlineLock } from "react-icons/ai";
import {
  InputAdornment,
  TextField,
  Grid,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { IoPersonOutline, IoAlertCircleOutline } from "react-icons/io5";
import { useTimer } from "react-timer-hook";
import "./signUp.scss";
import {
  ButtonGlobal,
  ContainerPageFullHalf,
} from "../../styles/global/StyleGlobal";
import { ContainerPageFullHalfContent } from "../../styles/global/ContainerPageFullHalfContent";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/dataContext/DataContext";
import { BASE_URL } from "../../store/apiInterceptors";
import axios from "axios";
import OtpInput from "react-otp-input";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { refeshLogin } = React.useContext(DataContext);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    checkAccessToken();
  }, [refeshLogin]);

  const checkAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/listtour");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  const handleGetOtp = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/otp/generate`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        setOpen(true);
        setMinutes(3);
        setSeconds(0);
      } else {
        alert("email unknow");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          fullName: fullName,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        setOpen(true);
        setMinutes(3);
        setSeconds(1);
        navigate("/setupprovider");
        localStorage.setItem(
          "access_token_signup",
          response.data.data.access_token
        );
      } else {
        alert("email unknow");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resendOTP = () => {
    handleGetOtp();
  };
  const style = {
    position: "absolute" as const,
    top: "50%" as const,
    left: "50%" as const,
    transform: "translate(-50%, -50%)" as const,
    width: 400 as const,
    boxShadow: 24 as const,
    p: 4 as const,
    background: "white",
    borderRadius: "15px",
    textAlign: "center",
  };

  return (
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
            <Link to="/login">
              <Button
                fullWidth
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e7e7eb",
                  color: "black",
                }}
              >
                You have account
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
                  Sign up to your account
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
                }}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IoPersonOutline />
                        </InputAdornment>
                      ),
                    }}
                    className="input-form-text-ready"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Full Name</FormLabel>
                  <TextField
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IoPersonOutline />
                        </InputAdornment>
                      ),
                    }}
                    className="input-form-text-ready"
                  />
                </FormControl>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
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
                <FormControl required>
                  <FormLabel>Confirm Password</FormLabel>
                  <TextField
                    required
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IoAlertCircleOutline />
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
                  <ButtonGlobal type="submit" onClick={handleGetOtp} fullWidth>
                    Sign Up
                  </ButtonGlobal>
                </Box>
              </form>
              <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <div className="mb-5">
                        <p className="font-semibold text-2xl">
                          Please Verify Account
                        </p>
                        <p className=" text-slate-400 leading-5 mt-2">
                          {/* Enter the six digit code we sent to your email address
                          to verify you new Nogard account */}
                          Enter the OTP sent to {email}
                        </p>
                      </div>
                      <div className="mb-4">
                        {" "}
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          // renderSeparator={<span className="font-bold">-</span>}
                          renderInput={(props: any) => (
                            <div className="otp-input-container">
                              <input
                                {...props}
                                className="otp-input"
                                style={{
                                  background: "#d8d9e1",
                                  width: "40px",
                                  height: "40px",
                                  textAlign: "center",
                                  borderRadius: "100%",
                                  boxShadow:
                                    "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                  fontWeight: 600,
                                  fontSize: "18px",
                                }}
                              />
                            </div>
                          )}
                          containerStyle={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px", // Khoảng cách giữa các ô nhập
                          }}
                        />
                      </div>
                      <div>
                        <div className="countdown-text">
                          {seconds > 0 || minutes > 0 ? (
                            <p className="line-clamp-2">
                              Time Remaining:{" "}
                              {minutes < 10 ? `0${minutes}` : minutes}:
                              {seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                          ) : (
                            <p>Didn't recieve code?</p>
                          )}

                          <button
                            disabled={seconds > 0 || minutes > 0}
                            className={
                              seconds > 0 || minutes > 0
                                ? "bg-stone-300 hover:bg-white"
                                : "bg-white hover:bg-stone-300"
                            }
                            onClick={resendOTP}
                          >
                            Resend OTP
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center mt-6">
                        <button
                          type="button"
                          onClick={handleSignUp}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Verify Content & Continue
                        </button>
                        <button
                          type="button"
                          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </Box>
          </ContainerPageFullHalfContent>
          <Box component="footer" sx={{ pb: 3 }}>
            <Typography level="body-lg" textAlign="center">
              © DiTour {new Date().getFullYear()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ContainerPageFullHalf>
  );
}
