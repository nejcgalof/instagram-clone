import React from "react";
import "./Footer.css";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__place">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nejcgalof"
        >
          <IconButton className="footer__hoverButton">
            <GitHubIcon />
          </IconButton>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/nejc-galof-0a416866"
        >
          <IconButton className="footer__hoverButton">
            <LinkedInIcon />
          </IconButton>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:galof.nejc@gmail.com"
        >
          <IconButton className="footer__hoverButton">
            <EmailIcon />
          </IconButton>
        </a>
      </div>
    </div>
  );
}

export default Footer;
