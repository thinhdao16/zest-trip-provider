import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// const theme = createTheme();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="624291541261-vsnpuqvrn48tah5ju43l048ug23a3hre.apps.googleusercontent.com">
      {/* <ThemeProvider theme={theme}> */}
      <App />
      {/* </ThemeProvider> */}
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
