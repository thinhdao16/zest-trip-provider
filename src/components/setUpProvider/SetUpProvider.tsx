import { useState } from "react";
import { Plan, UserInfo, UserServiceConfiguration } from "AppTypes";
import { Sidebar } from "./components/sidebar";
import { PersonalInfo } from "./components/personalInfo";
import { SelectPlan } from "./components/selectPlan";
import { Addons } from "./components/Addons";
import { ServiceSummary } from "./components/serviceSummary";
import { ThankYou } from "./components/thankYou";
import { Box, Button } from "@mui/material";
import { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlineShop } from "react-icons/ai";
import {
  ContainerPageFullHalf,
  ContainerPageFullHalfContent,
} from "../../styles/global/StyleGlobal";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
function SetUpProvider() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);
  const [userServiceConfiguration, setUserServiceConfiguration] =
    useState<UserServiceConfiguration>({
      userInfo: {
        nameCompany: "",
        region: "",
        address: "",
        webCompnany: "",
        mediaSocial: "",
        file: [],
      },
      selectedPlan: null,
      monthly: true,
      addons: [],
    });
  const updateUserInfo = (userInfo: UserInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, userInfo });
  };
  const updateSelectedPlan = (plan: Plan) => {
    setUserServiceConfiguration({
      ...userServiceConfiguration,
      selectedPlan: plan,
    });
  };

  const nextStep = (onGoingStep?: number) => {
    if (step === 5) return;
    if (step === 1 || (onGoingStep && onGoingStep !== 1 && step === 1)) {
      if (
        !userServiceConfiguration.userInfo.nameCompany ||
        !userServiceConfiguration.userInfo.region ||
        !userServiceConfiguration.userInfo.address
      ) {
        setShowRequiredFields(true);
        return;
      }
    }
    setStep((step) => {
      if (onGoingStep) return onGoingStep;
      return step + 1;
    });
  };

  const goBack = () => {
    if (step === 1) return;
    setStep((step) => step - 1);
  };
  const Confirm = (e: any) => {
    e.preventDefault();
    navigate("/listwork");
  };
  return (
    <>
      <ContainerPageFullHalf>
        <Grid container>
          <Grid
            item
            xs={2.5}
            style={{
              padding: "13px",
            }}
          >
            <Box
              style={{
                backgroundColor: "#f9fbfc",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "30px",
              }}
            >
              <Link to="/">
                <Typography
                  component="h1"
                  fontSize="xl2"
                  fontWeight="lg"
                  sx={{ mb: 5, display: "flex" }}
                >
                  <AiOutlineShop style={{ margin: "8px 8px 0 0 " }} /> DiTour
                </Typography>
              </Link>
              <Sidebar currentStep={step} handleNextStep={nextStep} />
              {/* {step < 5 && ( */}
              <menu className="flex justify-between p-4 mt-auto">
                <li>
                  <Button style={{ textTransform: "none" }} onClick={goBack}>
                    Go Back
                  </Button>
                </li>
                <li>
                  {step < 5 && (
                    <Button
                      style={{ textTransform: "none", color: "black" }}
                      onClick={() => nextStep()}
                    >
                      Next step
                    </Button>
                  )}
                  {step >= 5 && (
                    <Button
                      style={{ textTransform: "none", color: "black" }}
                      onClick={(e) => Confirm(e)}
                    >
                      Confirm
                    </Button>
                  )}
                </li>
              </menu>
              {/* )} */}
            </Box>
          </Grid>

          <Grid item xs={9.5}>
            <ContainerPageFullHalfContent>
              <Box
                component="main"
                sx={{
                  my: "auto",
                  py: 2,
                  pb: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minWidth: 400,
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
                {step >= 1 && step <= 4 && (
                  <div>
                    <Typography component="h1" fontSize="xl2" fontWeight="lg">
                      Sign in to your account
                    </Typography>
                    <Typography level="body-xs" sx={{ my: 1, mb: 1 }}>
                      Enter your credentials to continue
                    </Typography>
                  </div>
                )}
                <form className="">
                  {step === 1 && (
                    <PersonalInfo
                      userInfo={userServiceConfiguration.userInfo}
                      updateUserInfo={updateUserInfo}
                      showRequired={showRequired}
                    />
                  )}
                  {step === 2 && (
                    <SelectPlan
                      selectedPlan={userServiceConfiguration.selectedPlan}
                      updateSelectedPlan={updateSelectedPlan}
                    />
                  )}
                  {step === 3 && <Addons />}
                  {step === 4 && (
                    <ServiceSummary
                      userServiceConfiguration={userServiceConfiguration}
                    />
                  )}
                  {step === 5 && <ThankYou />}
                </form>
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

export default SetUpProvider;
