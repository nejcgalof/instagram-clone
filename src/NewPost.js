import React, { useState, useEffect } from "react";
import "./NewPost.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ChatIcon from "@material-ui/icons/Chat";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { storage, db } from "./firebase";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 45,
    backgroundColor: "white",
    border: "1px solid lightgray",
  },
  media: {
    maxHeight: 500,
    width: "100%",
    objectFit: "contain",
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(360deg)",
  },
}));

function NewPost({
  postId,
  user,
  username,
  caption,
  imageUrl,
  timestamp,
  userId,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const handleExpandClick = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeletePost = async () => {
    if (postId) {
      await deleteImageFromPost();
      handleDeleteAllComments();
      db.collection("posts").doc(postId).delete();
    }
    handleCloseMenu();
  };

  const deleteImageFromPost = async () => {
    if (postId) {
      let ref = db.collection("posts").doc(postId);
      await ref.get().then((userData) => {
        storage.refFromURL(userData.data().imageUrl).delete();
      });
    }
  };

  const handleDeleteAllComments = () => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .get()
        .then((res) => {
          res.forEach((element) => {
            element.ref.delete();
          });
        });
    }
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.avatar}
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
        }
        action={
          userId === user?.uid ? (
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleSettingsClick} />
            </IconButton>
          ) : (
            ""
          )
        }
        title={username}
        subheader={timestamp == null ? "" : timestamp.toDate().toLocaleString()}
      />
      <Menu
        id="post__menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        keepMounted
      >
        <MenuItem onClick={handleDeletePost}>Delete post</MenuItem>
        <MenuItem onClick={handleDeleteAllComments}>
          Delete all comments
        </MenuItem>
      </Menu>
      <CardMedia
        component="img"
        className={classes.media}
        image={imageUrl}
        title={caption}
      />
      <CardContent className="post__description">
        <Typography variant="body2" color="textSecondary" component="p">
          {caption}
        </Typography>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
          >
            {expanded ? <ChatIcon /> : <ChatOutlinedIcon />}
          </IconButton>
        </CardActions>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="post__comments">
          <div className="post__previousComments">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  key={comment?.id}
                >
                  <strong>{comment?.comment?.username}</strong>{" "}
                  {comment?.comment?.text}
                </Typography>
              ))
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                key="noComment"
              >
                No comments yet
              </Typography>
            )}
          </div>
          {user && (
            <form className="post__commentBox">
              <input
                className="post__input"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="post__button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
              >
                Post
              </button>
            </form>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default NewPost;
