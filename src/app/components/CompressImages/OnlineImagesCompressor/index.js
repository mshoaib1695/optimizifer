import React from 'react';
import Image from 'next/image';
import GreenFill from "../../../../../public/images/compress-pdf-images/check-fill-green.svg";
import PopularImgOne from "../../../../../public/images/Compressed-images/popular-img-one.svg";
import PopularImgTwo from "../../../../../public/images/Compressed-images/popular-img-two.svg";
import PopularImgThree from "../../../../../public/images/Compressed-images/popular-img-three.svg";
import CompressImagesOnline from "../../../../../public/images/Compressed-images/compress-online-img.svg";


export default function OnlineImagesCompressor() {

  return (
    <section className="most-popular-images-section">
    <div className="most-popular-images-main-content">
     <h4>The Crowd's Favorite: Online Image Compression</h4>
     <p>Introducing our Compress Images tool designed to effortlessly compress large images online, all for free.
      Whether you're aiming to reduce file sizes for seamless emailing, sharing, or storage, you'll be good to go in a
      matter of seconds.</p>
    </div>

    <div className="images-compression-container">
     <div className="images-compression-row">
      <div className="images-compression-first-col-content">
       <h4>What can Compressify do for you?</h4>
       <p>Compressify works its magic on your images, reducing their file size with precision. Each uploaded image
        undergoes thorough analysis to determine the optimal image encoding strategy based on its content. The outcome?
        Top-notch image quality without any storage or bandwidth wastage!</p>
      </div>

      <div className="images-compression-first-col-img">
       <Image className="flexible-compression-img" src={PopularImgOne} alt="Compressify works its magic on your images" />
      </div>

     </div>
     <div className="images-compression-row">

      <div className="images-compression-second-col-img">
       <Image className="flexible-compression-img" alt="The Magic Behind Image Compression" src={PopularImgTwo} />
      </div>
      <div className="images-compression-second-col-content">
       <h4>The Magic Behind Image Compression</h4>
       <p>Curious minds want to know! When you upload an image, our system gets to work. It analyzes the textures,
        patterns, and colors, identifying every detail. The encoder then works its magic, creating an optimally
        compressed image file based on that information.</p>
      </div>
     </div>
     <div className="images-compression-row">

      <div className="images-compression-third-col-content">
       <h4>
        Why choose Compressify?</h4>
       <p>JPEG and PNG reigns supreme as the go-to formats for website and app photos. Sadly, many JPEG and PNG files
        lack optimal compression, wasting precious bytes. Striking the perfect balance between quality and small file
        size used to be a tedious human task. But fret not! With Compressify, we'll handle the compression worries so
        you can focus on what truly matters.</p>
      </div>

      <div className="images-compression-third-col-img">
       <Image className="flexible-compression-img" src={PopularImgThree} alt='JPEG and PNG reigns supreme as the go-to formats for website and app photos' />
      </div>

     </div>
    </div>
    <div className="compress-images-online-sec">
     <div className="compress-images-online-content">
      <div className="compress-images-online-row">
       <h4>How To Compress Image Online for Free</h4>

       <div className="compress-images-online-left-bottom-content">

        <div className="compress-images-bottom-content">
         <Image className="compress-images-sec-img" src={GreenFill} alt="Upload your file by dropping it onto this page"/>
         <h5>Upload your file by dropping it onto this page</h5>
        </div>

        {/* <div className="compress-images-bottom-content">
         <Image className="compress-images-sec-img" src={GreenFill} alt='Select your desired compression level' />
         <h5>Select your desired compression level</h5>
        </div> */}

        <div className="compress-images-bottom-content">
         <Image className="compress-images-sec-img" src={GreenFill} alt='Download the compressed Images' />
         <h5>Click “Download” to save your compressed Images</h5>
        </div>
       </div>
      </div>

      <div className="compress-images-online-right-img">
       <Image src={CompressImagesOnline} alt='online compress' />
      </div>
     </div>

    </div>

   </section>
  );
}