import React, { type ReactElement } from "react";

interface buttonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-3 py-3 rounded-md font-light flex items-center gap-1";

const Button = ({ variant, text, startIcon }: buttonProps) => {
  return (
    <button className={variantClasses[variant] + " " + defaultStyles}>
      {startIcon}
      {text}
    </button>
  );
};

export default Button;
