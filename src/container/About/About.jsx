import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./About.scss";

const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const query = '*[_type == "about"]';

    client.fetch(query).then((data) => setAbout(data));
  }, []);

  return (
    <>
      <h1 className="head-text">My specialties</h1>

      <div className="about_list">
        {about.map((item, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="about_item"
            key={item.title + index}
          >
            <img src={urlFor(item.imgUrl)} alt={item.title} />
            <motion.div
              animate={{ boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)" }}
              className="about_info"
            >
              <h2 className="bold-text">{item.title}</h2>
              <p className="p-text">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

// Export using HOC wrapper as the container with
// parameter of (Component, idName, bgColor)
// then wrap again the component to apply the animation
export default AppWrap(MotionWrap(About, "about"), "about", "app__bg--green");
