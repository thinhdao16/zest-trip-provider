import { FormControl } from "@mui/joy";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

import { ChangeEventHandler, ReactNode } from "react";
import { ElementCheckInput } from "../../../utils/ElementCheckInput";

interface InputProps extends Omit<TextFieldProps, "onChange"> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  labels: string;
  icon: ReactNode;
  [rest: string]: any;
}
export const Input = ({ labels, onChange, icon, ...rest }: InputProps) => {
  const isValueEmpty =
    !rest?.value || (typeof rest.value === "string" && rest.value.length === 0);
  return (
    <FormControl required style={{ marginBottom: "0" }}>
      <p className="font-medium mb-1 flex gap-1">
        {labels}
        {isValueEmpty && <ElementCheckInput />}
      </p>
      <TextField
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
        className="input-form-text-ready"
        {...rest}
        onChange={onChange}
      />
    </FormControl>
  );
};
