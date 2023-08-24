import { Box, Grid } from "@mui/material";
import { policy } from "../../../data/policy";

export const Addons = () => {
  console.log(policy);
  return (
    <Grid container>
      <Grid item xs={9} style={{ maxHeight: "75vh", overflow: "auto" }}>
        <Box mt={2}>
          <p
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              fontWeight: 500,
            }}
          >
            {policy?.main?.titleMain}
          </p>
          <p
            style={{
              color: "rgb(107 114 128)",
              fontSize: "1.25rem",
              marginTop: "5px",
            }}
          >
            {policy?.main?.descriptionMain}
          </p>
        </Box>
        <Box mt={2}>
          <p
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              fontWeight: 500,
            }}
          >
            {policy?.title?.titleMain}
          </p>
          <Box mt={1}>
            {policy?.title?.description.map((data) => (
              <ol style={{ display: "flex", marginTop: "5px" }}>
                <li
                  style={{
                    display: "flex",
                    color: "rgb(107 114 128)",
                    fontSize: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      display: "contents",
                      color: "black",
                    }}
                  >
                    {data?.title}
                  </p>
                  {data?.description}
                </li>
              </ol>
            ))}
          </Box>
        </Box>
        <Box mt={2}>
          {policy?.description?.map((data: any) => (
            <Box>
              <p
              id={`${data?.header}`}
                style={{
                  fontSize: "1.875rem",
                  lineHeight: "2.25rem",
                  fontWeight: 500,
                }}
              >
                {data?.header}
              </p>
              <p style={{ fontSize: "1.25rem", color: "rgb(107 114 128)" }}>
                {data?.title}
              </p>
              {data?.description?.map((data: any) => (
                <Box>
                  <p style={{ fontSize: "1.25rem", color: "rgb(107 114 128)" }}>
                    {data?.list}
                  </p>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={3}>
        <p style={{ fontSize: "1.875rem", fontWeight: 500 }}>Table Content</p>
        <Box>
          {policy?.description?.map((data: any) => (
            <Box>
              <a href={`#${data?.header}`} style={{ textDecoration: "none" }}>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25rem",
                    fontWeight: 400,
                    margin: 0,
                    padding: "8px 0",
                  }}
                >
                  {data?.header}
                </p>
              </a>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
