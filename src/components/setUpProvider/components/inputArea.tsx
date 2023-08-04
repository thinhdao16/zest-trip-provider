import React, { FC, ChangeEventHandler, ReactNode, useState } from "react";
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

    const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const inputText = event.target.value;
        if (inputText.length <= maxLength) {
            setCharacterCount(inputText.length);
            onChange(event);
        }
    };

    return (
        <FormControl>
            <FormLabel style={{ fontWeight: 600, color: "black" }}>{label}</FormLabel>
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
                <TextareaAutosize
                    style={{
                        paddingLeft: "32px",
                        width: "38vw",
                        minHeight: "60px",
                        fontSize: "20px",
                        borderRadius: "8px",
                        borderColor: "#cccccc",
                    }}
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
