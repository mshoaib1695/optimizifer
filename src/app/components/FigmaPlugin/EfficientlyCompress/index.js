"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import WorksOne from "../../../../../public/images/works-one.png";
import CardOne from "../../../../../public/images/works-one-card-i.png";
import WorksTwo from "../../../../../public/images/works-two.png";
import WorksThree from "../../../../../public/images/works-three.png";
import CardThree from "../../../../../public/images/works-three-card-iii.png";

export default function EfficientlyCompressWithinFigma() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div id="works-section">
        <div className="works-sec">
          <h4 className="works-heading">
            Efficiently compress your exports
            <br />
            within Figma with simplicity and speed.
          </h4>
          {/* <p className="works-para"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500 </p>  */}
        </div>
        <div className="how-it-works-content-row-one">
          <div className="line-left"></div>
          <div className="how-it-works-content-col" data-aos="fade-right">
            <span>01.</span>
            <h5>Select & Export</h5>
            <p>
              Select your file and export instantly with our seamless plugin.
            </p>
          </div>
          <div
            className="how-it-works-content-image-col how-it-works-content-content-col"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <Image
              className="how-it-works-content-image"
              src={WorksOne}
              alt="how-it-works-img"
            />

            <Image
              className="card1"
              data-aos="fade-up"
              data-aos-duration="1700"
              src={CardOne}
              alt=""
            />
          </div>
        </div>
        <div className="how-it-works-content-row-one mobile-reverse-how-works">
          <div
            className="how-it-works-content-image-col how-it-works-content-content-col"
            data-aos="fade-right"
          >
            <Image
              src={WorksTwo}
              alt=""
              className="how-it-works-content-image"
            />
            {/* <Image className="card2" data-aos="fade-up" data-aos-duration="1700" src="./images/works-two-card-ii.png" alt="">  */}
          </div>
          <div
            className="how-it-works-content-col text-right"
            data-aos="fade-left"
          >
            <span>02.</span>
            <h5>Quick Compression</h5>
            <p>
              Compressify quickly compresses your files without sacrificing
              quality.
            </p>
          </div>
          <div className="line-right"></div>
        </div>

        <div className="how-it-works-content-row-one">
          <div
            className="how-it-works-content-col"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <span>03.</span>
            <h5>Done</h5>
            <p>
              Easily track your savings and swiftly export more with just a few
              clicks.
            </p>
          </div>
          <div
            className="how-it-works-content-image-col how-it-works-content-content-col"
            data-aos="fade-left"
            id="example-anchor"
          >
            <Image
              src={WorksThree}
              alt=""
              className="how-it-works-content-image"
            />
            <Image
              className="card3"
              data-aos="fade-up"
              data-aos-duration="1700"
              data-aos-anchor="#example-anchor"
              data-aos-anchor-placement="top-bottom"
              src={CardThree}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
