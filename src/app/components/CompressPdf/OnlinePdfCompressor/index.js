import React from "react";
import GreenFill from "../../../../../public/images/compress-pdf-images/check-fill-green.svg";
import PopularFirstImg from "../../../../../public/images/compress-pdf-images/most-popular-first-right.svg";
import PopularSecondImg from "../../../../../public/images/compress-pdf-images/most-popular-second-left.svg";
import PopularThirdtImg from "../../../../../public/images/compress-pdf-images/most-popular-third-right.svg";
import PdfOnlineImg from "../../../../../public/images/compress-pdf-images/compress-pdf-online-sec-img.svg";
import Image from "next/image";


export default function OnlinePdfCompressor() {
  return (
    <section className="most-popular-section">
      <div className="most-popular-main-content">
        <h4>Ultimate Online PDF Compressor for Seamless File Size Reduction!</h4>
        <p>
          Unleash the Power of our Compress PDF Tool: Effortlessly Shrink Large
          PDFs Online for Free. Seamlessly Prepare Files for Emailing, Sharing,
          and Storage in Just Seconds.
        </p>
      </div>

      <div className="pdf-compression-container">
        <div className="pdf-compression-row">
          <div className="pdf-compression-first-col-content">
            <h4>Unleash the Power of Flexible PDF Compression</h4>
            <p>
              "Effortless Trust: Quick, Professional Results Every Time. Tailor
              Your File Size with Two Compression Levels, Preserving Document
              Quality."
            </p>
          </div>

          <div className="pdf-compression-first-col-img">
            <Image
              className="flexible-compression-img"
              src={PopularFirstImg}
              alt="most-popular-first-right"
            />
          </div>
        </div>

        <div className="pdf-compression-row">
          <div className="pdf-compression-second-col-img">
            <Image
              className="flexible-compression-img"
              src={PopularSecondImg}
              alt="most-popular-second-left"
            />
          </div>
          <div className="pdf-compression-second-col-content">
            <h4>The Magic Behind Compression</h4>
            <p>
              Curious about the wizardry? We work our charm by eliminating
              repetitive patterns, optimizing hefty images, and presto! You're
              left with a lighter, yet top-notch PDF. It's all done in a flash,
              so you can turbocharge your productivity like a pro.
            </p>
          </div>
        </div>

        {/* <div className="pdf-compression-row">
          <div className="pdf-compression-third-col-content">
            <h4>Effortless Sharing When You're All Set</h4>
            <p>
              Teamwork makes the dream work, right? After compressing your PDF,
              sharing it with your team or clients is a breeze. Just utilize our
              handy share feature to instantly generate a download link.
              Collaborate like a pro!
            </p>
          </div>

          <div className="pdf-compression-third-col-img">
            <Image
              className="flexible-compression-img"
              src={PopularThirdtImg}
              alt="most-popular-third-right"
            />
          </div>
        </div> */}
      </div>

      <div className="compress-pdf-online-sec">
        <div className="compress-pdf-online-content">
          <div className="compress-pdf-online-row">
            <h4>How To Compress PDF Online for Free</h4>

            <div className="compress-pdf-online-left-bottom-content">
              <div className="compress-pdf-bottom-content">
                <Image src={GreenFill} alt="check-green-fill" />
                <h5>Upload your file by dropping it onto this page</h5>
              </div>

              {/* <div className="compress-pdf-bottom-content">
                <Image src={GreenFill} alt="check-green-fill" />
                <h5>Select your desired compression level</h5>
              </div> */}

              {/* <div className="compress-pdf-bottom-content">
                <Image src={GreenFill} alt="check-green-fill" />
                <h5>Continue to edit the PDF with our other tools if needed</h5>
              </div> */}

              <div className="compress-pdf-bottom-content">
                <Image src={GreenFill} alt="check-green-fill" />
                <h5>Click “Download” to save your compressed PDF</h5>
              </div>
            </div>
          </div>

          <div className="compress-pdf-online-right-img">
            <Image src={PdfOnlineImg} alt="compress-pdf-online-sec-img" />
          </div>
        </div>
      </div>
    </section>
  );
}