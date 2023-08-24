import { Addon } from "AppTypes";
import { calculatePrice } from "../utils/calculatePrice";
import { Card } from "./card";
import clsx from "clsx";
import { Box } from "@mui/material";

const activeClasses = "border border-primary-purplish-blue bg-neutral-magnolia";

const addons: Addon[] = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
  },
  {
    name: "Large storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
  },
];

interface AddonsProps {
  selectedAddons: Addon[];
  monthly: boolean;
  updateAddons: (addon: Addon) => void;
}

export const Addons = () => {
  return <Box>
	
  </Box>;
};
