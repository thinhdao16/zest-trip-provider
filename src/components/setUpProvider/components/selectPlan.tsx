import React, { useState } from "react";
import { Plan } from "AppTypes";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const plans: Plan[] = [
  {
    serviceType: [
      {
        id: 1,
        name: "Domestic",
      },
      {
        id: 2,
        name: "International",
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
    <div className="flex flex-col items-center">
      <Box sx={{ width: 450, marginBottom: "12px" }}>
        <p style={{ marginBottom: "5px", fontWeight: 500 }}>Service type</p>
        <FormControl fullWidth>
          <Select
            style={{ borderRadius: "8px", height: "40px" }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={selectedPlan?.serviceType || ""}
            onChange={(e) => handleSelect(e, "serviceType")}
          >
            <MenuItem value="">
              <em>Please choose type</em>
            </MenuItem>
            {plans[0]?.serviceType?.map((data: any) => (
              <MenuItem key={data?.id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: 450, marginBottom: "12px" }}>
        <p style={{ marginBottom: "5px", fontWeight: 500 }}>
          Cancellation policy
        </p>
        <FormControl fullWidth>
          <Select
            style={{ borderRadius: "8px", height: "40px" }}
            displayEmpty
            value={selectedPlan?.policyCancell || ""}
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e) => handleSelect(e, "policyCancell")}
          >
            <MenuItem value="">
              <em>Please choose type</em>
            </MenuItem>
            {plans[0]?.policyCancell?.map((data: any) => (
              <MenuItem key={data?.id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: 450 }}>
        <p style={{ marginBottom: "5px", fontWeight: 500 }}>
          Confirmation policy
        </p>
        <FormControl fullWidth>
          <Select
            style={{ borderRadius: "8px", height: "40px" }}
            displayEmpty
            value={selectedPlan?.policyConfirm || ""}
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e) => handleSelect(e, "policyConfirm")}
          >
            <MenuItem value="">
              <em>Please choose type</em>
            </MenuItem>
            {plans[0]?.policyConfirm?.map((data: any) => (
              <MenuItem key={data?.id} value={data?.name}>
                {data?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
