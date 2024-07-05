import React from "react";
import CompressPdfIcon from "../../../../../public/images/compress-pdf-images/compress-pdf-main-sec-icon.svg";
import GreenFill from "../../../../../public/images/compress-pdf-images/check-fill-green.svg";
import { Ads } from "../../Ads";
import Image from "next/image";
import { useConfig } from "../../../../context/ConfigContext";

export default function ChooseImageFile({
  existingImages,
  propSetImages,
  stepChanged,
}) {
  // const imageSetter = (e) => {
  //   let totalImages = [];

  //   totalImages = [...e.target.files].map((file) => {
  //     return file;
  //   });
  //   propSetImages(totalImages);
  //   stepChanged(1);
  // };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      // selectedImages.push(files[i]);
      propSetImages([files[i]]); // Notify parent component with selected images
    }
  };
  const config = useConfig();

  return (
    <>
      <section className="compress-pdf-section">
        <div className="compress-pdf-main-content">
          <div className="compress-pdf-main-left-content">
            <h1>Compress Images</h1>
            <p>
              JPEG, PNG, and WebP compression with our latest AI technology to
              optimize your website for faster loading times.
            </p>
          </div>
          <div className="compress-pdf-main-right-content">
            <figure>
              <Image src={CompressPdfIcon} alt="compress-pdf-icon" />
            </figure>
            <input
              onChange={handleImageUpload}
              type="file"
              multiple="multiple"
              accept="image/jpeg, image/jpg, image/png"
              name="compressedimage"
            />
            <button>Choose File Here</button>
            <p>Drop File Here</p>
            <h3>
              Upto to {config?.freeImagesAtAtime} images, max{" "}
              {config?.freeImageFileSize}MB each
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}
