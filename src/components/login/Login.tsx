import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlinePhone, AiOutlineLock, AiOutlineShop } from "react-icons/ai";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify

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
import { DataContext } from "../../store/dataContext/DataContext";
import axios from "axios";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../store/apiInterceptors";

function Login() {
  const navigate = useNavigate();
  const { refeshLogin, setRefeshLogin, setRefeshTour } =
    React.useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSignIn = async () => {
    setOpenLoading(true);
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
      console.log(response);
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("refresh_token", response.data.data.refresh_token);
      setRefeshTour((prev) => !prev);
      setRefeshLogin((prev) => !prev);
      navigate("/listtour");
      if (response.status === 200) {
        if (response !== undefined) {
          const additionalResponse = await axios.get(`${BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${response.data.data.access_token}`,
            },
          });
          if (additionalResponse.status === 200) {
            // dispatch(personalInfo(additionalResponse.data));
          }
          toast.success("SignIn success!"); // Thông báo đăng nhập thành công
        } else {
          console.log("Lỗi khi đăng nhập");
          toast.error("SignIn fail!"); // Thông báo đăng nhập thất bại
        }
      } else {
        console.log("Lỗi khi đăng nhập");
        toast.error("SignIn fail!"); // Thông báo đăng nhập thất bại
      }
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
          <Grid
            item
            xs={4}
            style={{
              // backgroundColor: "#f9fbfc",
              borderRadius: "8px 0 0 8px",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div className="absolute top-5 left-5">
              <div className="flex items-center justify-center font-medium text-2xl"></div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <p className="font-bold text-4xl mb-6">Welcome Back!</p>
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
                  <Link to="/signup">
                    <Button
                      fullWidth
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #e7e7eb",
                        color: "black",
                        width: "250px",
                        borderRadius: "10px",
                        textTransform: "none",
                      }}
                    >
                      Don't have an account
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
                    Sign in to your account
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
                    handleSignIn();
                  }}
                >
                  <FormControl required>
                    <span className=" font-medium mb-1">Phone Number</span>
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
                    <p className="font-medium mb-1">Password</p>
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
                  <ButtonGlobal
                    style={{ width: "450px" }}
                    type="submit"
                    fullWidth
                    onClick={handleSignIn}
                  >
                    Sign in
                  </ButtonGlobal>
                </form>
                {/* <Box sx={{ position: "relative", margin: 0.5 }}>
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
                </Box> */}
                {/* <ContinueGoogle /> */}
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

export default Login;
