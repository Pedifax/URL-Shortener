import { FC, HTMLProps } from "react";

type InputType = {
  text: string;
  onClick: () => void;
};

const Button: FC<InputType & HTMLProps<HTMLDivElement>> = ({ text, onClick, ...props }: InputType) => {
  return (
    <div {...props}>
      <button
        onClick={onClick}
        className="text-md w-full rounded-lg border border-orange-300 py-2 text-center
      font-light text-orange-400 ring-orange-300 hover:bg-orange-50 focus:outline-none"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
