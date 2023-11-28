import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlinePhone } from "react-icons/ai";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify
import forgot from "../../assets/forgot.svg";
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
import "../login/login.scss";
import {
  ButtonGlobal,
  ContainerPageFullHalf,
} from "../../styles/global/StyleGlobal";
import { ContainerPageFullHalfContent } from "../../styles/global/ContainerPageFullHalfContent";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/dataContext/DataContext";
import axios from "axios";
import { BASE_URL } from "../../store/apiInterceptors";
import { FaArrowLeft } from "react-icons/fa6";

function ForgotPassWord() {
  const navigate = useNavigate();
  const { refeshLogin, setRefeshLogin } = React.useContext(DataContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openLoading, setOpenLoading] = useState(false);
  useEffect(() => {
    checkAccessToken();
  }, [refeshLogin]);

  const checkAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/listtour");
    }
  };

  const handleOtp = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/otp/generate`,
        {
          email: phoneNumber,
          type: "REGISTER_USER",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setRefeshLogin((prev) => !prev);

      setOpenLoading(false);
    } catch (error: any) {
      console.error(error);
      setOpenLoading(false);

      // Xử lý thông báo lỗi từ máy chủ
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
              <img src={forgot} className="w-[50vh] h-[50vh]" alt="error" />
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
                  maxWidth: "100%",
                  mx: "auto",
                  borderRadius: "sm",
                  width: "450px",
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
                  <p className="font-medium text-2xl">Forgot password?</p>
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
                    handleOtp();
                  }}
                >
                  <FormControl required>
                    <span className=" font-medium mb-1">Email</span>
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
                </form>

                <ButtonGlobal
                  style={{ width: "450px" }}
                  type="submit"
                  fullWidth
                  onClick={handleOtp}
                >
                  Reset password
                </ButtonGlobal>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-navy-blue hover:text-black "
                >
                  <FaArrowLeft className="text-navy-blue" />
                  <button className="font-medium ">Sign up here</button>
                </Link>
              </Box>
              <Box component="footer" sx={{ py: 3 }}>
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

export default ForgotPassWord;
