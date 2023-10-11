import { UserServiceConfiguration } from "AppTypes";
import { InformationSum } from "./informationSum";
import {
  FaEarthEurope,
  FaHotel,
  FaLocationDot,
  FaRegFile,
  FaServicestack,
  FaStaylinked,
} from "react-icons/fa6";
import { Grid } from "@mui/material";
interface ServiceSummaryProps {
  userServiceConfiguration: UserServiceConfiguration;
}

export const ServiceSummary = ({
  userServiceConfiguration,
}: ServiceSummaryProps) => {
  const { selectedPlan, userInfo } = userServiceConfiguration;

  return (
    <div>
      <h2 className="mb-3 font-medium">This is information of you</h2>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <InformationSum
            icon={<FaHotel />}
            title="Name Company"
            description={userInfo?.nameCompany}
          />
        </Grid>{" "}
        <Grid item xs={4}>
          <InformationSum
            icon={<FaEarthEurope />}
            title="Region"
            description={userInfo?.region}
          />
        </Grid>{" "}
        <Grid item xs={4}>
          <InformationSum
            icon={<FaLocationDot />}
            title="Address"
            description={userInfo?.address}
          />
        </Grid>
        <Grid item xs={4}>
          {/* <InformationSum
            icon={<FaConnectdevelop />}
            title="WebCompany"
            description={userInfo?.webCompnany}
          /> */}
          <InformationSum
            icon={<FaStaylinked />}
            title="Media Social"
            description={userInfo?.mediaSocial}
          />
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
      </Grid>
    </div>
  );
};
