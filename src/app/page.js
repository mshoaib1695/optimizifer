'use client'; 
import React from "react";
import CheckoutOurTools from "./components/Landing/CheckoutOurTools";
import CompressifyTools from "./components/Landing/CompressifyTools";
import FileOptimized from "./components/SharedComponents/FileOptimized";
import Testimonials from "./components/SharedComponents/Testimonials";

export default function Home() {
  return (
    <div className="container">
      <CheckoutOurTools />
      <CompressifyTools />
      <FileOptimized
        text={"Greetings, pal! We're delighted you could make it to the gathering! Over 25k individuals have chosen to utilize our plugin."}
        paragraph={
          "Compressify products have become the go-to choice for thousands of high-performing designers, developers, andcopywriters, empowering them to automate their work effortlessly."
        }
      />
      <Testimonials />
    </div>
  );
}
