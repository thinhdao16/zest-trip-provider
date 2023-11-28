import Adventure from "../../../assets/tour/iconTag/Adventure.svg";
import Art from "../../../assets/tour/iconTag/Art.svg";
import Beach from "../../../assets/tour/iconTag/Beach.svg";
import City from "../../../assets/tour/iconTag/City.svg";
import Cultural from "../../../assets/tour/iconTag/Cultural.svg";
import Family from "../../../assets/tour/iconTag/Family.svg";
import Food from "../../../assets/tour/iconTag/Food.svg";
import Hiking from "../../../assets/tour/iconTag/Hiking.svg";
import Historical from "../../../assets/tour/iconTag/Historical.svg";
import Mountain from "../../../assets/tour/iconTag/Mountain.svg";
import Nature from "../../../assets/tour/iconTag/Nature.svg";
import Nightlife from "../../../assets/tour/iconTag/Nightlife.svg";
import Offbeat from "../../../assets/tour/iconTag/Offbeat.svg";
import Photography from "../../../assets/tour/iconTag/Photography.svg";
import Relaxation from "../../../assets/tour/iconTag/Relaxation.svg";
import Romantic from "../../../assets/tour/iconTag/Romantic.svg";
import Shopping from "../../../assets/tour/iconTag/Shopping.svg";
import Sightseeing from "../../../assets/tour/iconTag/Sightseeing.svg";
import Solo from "../../../assets/tour/iconTag/Solo.svg";
import Water from "../../../assets/tour/iconTag/Water.svg";

function createDataTag() {
  return {
    Adventure,
    Art,
    Beach,
    City,
    Cultural,
    Family,
    Food,
    Hiking,
    Historical,
    Mountain,
    Nature,
    Nightlife,
    Offbeat,
    Photography,
    Relaxation,
    Romantic,
    Shopping,
    Sightseeing,
    Solo,
    Water,
  };
}

export function TourTag(field: { field: string; style: string }) {
  const dataTag: any = createDataTag();
  const fieldKey: any = field.field;
  let imagePath;
  switch (fieldKey) {
    case "Adventure":
    case "Art":
    case "Beach":
    case "City":
    case "Cultural":
    case "Family":
    case "Food":
    case "Hiking":
    case "Historical":
    case "Mountain":
    case "Nature":
    case "Nightlife":
    case "Offbeat":
    case "Photography":
    case "Relaxation":
    case "Romantic":
    case "Shopping":
    case "Sightseeing":
    case "Solo":
    case "Water":
      imagePath = dataTag[fieldKey];
      break;
    default:
      imagePath = "/src/assets/tour/iconVehicle/dontfind.svg";
  }
  return (
    <div>
      <img src={imagePath} alt="any" className={field.style} />
    </div>
  );
}
