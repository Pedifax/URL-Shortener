import { FC, HTMLProps } from "react";

type InputType = {
  text: string;
  onClick?: () => void;
};

const ButtonBlue: FC<InputType & HTMLProps<HTMLDivElement>> = ({ text, onClick, ...props }: InputType) => {
  return (
    <div {...props}>
      <button
        onClick={onClick}
        className="mt-auto text-md w-full rounded-lg border border-cyan-400 py-2 text-center 
        font-normal text-cyan-500 ring-cyan-400 hover:bg-cyan-50 focus:outline-none"
        >
        {text}
      </button>
    </div>
  );
};

export default ButtonBlue;
