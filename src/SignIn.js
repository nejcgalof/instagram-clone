import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "./firebase";
import { useStyles, getModalStyle } from "./Sign.js";

function SignIn({ openSignIn, setOpenSignIn }) {
  // Styles
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
      <div style={modalStyle} className={classes.paper}>
        <center>
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
        </center>
        <form className="app__signup">
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signIn}>
            Sign In
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default SignIn;
