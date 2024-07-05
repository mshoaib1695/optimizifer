import React from "react";
import Link from "next/link";
import Image from "next/image";
import CardImg from "../../../../../public/images/compressify-plugin-card-img.svg";
import DesktopCard from "../../../../../public/images/compressify-destop-card-img.svg";
import PdfCard from "../../../../../public/images/compressify-pdf-card-img.svg";
import CompressCard from "../../../../../public/images/compressify-compress-image-card-img.png";
import WordpressCard from "../../../../../public/images/compressify-wordpress-plugin-card-img.svg";

export default function CompressifyTools() {
  return (
    <section id="compressify-tools" className="compressify-tools-sec">
      <div className="compressift-tools-content">
        <h2>Compressify Tools</h2>
      </div>

      <div className="compressify-tools-card-content">
        <div className="compressify-cards-detail">
          <div className="compressify-main-card-content">
            <Image src={CardImg} alt="plugin-card-img" />
            <h3>Compressify Figma Plugin</h3>
            <p>Export high-quality compressed images effortlessly</p>
            <Link href="/figma-plugin-compressify" target="_blank">
              Try Figma PlugIn
            </Link>
          </div>
        </div>

        <div className="compressify-cards-detail">
          <div className="compressify-main-card-content">
            <Image src={WordpressCard} alt="desktop-card-img" />
            <h3>All in One Compression</h3>
            <p>Easily Compress PNG, JPG and WebP Formats for FREE</p>
            <Link href="#">Coming Soon</Link>
          </div>
        </div>

        <div className="compressify-cards-detail">
          <div className="compressify-main-card-content">
            <Image src={PdfCard} alt="pdf-card-img" />
            <h3>Compressify Compress PDF</h3>
            <p>Compress your PDF files without compromising on quality</p>
            <Link href="/compress-pdf-online">Compress PDF</Link>
          </div>
        </div>

        <div className="compressify-cards-detail">
          <div className="compressify-main-card-content">
            <Image src={CompressCard} alt="compress-img-card" />
            <h3>Compressify Compress Image</h3>
            <p>
              Optimize image file size without compromising quality
              effortlessly.
            </p>
            <Link href="/compress-images-online">Compress Images</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
