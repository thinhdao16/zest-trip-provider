import React from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlinePhone, AiOutlineShop, AiOutlineLock } from "react-icons/ai";
import {
  InputAdornment,
  TextField,
  Grid,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import {
  IoEarthOutline,
  IoPersonOutline,
  IoTransgenderOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import jwt_decode from "jwt-decode";
import "./signUp.scss";
import ContinueGoogle from "../continueGoogle/ContinueGoogle";
import {
  ButtonGlobal,
  ContainerPageFullHalf,
  ContainerPageFullHalfContent,
} from "../../styles/global/StyleGlobal";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/dataContext/DataContext";
import { BASE_URL } from "../../store/apiInterceptors";
import axios from "axios";
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
  const { refeshLogin, setRefeshLogin, setRefeshTour } =
    React.useContext(DataContext);

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
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
        `${BASE_URL}/auth/signup`,
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
      if (response.status === 201) {
        alert("you signup successfully");
      } else {
        console.log("first");
      }
    } catch (error) {
      console.error(error);
    }
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
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <FormControl required>
                    <FormLabel>Region</FormLabel>
                    <TextField
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IoEarthOutline />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="+84 VN"
                      className="input-form-text-ready"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={9}>
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
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <FormControl required>
                    <FormLabel>Full Name</FormLabel>
                    <TextField
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
                </Grid>
                <Grid item xs={4}>
                  <FormControl required>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      required
                      style={{ height: 40, borderRadius: "8px" }}
                      startAdornment={
                        <InputAdornment position="start">
                          <IoTransgenderOutline />
                        </InputAdornment>
                      }
                      value={"abcdef"}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
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
                <ButtonGlobal type="submit" onClick={handleSignIn} fullWidth>
                  Sign Up
                </ButtonGlobal>
              </Box>
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
