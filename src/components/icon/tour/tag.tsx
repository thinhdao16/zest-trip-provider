export function VehicleTag(field: { field: string }) {
  let imagePath;
  switch (field.field) {
    case `${field.field}`:
      imagePath = `src/assets/tour/iconVehicle/${field.field}.svg`;
      break;
    default:
      imagePath = "src/assets/tour/iconTag/dontfind.svg";
  }
  return (
    <div>
      <img src={imagePath} alt="any" className="h-8 w-8" />
    </div>
  );
}
export function TourTag(field: { field: string }) {
  let imagePath;
  switch (field.field) {
    case `${field.field}`:
      imagePath = `src/assets/tour/iconTag/${field.field}.svg`;
      break;
    default:
      imagePath = "src/assets/tour/iconVehicle/dontfind.svg";
  }
  return (
    <div>
      <img src={imagePath} alt="any" className="h-8 w-8" />
    </div>
  );
}
