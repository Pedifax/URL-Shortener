import React, { useState } from "react";

type InputType = {
  onInput: (value: string) => void;
  placeholder: string;
};

const Input = ({ onInput, placeholder }: InputType) => {
  const [url, setUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    onInput(e.target.value);
  };

  return (
    <input
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 
      text-sm text-gray-900 focus:border-cyan-400 focus:outline-none focus:ring-cyan-400"
      type="text"
      onChange={handleChange}
      value={url}
      placeholder={placeholder}
    />
  );
};

export default Input;
