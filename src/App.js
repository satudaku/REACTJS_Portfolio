import React from "react";

import { About, Contact, Home, Skills, Testimonials, Works } from "./container";
import { Navbar } from "./components";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <About />
      <Works />
      <Skills />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default App;
