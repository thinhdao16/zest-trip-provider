// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Col, Row } from "antd";
// import Box from "@mui/joy/Box";
// import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
// import Typography from "@mui/joy/Typography";
// import { AiOutlinePhone, AiOutlineLock, AiOutlineShop } from "react-icons/ai";
// import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
// import ContinueGoogle from "../continueGoogle/ContinueGoogle";

// interface FormElements extends HTMLFormControlsCollection {
//   email: HTMLInputElement;
//   password: HTMLInputElement;
//   persistent: HTMLInputElement;
// }
// interface SignInFormElement extends HTMLFormElement {
//   readonly elements: FormElements;
// }

// const Main: React.FC = () => {
//   return (
//     <React.Fragment>
//       <Box style={{width:"100vw" , height:"100vh"}}>
//         <Row>
//           <Col
//             span={8}
//             style={{
//               backgroundColor: "#f9fbfc",
//               borderRadius: "8px 0 0 8px",
//               padding: "30px",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Typography
//               component="h1"
//               fontSize="xl2"
//               fontWeight="lg"
//               sx={{ mb: 5, display: "flex" }}
//             >
//               <AiOutlineShop style={{ margin: "8px 8px 0 0 " }} /> DiTour
//             </Typography>
//             <ul>
//               <li>⨀ Exclusive discounts 🎉🎉🎉</li>
//               <li>⨀ Tailored recommendation</li>
//               <li>⨀ Advance custiomer support</li>
//               <li>⨀ Save details for next up </li>
//             </ul>
//             <div style={{ marginTop: "auto" }}>
//               <Button
//                 fullWidth
//                 style={{
//                   backgroundColor: "white",
//                   border: "1px solid #e7e7eb",
//                   color: "black",
//                 }}
//               >
//                 Don't have an account
//               </Button>
//             </div>
//           </Col>
//           <Col span={16}>
//             <Box
//               sx={{
//                 px: 2,
//               }}
//             >
//               <Box
//                 component="header"
//                 sx={{
//                   py: 3,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               ></Box>
//               <Box
//                 component="main"
//                 sx={{
//                   my: "auto",
//                   py: 2,
//                   pb: 5,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                   width: 400,
//                   maxWidth: "100%",
//                   mx: "auto",
//                   borderRadius: "sm",
//                   "& form": {
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 2,
//                   },
//                   [`& .${formLabelClasses.asterisk}`]: {
//                     visibility: "hidden",
//                   },
//                 }}
//               >
//                 <div>
//                   <Typography component="h1" fontSize="xl2" fontWeight="lg">
//                     Sign in to your account
//                   </Typography>
//                   <Typography level="body-xs" sx={{ my: 1, mb: 1 }}>
//                     Enter your credentials to continue
//                   </Typography>
//                 </div>
//                 <form
//                   onSubmit={(event: React.FormEvent<SignInFormElement>) => {
//                     event.preventDefault();
//                     const formElements = event.currentTarget.elements;
//                     const data = {
//                       email: formElements.email.value,
//                       password: formElements.password.value,
//                       persistent: formElements.persistent.checked,
//                     };
//                     alert(JSON.stringify(data, null, 2));
//                   }}
//                 >
//                   <FormControl required>
//                     <FormLabel>Phone Number</FormLabel>
//                     <TextField
//                       required
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <AiOutlinePhone />
//                           </InputAdornment>
//                         ),
//                       }}
//                       className="input-form-text-ready"
//                     />
//                   </FormControl>
//                   <FormControl required>
//                     <FormLabel>Password</FormLabel>
//                     <TextField
//                       required
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <AiOutlineLock />
//                           </InputAdornment>
//                         ),
//                       }}
//                       className="input-form-text-ready"
//                     />
//                   </FormControl>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     {/* <Link
//                     fontSize="sm"
//                     href="#replace-with-a-link"
//                     fontWeight="lg"
//                   >
//                     Forgot your password
//                   </Link> */}
//                   </Box>
//                   <Button type="submit" fullWidth>
//                     Sign in
//                   </Button>
//                 </form>
//                 <Box sx={{ position: "relative", margin: 0.5 }}>
//                   <span
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       backgroundColor: "#fff",
//                       padding: "0 10px 0 10px",
//                     }}
//                   >
//                     or
//                   </span>
//                   <hr
//                     style={{
//                       borderColor: "#000",
//                       borderTop: "1px solid #dfdfdf",
//                       width: "100%",
//                       marginTop: 3,
//                     }}
//                   />
//                 </Box>
//                 <ContinueGoogle />
//               </Box>
//               <Box component="footer" sx={{ py: 3 }}>
//                 <Typography level="body-md" textAlign="center">
//                   © DiTour {new Date().getFullYear()}
//                 </Typography>
//               </Box>
//             </Box>
//           </Col>
//         </Row>
//       </Box>
//     </React.Fragment>
//   );
// };
// export default Main;
