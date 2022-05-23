import React from "react";
import { NavigationDots, SocialMedia } from "../components";

/**
 * Component wrapper using higher order component.
 * Gives predefined css/html, social media icons, footer, and navigation dots.
 * Required parameters: component itself, component id,
 *   and additional css class for background color and span color.
 **/
const AppWrap = (Component, idName, bgColor) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${bgColor}`}>
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text">
              Copyright © 2022 DAIKI SATO. All rights reserved.
            </p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
