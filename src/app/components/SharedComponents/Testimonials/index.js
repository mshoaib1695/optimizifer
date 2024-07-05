"use client";
import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CusImg1 from "../../../../../public/images/testimonials-cus-img1.png";
import CusImg2 from "../../../../../public/images/testimonials-cus-img2.png";
import CusImg3 from "../../../../../public/images/testimonials-cus-img3.png";
import CusImg4 from "../../../../../public/images/testimonials-cus-img4.png";
import CusImg5 from "../../../../../public/images/testimonials-cus-img5.png";

export default function Testimonials() {
  const settings = {
    centerMode: true,
    dots: false,
    arrows: false,
    centerPadding: "90px",
    slidesToShow: 1,
    initialSlide: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handlePrevClick = () => {
    sliderRef.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.slickNext();
  };

  const testimonialData = [
    {
      id: 1,
      image: CusImg1,
      mainTestimonial:
        "It makes my work very easy and I give my love and respect to the developers. I love to use pdf merging features are great.",
      personName: "Müjdat Sayar",
      designation: "Senior ui/ux designer",
    },
    {
      id: 2,
      image: CusImg2,
      mainTestimonial:
        "Awsome plugin...How much time will I save🥹 I hope you to support exporting 2x, 3x and custum scale someday...!",
      personName: "Risako Furukawa",
      designation: "Senior product designer",
    },
    {
      id: 3,
      image: CusImg3,
      mainTestimonial:
        "Very happy to discover there is a free alternative to paid plugins for exporting multi pages PDF.",
      personName: "louis",
      designation: "UX Manager",
    },
    {
      id: 4,
      image: CusImg4,
      mainTestimonial:
        "neat, thanks <3.",
      personName: "Gaspard",
      designation: " ",
    },
    {
      id: 5,
      image: CusImg5,
      mainTestimonial:
        "@compressify awesome job! Thanks :D",
      personName: "Naribowrou",
      designation: " ",
    },
  ];

  let sliderRef;

  return (
    <>
      <div id="testimonials-section">
        <div className="testimonials-content">
          <h3>Testimonials</h3>
        </div>

        <div className="testimonials-scroll testimonials-center slick-initialized slick-slider">
          <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            {testimonialData.map((testimonial, index) => (
              <div key={index}>
                <div className="testimonials-card">
                  <div
                    className="testimonials-main-content"
                    key={testimonial.id}
                  >
                    {testimonial.mainTestimonial}
                    <div className="testimonials-tag">
                      <Image src={testimonial.image} alt="" />
                      <div>
                        <h3>{testimonial.personName}</h3>
                        <p>{testimonial.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="testimonials-slider-arrows">
          <p className="left" onClick={handlePrevClick}></p>
          <p className="right" onClick={handleNextClick}></p>
        </div>
      </div>
    </>
  );
}
