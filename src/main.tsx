import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DataContextProvider } from "./store/dataContext/DataContext.tsx";
import { Provider } from "react-redux";
import store from "../src/store/redux/store";
import "tailwindcss/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="624291541261-vsnpuqvrn48tah5ju43l048ug23a3hre.apps.googleusercontent.com"> */}
    <Provider store={store}>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </Provider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
