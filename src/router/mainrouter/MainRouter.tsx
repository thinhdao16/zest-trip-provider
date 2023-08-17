import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/homepage/HomePage";
import Header from "../../components/header/Header";
import CreateTour from "../../pages/createtour/CreateTour";
import SinglePage from "../../pages/homepage/singlepage/SinglePage";

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
                <Route path="/" element={<HomePage />} />
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
