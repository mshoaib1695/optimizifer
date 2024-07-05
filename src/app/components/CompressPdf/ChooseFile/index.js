import React from "react";
import CompressPdfIcon from "../../../../../public/images/compress-pdf-images/compress-pdf-main-sec-icon.svg";
import GreenFill from "../../../../../public/images/compress-pdf-images/check-fill-green.svg";
import Image from "next/image";
import { useConfig } from "../../../../context/ConfigContext";

export default function ChoosePdfFile({
  existingPdfs,
  propSetPdfs,
  stepChanged,
}) {
  const pdfSetter = (e) => {
    let totalPdfs = [];

    totalPdfs = [...e.target.files].map((file) => {
      return file;
    });
    propSetPdfs(totalPdfs);
    stepChanged(3);
  };
  const config = useConfig();

  return (
    <section className="compress-pdf-section">
      <div className="compress-pdf-notification-bar">
        PDF Compressing 5 times a day *FREE.{" "}
      </div>
      <div className="compress-pdf-main-content">
        <div className="compress-pdf-main-left-content">
          <h1>Compress PDF</h1>
          <p>
            Quickly shrink your PDFs for free with our easy-to-use, online PDF
            compressor! Enhance your workflow effortlessly
          </p>
          <div className="compress-pdf-left-bottom-content">
            <div className="reduce-file-content">
              <Image src={GreenFill} alt="check-green-fill" />
              <h2>Reduce file size up to 99%</h2>
            </div>
            <div className="reduce-file-content">
              <Image src={GreenFill} alt="check-green-fill" />
              <h2>TLS encryption for secure document processing</h2>
            </div>
          </div>
        </div>
        <div className="compress-pdf-main-right-content">
          <figure>
            <Image src={CompressPdfIcon} alt="compress-pdf-icon" />
          </figure>
          <input
            onChange={pdfSetter}
            type="file"
            multiple="multiple"
            accept="application/pdf"
            name="compressedpdf"
          />
          <button>Choose File Here</button>
          <p>Drop File Here</p>
          <h3>Upto to {config?.freePdfAtAtime} PDF, max {config?.freePdfFileSize}MB each</h3>
        </div>
      </div>
    </section>
  );
}
