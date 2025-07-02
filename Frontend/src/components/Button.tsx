import React, { type ReactElement } from "react";

interface buttonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void ;
  fullwidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-3 py-3 rounded-md font-light flex items-center gap-1";

const Button = ({
  variant,
  text,
  startIcon,
  onClick,
  fullwidth,
  loading,
}: buttonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        variantClasses[variant] +
        " " +
        defaultStyles +
        `${fullwidth ? " w-[93%] flex justify-center items-center rounded-full mt-4 " : ""} ${
          loading ? " opacity-45 " : "" }`}
      disabled={loading}
    >
      {startIcon}
      {text}
    </button>
  );
};

export default Button;
