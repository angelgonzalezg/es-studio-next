
import React from "react"

type ButtonSize = "xs" | "sm" | "md" | "lg"  | "xl"  | "2xl";

const buttonSizeClasses: Record <ButtonSize, string> = {
  "xs": "text-xs",
  "sm": "text-sm",
  "md": "text-base",
  "lg": "text-lg",
  "xl": "text-xl",
  "2xl": "text-2xl"
};

type ButtonProps = {
  text: string,
  size?: ButtonSize,
  onClick?: React.MouseEventHandler<HTMLButtonElement>, // Reusable onClick prop for any function type
};

const Button = ({ text, size = "md", onClick }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full ${buttonSizeClasses[size]} bg-earth text-white p-2 rounded hover:bg-earth/75 transition cursor-pointer`}
      >
        {text}
    </button>
  )
};

export default Button;
