import React from "react";

interface inputProps{
    placeholder:string;
    reference?: any; 
}

const Input = ({  placeholder, reference }:inputProps) => {
  return (
    <div>
      <input ref={reference} type={"text"} placeholder={placeholder} className="px-4 py-2 border rounded m-2"  />
    </div>
  );
};

export default Input;
