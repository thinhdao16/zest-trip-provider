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
import { ContainerPageFullHalf } from "../../styles/global/StyleGlobal";
import { ContainerPageFullHalfContent } from "../../styles/global/ContainerPageFullHalfContent";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { becomeProvider } from "../../store/redux/silce/providerSlice";
import jwt_decode from "jwt-decode";

function SetUpProvider() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
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
  const Confirm = () => {
    const token: any = localStorage.getItem("access_token_signup");
    const decode: any = jwt_decode(token);
    if (decode.id) {
      const formData = new FormData();
      formData.append("user_id", decode?.id);
      formData.append(
        "website_url",
        userServiceConfiguration?.userInfo?.webCompnany
      );
      formData.append(
        "country_code",
        userServiceConfiguration?.userInfo?.region
      );
      formData.append("description", "what the hell");
      formData.append("phone", "0975647951");
      formData.append("email", "daothinh1105@gmai.com");
      formData.append("address", userServiceConfiguration?.userInfo?.address);
      formData.append("status", "what is status");
      formData.append(
        "companyName",
        userServiceConfiguration?.userInfo?.nameCompany
      );
      formData.append(
        "serviceType",
        // userServiceConfiguration?.selectedPlan?.serviceType
        "Domestic"
      );
      // const file = userServiceConfiguration?.userInfo?.file[0]; // Lấy đối tượng File hoặc Blob từ userInfo
      formData.append("file", userServiceConfiguration?.userInfo?.file[0]);
      // Chuyển đổi File/Blob thành chuỗi base64
      // const fileReader = new FileReader();
      // fileReader.onload = (event: any) => {
      //   const base64Data = event.target.result;
      //   formData.append("file", base64Data); // Thêm chuỗi base64 vào FormData
      // };
      // fileReader.readAsDataURL(file);
      dispatch(
        becomeProvider({
          formData,
          onSuccessCallback: () => {
            navigate("/login");
          },
        })
      );
    } else {
      alert("dont have userId");
    }

    // navigate("/listwork");
  };
  return (
    <>
      <ContainerPageFullHalf>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
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
                position: "relative",
                zIndex: "99",
                backgroundImage:
                  "url(https://cdnimgen.vietnamplus.vn/uploaded/oplukat/2022_12_02/hochiminh.jpg)",
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
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
                  // maxWidth: "100%",
                  mx: "auto",
                  px: 10,
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
                <Sidebar currentStep={step} handleNextStep={nextStep} />

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
                <div style={{}}>
                  <menu className=" flex items-center p-4 flex-col mb-5">
                    <div className="flex">
                      <div>
                        {step > 1 && (
                          <Button
                            style={{ textTransform: "none" }}
                            onClick={goBack}
                          >
                            Go Back
                          </Button>
                        )}
                      </div>
                      <div>
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
                            onClick={() => Confirm()}
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </div>
                  </menu>
                  <Typography mb={4} level="body-md" textAlign="center">
                    © DiTour {new Date().getFullYear()}
                  </Typography>
                </div>
              </Box>
            </ContainerPageFullHalfContent>
          </Grid>
        </Grid>
      </ContainerPageFullHalf>
    </>
  );
}

export default SetUpProvider;
