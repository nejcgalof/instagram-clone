import React, { useState, useEffect } from "react";
import "./App.css";
import "./Post.js";
import Post from "./Post.js";
import { db, auth } from "./firebase";
import ImageUpload from "./ImageUpload";
import AppHeader from "./AppHeader";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(auth.currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // UseEffect - runs a piece of code based on a specific condition
  // Every time posts change, run this code
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="app">
      <SignUp open={open} setOpen={setOpen} />
      <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
      <AppHeader user={user} setOpen={setOpen} setOpenSignIn={setOpenSignIn} />
      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
