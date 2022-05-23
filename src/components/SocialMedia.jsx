import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

import { links } from "../constants";

const SocialMedia = () => {
  return (
    <div className="app__social">
      {console.log(links)}
      <a href={links.linkedin}>
        <AiOutlineLinkedin />
      </a>
      <a href="https://github.com/satudaku">
        <AiOutlineGithub />
      </a>
    </div>
  );
};

export default SocialMedia;
