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
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import AuthLayout from "./components/Layout/AuthLayout";
// import GuestLayout from "./components/Layout/GuestLayout";
// import Login from "./pages/auth/Login";
// import Blank from "./pages/Blank";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<AuthLayout />}>
//           <Route path="/" element={<Dashboard />}></Route>
//           <Route path="/blank" element={<Blank />}></Route>
//           <Route path="/profile" element={<Blank />}></Route>
//         </Route>
//         <Route path="/auth" element={<GuestLayout />}>
//           <Route path="/auth/login" element={<Login />}></Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
