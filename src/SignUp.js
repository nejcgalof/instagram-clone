import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "./firebase";
import { useStyles, getModalStyle } from "./Sign.js";

function SignUp({ open, setOpen }) {
  // Styles
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>
        authUser.user.updateProfile({ displayName: username })
      )
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Button type="submit" onClick={signUp}>
            Sign up
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default SignUp;
