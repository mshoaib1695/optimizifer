import React from 'react';
import CompressedImgUpload from "../../../../../../../public/images/Compressed-images/uploading-progress-img.svg";
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';


export default function UploadingProgressImages({ image, stepChanged }) {
  let [widthIncreaser, setWidthIncreaser] = useState(20)
  useEffect(() => {
    setWidthIncreaser(100)
    setTimeout(() => {
      stepChanged(3)
    }, 1000)
  }, [image])
  return (
    <>
      <section className="uploading-pdf-sec">
        <div className="uploading-pdf-background">
          <div className="uploading-pdf-content">
            <div className="loader" style={{ width: `${widthIncreaser}%` }}></div>
            <Image className="compress-images-uploading-img" src={CompressedImgUpload} alt="uploading-progress-img" />
            <h1>Uploading....</h1>

          </div>

        </div>
      </section>
    </>
  );
}