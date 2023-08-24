import { UserServiceConfiguration } from "AppTypes";
import { AiOutlineAlert } from "react-icons/ai";
import { InformationSum } from "./informationSum";
import {
  FaConnectdevelop,
  FaEarthEurope,
  FaHotel,
  FaLocationDot,
  FaRegFile,
  FaRegFileLines,
  FaServicestack,
  FaStaylinked,
} from "react-icons/fa6";
import { Box, Grid } from "@mui/material";
interface ServiceSummaryProps {
  userServiceConfiguration: UserServiceConfiguration;
}

export const ServiceSummary = ({
  userServiceConfiguration,
}: ServiceSummaryProps) => {
  const { selectedPlan, userInfo } = userServiceConfiguration;
  console.log(selectedPlan, userInfo); // for some reason needed to do this work arround bc typescript was crying and bug is not fixed apparently

  return (
    <Box style={{ width: "60vw" }}>
      <h2 className="mb-3 font-medium">This is information of you</h2>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <InformationSum
            icon={<FaHotel />}
            title="nameCompany"
            description={userInfo?.nameCompany}
          />
          <InformationSum
            icon={<FaEarthEurope />}
            title="region"
            description={userInfo?.region}
          />
          <InformationSum
            icon={<FaLocationDot />}
            title="address"
            description={userInfo?.address}
          />
        </Grid>
        <Grid item xs={4}>
          <InformationSum
            icon={<FaConnectdevelop />}
            title="WebCompany"
            description={userInfo?.webCompnany}
          />
          <InformationSum
            icon={<FaStaylinked />}
            title="Media Social"
            description={userInfo?.mediaSocial}
          />
          <InformationSum
            icon={<FaRegFile />}
            title="Title"
            description={userInfo?.file[0]?.name}
          />
        </Grid>
        <Grid item xs={4}>
          <InformationSum
            icon={<FaServicestack />}
            title="Service Type"
            description={selectedPlan?.serviceType}
          />
          <InformationSum
            icon={<AiOutlineAlert />}
            description={selectedPlan?.policyCancell}
            title="Policy Cancell"
          />
          <InformationSum
            icon={<FaRegFileLines />}
            title="Policy Confirm"
            description={selectedPlan?.policyConfirm}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
