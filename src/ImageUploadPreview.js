import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import "./ImageUploadPreview.css";

function renderContent(user, expand, setExpand, handleExpandUploadPreview) {
  if (user) {
    if (expand) {
      return <ImageUpload user={user} setExpand={setExpand} />;
    } else {
      return (
        <div className="imageUploadPreview__collapsed">
          <Button
            color="primary"
            className="imageUploadPreview__button"
            startIcon={<CloudUploadIcon />}
            onClick={handleExpandUploadPreview}
          >
            Upload something new
          </Button>
        </div>
      );
    }
  } else {
    if (!user && expand) {
      setExpand(false);
    }
    return (
      <div className="imageUploadPreview__notLogin">
        <Typography variant="button" color="primary">
          Sorry, you need to login to upload
        </Typography>
      </div>
    );
  }
}

function ImageUploadPreview({ user }) {
  const [expand, setExpand] = useState(false);

  const handleExpandUploadPreview = () => {
    setExpand(!expand);
  };

  return (
    <div>
      {renderContent(user, expand, setExpand, handleExpandUploadPreview)}
    </div>
  );
}

export default ImageUploadPreview;
