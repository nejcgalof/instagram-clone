import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { auth } from "./firebase";
import Sign from "./Sign.js";
import "./AppHeader.css";

function AppHeader({ user, setUser }) {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  return (
    <div className="appHeader">
      <Sign
        openSignUp={openSignUp}
        setOpenSignUp={setOpenSignUp}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        setUser={setUser}
      />
      <img
        className="appHeader__image"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />
      <div className="appHeader_rightSide">
        {user ? (
          <React.Fragment>
            <h3 className="appHeader_name">Welcome {user.displayName}</h3>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </React.Fragment>
        ) : (
          <div className="appHeader_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppHeader;
