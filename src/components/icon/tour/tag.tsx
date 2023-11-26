export function VehicleTag(field: { field: string; style: string }) {
  console.log(field);
  // let imagePath;
  // switch (field.field) {
  //   case `${field.field}`:
  //     imagePath = `./assets/tour/iconVehicle/${field.field}.svg`;
  //     break;
  //   default:
  //     imagePath = "../../../assets/tour/iconTag/Adventure.svg";
  // }
  return (
    <div>
      {/* <img src={imagePath} alt="any" className={field.style} />
       */}
      <img src="../../../assets/File-logo-Zest-Travel.svg" alt="Bicycle Icon" />
    </div>
  );
}
export function TourTag(field: { field: string; style: string }) {
  let imagePath;
  switch (field.field) {
    case `${field.field}`:
      imagePath = `/src/assets/tour/iconTag/${field.field}.svg`;
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
