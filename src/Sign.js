import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Alert from "@material-ui/lab/Alert";
import { Button, Input } from "@material-ui/core";
import { auth } from "./firebase";
import "./Sign.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sign({
  openSignIn,
  setOpenSignIn,
  openSignUp,
  setOpenSignUp,
  setUser,
}) {
  // Styles
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetSignInformations = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setError("");
  };

  const signUp = async (event) => {
    try {
      event.preventDefault();
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await newUser.user.updateProfile({ displayName: username });
      await newUser.user.reload();
      resetSignInformations("");
      setOpenSignUp(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const signIn = async (event) => {
    try {
      event.preventDefault();
      await auth.signInWithEmailAndPassword(email, password);
      resetSignInformations("");
      setOpenSignIn(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal
      open={openSignIn || openSignUp}
      onClose={() => (openSignIn ? setOpenSignIn(false) : setOpenSignUp(false))}
    >
      <div style={modalStyle} className={classes.paper}>
        <center>
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
        </center>
        <form className="sign__form">
          {error && (
            <Alert severity="error" className="sign__error">
              {error}
            </Alert>
          )}
          {openSignUp && (
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
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
          <Button type="submit" onClick={openSignIn ? signIn : signUp}>
            {openSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default Sign;
