import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonials.scss";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Query to fetch testimonials
    // With descending order by creation date
    const queryTest = '*[_type == "testimonials"]';

    // Request and set data
    client.fetch(queryTest).then((data) => {
      setTestimonials(data);
    });
  }, []);

  return (
    <>
      <h1 className="head-text">Best References I Could Find</h1>
      <div className="test__container">
        {testimonials.length && (
          <>
            {/* Testimonial card content */}
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                {currentIndex === index && (
                  <AnimatePresence>
                    <motion.div
                      key="testimonial._id"
                      className="test__card"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      animate={{ boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)" }}
                      transition={{ layout: { duration: 1, type: "spring" } }}
                    >
                      <img src={urlFor(testimonial.image)} alt="avatar" />
                      <motion.div className="test__info">
                        <h3>
                          <span>&#10077; </span>
                          {testimonial.feedback}
                          <span> &#10078;</span>
                        </h3>
                        <p className="bold-text">{testimonial.name}</p>
                        <p className="p-text">{testimonial.company}</p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Avatar list of testimonials */}
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, type: "tween" }}
              className="avatar__list"
            >
              <div
                className="avatar__btn"
                onClick={() =>
                  handleClick(
                    currentIndex === 0
                      ? testimonials.length - 1
                      : currentIndex - 1
                  )
                }
              >
                <AiOutlineLeft />
              </div>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="avatar__item"
                  onClick={() => setCurrentIndex(index)}
                  key={testimonial._id}
                >
                  <img src={urlFor(testimonial.image)} alt="avatar icon" />
                </motion.div>
              ))}
              <div
                className="avatar__btn"
                onClick={() =>
                  handleClick(
                    currentIndex === testimonials.length - 1
                      ? 0
                      : currentIndex + 1
                  )
                }
              >
                <AiOutlineRight />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};

// Export using HOC wrapper as the container with
// parameter of (Component, idName, classNames)
// then wrap again the component to apply the animation
export default AppWrap(
  MotionWrap(Testimonials, "test"),
  "testimonials",
  "app__bg--yellow"
);
