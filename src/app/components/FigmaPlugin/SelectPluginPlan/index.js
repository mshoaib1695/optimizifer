import React from "react";
import PluginIcon from "../../../../../public/images/figma-plugin-icon.svg";
import ButtonArrow from "../../../../../public/images/button-arrow.svg";
import Image from "next/image";
import Link from "next/link";

const SelectPluginPlan = () => {
  return (
    <div id="select-plan-section">
      <div className="select-plan-section-inner">
        <h1 className="hero-heading">Select Your Plans</h1>
        <div className="plan-cards">
          <div className="plan-card">
            <h3 className="plan-type">Free</h3>
            <h4 className="plan-price">
              $0 <span>Free Forever</span>
            </h4>
            <ul>
              <li>100 Exports per month</li>
              <li>Limited Feature</li>
            </ul>
            <div className="text-center">
              <Link
                className="hero-plugin-btn-secondary"
                href="#_"
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
            </div>
          </div>
          <div className="plan-card">
            <h3 className="plan-type">Pro</h3>
            <h4 className="plan-price">
              $3 <span>/Per Month</span>
            </h4>
            <ul>
              <li>Unlimited Image Exports</li>
              <li>Unlimited PDFs Exports</li>
              <li>Unlimited PDFs Merge</li>
              <li>Priority Customer Support</li>
            </ul>
            <div className="text-center">
              <Link
                className="hero-plugin-btn hero-plugin-btn-dark open-modal-btn"
                href="#_"
              >
                <span>Buy Pro</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPluginPlan;
