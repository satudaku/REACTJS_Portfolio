import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Works.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === "all") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h1 className="head-text">My Creative Works</h1>

      <div className="works__filter-list">
        {["reactjs", "nextjs", "laravel", "material-ui", "sass", "all"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`works__filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              <p className="p-text">{item}</p>
            </div>
          )
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="works__list"
      >
        {filterWork.map((work, index) => (
          <div className="works__item app__flex" key={index}>
            <div className="works__img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="works__hover"
              >
                <div className="works__content">
                  <h2 className="bold-text">{work.title}</h2>
                  <div className="works__tag-list">
                    {work.tags &&
                      work.tags.map((tag, index) => (
                        <div className="works__tag-item" key={index}>
                          <p className="p-text">{tag}</p>
                        </div>
                      ))}
                  </div>
                  <div className="works__description">
                    <p className=" p-text">{work.description}</p>
                  </div>
                  <div className="works__btn-list">
                    <div className="works__btn-item">
                      <a href={work.projectLink} className="p-text">
                        Visit site
                      </a>
                    </div>
                    <div className="works__btn-item">
                      <a href={work.codeLink} className="p-text">
                        View code
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Work, "works"), "works", "app__bg--red");
