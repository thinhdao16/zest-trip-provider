import { useContext, useMemo, useState } from "react";
import { Plan, UserInfo, UserServiceConfiguration } from "AppTypes";
import { Sidebar } from "./components/sidebar";
import { PersonalInfo } from "./components/personalInfo";
import { Addons } from "./components/Addons";
import { ServiceSummary } from "./components/serviceSummary";
import { ThankYou } from "./components/thankYou";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { ContainerPageFullHalf } from "../../styles/global/StyleGlobal";
import { ContainerPageFullHalfContent } from "../../styles/global/ContainerPageFullHalfContent";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  becomeProvider,
  createProviderAvt,
  createProviderBanner,
} from "../../store/redux/silce/providerSlice";
import jwt_decode from "jwt-decode";
import "./styles/setup.css";
import { DataContext } from "../../store/dataContext/DataContext";
import loginImage from "../../assets/login.svg";
function SetUpProvider() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { setRefeshLogin } = useContext(DataContext);
  const { loadingBecomeProvider, dataErrorBecome } = useSelector(
    (state: any) => state.provider
  );
  console.log(dataErrorBecome);
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
        address_district: { full_name: "", code: "" },
        address_ward: { full_name: "", code: "" },
        address_province: { full_name: "", code: "" },
        address_country: "",
        file: [],
        avt: [],
        banner: [],
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
  // console.log(userServiceConfiguration);
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
    const information: string | null =
      localStorage.getItem("information_setup");
    let parseInfo: any; // hoặc chọn một kiểu phù hợp với dữ liệu của bạn
    if (information !== null) {
      parseInfo = JSON.parse(information);
      // Sử dụng parseInfo như một đối tượng
    } else {
      // Xử lý trường hợp khi giá trị là null
    }

    const token: any = localStorage.getItem("access_token");
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
      formData.append("phone", parseInfo?.phoneNumber);
      formData.append("email", parseInfo?.email);
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
        userServiceConfiguration?.userInfo?.address_district?.full_name
      );
      formData.append(
        "address_ward",
        userServiceConfiguration?.userInfo?.address_ward?.full_name
      );
      formData.append(
        "address_province",
        userServiceConfiguration?.userInfo?.address_province?.full_name
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
      formData.append(
        "business_license",
        userServiceConfiguration?.userInfo?.file[0]
      );

      dispatch(
        becomeProvider({
          formData,
          onSuccessCallback: () => {
            navigate("/");
            setRefeshLogin((prev) => !prev);
          },
        })
      )
        .then((provider) => {
          if (becomeProvider.fulfilled.match(provider)) {
            console.log(provider);
            dispatch(
              createProviderAvt(userServiceConfiguration?.userInfo?.avt?.file)
            );
            dispatch(
              createProviderBanner(
                userServiceConfiguration?.userInfo?.banner?.file
              )
            );
          }
          if (becomeProvider.rejected.match(provider)) {
            console.log(provider);
            // localStorage.clear()
            // navigate("/")
          }
        })
        .catch((error) => {
          console.log("create provider error", error);
        });
    } else {
      alert("dont have userId");
    }

    // navigate("/listwork");
  };
  const checkNext =
    userServiceConfiguration.userInfo?.nameCompany.length > 0 &&
    userServiceConfiguration.userInfo?.mediaSocial.length > 0 &&
    userServiceConfiguration.userInfo?.taxCode.length > 0 &&
    userServiceConfiguration.userInfo?.address_country.length > 0 &&
    userServiceConfiguration.userInfo?.address_name.length > 0 &&
    userServiceConfiguration?.userInfo?.address_province?.full_name?.length >
      0 &&
    userServiceConfiguration?.userInfo?.address_district?.full_name?.length >
      0 &&
    userServiceConfiguration?.userInfo?.address_ward?.full_name?.length > 0 &&
    (userServiceConfiguration?.selectedPlan?.serviceType?.length > 0 ||
      userServiceConfiguration?.selectedPlan !== null);

  const constraintValue = useMemo(() => {
    const checkImage =
      userServiceConfiguration?.userInfo?.banner?.length === 0 ||
      userServiceConfiguration?.userInfo?.avt?.length === 0;
    return !checkImage;
  }, [userServiceConfiguration]);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingBecomeProvider}
        // onClick={() => setOpenLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <img src={loginImage} className="w-[50vh] h-[50vh]" alt="error" />
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
                        {step < 4 &&
                          (checkNext && constraintValue ? (
                            <button
                              className="nextSetupProvider bg-navy-blue font-medium border border-navy-blue px-4 py-1.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                              onClick={() => nextStep()}
                            >
                              Next step
                            </button>
                          ) : (
                            <button className="nextSetupProvider bg-gray-500 font-medium px-4 py-1.5 rounded-lg text-white cursor-not-allowed">
                              Input the full field
                            </button>
                          ))}

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
