import DashboardHeader from "../../components/Other/DashboardHeader";
import { useOutletContext } from "react-router-dom";
import "../../App.css";
import { Grid } from "@mui/material";
import DashBoardOverView from "../../components/Other/DashBoardOverview";
import DashBoardTrip from "../../components/Other/DashBoardTrip";
import DashboardInfo from "./DashboardInfo";
import DashBoardBooker from "../../components/Other/DashBoardBooker";

function Dashboard() {
  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const [sidebarToggle]: any = useOutletContext();

  return (
    <>
      <Grid container className="mt-8">
        <Grid item xs={12} sm={9}>
          <main className="h-full">
            <div className="  p-6 mainCard bg-main container-dashboard rounded-3xl global-scrollbar">
              <div className="flex flex-col gap-4 ">
                <DashboardHeader
                  toggle={sidebarToggle}
                  avatar={avatar}
                  user={{ name: "Hoki Teguh Oktian" }}
                />
                {/* <ActionDashBoard /> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DashBoardOverView />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DashBoardTrip />
                  </Grid>
                </Grid>
                {/* <div className="flex">
                  {dataOS?.map((data: any, index) => (
                    <ScrolledCard key={index} data={data} />
                  ))}
                </div> */}
              </div>

              <div className="">
                <DashBoardBooker />
              </div>
            </div>
          </main>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div>
            <DashboardInfo />{" "}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
