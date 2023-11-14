import { FormLabel } from "@mui/material";
import { useState, ChangeEvent, useRef, useEffect } from "react";

interface AutoResizableTextareaProps {
  defaultValue: string;
  onChange: (value: string) => void;
  [rest: string]: any;
  maxLength: number;
}

function AutoResizableTextarea({
  defaultValue,
  onChange,
  maxLength,
  ...rest
}: AutoResizableTextareaProps) {
  useEffect(() => {
    if (defaultValue) {
      setText(defaultValue);
    }
  }, [defaultValue]);
  const [text, setText] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= maxLength) {
      setText(inputText);
      if (onChange) {
        onChange(inputText);
      }
    }
  };

  const adjustTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);
    adjustTextarea();
  };

  useEffect(() => {
    adjustTextarea();
  }, [text]);

  return (
    <>
      <textarea
        className="border border-gray-300 rounded-lg py-2 pl-8 w-full global-scrollbar "
        value={text}
        onChange={handleChange}
        onInput={handleInput}
        ref={textareaRef}
        {...rest}
      />
      <FormLabel style={{ fontWeight: 400, fontSize: "15px" }}>
        {text.length}/{maxLength}
      </FormLabel>
    </>
  );
}

export default AutoResizableTextarea;
