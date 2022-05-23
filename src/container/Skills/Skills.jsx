import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

// Breakdown of education list
const EduExpand = ({
  // Destructure education object
  education: { qualification, institution, location, year },
}) => {
  // useState constant when the user hovering the item or not
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      layout
      animate={{ boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)" }}
      transition={{ layout: { duration: 1, type: "spring" } }}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="edu__item edu__expand"
    >
      <motion.h3 layout="position" className="edu__title">
        {qualification}
      </motion.h3>
      {isHover && (
        <motion.div className="edu__info">
          <p className="p-text">{institution}</p>
          <p className="p-text">{location}</p>
          <p className="p-text">{year}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const Skills = () => {
  // Constants
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Query to fetch educations and skills list
    // With descending order by year and rating respectively
    const queryEdu = '*[_type == "educations"] | order(year desc)';
    const querySkills = '*[_type == "skills"] | order(rating desc)';

    client.fetch(queryEdu).then((data) => {
      setEducations(data);
    });

    client.fetch(querySkills).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h1 className="head-text">What & Where I Learned</h1>
      <div className="skills__container">
        {/* Programming skills list */}
        <motion.div className="skills__list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.01 }}
              className="skills__item"
              key={skill.name}
            >
              <div className="skills__info">
                <img src={urlFor(skill.logo)} alt={skill.logo} />
                <p className="p-text">{skill.name}</p>
              </div>
              <div className="skills__bar">
                <div
                  className="skills__bar-value"
                  style={{ width: skill.rating, background: skill.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Educations list */}
        <motion.div className="edu__list">
          {educations?.map((education) => (
            <EduExpand key={education._id} education={education} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

// Export using HOC wrapper as the container with
// parameter of (Component, idName, classNames)
// then wrap again the component to apply the animation
export default AppWrap(MotionWrap(Skills, "skills"), "skills", "app__bg--blue");
