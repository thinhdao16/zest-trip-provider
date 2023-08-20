import { Box, Typography } from "@mui/material";

interface CustomDontHave {
  description: string;
//   icon: ReactNode;
}
export const DontHaveTour: React.FC<CustomDontHave> = ({
  description,
//   icon,
}) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#f7f7f7",
          padding: "40px",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            maxWidth: "200px",
          }}
        >
          <Box style={{ paddingBottom: "20px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "32px",
                width: "32px",
                fill: "rgb(34, 34, 34)",
              }}
            >
              <path d="M24 1a5 5 0 0 1 5 4.78v5.31h-2V6a3 3 0 0 0-2.82-3H8a3 3 0 0 0-3 2.82V26a3 3 0 0 0 2.82 3h5v2H8a5 5 0 0 1-5-4.78V6a5 5 0 0 1 4.78-5H8zm-2 12a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm3.02 3.17 1.36 1.46-6.01 5.64-3.35-3.14 1.36-1.46 1.99 1.86z"></path>
            </svg>
          </Box>
          <Box
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              style={{ fontSize: "14px", lineHeight: "18px", fontWeight: 400 }}
            >
             {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
