import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import AddIcon from "../icons/AddIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import Sidebar from "../components/Sidebar";
import useContent from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
    useEffect(()=>{
        refresh()
    },[modalOpen])
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-64 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            text="Add content"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          ></Button>
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
            onClick={async ()=>{
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                    share: true
                },{
                    headers:{
                        "Authorization": localStorage.getItem("token")
                    }
                })
                const shareUrl = `${FRONTEND_URL}/brain/${response.data.hash}`
                alert(shareUrl)
            }}
          ></Button>
        </div>
        <div className="flex gap-4 mt-6 flex-wrap">
          {contents.map(({ type, link, title}) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
    