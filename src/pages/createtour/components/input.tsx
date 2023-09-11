import React from "react";
import { Typography } from "@mui/material";
import { ChangeEventHandler, ReactNode } from "react";

interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  labelMain: string;
  icon: ReactNode;
  placeholder: string;
  type: string;
  [rest: string]: any;
}

export const Input = ({
  labelMain,
  onChange,
  icon,
  placeholder,
  type,
  ...rest
}: CustomInputProps) => {
  return (
    <div>
      <Typography sx={{ fontWeight: 600 }}>{labelMain}</Typography>
      <div style={{ position: "relative", color: "black" }}>
        <input
          type={type}
          placeholder={placeholder}
          style={{
            paddingLeft: "30px",
            width: "100%",
            border: "none",
            boxShadow: "none",
            fontSize: "20px",
          }}
          onChange={onChange}
          {...rest}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            fontSize: "20px",
          }}
        >
          {icon}
        </div>
      </div>
      <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
    </div>
  );
};
