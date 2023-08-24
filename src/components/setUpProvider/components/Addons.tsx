import { Box, Typography, Grid } from "@mui/material";
import { policy } from "../../../data/policy";

export const Addons = () => {
  console.log(policy);
  return (
    <Grid container>
      <Grid item xs={9} style={{maxHeight:"75vh", overflow:"auto"}}>
        <Box mt={1}>
          <Typography
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              fontWeight: 500,
            }}
          >
            {policy?.main?.titleMain}
          </Typography>
          <Typography style={{}}>{policy?.main?.descriptionMain}</Typography>
        </Box>
        <Box mt={1}>
          <Typography
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              fontWeight: 500,
            }}
          >
            {policy?.title?.titleMain}
          </Typography>
          <Box>
            {policy?.title?.description.map((data) => (
              <ol style={{ display: "flex" }}>
                <li style={{ display: "flex" }}>
                  <Typography style={{ fontWeight: 600 }}>
                    {data?.title}
                  </Typography>
                  {data?.description}
                </li>
              </ol>
            ))}
          </Box>
        </Box>
        <Box mt={1}>
          {policy?.description?.map((data: any) => (
            <Box>
              <Typography
                style={{
                  fontSize: "1.875rem",
                  lineHeight: "2.25rem",
                  fontWeight: 500,
                }}
              >
                {data?.header}
              </Typography>
              <Typography>{data?.title}</Typography>
              {data?.description?.map((data: any) => (
                <Box>
                  <Typography>{data?.list}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={3}>
        s
      </Grid>
    </Grid>
  );
};
