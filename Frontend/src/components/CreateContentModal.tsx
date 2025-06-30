import React from "react";
import CrossIcon from "../icons/CrossIcon";
import Input from "./Input";
import Button from "./Button";

interface contentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ open, onClose }: contentModalProps) => {
  return (
    <div>
      {open && (
        <div className="z-[2] w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input placeholder={"Title"} />
                <Input placeholder={"link"} />
              </div>
              <div className="flex justify-center ">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
