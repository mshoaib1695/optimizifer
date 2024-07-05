/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import CompressionImg from "../../../../../../../public/images/Compressed-images/compress-compression-img.svg";
import CompressImgCross from "../../../../../../../public/images/compress-pdf-images/pdf-cross-img.svg";
import CompressionBasic from "../../../../../../../public/images/Compressed-images/basic-compression-image.svg";
import Image from "next/image";


export default function CompressionSettingImages({ image, stepChanged }) {
  return (
      <section className="compression-setting-sec">
        <div className="compression-setting-container">
          <div className="compression-setting-wrapper">
            <div className="compression-setting-content">
              <div className="compression-single-files-content">
                <Image src={CompressionImg} alt="compress-compression-img" />
                <p>{image.name}</p>
                <h1>{(image.size * 0.000001).toFixed(2)} Mbs</h1>

                <Image src={CompressImgCross} alt="compress-compression-img" />
              </div>

              <div className="compression-pro-container">
                <div className="compression-pro-main-content">
                  <div className="basic-compression">
                    <div className="basic-compression-medium-content">
                      <div>
                        <h2>Basic Compression</h2>
                        <p>Medium file size, High Quality</p>
                      </div>

                      <label className="container-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="estimated-mb">
                      <Image
                        src={CompressionBasic}
                        alt="basic-compression-image"
                      />
                      <div>
                        <h3>Estimated 9.5 MB</h3>
                        <span>(-40%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="strong-compression">
                    <div className="strong-compression-pro-tag">
                      <h5>PRO</h5>
                    </div>

                    <div className="strong-compression-smallest-content">
                      <div>
                        <h4>Strong Compression</h4>
                        <p>Smallest file size, Good quality</p>
                      </div>

                      <label className="container-checkbox">
                        <input type="checkbox" checked="checked" />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="strong-compression-estimated-mb">
                      <Image
                        src={CompressionBasic}
                        alt="basic-compression-image"
                      />
                      <div>
                        <h3>Estimated 3.98 MB</h3>
                        <span>(-75%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="compression-setting-button">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      stepChanged(3);
                    }}
                  >
                    Compress Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}