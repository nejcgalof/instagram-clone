import React, { useState } from "react";
import { Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { storage, db } from "./firebase";
import firebase from "firebase/app";
import Alert from "@material-ui/lab/Alert";
import "./ImageUpload.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function ImageUpload({ user, setExpand }) {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = () => {
    if (caption === "") {
      setError("Write something in caption.");
      return;
    } else if (image === null) {
      setError("Load image.");
      return;
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user?.displayName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            setImagePreview(null);
            setExpand(false);
            setError("");
          });
      }
    );
  };
  return (
    <div className="imageupload">
      <h2 className="imageupload__instruction">Upload something new</h2>
      {error && (
        <Alert severity="error" className="imageupload__error">
          {error}
        </Alert>
      )}
      <input
        className="imageupload__caption"
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <img className="imageupload__previewImage" src={imagePreview} alt="" />
      <div className="imageupload__file">
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            className="imageupload__fileButton"
            color="primary"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            Load Image
          </Button>
        </label>
      </div>
      <LinearProgress
        className="imageupload__progress"
        variant="determinate"
        value={progress}
      />
      <Button
        color="primary"
        className="imageupload__button"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
