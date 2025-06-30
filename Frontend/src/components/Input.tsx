import React from "react";

interface inputProps{
    // onChange: () => void;
    placeholder:string; 
}

const Input = ({  placeholder }:inputProps) => {
  return (
    <div>
      <input type={"text"} placeholder={placeholder} className="px-4 py-2 border rounded m-2"  />
    </div>
  );
};

export default Input;
