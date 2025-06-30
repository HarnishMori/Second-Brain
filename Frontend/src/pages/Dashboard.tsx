import React, { useState } from "react";
import Button from "../components/Button";
import AddIcon from "../icons/AddIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Sidebar/>
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
          ></Button>
        </div>
        <div className="flex gap-4 mt-6">
          <Card
            type="twitter"
            link="https://x.com/FCIndiacricket/status/1938579101549474251"
            title="first tweet"
          />
          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=fS_nKbSHgtU"
            title="first video"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
