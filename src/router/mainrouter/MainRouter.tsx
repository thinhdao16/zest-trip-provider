import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/homepage/HomePage";
import Header from "../../components/header/Header";
import CreateTour from "../../pages/createtour/CreateTour";
import SinglePage from "../../pages/homepage/singlepage/SinglePage";
import ListWork from "../../pages/managementtour/listwork/ListWork";
import Login from "../../components/login/Login";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap routes in a layout */}
        <Route
          path="/*"
          element={
            <React.Fragment>
              <Header />
              <Routes>
                <Route path="" element={<ListWork />} />
                <Route path="/login" element={<Login />} />
                <Route path="/listtour" element={<HomePage />} />
                <Route path="/:index" element={<SinglePage />} />
                <Route path="/createtour" element={<CreateTour />} />
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
