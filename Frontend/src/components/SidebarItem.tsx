import type { ReactElement } from "react";

const SidebarItem = ({ text, icon }: { text: string; icon: ReactElement }) => {
  return (
    <div className="flex text-gray-700 ml-8 p-4 max-w-48 rounded cursor-pointer hover:bg-gray-200">

      <div className="pr-4 ">{icon}</div>
      <div className="text-2xl">{text}</div>
    </div>
  );
};

export default SidebarItem;
