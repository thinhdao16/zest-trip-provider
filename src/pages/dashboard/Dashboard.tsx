import React from "react";
import DashboardHeader from "../../components/Other/DashboardHeader";
import ScrolledCard from "../../components/Widget/ScrolledCard";
import { useOutletContext } from "react-router-dom";
import "../../App.css";
import { Grid } from "@mui/material";
import ActionDashBoard from "../../components/Other/ActionDashBoard";
import DashBoardOverView from "../../components/Other/DashBoardOverview";
import DashBoardTrip from "../../components/Other/DashBoardTrip";
import DashboardInfo from "./DashboardInfo";
import DashBoardBooker from "../../components/Other/DashBoardBooker";
interface UserData {
  name: string;
}

interface ScrolledCardData {
  title: string;
  date: string;
  os: string;
  gs: string;
  percentage: number;
  color: string;
}

function Dashboard() {
  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const dataOS: ScrolledCardData[] = [
    {
      title: "Kredit Konsumer",
      date: "12/Mei/2023",
      os: "23,938",
      gs: "20,900",
      percentage: 200.01,
      color: "cardInfo",
    },
    {
      title: "Kredit Ritel",
      date: "12/Mei/2023",
      os: "3,938",
      gs: "2,900",
      percentage: 190.01,
      color: "cardWarning",
    },
    {
      title: "Kredit KPR & KKB",
      date: "12/Mei/2023",
      os: "190,938",
      gs: "192,900",
      percentage: 99.01,
      color: "cardDanger",
    },
    {
      title: "Kredit UMKM",
      date: "12/Mei/2023",
      os: "2,938",
      gs: "2,900",
      percentage: 100.01,
      color: "cardSuccess",
    },
    {
      title: "Kredit Komersial",
      date: "12/Mei/2023",
      os: "23,938",
      gs: "20,900",
      percentage: 200.01,
      color: "cardLime",
    },
    {
      title: "Kredit BPR & LKM",
      date: "12/Mei/2023",
      os: "3,938",
      gs: "10,900",
      percentage: 210.01,
      color: "cardDanger",
    },
  ];

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
