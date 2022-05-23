import React, { useState } from "react";

import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import { images } from "../../constants";

import "./Contact.scss";
const Contact = () => {
  // data for form and its' initial values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // Any error state on user input
  const [formError, setFormError] = useState({});
  // State constants while submitting data
  const [isFormSubmitted, setIsFromSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Destructuring formData's variables
  //  that later be used in handleSubmit()
  const { name, email, message } = formData;

  const validate = () => {
    const errors = {}; // Any error goes here
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const maxMessageLength = 300;
    // validate name input
    if (!name) {
      errors.name = "*Name is required!";
    }
    // Validate email input
    if (!email) {
      errors.email = "*Email is required!";
    } else if (!emailRegex.test(email)) {
      errors.email = "*Invalid email!";
    }
    // Validate message input
    if (!message) {
      errors.message = "*Message is required!";
    } else if (message.length > maxMessageLength) {
      errors.message = "*300 characters or less please!";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // While submitting data, loading set to true
    setLoading(true);
    // Validate values before sending data
    const errors = validate(formData);
    setFormError(errors);
    // If the validation have found no error
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      // Query to send data to "contact" with input value
      const contact = {
        _type: "contact",
        name: name,
        email: email,
        message: message,
      };
      // Create record in sanity contact
      client.create(contact).then(() => {
        // When the data have been submitted, finish loading
        setLoading(false);
        // Then show completed message
        setIsFromSubmitted(true);
        return;
      });
    }

    setLoading(false);
    return;
  };

  const handleChangeInput = (e) => {
    // Destructuring input's "name" and "value"
    const { name, value } = e.target;
    // Bind changed data into formData constant
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h1 className="head-text">Interested? Let me know here</h1>
      {!isFormSubmitted ? (
        <motion.div
          className="contact__form"
          animate={{ boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Name input */}
            <div className="contact__label">
              <label htmlFor="name" className="p-text">
                Your name:
              </label>
              {/* Name input error message */}
              {formError.name && <p className="error-text">{formError.name}</p>}
            </div>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="(e.g. John Doe)"
              className="p-text"
              onChange={handleChangeInput}
            />
            {/* Email input */}
            <div className="contact__label">
              <label htmlFor="email" className="p-text">
                Your email:
              </label>
              {/* Email input error message */}
              {formError.email && (
                <p className="error-text">{formError.email}</p>
              )}
            </div>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="(e.g. test@test.com)"
              className="p-text"
              onChange={handleChangeInput}
            />
            {/* Message input */}
            <div className="contact__label">
              <label htmlFor="message" className="p-text">
                Message:
              </label>
              {/* Message input error message */}
              {formError.message && (
                <p className="error-text">{formError.message}</p>
              )}
            </div>
            <textarea
              type="text-area"
              rows="8"
              name="message"
              value={message}
              placeholder="(Your message here)"
              className="p-text"
              onChange={handleChangeInput}
            />
            {loading ? (
              <p className="p-text">Sending</p>
            ) : (
              <button className="p-text" type="submit">
                Submit
              </button>
            )}
          </form>
        </motion.div>
      ) : (
        <>
          {/* If user submit form successfully */}
          <motion.div
            className="contact__submitted app__flex"
            animate={{ boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)" }}
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={images.avatar}
              alt="avatar"
              transition={{
                y: { duration: 0.8, yoyo: Infinity, ease: "easeOut" },
              }}
              animate={{ y: ["10%", "-10%"] }}
            />
            <h2 className="bold-text">Thank you for getting in touch.</h2>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AppWrap(MotionWrap(Contact, "contact"), "contact");
