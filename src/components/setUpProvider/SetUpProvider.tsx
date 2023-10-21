import { useState } from "react";
import { Plan, UserInfo, UserServiceConfiguration } from "AppTypes";
import { Sidebar } from "./components/sidebar";
import { PersonalInfo } from "./components/personalInfo";
import { Addons } from "./components/Addons";
import { ServiceSummary } from "./components/serviceSummary";
import { ThankYou } from "./components/thankYou";
import { Box } from "@mui/material";
import { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { ContainerPageFullHalf } from "../../styles/global/StyleGlobal";
import { ContainerPageFullHalfContent } from "../../styles/global/ContainerPageFullHalfContent";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { becomeProvider } from "../../store/redux/silce/providerSlice";
import jwt_decode from "jwt-decode";
import "./styles/setup.css";
function SetUpProvider() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  useSelector((state: any) => state.provider);
  const [userServiceConfiguration, setUserServiceConfiguration] =
    useState<UserServiceConfiguration>({
      userInfo: {
        nameCompany: "",
        region: "",
        address: "",
        webCompnany: "",
        mediaSocial: "",
        taxCode: "",
        address_name: "",
        address_district: "",
        address_ward: "",
        address_province: "",
        address_country: "",
        file: [],
        avt: [],
        banner: [],
      },
      selectedPlan: null,
      monthly: true,
      addons: [],
    });
  console.log(userServiceConfiguration);
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
        !userServiceConfiguration.userInfo.nameCompany
        // !userServiceConfiguration.userInfo.address
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
      formData.append(
        "description",
        userServiceConfiguration?.userInfo?.mediaSocial
      );
      formData.append("phone", "0975647951");
      formData.append("email", "daothinh1105@gmai.com");
      formData.append("address", userServiceConfiguration?.userInfo?.address);
      formData.append("status", "what is status");
      formData.append(
        "companyName",
        userServiceConfiguration?.userInfo?.nameCompany
      );
      formData.append("taxCode", userServiceConfiguration?.userInfo?.taxCode);
      formData.append(
        "address_name",
        userServiceConfiguration?.userInfo?.address_name
      );
      formData.append(
        "address_district",
        userServiceConfiguration?.userInfo?.address_district
      );
      formData.append(
        "address_ward",
        userServiceConfiguration?.userInfo?.address_ward
      );
      formData.append(
        "address_province",
        userServiceConfiguration?.userInfo?.address_province
      );
      formData.append(
        "address_country",
        userServiceConfiguration?.userInfo?.address_country
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
          <Grid item xs={12} sm={5} className="setup-main">
            <div className="relative flex items-center justify-center h-[100vh] flex-col">
              <div className="flex items-center justify-center flex-col gap-3 ">
                <div className="flex gap-2 font-medium items-center text-3xl ">
                  <p>Become to</p>
                  <p className="  text-navy-blue ">Provider</p>
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
          <Grid item xs={12} sm={7}>
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
                      selectedPlan={userServiceConfiguration.selectedPlan}
                      updateSelectedPlan={updateSelectedPlan}
                      userInfo={userServiceConfiguration.userInfo}
                      updateUserInfo={updateUserInfo}
                      showRequired={showRequired}
                    />
                  )}
                  {/* {step === 2 && (
                    <SelectPlan
                      selectedPlan={userServiceConfiguration.selectedPlan}
                      updateSelectedPlan={updateSelectedPlan}
                    />
                  )} */}
                  {step === 2 && <Addons />}
                  {step === 3 && (
                    <ServiceSummary
                      userServiceConfiguration={userServiceConfiguration}
                    />
                  )}
                  {step === 4 && <ThankYou />}
                </form>
                <div style={{}}>
                  <menu className=" flex items-center p-4 flex-col mb-5">
                    <div className="flex gap-4">
                      <div>
                        {step > 1 && (
                          <button
                            className="  font-medium  px-4 py-1.5 rounded-lg text-navy-blue border  border-navy-blue hover:bg-navy-blue hover:text-white"
                            style={{ textTransform: "none" }}
                            onClick={goBack}
                          >
                            Go Back
                          </button>
                        )}
                      </div>
                      <div className="gap-4">
                        {step < 4 && (
                          <button
                            className="nextSetupProvider bg-navy-blue font-medium border border-navy-blue px-4 py-1.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                            onClick={() => nextStep()}
                          >
                            Next step
                          </button>
                        )}
                        {step >= 4 && (
                          <button
                            className=" text-white bg-navy-blue font-medium border border-navy-blue px-4 py-1.5 rounded-lg  hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                            style={{ textTransform: "none" }}
                            onClick={() => Confirm()}
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </div>
                  </menu>
                  <Typography mb={4} level="body-md" textAlign="center">
                    © ZestTravel {new Date().getFullYear()}
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
