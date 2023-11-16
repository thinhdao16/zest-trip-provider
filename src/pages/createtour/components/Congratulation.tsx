import React from "react";
import { useStepContext } from "../context/ui/useStepContext";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../store/dataContext/DataContext";

const Congratulation: React.FC = () => {
  const { currentStep } = useStepContext();
  const { setRefeshTour } = React.useContext(DataContext);
  const navigate = useNavigate();
  if (currentStep !== 13) {
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
              className="absolute bottom-0 right-0 px-6 py-2.5 border border-navy-blue  hover:bg-white hover:text-black hover:border-white rounded-lg bg-navy-blue mb-3 mr-3 font-medium"
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
