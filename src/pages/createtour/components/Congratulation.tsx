import React from "react";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Grid, Typography } from "@mui/material";

const Congratulation: React.FC = () => {
  const { currentStep } = useStepContext();
  if (currentStep !== 12) {
    return null;
  }

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
      <Grid container spacing={1}>
        <Grid item xs={6}>
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
            >
            
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              background: "black",
              color: "white",
            }}
          >
            <Box
              style={{
                maxWidth: "408px",
              }}
            >
              <Typography style={{ fontSize: "48px" }}>
                Congratulations Thinh!
              </Typography>
              <Typography style={{fontSize:"16px", paddingTop:"20px"}}>
                Welcome to the listings – Greetings from Landlord to Landlord.
                Thank you for sharing your home and helping to create amazing
                experiences for our guests.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Congratulation;
