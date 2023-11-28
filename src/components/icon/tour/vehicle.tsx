export function VehicleTag(field: { field: string; style: string }) {
  let imagePath;
  switch (field.field) {
    case `${field.field}`:
      imagePath = `/src/assets/tour/iconVehicle/${field.field}.svg`;
      break;
    default:
      imagePath = "../../../assets/tour/iconTag/Adventure.svg";
  }
  return (
    <div>
      <img src={imagePath} alt="any" className={field.style} />

      {/* <img src="../../../assets/File-logo-Zest-Travel.svg" alt="Bicycle Icon" /> */}
    </div>
  );
}
