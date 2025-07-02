import React from "react";
import SidebarItem from "./SidebarItem";
import YouTube from "../icons/YouTube";
import Twitter from "../icons/Twitter";
import Logo from "../icons/Logo";
import Button from "./Button";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white border-r w-64 fixed left-0 top-0 ">
         <div className="flex text-2xl pt-4 items-center pl-7">
            <div className="pr-4 text-purple-600">
                <Logo/>
            </div>
            Brainly
        </div>
      <div className="pt-4">
        <SidebarItem icon={<YouTube/>} text={"Youtube"} />
      <SidebarItem icon={<Twitter/>} text={"Twitter"} />
      </div>
     <div className="flex m-16 inset-x-0 bottom-0 ">
       <Button variant="primary" text="LogOut" onClick={()=>{
          localStorage.removeItem("token")
          window.location.href = "/signin"
        }}/>
     </div>
    </div>
  );
};

export default Sidebar;
