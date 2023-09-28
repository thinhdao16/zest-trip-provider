import { Box, Grid } from "@mui/material";
import "../styles/setup.css";
export const ThankYou = () => {
  return (
    <Box>
      <Grid
        container
        sx={{ display: "flex", alignItems: "center", padding: "50px" }}
      >
        <div className="setUpThankYou">
          <div className="beforeSetupThankYou">
            <Box mb={3}>
              <p className="text-5xl font-medium">You are all set</p>
            </Box>
            <Box mb={1}>
              <p className="text-xl">
                You can now visit your provider account and set it up, you can
                create tours and your provider profile!
              </p>
            </Box>
            <Box>
              <p className="text-xl">
                Keep in note that you can not receive any reservation and order
                until we have verified your registration
              </p>
            </Box>
          </div>
        </div>
      </Grid>
    </Box>
  );
};
