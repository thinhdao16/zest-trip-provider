import { FC, ChangeEventHandler, ReactNode, useState } from "react";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextareaAutosize,
} from "@mui/material";

interface TextAreaWithIconProps {
  label: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  icon: ReactNode;
  maxLength: number;
  [rest: string]: any;
}

const InputArea: FC<TextAreaWithIconProps> = ({
  label,
  onChange,
  icon,
  maxLength,
  ...rest
}: TextAreaWithIconProps) => {
  const [characterCount, setCharacterCount] = useState(0);

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const inputText = event.target.value;
    if (inputText.length <= maxLength) {
      setCharacterCount(inputText.length);
      onChange(event);
    }
  };

  return (
    <FormControl>
      <p className="font-medium">{label}</p>
      <div style={{ position: "relative" }}>
        <InputAdornment
          position="start"
          style={{
            position: "absolute",
            top: "20px",
            left: "8px",
            transform: "translateY(-50%)",
          }}
        >
          {icon}
        </InputAdornment>
        <textarea
          style={{
            border: "1px solid #cccccc",
            paddingTop: "5px",
            paddingLeft: "32px",
            width: "100%",
            minHeight: "100px",
            borderRadius: "8px",
          }}
          className=" focus:ring-navy-blue focus:ring-1 focus:outline-none hover:ring-1 hover:ring-navy-blue  shadow-custom-card-mui"
          onChange={handleInputChange}
          maxLength={maxLength}
          {...rest}
        />
      </div>
      <FormLabel style={{ fontWeight: 400, fontSize: "15px" }}>
        {characterCount}/{maxLength}
      </FormLabel>
    </FormControl>
  );
};

export default InputArea;
