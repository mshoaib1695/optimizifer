'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import HomeCompression from "../../../../../public/images/compress-pdf-images/home-comparison-sec-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function FigmaExport() {
  const sliderRef = useRef(null);
  const sliderImgWrapperRef = useRef(null);
  const sliderHandleRef = useRef(null);

  const [isSliderLocked, setIsSliderLocked] = useState(false);

const sliderMouseMove = (event) => {
  if (isSliderLocked) return;

  const sliderLeftX = sliderRef.current.offsetLeft;
  const sliderWidth = sliderRef.current.clientWidth;
  const sliderHandleWidth = sliderHandleRef.current.clientWidth;

  let mouseX;
  if (event.touches && event.touches.length > 0) {
    mouseX = event.touches[0].clientX - sliderLeftX;
  } else {
    mouseX = event.clientX - sliderLeftX;
  }

  mouseX = Math.max(0, Math.min(mouseX, sliderWidth)); // Clamp mouseX within slider boundaries

  sliderImgWrapperRef.current.style.width = `${(
    (1 - mouseX / sliderWidth) *
    100
  ).toFixed(4)}%`;
  sliderHandleRef.current.style.left = `calc(${(
    (mouseX / sliderWidth) *
    100
  ).toFixed(4)}% - ${sliderHandleWidth / 2}px)`;
};


  const sliderMouseDown = (event) => {
    if (isSliderLocked) setIsSliderLocked(false);
    sliderMouseMove(event);
  };

  const sliderMouseUp = () => {
    if (!isSliderLocked) setIsSliderLocked(true);
  };

  const sliderMouseLeave = () => {
    if (isSliderLocked) setIsSliderLocked(false);
  };

  useEffect(() => {
    // Initialize vanilla-tilt
    VanillaTilt.init(sliderRef.current, {
      max: 0,
      speed: 800,
      scale: 1,
    });

    sliderRef.current.addEventListener("mousemove", sliderMouseMove);
    sliderRef.current.addEventListener("touchmove", sliderMouseMove);

    sliderRef.current.addEventListener("mousedown", sliderMouseDown);
    sliderRef.current.addEventListener("touchstart", sliderMouseDown);
    sliderRef.current.addEventListener("mouseup", sliderMouseUp);
    sliderRef.current.addEventListener("touchend", sliderMouseUp);
    sliderRef.current.addEventListener("mouseleave", sliderMouseLeave);

    return () => {
      // Remove event listeners when the component unmounts
      // sliderRef.current.removeEventListener("mousemove", sliderMouseMove);
      // sliderRef.current.removeEventListener("touchmove", sliderMouseMove);

      // sliderRef.current.removeEventListener("mousedown", sliderMouseDown);
      // sliderRef.current.removeEventListener("touchstart", sliderMouseDown);
      // sliderRef.current.removeEventListener("mouseup", sliderMouseUp);
      // sliderRef.current.removeEventListener("touchend", sliderMouseUp);
      // sliderRef.current.removeEventListener("mouseleave", sliderMouseLeave);
    };
  }, []);

  return (
    <>
      <div id="comparison-section" ref={sliderRef}>
        <h2 className="comparison-heading">Speed up the loading time of your content <br/>by reducing image sizes by up to 95%</h2>
        <p className="comparison-para">Don't settle for using huge image exports in your websites, apps, emails, presentations or banners.</p>
        <div className="comparison-main-slider">
          <div id="image-comparison-slider">
            <Image src={HomeCompression} alt="home-comparison-sec-img" />
            <div className="img-wrapper" ref={sliderImgWrapperRef}></div>
            <span className="label label-before">
              Before <p>1920 x 1080.JPG l 5.5 MB</p>
            </span>

            <span className="label label-after">
              After <p>1920 x 1080.JPG l 275 KB</p>
            </span>
            <div className="handle" ref={sliderHandleRef}>
              <div className="handle-line"></div>
              <div className="handle-circle">
                <FontAwesomeIcon icon={faChevronLeft} />
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className="handle-line"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}