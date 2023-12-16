import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Index";
import { AppDispatch } from "../../store/redux/store";
import { useEffect, useMemo } from "react";
import { getReporter } from "../../store/redux/silce/authSilce";
import { useSelector } from "react-redux";

function Reported() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getReporter());
  }, [dispatch]);
  const { reporter } = useSelector((state: any) => state.auth);
  const reporterPid = useMemo(() => {
    const pid = localStorage.getItem("id_provider");

    if (!pid) {
      // Handle the case where "id_provider" is not available in localStorage
      return null;
    }

    const filterPid = reporter?.filter(
      (providers: { provider: { id: string } }) =>
        providers?.provider?.id === pid
    );

    return filterPid || null;
  }, [reporter]);

  console.log(reporterPid);
  return (
    <>
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg">
        <div className="container mx-auto py-4 px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">Reported</h1>
              <span className="text-gray-500">List customer report</span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-4">
              {reporterPid?.map(
                (reported: { description: string; report_type: string }) => (
                  <div className="p-8 bg-white rounded-lg shadow-custom-card-mui transition-effect-hover flex flex-col justify-center items-center">
                    <img
                      src="https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
                      className="w-20 h-20 rounded-full mb-2"
                      alt=""
                    />
                    <span className="text-3xl font-bold">Incognito</span>
                    <div className="flex flex-col text-center gap-1 mt-2">
                      <button
                        type="button"
                        className="bg-red-300 text-red-900 font-medium text-sm px-2 py-1 rounded-md shadow-custom-card-mui"
                      >
                        {reported?.report_type}
                      </button>
                      <span>{reported?.description}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reported;
