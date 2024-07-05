import React, { useEffect, useState } from 'react';
import UploadingIcon from "../../../../../../../public/images/compress-pdf-images/uploading-pdf-icon.svg";
import Image from 'next/image';

export default function UploadingProgressPdfs({ pdf, stepChanged }) {
  let [widthIncreaser, setWidthIncreaser] = useState(20)
  useEffect(() => {
    setWidthIncreaser(100)
    setTimeout(() => {
      stepChanged(3)
    }, 1000)
  }, [pdf])

  return (
    <section className="uploading-pdf-sec">
      <div className="uploading-pdf-background">
        <div className="uploading-pdf-content">
          <div className="loader" style={{ width: `${widthIncreaser}%` }}></div>
          <Image className="compress-images-uploading-img" src={UploadingIcon} alt="uploading-progress-img" />
          <h1>Uploading...</h1>
        </div>
      </div>
    </section>
  );
}