import React from "react";
import Button from "./components/Button";
import AddIcon from "./icons/AddIcon";
import ShareIcon from "./icons/ShareIcon";
import Card from "./components/Card";

const App = () => {
  return (
    <div className="h-screen bg-slate-100 p-4">
      <div className="flex justify-end gap-4">
        <Button
          variant="primary"
          text="Add content"
          startIcon={<AddIcon />}
        ></Button>
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        ></Button>
      </div>
      <div className="flex gap-4">
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
  );
};

export default App;
