import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import HomePage from "../../pages/homepage/HomePage";
import Header from "../../components/header/Header";
import CreateTour from "../../pages/createtour/CreateTour";

function MainRouter() {
    return (
        <React.Fragment>
            <Header /> 
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="createtour" element={<CreateTour />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

MainRouter.propTypes = {};

export default MainRouter;
