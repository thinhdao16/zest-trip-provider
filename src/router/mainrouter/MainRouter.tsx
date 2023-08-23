import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/homepage/HomePage";
import CreateTour from "../../pages/createtour/CreateTour";
import SinglePage from "../../pages/homepage/singlepage/SinglePage";
import ListWork from "../../pages/managementtour/listwork/ListWork";
import Login from "../../components/login/Login";
import SignUp from "../../components/signUp/SignUp";
import SetUpProvider from "../../components/setUpProvider/SetUpProvider";

function MainRouter() {
  const accessToken = localStorage.getItem("access_token");
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap routes in a layout */}
        <Route
          path="*"
          element={
            <React.Fragment>
              <Routes>
                {!accessToken ? (
                  <React.Fragment>
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Route path="/" element={<Navigate to="/listtour" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/listtour" element={<HomePage />} />
                    <Route path="/:index" element={<SinglePage />} />
                    <Route path="/createtour" element={<CreateTour />} />
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
