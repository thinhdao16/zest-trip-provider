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
  CircularProgress,
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
import { toast } from "react-toastify";

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
  const [openLoading, setOpenLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleClose = () => setOpen(false);
  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Kiểm tra độ dài của mật khẩu
    if (newPassword.length >= 8) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }

    // Kiểm tra xem mật khẩu khớp với mật khẩu xác nhận không
    if (newPassword === confirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Kiểm tra xem mật khẩu khớp với mật khẩu xác nhận không
    if (password === newConfirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

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
    setOpenLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/otp/generate`,
        {
          email: email,
          type: "REGISTER_USER",
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
        toast.warn("OTP sent to mail successfully!"); // Thông báo OTP đã gửi thành công
      } else {
        alert("email unknow");
        toast.error("Failed to send OTP!"); // Thông báo gửi OTP thất bại
      }
      setOpenLoading(false);
    } catch (error: any) {
      setOpenLoading(false);
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessages = error.response.data.message;
        errorMessages.forEach((errorMessage: string) => {
          toast.error(errorMessage); // Thông báo đăng nhập thất bại
        });
      } else {
        toast.error("SignIn fail!"); // Thông báo đăng nhập thất bại mặc định
      }
    }
  };

  const handleSignUp = async () => {
    setOpenLoading(true);
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
        toast.success("SignUp success!"); // Thông báo đăng ký thành công
      } else {
        alert("email unknow");
        toast.error("SignUp fail!"); // Thông báo đăng ký thất bại
      }
      setOpenLoading(false);
    } catch (error) {
      console.error(error);
      setOpenLoading(false);
      toast.error("SignUp fail!"); // Thông báo đăng ký thất bại
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
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
        onClick={() => setOpenLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ContainerPageFullHalf>
        <Grid container>
          <Grid
            item
            xs={4}
            style={{
              backgroundColor: "#f9fbfc",
              borderRadius: "8px 0 0 8px",
              padding: "30px",
              display: "flex",
              // flexDirection: "column",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div className="absolute top-5 left-5">
              <div className="flex items-center text-2xl font-medium">
                {/* <AiOutlineShop /> <p>DiTour</p> */}
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <p className="font-bold text-4xl mb-6">Create Account</p>
              <ul className="mb-6">
                <li>⨀ Exclusive discounts 🎉🎉🎉</li>
                <li>⨀ Tailored recommendation</li>
                <li>⨀ Advance custiomer support</li>
                <li>⨀ Save details for next up </li>
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "center ",
                }}
              >
                <div>
                  <Link to="/login">
                    <Button
                      fullWidth
                      style={{
                        backgroundColor: "#e7e7eb",
                        border: "1px solid #e7e7eb",
                        color: "black",
                        width: "250px",
                        borderRadius: "10px",
                        textTransform: "none",
                      }}
                    >
                      You have an account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={8}>
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
                  <p className="font-medium text-2xl">
                    Sign up to your account
                  </p>
                  <p className="font-medium text-sm text-gray-600">
                    Enter your credentials to continue
                  </p>
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
                      onChange={handlePasswordChange}
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
                    {!isPasswordValid && (
                      <p style={{ color: "red" }}>
                        Password must be at least 8 characters long.
                      </p>
                    )}
                  </FormControl>

                  <FormControl required>
                    <FormLabel>Confirm Password</FormLabel>
                    <TextField
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
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
                    {!isPasswordMatch && (
                      <p style={{ color: "red" }}>Passwords do not match.</p>
                    )}
                  </FormControl>

                  <ButtonGlobal
                    style={{ width: "450px" }}
                    type="submit"
                    onClick={handleGetOtp}
                    fullWidth
                  >
                    Sign Up
                  </ButtonGlobal>
                  {/* </Box> */}
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
                          <p className=" text-gray-400 leading-5 mt-2 font-medium">
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
                              <div className="otp-input-container ">
                                <input
                                  {...props}
                                  className="otp-input border-b-2 border-gray-400 focus:border-navy-blue focus:border-b-2 focus:outline-none text-navy-blue"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    textAlign: "center",
                                    borderRadius: "3px",
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
                              <p className="line-clamp-2 font-medium text-gray-400">
                                Response OTP in
                                <span className="font-medium text-navy-blue">
                                  ({minutes < 10 ? `0${minutes}` : minutes}:
                                  {seconds < 10 ? `0${seconds}` : seconds})
                                </span>
                              </p>
                            ) : (
                              <></>
                            )}

                            <button
                              disabled={seconds > 0 || minutes > 0}
                              className={
                                seconds > 0 || minutes > 0
                                  ? "hidden"
                                  : "bg-white border-b border-navy-blue text-navy-blue font-medium hover:border-black hover:text-black"
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
                            className="text-white focus:ring-4 font-medium border border-navy-blue rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-navy-blue hover:bg-white hover:border hover:border-navy-blue hover:text-navy-blue "
                          >
                            Verify & Continue
                          </button>
                        </div>
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              </Box>
              <Box component="footer" sx={{ pb: 3 }}>
                <Typography level="body-md" textAlign="center">
                  © ZestTravel {new Date().getFullYear()}
                </Typography>
              </Box>
            </ContainerPageFullHalfContent>
          </Grid>
        </Grid>
      </ContainerPageFullHalf>
    </>
  );
}
