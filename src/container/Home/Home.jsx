import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <motion.div
        className="home app__flex"
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div className="home__info">
          <h1 className="head-text">Welcome</h1>
          <h2 className="p-text">Hi, My name is Daiki.</h2>
          <p className="p-text">
            I am a software engineering graduate seeking position as a web
            developer. Currently residing in Bali, Indonesia. My preferred tools
            are PHP, Laravel, and ReactJs.
          </p>
          <br />
          <p className="p-text">
            Keep scrolling to find out more and enjoy your stay!
          </p>
          <div className="home__contact-btn">
            <a href={`#contact`} className="p-text">
              Get in touch
            </a>
            <img src={images.backArrow} alt="Back Arrow" />
          </div>
        </div>
        <div className="home__photo">
          <img src={images.me} alt="me" />
        </div>
      </motion.div>
    </>
  );
};

export default AppWrap(Home, "home");
