import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";

function ScreenMain() {
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  console.log(tourDetail);
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div>
        <span className="font-medium">Infomation basic</span>
      </div>
    </div>
  );
}

ScreenMain.propTypes = {};

export default ScreenMain;
