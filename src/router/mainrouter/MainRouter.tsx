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
import DetailTour from "../../pages/homepage/detail/DetailTour";
import ProviderProcessing from "../../components/processing/ProviderProcessing";
import Ticket from "../../pages/ticket/Ticket";
import TicketSpecial from "../../pages/ticket/TicketSpecial";
import CancelBooking from "../../pages/booker/many/CancelBooking";

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
        {checkAccessToken === null ? (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassWord />} />
            <Route path="/setupprovider" element={<SetUpProvider />} />
            <Route
              path="provider-processing"
              element={<ProviderProcessing />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/profile" element={<Blank />} />
              <Route path="/review" element={<Review />} />

              <Route path="/listtour" element={<HomePage />} />
              <Route path="/booking">
                <Route path="" element={<Booker />} />
                <Route path="many/:index" element={<DetailBook />} />
                <Route path="many/cancel/:index" element={<CancelBooking />} />
              </Route>

              <Route path="/voucher" element={<Voucher />}>
                <Route path="" element={<Voucher />} />
              </Route>
              <Route path="/payment" element={<Payment />} />
              <Route path="/availability" element={<Availability />} />

              <Route path="/account-settings" element={<AccountSettings />}>
                <Route path="" element={<AccountSettings />} />
                <Route path="personal-info" element={<PersonalInfo />} />
              </Route>
              <Route path="/ticket">
                <Route path="" element={<Ticket />} />
                <Route path="create" element={<TicketSpecial />} />
              </Route>
            </Route>
            <Route
              path="provider-processing"
              element={<ProviderProcessing />}
            />
            <Route path="/promotion">
              <Route path="" element={<Promotion />} />
              <Route path="plan" element={<PromotionPlan />} />
            </Route>

            <Route path="/createtour" element={<CreateTour />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassWord />} />

            <Route path="/:index" element={<SinglePage />} />
            <Route
              path="/booking/:index"
              element={<BookerDetailSingleScreen />}
            />
            <Route path="/detail-tour/:index" element={<DetailTour />} />
            <Route path="/voucher-create" element={<VoucherNew />} />
            <Route path="/voucher-view" element={<VoucherView />} />
            <Route path="/listwork" element={<ListWork />} />
            <Route path="/setupprovider" element={<SetUpProvider />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

MainRouter.propTypes = {};

export default MainRouter;
