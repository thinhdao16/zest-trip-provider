import React, { useState, ChangeEvent, useRef, useEffect } from "react";

interface AutoResizableTextareaProps {
  defaultValue: string;
  onChange: (value: string) => void;
}

function AutoResizableTextarea({
  defaultValue,
  onChange,
}: AutoResizableTextareaProps) {
  useEffect(() => {
    if (defaultValue) {
      setText(defaultValue);
    }
  }, [defaultValue]);
  const [text, setText] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e.target.value);
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
    adjustTextarea();
  };

  useEffect(() => {
    adjustTextarea();
  }, [text]);

  return (
    <textarea
      className="border border-gray-300 rounded-lg py-2 px-8 w-full global-scrollbar"
      value={text}
      onChange={handleChange}
      onInput={handleInput}
      ref={textareaRef}
    />
  );
}

export default AutoResizableTextarea;
