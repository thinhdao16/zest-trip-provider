import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlinePhone, AiOutlineLock } from "react-icons/ai";
import {
  InputAdornment,
  TextField,
  Grid,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
} from "@mui/material";
import { IoPersonOutline, IoAlertCircleOutline } from "react-icons/io5";
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
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [openLoading, setOpenLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPhoneMatch, setIsPhoneMatch] = useState(true);
  const [isEmailMatch, setIsEmailMatch] = useState(true);

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
    if (
      !phoneNumber.trim() ||
      !email.trim() ||
      !fullName.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      // Nếu rỗng, hiển thị thông báo hoặc thực hiện các hành động khác
      toast.warn("please input do not leave empty");
      return;
    } else {
      setOpenLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/otp/generate/provider`,
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
          setSeconds(1);
          toast.warn("OTP sent to mail successfully!");
        } else {
          alert("email unknow");
          toast.error("Failed to send OTP!");
        }
        setOpenLoading(false);
      } catch (error: any) {
        setOpenLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessages = error.response.data.message;

          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((errorMessage: string) => {
              console.log(errorMessage);
              toast.error(errorMessage);
            });
          } else if (typeof errorMessages === "string") {
            console.log(error);
            toast.error(errorMessages);
          } else {
            toast.error("SignIn fail!");
          }
        } else {
          toast.error("SignUp fail!");
        }
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
        const informationSetUp = { phoneNumber, email };
        const informationSetUpString = JSON.stringify(informationSetUp);
        localStorage.setItem("information_setup", informationSetUpString);
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
        toast.success("SignUp success!"); // Thông báo đăng ký thành công
      } else {
        alert("email unknow");
        toast.error("SignUp fail!"); // Thông báo đăng ký thất bại
      }
      setOpenLoading(false);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessages = error.response.data.message;

        if (Array.isArray(errorMessages)) {
          errorMessages.forEach((errorMessage: string) => {
            console.log(errorMessage);
            toast.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(error);
          toast.error(errorMessages);
        } else {
          toast.error("SignIn fail!");
        }
      } else {
        toast.error("SignUp fail!");
      }
      setOpenLoading(false);
      toast.error("SignUp fail!"); // Thông báo đăng ký thất bại
    }
  };

  const resendOTP = () => {
    handleGetOtp();
  };

  const handlePhoneNumberChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);

    // Biểu thức chính quy kiểm tra số điện thoại theo mẫu số Việt Nam
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const isValidPhone = phoneRegex.test(inputValue);

    // Kiểm tra chiều dài số điện thoại và xem nó có hợp lệ không
    if (isValidPhone) {
      setIsPhoneMatch(true);
    } else {
      setIsPhoneMatch(false);
    }
  };

  const handleEmailChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;

    const isEmailMatch = inputValue.toLowerCase().endsWith("@gmail.com");

    setEmail(inputValue);
    setIsEmailMatch(isEmailMatch);
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
          <Grid item xs={5} className="login-main">
            <div className="relative flex items-center justify-center h-[100vh] flex-col">
              <div className="flex items-center justify-center flex-col gap-3 ">
                <div className="flex gap-2 font-medium items-center text-3xl ">
                  <p>Welcome to</p>
                  <p className="  text-navy-blue ">Zest Travel</p>
                </div>
                <ul className="">
                  <li className="font-base">Exclusive discounts 🎉🎉🎉</li>
                </ul>
              </div>
              <img
                src="src\assets\register.svg"
                className="w-[50vh] h-[50vh]"
                alt="error"
              />
            </div>
          </Grid>
          <Grid item xs={7}>
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
                  width: 450,
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
                      onChange={handleEmailChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IoPersonOutline />
                          </InputAdornment>
                        ),
                      }}
                      className="input-form-text-ready"
                      error={!isEmailMatch}
                      helperText={
                        isEmailMatch ? "" : "Email must end with @gmail.com"
                      }
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
                      error={fullName.length === 0}
                      helperText={
                        fullName.length != 0
                          ? ""
                          : "Full name do not leave empty"
                      }
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Phone Number</FormLabel>
                    <TextField
                      type="number"
                      onChange={handlePhoneNumberChange}
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
                      error={!isPhoneMatch}
                      helperText={
                        isPhoneMatch
                          ? ""
                          : "Phone number must be at 10 characters and start 0"
                      }
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
                      error={!isPasswordValid}
                      helperText={
                        isPasswordValid
                          ? ""
                          : " Password must be at least 8 characters long."
                      }
                    />
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
                      error={!isPasswordMatch}
                      helperText={
                        isPasswordMatch ? "" : " Passwords do not match."
                      }
                    />
                  </FormControl>

                  <ButtonGlobal
                    style={{ width: "450px" }}
                    type="submit"
                    onClick={handleGetOtp}
                    fullWidth
                  >
                    Sign Up
                  </ButtonGlobal>

                  <div className="flex items-center justify-center">
                    <div className="flex gap-4">
                      <span className="font-medium text-gray-600">
                        You have an account ?
                      </span>
                      <Link to="/login">
                        <button className="font-medium text-navy-blue hover:text-black border-b-2 border-navy-blue hover:border-b-black">
                          Login
                        </button>
                      </Link>
                    </div>
                  </div>
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
