import React from "react";
import PluginIcon from "../../../../../public/images/figma-plugin-icon.svg";
import CompressedOnlineIcon from "../../../../../public/images/compressed-online-icon.svg";
import CompressedOnlineIcon1 from "../../../../../public/images/compressed-online-icon1.svg";
import ButtonArrow from "../../../../../public/images/button-arrow.svg";
import Image from "next/image";
import Link from "next/link";

export default function TryFigmaPlugin() {
  return (
    <>
      <div id="hero-section">
        <div className="pdf-compress">
          <h1 className="hero-heading">
            Export compressed PDF,JPG and PNG from Figma and reduce file sizes
            by up to 93%.
          </h1>
          <p className="hero-para">
            Why carry around a heavy load of PDF,JPG and PNG files when you can
            have Compressify lighten your load? Get compressed files straight
            from Figma now!
          </p>
          <div className="hero-button">
            <Link
              className="hero-plugin-btn-secondary"
              href="https://www.figma.com/community/plugin/1233404694629290096"
              target="_blank"
            >
              <span>
                <Image
                  className="plugin-img"
                  src={PluginIcon}
                  alt="figma-plugin-icon"
                />
                Run
                <Image
                  className="plugin-img"
                  src={ButtonArrow}
                  alt="figma-plugin-icon"
                />
              </span>
            </Link>
            <Link
              className="hero-plugin-btn hero-plugin-btn-dark open-modal-btn"
              href="https://www.figma.com/community/plugin/1233404694629290096"
              target="_blank"
            >
              <span>
                <Image
                  className="plugin-img"
                  src={PluginIcon}
                  alt="figma-plugin-icon"
                />
                Figma Plugin
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
