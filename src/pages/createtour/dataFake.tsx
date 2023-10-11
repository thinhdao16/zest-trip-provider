import { AiFillBank } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

export interface DataItem {
  id: number;
  title: string;
  icon: JSX.Element;
}
export interface DataItemDuration {
  id: number;
  title: string;
  no: number;
}
export interface DataPrice {
  id: number;
  type: string;
  labelMain: string;
  icon: JSX.Element;
  main: string;
}
export const dataType: DataItem[] = [
  {
    id: 0,
    title: "House",
    icon: <AiFillBank />,
  },
  {
    id: 1,
    title: "House",
    icon: <AiFillBank />,
  },
  {
    id: 2,
    title: "House",
    icon: <AiFillBank />,
  },
  {
    id: 3,
    title: "House",
    icon: <AiFillBank />,
  },
  {
    id: 4,
    title: "House",
    icon: <AiFillBank />,
  },
  {
    id: 5,
    title: "House",
    icon: <AiFillBank />,
  },
  {
    id: 6,
    title: "House",
    icon: <AiFillBank />,
  },
  {
    id: 7,
    title: "House",
    icon: <AiFillBank />,
  },
];

export const dataTypeDuration: DataItemDuration[] = [
  {
    id: 0,
    title: "Day",
    no: 1,
  },
];

export const dataTypePrice: DataPrice[] = [
  {
    id: 1,
    type: "number",
    labelMain: "Minimum participants per booking",
    icon: <GoLocation />,
    main: "Mini",
  },
  {
    id: 2,
    type: "number",
    labelMain: "Maximum participants per booking",
    icon: <GoLocation />,
    main: "Max",
  },
];
