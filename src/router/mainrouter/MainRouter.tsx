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
                    <Route path="/setupprovider" element={<SetUpProvider />} />
                    <Route path="/account-settings">
                      <Route path="" element={<AccountSettings />} />
                      <Route path="personal-info" element={<PersonalInfo />} />
                    </Route>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Route path="/" element={<AuthLayout />}>
                      <Route path="/" element={<Dashboard />}></Route>
                      <Route path="/blank" element={<Blank />}></Route>
                      <Route path="/profile" element={<Blank />}></Route>
                      <Route path="/listtour" element={<HomePage />} />
                    </Route>
                    <Route path="/createtour" element={<CreateTour />} />
                    <Route path="/" element={<Navigate to="/listtour" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/:index" element={<SinglePage />} />
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
