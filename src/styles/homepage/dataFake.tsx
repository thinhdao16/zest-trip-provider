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
  labelMain: string;
  labelSp: string;
  icon: JSX.Element;
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
    title:"Day",
    no: 1,
  },
  {
    id: 2,
    title:"Night",
    no: 1,
  },

];

export const dataTypePrice: DataPrice[] = [
  {
    id: 0,
    labelMain:"Adults",
    labelSp :"Age 10+",
    icon: <GoLocation />
  },
  {
    id: 1,
    labelMain:"Children",
    labelSp :"Age 5-9",
    icon: <GoLocation />
  },

];