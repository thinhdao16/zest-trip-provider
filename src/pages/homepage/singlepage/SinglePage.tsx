import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchTourDetail,
  getTagTour,
  getVehicleTour,
} from "../../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../../store/redux/store";
import Header from "./Header";
import NavBar from "./NavBar";
import ScreenMain from "./ScreenMain";
import ScreenSP from "./ScreenSP";
import { DataContext } from "../../../store/dataContext/DataContext";
import { EditContextProvider } from "./Context/EditContext";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";

function SinglePage() {
  const dispatch: AppDispatch = useDispatch();
  const { refreshTourDetail } = useContext(DataContext);
  const { index }: any = useParams();
  const loadingDetail = useSelector(
    (detail: any) => detail?.tour?.loadingDetail
  );
  useEffect(() => {
    dispatch(fetchTourDetail(index));
    dispatch(getTagTour());
    dispatch(getVehicleTour());
  }, [dispatch, index, refreshTourDetail]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <EditContextProvider>
      <Backdrop
        sx={{ color: "#ffffff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingDetail}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="h-[100vh]">
        <div>
          <div
            className={`fixed h-20  w-64 z-10 ${
              isSidebarOpen ? "bg-white top-0" : " bottom-0"
            }`}
          >
            <Header />
          </div>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
          {isSidebarOpen && (
            <button
              onClick={closeSidebar}
              className="fixed top-0 left-0 z-40 p-3 text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M19.293 5.293a1 1 0 00-1.414-1.414L10 13.586 1.707 5.293a1 1 0 00-1.414 1.414L8.586 15 0.293 23.293a1 1 0 001.414 1.414L10 16.414l8.293 8.293a1 1 0 001.414-1.414L13.414 15l8.293-8.293a1 1 0 000-1.414z"
                />
              </svg>
            </button>
          )}
          <aside
            id="default-sidebar"
            className={`fixed left-0 z-10 w-64 h-screen transition-transform ${
              isSidebarOpen
                ? "translate-x-0 top-24"
                : "-translate-x-full top-0 "
            }`}
            aria-label="Sidebar"
          >
            <div className="h-full  overflow-y-auto border-solid bg-white border-r-2 border-gray-100  dark:bg-gray-800 global-scrollbar">
              <NavBar />
            </div>
          </aside>
          <div
            className={`p-4  sm:ml-64 sm:mr-96 h-screen ${
              isSidebarOpen ? "pt-24" : "top-0"
            }`}
          >
            <ScreenMain />
          </div>
          <aside
            id="default-sidebar"
            className={`fixed right-0 z-10 w-96 h-screen transition-transform ${
              isSidebarOpen
                ? "translate-x-0 top-24"
                : "-translate-x-full top-0 "
            }`}
            aria-label="Sidebar"
          >
            <div className="h-[85vh] px-3 py-4 overflow-y-auto bg-main dark:bg-gray-800 global-scrollbar">
              <ScreenSP />
            </div>
          </aside>
        </div>
      </div>
    </EditContextProvider>
  );
}

SinglePage.propTypes = {};

export default SinglePage;
