"use client";
import React, { useState } from "react";
import HeaderLogo from "../../../../../public/images/header-logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="mobile-menu-header">
        <Link className="header-menu-logo" href="/">
          <Image src={HeaderLogo} alt="header-logo" />{" "}
        </Link>
        <h3
          onClick={toggleMenu}
          className={`tb-menu-toggle ${
            isMenuOpen ? "tb-active-toggle tb-animate-toggle" : ""
          }`}
          id="menu-toggle"
          style={{ width: "30px", height: "25px", background: "transparent" }}
        >
          <i style={{ background: "rgb(13, 153, 255)" }}></i>
          <i style={{ background: "rgb(13, 153, 255)" }}></i>
          <i style={{ background: "rgb(13, 153, 255)" }}></i>
        </h3>
        {isMenuOpen && (
          <ul id="menu" className="tb-mobile-menu" style={{ display: "block" }}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/figma-plugin-compressify">Figma Plugin </a>
            </li>
            {/* <li>
              <a href="#">Desktop App</a>
            </li> */}
            <li>
              <a href="#">
                Compress <span> PDF </span>{" "}
              </a>
            </li>
            <li>
              <a href="#">
                Compress <span> Images </span>{" "}
              </a>
            </li>
            {/* <li><a href="api.html">API</a></li> 
            <button className="login-button-mobile"> Login </button>  */}
          </ul>
        )}
      </div>
    </>
  );
}
