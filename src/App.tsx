import "./App.css";
import MainRouter from "./router/mainrouter/MainRouter";
import "./index.css";
import React from "react";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <React.Fragment>
      <MainRouter />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
