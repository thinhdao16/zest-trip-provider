import { Box, Grid } from "@mui/material";

export const ThankYou = () => {
  return (
    <Box>
   <Grid container  sx={{display:"flex", alignItems:'center' , padding:"50px"}}>
	<Grid item xs={6} spacing={5}>
	<Box mb={3}>
        <p style={{fontSize:"50px", fontWeight:500}}>You are all set</p>
      </Box>
      <Box mb={1}>
        <p style={{fontSize:"20px"}}>
          You can now visit your provider account and set it up, you can create
          tours and your provider profile!
        </p>
      </Box>
      <Box>
        <p style={{fontSize:"17px"}}>
          Keep in note that you can not receive any reservation and order until
          we have verified your registration
        </p>
      </Box>
	</Grid>
	<Grid item xs={6}>
		<img alt="alt" src="https://atlas-content-cdn.pixelsquid.com/stock-images/us-constitution-file-holder-JeKQZV2-600.jpg"/>
	</Grid>
   </Grid>
    </Box>
  );
};
