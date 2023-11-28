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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInput = (_e: ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextarea();
  };

  useEffect(() => {
    adjustTextarea();
  }, [text]);

  return (
    <>
      <textarea
        className="w-full shadow-custom-card-mui rounded-lg py-3 pl-8 focus:ring-navy-blue focus:ring-1 focus:outline-none   hover:ring-1 hover:ring-navy-blue  border border-gray-400"
        value={text}
        onChange={handleChange}
        onInput={handleInput}
        ref={textareaRef}
        style={{ minHeight: "200px" }}
        {...rest}
      />
      <span className="text-sm text-gray-500">
        {text.length}/{maxLength}
      </span>
    </>
  );
}

export default AutoResizableTextarea;
