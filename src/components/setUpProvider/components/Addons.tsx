import { Box, Grid } from "@mui/material";
import { policy } from "../../../data/policy";
import { FaAngleDown } from "react-icons/fa6";

export const Addons = () => {
  const handleSeeMoreClick = () => {
    const newTabUrl = "https://zest-travel-policy.vercel.app/";
    window.open(newTabUrl, "_blank");
  };

  return (
    <div className="flex flex-col justify-center">
      <Grid container>
        <Grid item xs={12}>
          <Box mt={2}>
            <p className="font-medium text-2xl">{policy?.main?.titleMain}</p>
            <p className="mt-2 text-gray-500">
              {policy?.main?.descriptionMain}
            </p>
          </Box>
          <Box mt={2}>
            <p className="font-medium text-2xl">{policy?.title?.titleMain}</p>
            <Box mt={1}>
              {policy?.title?.description.map((data) => (
                <ol key={data?.description}>
                  <li className="text-gray-500 flex ">
                    <p className="contents text-black font-medium">
                      {data?.title}
                    </p>
                    {data?.description}
                  </li>
                </ol>
              ))}
            </Box>
          </Box>
          <Box mt={2}>
            {policy?.description?.map((data: any, index: number) => (
              <Box key={index}>
                <p id={`${data?.header}`} className="font-medium text-2xl">
                  {data?.header}
                </p>
                <p className="text-gray-500">{data?.title}</p>
                {data?.description?.map(
                  (
                    desc: any,
                    descIndex: number // Unique key for description
                  ) => (
                    <Box key={descIndex}>
                      <p className="text-gray-500 ">{desc?.list}</p>
                    </Box>
                  )
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <button
        type="button"
        className="font-medium text-sky-600 flex flex-col items-center"
        onClick={() => handleSeeMoreClick()}
      >
        See more
        <FaAngleDown />
      </button>
    </div>
  );
};
