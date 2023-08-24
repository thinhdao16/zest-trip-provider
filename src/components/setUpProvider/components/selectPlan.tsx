import React from "react";
import { Plan } from "AppTypes";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const plans: Plan[] = [
  {
    serviceType: [
      {
        id: 1,
        name: "Servicios",
      },
      {
        id: 2,
        name: "Oversea",
      },
    ],
    policyCancell: [
      {
        id: 1,
        name: "Free before 24 hr",
      },
      {
        id: 2,
        name: "Dont free after 24 hr",
      },
    ],
    policyConfirm: [
      {
        id: 1,
        name: "Immediate",
      },
      {
        id: 2,
        name: "Dont Immediate",
      },
    ],
  },
];
interface SelectPlanProps {
  selectedPlan: Plan | null;
  updateSelectedPlan: (selectedPlan: Plan) => void;
}

export const SelectPlan = ({
  selectedPlan,
  updateSelectedPlan,
}: SelectPlanProps) => {
  const handleSelect = (
    e: SelectChangeEvent<string>,
    attributeName: keyof Plan
  ) => {
    const selectedValue = e.target.value;
    const updatedPlan: Plan = {
      ...selectedPlan!,
      [attributeName]: selectedValue,
    };
    updateSelectedPlan(updatedPlan);
  };

  return (
    <Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel
            id="service-type-label"
            required // Thêm required ở đây
          >
            Service Type
          </InputLabel>
          <Select
            labelId="service-type-label"
            id="service-type-select"
            value={selectedPlan?.serviceType || ""}
            label="Service Type"
            onChange={(e) => handleSelect(e, "serviceType")}
          >
            {plans[0]?.serviceType?.map((data: any) => (
              <MenuItem key={data?.id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="policy-cancell-label" required>
            Policy Cancell
          </InputLabel>
          <Select
            labelId="policy-cancell-label"
            id="policy-cancell-select"
            value={selectedPlan?.policyCancell || ""}
            label="Policy Cancell"
            onChange={(e) => handleSelect(e, "policyCancell")}
          >
            {plans[0]?.policyCancell?.map((data: any) => (
              <MenuItem key={data?.id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="policy-confirm-label" required>
            Policy Confirm
          </InputLabel>
          <Select
            labelId="policy-confirm-label"
            id="policy-confirm-select"
            value={selectedPlan?.policyConfirm || ""}
            label="Policy Confirm"
            onChange={(e) => handleSelect(e, "policyConfirm")}
          >
            {plans[0]?.policyConfirm?.map((data: any) => (
              <MenuItem key={data?.id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
