import React from "react";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../store/dataContext/DataContext";

const Congratulation: React.FC = () => {
  const { currentStep } = useStepContext();
  const { setRefeshTour } = React.useContext(DataContext);
  const navigate = useNavigate();
  if (currentStep !== 12) {
    return null;
  }
  const handleFormSubmit = () => {
    setRefeshTour((prev) => !prev);
    navigate("/listtour");
  };
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} xl={6}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              background: "#DFDFDF",
              color: "white",
            }}
          >
            <Box
              style={{
                maxWidth: "408px",
              }}
            ></Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9} xl={6}>
          <Box
            style={{
              display: "flex",
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
              background: "black",
              color: "white",
              height: "90vh",
            }}
          >
            <Box
              style={{
                maxWidth: "408px",
                textAlign: "center", // Center text within this box
              }}
            >
              <Typography style={{ fontSize: "48px" }}>
                Congratulations Thinh!
              </Typography>
              <Typography style={{ fontSize: "16px", paddingTop: "20px" }}>
                Welcome to the listings – Greetings from Landlord to Landlord.
                Thank you for sharing your home and helping to create amazing
                experiences for our guests.
              </Typography>
            </Box>
          </Box>
          <div
            style={{
              borderTop: "1px solid #BABABA",
              position: "relative", // Set the parent container to relative position
              background: "black",
              color: "white",
              height: "10vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleFormSubmit}
              style={{
                position: "absolute",
                bottom: "0", // Align to the bottom
                right: "0", // Align to the right
                marginRight: "20px", // Add spacing between the button and the right edge
                marginBottom:"15px",
                color:"white",
                background:"#AACFF6",
                fontSize:"16px",
                padding:"12px 40px"
              }}
            >
              <p>Start</p>
            </button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Congratulation;
