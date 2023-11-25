// import React from "react";
// import { Button } from "@mui/joy";
// import GoogleIcon from "./GoogleIcon";
// import axios from "axios";
// import clientId from "../continueGoogle/client_secret_624291541261-vsnpuqvrn48tah5ju43l048ug23a3hre.apps.googleusercontent.com.json";
// import { DataContext } from "../../store/dataContext/DataContext";
// import { auth } from "../../store/firebase/firebase";
// import { useNavigate } from "react-router-dom";
// function ContinueGoogle() {
//   const { googleSignIn, accessToken, setRefeshTour } =
//     React.useContext(DataContext);
//   const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       await googleSignIn();
//       if (accessToken !== undefined) {
//         // Thêm điều kiện kiểm tra accessToken
//         const user = auth.currentUser;
//         if (user) {
//           const idToken = await user.getIdToken();
//           const accessToken = await user.getIdToken(true);
//           const response = await axios.post(
//             "https://tour-ecom-cllh63fgua-df.a.run.app/auth/google-login",
//             { accessToken: accessToken },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${idToken}`,
//               },
//             }
//           );
//           console.log(response);
//           if (response.status === 200) {
//             // const data = await response.json();
//             if (response !== undefined) {
//               localStorage.setItem(
//                 "access_token",
//                 JSON.stringify(response.data.data)
//               );
//               const additionalResponse = await axios.get(
//                 "URL_CUA_API_BO_SUNG",
//                 {
//                   headers: {
//                     Authorization: `Bearer ${response.data.data.access_token}`,
//                   },
//                 }
//               );
//               console.log(additionalResponse);
//               setRefeshTour((prev) => !prev);
//               navigate("/listtour");
//               //         }
//             } else {
//               console.log("first");
//             }
//           } else {
//             console.log("first");
//           }
//         } else {
//           console.log("first");
//         }
//       } else {
//         console.log("error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <Button
//         variant="outlined"
//         color="neutral"
//         fullWidth
//         startDecorator={<GoogleIcon />}
//         onClick={handleGoogleSignIn}
//         data-clientid={clientId.web.client_id}
//       >
//         Sign in with Google
//       </Button>
//     </>
//   );
// }

// ContinueGoogle.propTypes = {};

// export default ContinueGoogle;
