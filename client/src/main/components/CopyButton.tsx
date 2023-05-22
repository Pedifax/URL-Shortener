import { useState } from "react";
import env from "../../utils/env";

type InputType = {
  returnedURL: String;
};

const CopyButton = ({ returnedURL }: InputType) => {
  const [text, setText] = useState<string>("Copy!");

  const handleClick = () => {
    // copy to clipboard
    let completeURL = env.BASE_URL + '/' + returnedURL;
    navigator.clipboard.writeText(completeURL);
    setText("Copied!");
  };
  return (
    <button
      onClick={handleClick}
      className="text-md w-full rounded-lg border border-orange-300 py-2 text-center 
      font-light text-orange-400 ring-orange-300 hover:bg-orange-50 focus:outline-none"
    >
      {text}
    </button>
  );
};

export default CopyButton;
