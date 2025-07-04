import React, { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Input from "./Input";
import Button from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router";

interface contentModalProps {
  open: boolean;
  onClose: () => void;
}

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;

const CreateContentModal = ({ open, onClose }: contentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<
    (typeof ContentType)[keyof typeof ContentType]
  >(ContentType.Youtube);


  async function addcontent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    try{
      await axios.post(`${BACKEND_URL}/api/v1/content`,{
      link, 
      title, 
      type
    }, {
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    });
    }catch(e){
      console.error(e);
      alert("content added")
    }
    onClose();
  }

  return (
    <div>
      {open &&  (
        <div>
          <div className="z-[2] w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="z-[3] w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input reference={titleRef} placeholder={"Title"} />
                  <Input reference={linkRef} placeholder={"link"} />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex gap-2 p-4">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Youtube)}
                    />
                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Twitter)}
                    />
                  </div>
                  <div className="flex justify-center ">
                    <Button
                      variant="primary"
                      text="Submit"
                      onClick={addcontent}
                    />
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
