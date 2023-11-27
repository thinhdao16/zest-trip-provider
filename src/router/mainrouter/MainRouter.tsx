import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/homepage/HomePage";
import CreateTour from "../../pages/createtour/CreateTour";
import SinglePage from "../../pages/homepage/singlepage/SinglePage";
import ListWork from "../../pages/managementtour/listwork/ListWork";
import Login from "../../components/login/Login";
import SignUp from "../../components/signUp/SignUp";
import SetUpProvider from "../../components/setUpProvider/SetUpProvider";
import AccountSettings from "../../pages/accountsettings/AccountSettings";
import PersonalInfo from "../../pages/accountsettings/personalinfo/PersonalInfo";
import { DataContext } from "../../store/dataContext/DataContext";
import AuthLayout from "../../components/Layout/AuthLayout";
import Dashboard from "../../pages/dashboard/Dashboard";
import Blank from "../../pages/Blank";
import ForgotPassWord from "../../components/forgotPassword/ForgotPassword";
import Review from "../../pages/review/Review";
import Booker from "../../pages/booker/Booker";
import Availability from "../../pages/availability/Availability";
import DetailBook from "../../pages/booker/many/DetailBook";
import BookerDetailSingleScreen from "../../pages/booker/single/BookerDetailSingleScreen";
import Voucher from "../../pages/voucher/Voucher";
import VoucherNew from "../../pages/voucher/management/voucher-create/VoucherNew";
import Payment from "../../pages/payment/Payment";
import VoucherView from "../../pages/voucher/management/voucher-view/VoucherView";
import Promotion from "../../pages/promotion/Promotion";
import PromotionPlan from "../../pages/promotion/plan/PromotionPlan";

function MainRouter() {
  const { refeshLogin } = React.useContext(DataContext);
  const [checkAccessToken, setCheckAccessToken] = React.useState("");
  React.useEffect(() => {
    const accessToken: any = localStorage.getItem("access_token");
    setCheckAccessToken(accessToken);
  }, [refeshLogin]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap routes in a layout */}
        <Route
          path="*"
          element={
            <React.Fragment>
              <Routes>
                {checkAccessToken === null ? (
                  <React.Fragment>
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                      path="/forgotpassword"
                      element={<ForgotPassWord />}
                    />
                    <Route path="/setupprovider" element={<SetUpProvider />} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Route path="/" element={<AuthLayout />}>
                      <Route path="/" element={<Dashboard />}></Route>
                      <Route path="/blank" element={<Blank />}></Route>
                      <Route path="/profile" element={<Blank />}></Route>
                      <Route path="/review" element={<Review />}></Route>

                      <Route path="/listtour" element={<HomePage />} />
                      <Route path="/booking" element={<Booker />}></Route>
                      <Route path="/voucher">
                        <Route path="" element={<Voucher />} />
                      </Route>
                      <Route path="/payment">
                        <Route path="" element={<Payment />} />
                      </Route>
                      <Route
                        path="/availability"
                        element={<Availability />}
                      ></Route>

                      <Route path="/account-settings">
                        <Route path="" element={<AccountSettings />} />
                        <Route
                          path="personal-info"
                          element={<PersonalInfo />}
                        />
                      </Route>
                    </Route>
                    <Route path="/promotion">
                      <Route path="" element={<Promotion />} />
                      <Route path="plan" element={<PromotionPlan />} />
                    </Route>

                    <Route path="/createtour" element={<CreateTour />} />
                    <Route path="/" element={<Navigate to="/listtour" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/:index" element={<SinglePage />} />
                    <Route
                      path="/booking/:index"
                      element={<BookerDetailSingleScreen />}
                    />
                    <Route
                      path="/booking/many/:index"
                      element={<DetailBook />}
                    />
                    <Route path="/voucher-create" element={<VoucherNew />} />
                    <Route path="/voucher-view" element={<VoucherView />} />
                    <Route path="/listwork" element={<ListWork />} />
                    <Route path="/setupprovider" element={<SetUpProvider />} />
                  </React.Fragment>
                )}
              </Routes>
            </React.Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

MainRouter.propTypes = {};

export default MainRouter;
