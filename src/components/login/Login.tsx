import React from "react";
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
  ContainerPageFullHalfContent,
} from "../../styles/global/StyleGlobal";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { DataContext } from "../../store/dataContext/DataContext";

function Login() {
  const navigate = useNavigate();
  const { refeshLogin, setRefeshLogin } = React.useContext(DataContext);
  const checkAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken !== null) {
      const decodedToken: any = jwt_decode(
        JSON.parse(accessToken)?.data?.access_token
      );
      const expTimestamp = decodedToken.exp;
      if (accessToken && expTimestamp > Date.now() / 1000) {
        setRefeshLogin((prev) => !prev);
        navigate("/listtour"); // Điều hướng nếu có accessToken còn hạn
      } else {
        // refreshToken(); // Gọi refreshToken nếu không có accessToken hoặc hết hạn
      }
    } else {
      setRefeshLogin((prev) => !prev);
      navigate("/login");
    }
  };
  // const refreshToken = async () => {
  //   // Gọi API refreshToken ở đây
  //   try {
  //     const response = "aabc"
  //     // const newAccessToken = response.data.accessToken;
  //     const newAccessTokenExp = response.data.accessTokenExp;

  //     localStorage.setItem('accessToken', newAccessToken);
  //     localStorage.setItem('accessTokenExp', newAccessTokenExp);

  //     navigate('/listtour'); // Điều hướng sau khi refreshToken thành công
  //   } catch (error) {
  //     // Xử lý lỗi refreshToken
  //     console.error('Error refreshing token:', error);
  //   }
  // };

  React.useEffect(() => {
    checkAccessToken();
  }, [refeshLogin]);
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
                  }}
                >
                  <FormControl required>
                    <FormLabel>Phone Number</FormLabel>
                    <TextField
                      required
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
                  <ButtonGlobal type="submit" fullWidth>
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
