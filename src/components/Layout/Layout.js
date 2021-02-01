import React, { useState, useEffect, useContext, useRef } from "react";

import styled, { ThemeProvider } from "styled-components";
import Helmet from "next/head";
import AOS from "aos";

import Header from "../Header";
import Footer from "../Footer";

import SidebarDashboard from "../SidebarDashboard";
import ModalVideo from "../ModalVideo";
import ModalApplication from "../ModalApplication";
import ModalSignIn from "../ModalSignIn";
import ModalSignUp from "../ModalSignUp";

import GlobalContext from "../../context/GlobalContext";

import GlobalStyle from "../../utils/globalStyle";

import imgFavicon from "../../assets/favicon.png";
import imgLogoFull from "../../assets/image/logo-full.png";

import { get, merge } from "lodash";

// the full theme object
import { theme as baseTheme } from "../../utils";

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 9999999999;
  opacity: 1;
  visibility: visible;
  transition: all 1s ease-out 0.5s;
  &.inActive {
    opacity: 0;
    visibility: hidden;
  }
`;

// options for different color modes
const modes = { light: "light", dark: "dark" };

// merge the color mode with the base theme
// to create a new theme object
const getTheme = (mode) =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors),
  });

const Layout = ({ children, pageContext }) => {
  const gContext = useContext(GlobalContext);

  const [visibleLoader, setVisibleLoader] = useState(true);

  useEffect(() => {
    AOS.init({ once: true });
    setVisibleLoader(false);
  }, []);

  // Navbar style based on scroll
  const eleRef = useRef();

  useEffect(() => {
    window.addEventListener(
      "popstate",
      function (event) {
        // The popstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false
    );
    window.addEventListener(
      "pushState",
      function (event) {
        // The pushstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false
    );
  }, [gContext]);

  if (pageContext.layout === "bare") {
    return (
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>Do Everything as Code</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"}>
            <div className="load-circle">
              <span className="one"></span>
            </div>
          </Loader>
          <div className="site-wrapper overflow-hidden" ref={eleRef}>
            {children}
          </div>

          <ModalVideo />
          <ModalApplication />
          <ModalSignIn />
          <ModalSignUp />
        </div>
      </ThemeProvider>
    );
  }

  if (pageContext.layout === "dashboard") {
    return (
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>Do Everything as Code</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"}>
            <div className="load-circle">
              <span className="one"></span>
            </div>
          </Loader>
          <div
            className="site-wrapper overflow-hidden bg-default-2"
            ref={eleRef}
          >
            <Header isDark={gContext.headerDark} />
            <SidebarDashboard />
            {children}
          </div>

          <ModalVideo />
          <ModalApplication />
          <ModalSignIn />
          <ModalSignUp />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>Do Everything as Code</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
            <meta name="description" content="Find, share, evolve everything as code.  Increasing knowledge and access to pipeline as code modules to impove our ability to safely and quickly release software."></meta>
            {/* <!-- Google / Search Engine Tags --> */}
            <meta itemprop="name" content="Do Everything as Code"/>
            <meta itemprop="description" content="Find, share, evolve everything as code.  Increasing knowledge and access to pipeline as code modules to impove our ability to safely and quickly release software."/>
            <meta itemprop="image" content={imgLogoFull}/>

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://doeac.io"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Do Everything as Code"/>
            <meta property="og:description" content="Find, share, evolve everything as code.  Increasing knowledge and access to pipeline as code modules to impove our ability to safely and quickly release software."/>
            <meta property="og:image" content={imgLogoFull}/>

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Do Everything as Code"/>
            <meta name="twitter:description" content="Find, share, evolve everything as code.  Increasing knowledge and access to pipeline as code modules to impove our ability to safely and quickly release software."/>
            <meta name="twitter:image" content={imgLogoFull}></meta>
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"} />
          <div className="site-wrapper overflow-hidden" ref={eleRef}>
            <Header isDark={gContext.headerDark} />
            {children}

            <Footer isDark={gContext.footerDark} />
          </div>

          <ModalVideo />
          <ModalApplication />
          <ModalSignIn />
          <ModalSignUp />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
