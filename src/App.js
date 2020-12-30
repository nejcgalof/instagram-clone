import React, { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import "./NewPost.js";
import NewPost from "./NewPost.js";
import { db, auth } from "./firebase";
import ImageUploadPreview from "./ImageUploadPreview";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

function App() {
  const [posts, setPosts] = useState([]);
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
  }, []);

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
      <ScrollToTop smooth />
      <AppHeader user={user} setUser={setUser} />
      <ImageUploadPreview user={user} />
      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <NewPost
            key={id}
            postId={id}
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
            timestamp={post.timestamp}
            userId={post.userId}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
