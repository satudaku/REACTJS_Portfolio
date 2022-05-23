import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

import "./Navbar.scss";
import { images } from "../../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <img src={images.logo} alt="logo" />
        </div>
        <ul className="navbar__links navbar__links--hidden">
          {["home", "about", "works", "skills", "testimonials", "contact"].map(
            (item) => (
              <li className="app__flex p-text" key={`link-${item}`}>
                <div>
                  <a href={`#${item}`}>{item}</a>
                </div>
              </li>
            )
          )}
        </ul>
        <div className="navbar__menu navbar__menu--hidden">
          <AiOutlineMenu
            className="navbar__menu-btn"
            onClick={() => setToggle(true)}
          />

          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <AiOutlineClose
                className="navbar__menu-close"
                onClick={() => setToggle(false)}
              />
              <ul>
                {[
                  "home",
                  "about",
                  "works",
                  "skills",
                  "testimonials",
                  "contact",
                ].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <img src={images.pepe} alt="pepe" />
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
