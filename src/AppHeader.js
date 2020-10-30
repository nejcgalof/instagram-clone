import React from "react";
import { Button } from "@material-ui/core";
import { auth } from "./firebase";
import "./AppHeader.css";

function AppHeader({ user, setOpen, setOpenSignIn }) {
  return (
    <div className="appHeader">
      <img
        className="appHeader__image"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="appHeader_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
    </div>
  );
}

export default AppHeader;
