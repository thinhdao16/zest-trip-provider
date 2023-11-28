import Adventure from "../../../assets/tour/iconTag/Adventure.svg";
import Art from "../../../assets/tour/iconTag/Art.svg";

export function TourTag(field: { field: string; style: string }) {
  const dataTag: any = { Adventure: Adventure, Art: Art };
  const fieldKey: any = field.field;
  let imagePath;
  switch (field.field) {
    case `${field.field}`:
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
