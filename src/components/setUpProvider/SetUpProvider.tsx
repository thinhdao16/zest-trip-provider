import { useState } from 'react';
import { Addon, Plan, UserInfo, UserServiceConfiguration } from 'AppTypes';
import { Sidebar } from './components/sidebar';
import { PersonalInfo } from './components/personalInfo';
import { SelectPlan } from './components/selectPlan';
import { Addons } from './components/Addons';
import { ServiceSummary } from './components/serviceSummary';
import { ThankYou } from './components/thankYou';
import { Button, Col, Modal, Row } from 'antd';
import { Box } from '@mui/material';
import { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import { AiOutlineShop } from 'react-icons/ai';

function SetUpProvider() {
    const [step, setStep] = useState(1);
    const [showRequired, setShowRequiredFields] = useState(false);
    const [open, setOpen] = useState(false);


    const [userServiceConfiguration, setUserServiceConfiguration] =
        useState<UserServiceConfiguration>({
            userInfo: {
                nameCompany: '',
                region: '',
                address: '',
                webCompnany: '',
                mediaSocial: '',
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

    const updateMonthly = () => {
        setUserServiceConfiguration((prevVal) => ({
            ...userServiceConfiguration,
            monthly: !prevVal.monthly,
        }));
    };

    const updateAddons = (addon: Addon) => {
        const addons = userServiceConfiguration.addons;
        const index = addons.findIndex(
            (currentAddon) => currentAddon.name === addon.name
        );
        if (index === -1) {
            setUserServiceConfiguration({
                ...userServiceConfiguration,
                addons: [...addons, addon],
            });
        } else {
            addons.splice(index, 1);
            setUserServiceConfiguration({
                ...userServiceConfiguration,
                addons: [...addons],
            });
        }
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

    return (
        <>

            <Button type="primary" onClick={() => setOpen(true)}>
                Open Modal of 1000px width
            </Button>
            <Modal
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={null}
                className="login-modal-content"
            >
                <main>
                    <Row>
                        <Col span={8} style={{
                            backgroundColor: "#f9fbfc",
                            borderRadius: "8px 0 0 8px",
                            padding: "30px",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <Typography
                                component="h1"
                                fontSize="xl2"
                                fontWeight="lg"
                                sx={{ mb: 5, display: 'flex' }}
                            >
                                <AiOutlineShop style=   {{ margin: "8px 8px 0 0 " }} /> DiTour
                            </Typography>
                            <Sidebar currentStep={step} handleNextStep={nextStep} />
                            {step < 5 && (
                                <menu className="flex justify-between p-4 mt-auto">
                                    <li>
                                        <Button type="dashed" onClick={goBack}>
                                            Go Back
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            onClick={() => nextStep()}
                                            type={step !== 4 ? 'default' : 'primary'}
                                        >
                                            {step !== 4 ? 'Next Step' : 'Confirm'}
                                        </Button>
                                    </li>
                                </menu>
                            )}
                        </Col>
                        <Col span={16}>
                            <Box
                                sx={{
                                    px: 2,
                                }}
                            >
                                <Box
                                    component="header"
                                    sx={{
                                        py: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                ></Box>
                                <Box
                                    component="main"
                                    sx={{
                                        my: "auto",
                                        py: 2,
                                        pb: 1,
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
                                                monthly={userServiceConfiguration.monthly}
                                                updateSelectedPlan={updateSelectedPlan}
                                                updateIsMonthly={updateMonthly}
                                            />
                                        )}
                                        {step === 3 && (
                                            <Addons
                                                selectedAddons={userServiceConfiguration.addons}
                                                monthly={userServiceConfiguration.monthly}
                                                updateAddons={updateAddons}
                                            />
                                        )}
                                        {step === 4 && (
                                            <ServiceSummary
                                                userServiceConfiguration={userServiceConfiguration}
                                            />
                                        )}
                                        {step === 5 && <ThankYou />}
                                    </form>
                                </Box>
                            </Box >
                            <div style={{ marginTop: "auto" }}>
                                <Box component="footer" sx={{ pb: 3 }}>
                                    <Typography level="body-lg" textAlign="center">
                                        © DiTour {new Date().getFullYear()}
                                    </Typography>
                                </Box>
                            </div>
                        </Col>
                    </Row>
                </main>
            </Modal>
        </>
    );
}

export default SetUpProvider;
