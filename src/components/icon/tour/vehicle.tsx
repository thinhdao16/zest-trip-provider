import AirPlane from "../../../assets/tour/iconVehicle/Airplane.svg";
import Bicycle from "../../../assets/tour/iconVehicle/Bicycle.svg";
import Boat from "../../../assets/tour/iconVehicle/Boat.svg";
import Bus from "../../../assets/tour/iconVehicle/Bus.svg";
import Camel from "../../../assets/tour/iconVehicle/Camel.svg";
import Car from "../../../assets/tour/iconVehicle/Car.svg";
import Cruise from "../../../assets/tour/iconVehicle/Cruise.svg";
import Hiking from "../../../assets/tour/iconVehicle/Hiking.svg";
import Horseback from "../../../assets/tour/iconVehicle/Horseback.svg";
import HotAirBalloon from "../../../assets/tour/iconVehicle/Hot Air Balloon.svg";
import Kayak from "../../../assets/tour/iconVehicle/Kayak.svg";
import Motorcycle from "../../../assets/tour/iconVehicle/Motorcycle.svg";
import RV from "../../../assets/tour/iconVehicle/RV.svg";
import Scooter from "../../../assets/tour/iconVehicle/Scooter.svg";
import Skiing from "../../../assets/tour/iconVehicle/Skiing.svg";
import Subway from "../../../assets/tour/iconVehicle/Subway.svg";
import Train from "../../../assets/tour/iconVehicle/Train.svg";
import Tram from "../../../assets/tour/iconVehicle/Tram.svg";
import TukTuk from "../../../assets/tour/iconVehicle/Tuk Tuk.svg";
import Walking from "../../../assets/tour/iconVehicle/Walking.svg";

function createDataVehicle() {
  return {
    AirPlane,
    Bicycle,
    Boat,
    Bus,
    Camel,
    Car,
    Cruise,
    Hiking,
    Horseback,
    "Hot Air Balloon": HotAirBalloon,
    Kayak,
    Motorcycle,
    RV,
    Scooter,
    Skiing,
    Subway,
    Train,
    Tram,
    "Tuk Tuk": TukTuk,
    Walking,
  };
}

export function VehicleTag(field: { field: string; style: string }) {
  const dataVehicle: any = createDataVehicle();
  const fieldKey: string = field?.field?.trim(); // Loại bỏ khoảng trắng nếu có
  let imagePath;

  switch (fieldKey) {
    case "Airplane":
      imagePath = dataVehicle.AirPlane;
      break;
    case "Bicycle":
      imagePath = dataVehicle.Bicycle;
      break;
    case "Boat":
      imagePath = dataVehicle.Boat;
      break;
    case "Bus":
      imagePath = dataVehicle.Bus;
      break;
    case "Camel":
      imagePath = dataVehicle.Camel;
      break;
    case "Car":
      imagePath = dataVehicle.Car;
      break;
    case "Cruise":
      imagePath = dataVehicle.Cruise;
      break;
    case "Hiking":
      imagePath = dataVehicle.Hiking;
      break;
    case "Horseback":
      imagePath = dataVehicle.Horseback;
      break;
    case "Hot Air Balloon":
      imagePath = dataVehicle["Hot Air Balloon"];
      break;
    case "Kayak":
      imagePath = dataVehicle.Kayak;
      break;
    case "Motorcycle":
      imagePath = dataVehicle.Motorcycle;
      break;
    case "RV":
      imagePath = dataVehicle.RV;
      break;
    case "Scooter":
      imagePath = dataVehicle.Scooter;
      break;
    case "Skiing":
      imagePath = dataVehicle.Skiing;
      break;
    case "Subway":
      imagePath = dataVehicle.Subway;
      break;
    case "Train":
      imagePath = dataVehicle.Train;
      break;
    case "Tram":
      imagePath = dataVehicle.Tram;
      break;
    case "Tuk Tuk":
      imagePath = dataVehicle["Tuk Tuk"];
      break;
    case "Walking":
      imagePath = dataVehicle.Walking;
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
