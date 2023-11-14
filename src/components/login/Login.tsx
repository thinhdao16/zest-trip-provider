import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlinePhone, AiOutlineLock } from "react-icons/ai";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  FormLabel,
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
import { BASE_URL } from "../../store/apiInterceptors";
import { IoPersonOutline } from "react-icons/io5";

function Login() {
  const navigate = useNavigate();
  const { refeshLogin, setRefeshLogin, setRefeshTour } =
    React.useContext(DataContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [openLoading, setOpenLoading] = useState(false);

  const [isEmailMatch, setIsEmailMatch] = useState(true);

  useEffect(() => {
    checkAccessToken();
  }, [refeshLogin]);

  const checkAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/");
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

        if (Array.isArray(errorMessages)) {
          errorMessages.forEach((errorMessage: string) => {
            console.log(errorMessage);
            toast.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          toast.error(errorMessages);
        } else {
          toast.error("SignIn fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("SignIn fail!"); // Thông báo đăng nhập thất bại mặc định
      }
    }
  };
  const handleEmailChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;

    // Kiểm tra xem địa chỉ email có kết thúc bằng "@gmail.com" không
    const isEmailMatch = inputValue.toLowerCase().endsWith("@gmail.com");

    setPhoneNumber(inputValue);
    setIsEmailMatch(isEmailMatch);
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
                src="src/assets/login.svg"
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
                    <p className="font-medium mb-1">Email</p>
                    <TextField
                      required
                      value={phoneNumber}
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
                    <p className="font-medium mb-1">Password</p>
                    <TextField
                      required
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Ngăn chặn sự kiện mặc định khi nhấn Enter
                          handleSignIn(); // Gọi hàm xử lý đăng nhập
                        }
                      }}
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
                    <div className="flex items-center">
                      <input
                        defaultChecked
                        id="checked-checkbox"
                        type="checkbox"
                        className="w-4 h-4 rounded-full  text-navy-blue  border-gray-300  focus:ring-navy-blue dark:focus:ring-navy-blue dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checked-checkbox"
                        className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgotpassword">
                      <button className="font-medium   text-navy-blue hover:text-black">
                        Forgot Password ?
                      </button>
                    </Link>
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

                <div className="flex items-center justify-center">
                  <div className="flex gap-4">
                    <span className="font-medium text-gray-600">
                      Don't have an account?
                    </span>
                    <Link to="/signup">
                      <button className="font-medium text-navy-blue hover:text-black border-b-2 border-navy-blue hover:border-b-black">
                        Sign up here
                      </button>
                    </Link>
                  </div>
                </div>

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
