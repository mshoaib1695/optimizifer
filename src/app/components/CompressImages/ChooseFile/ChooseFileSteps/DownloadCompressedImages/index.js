import JSzip from "jszip";
import Image from "next/image";
import {
  isImageSizeExceedsLimit,
  returnPngCompressCalc,
  returnSizeBytes,
} from "../../../../../../helpers/helpers";
import {
  jpgApi,
  pngApi,
  webpApi,
} from "../../../../../../helpers/api.function";
import React, { useEffect, useState } from "react";
import CustomLinearProgress from "../../../../SharedComponents/CustomLinearProgress";
import { useConfig } from "../../../../../../context/ConfigContext";

export default function DownloadCompressedImages({
  images,
  finalImageBlob,
  setResponseImages,
  setCompressionFile,
  zipCompressedFile,
  fingerprint,
  licenseKey,
}) {
  const [processedImages, setProcessedImages] = useState(new Set());
  const [totalImageSizes, setTotalImageSize] = useState({});
  const [compressionButtonVisibility, setCompressionButtonVisibility] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [imageProgressBar, setImageProgressBar] = useState({});
  const config = useConfig();

  useEffect(() => {
    if (finalImageBlob.length) {
      let sum = 0;
      let sum2 = 0;
      finalImageBlob.forEach((img) => {
        sum += img.resultantFileSize || 0;
        sum2 += img.originalSize || 0;
      });
      const totalPercentage = returnPngCompressCalc(sum2, sum) || 0;

      setTotalImageSize({
        resultantSizeTotal: sum,
        orignalSizeTotal: sum2,
        totalPercentage,
      });
    }
  }, [finalImageBlob]);

  let inprogress = false;

  useEffect(() => {
    if (finalImageBlob.some((image) => !image.error)) {
      setCompressionButtonVisibility(true);
    }
  }, [finalImageBlob]);

  useEffect(() => {
    if (images.length && !inprogress) {
      inprogress = true;
      const slicedImages = images.map((image, index) => ({
        image,
        id: `${index}`,
        inProgress: false,
      }));
      const newImages = slicedImages.filter(
        (image, index) => !processedImages.has(index)
      );
      apiHit(newImages);
    }
  }, [images]);

  const returnSizeFormat = (bytes) => {
    if (bytes < 0) bytes = 0;
    const kilobyte = 1024;
    const megabyte = kilobyte * kilobyte;
    if (bytes >= megabyte) {
      return (bytes / megabyte).toFixed(1) + " MB";
    } else if (bytes >= kilobyte) {
      return (bytes / kilobyte).toFixed(1) + " KB";
    } else {
      return bytes.toFixed(1) + " Bytes";
    }
  };

  const handleApiRequest = async (formData, imageType, headers) => {
    switch (imageType) {
      case "image/png":
        return await pngApi(formData, headers);
      case "image/jpg":
      case "image/jpeg":
        return await jpgApi(formData, headers);
      case "image/webp":
        return await webpApi(formData, headers);
      default:
        throw new Error(
          "No other format than png, webp & jpg is allowed for images"
        );
    }
  };

  const processImage = async (image, zip, itemId) => {
    let freeImageFileSize = config?.freeImageFileSize ?? 30;
    let paidImageFileSize = config?.paidImageFileSize ?? 1000;
    const limit = licenseKey ? paidImageFileSize : freeImageFileSize;

    if (isImageSizeExceedsLimit(image.size, limit)) {
      return {
        error: true,
        name: image.name,
        imageSize: image.size,
        message: (
          <span>
            😕 File too big! Upgrade to{" "}
            <a
              href="/auth/sign-up"
              className="compressed-img-step-two-go-pro-para"
            >
              Pro
            </a>{" "}
            to remove the size limit.
          </span>
        ),
        downloadedUrl: window.URL.createObjectURL(image),
        goPro: true,
        orignalSizeTotal: image.size,
        resultantSizeTotal: image.size,
        originalSize: image.size,
        donwloadedFileName: image.name,
        fileName: image.name,
      };
    }

    if (isUnsupportedFormat(image)) {
      return {
        error: true,
        downloadedUrl: "/images/placeholder-image.svg",
        name: image.name,
        donwloadedFileName: image.name,
        fileName: image.name,
        imageSize: image.size,
        message: `Invalid image format.`,
        goPro: false,
        originalSize: image.size,
      };
    }

    const tryApiRequest = async (quality) => {
      const blob = new Blob([image]);
      const formData = new FormData();
      formData.append("quality", quality);
      formData.append("file", blob);

      const response = await handleApiRequest(formData, image.type, {
        "x-source-id": fingerprint,
        "x-license-key": licenseKey,
        "x-source-key": "COMPRESSIFY",
      });

      if (!response.ok) throw new Error("Request failed");

      const responseBlob = await response.blob();
      zip.file("compressed_" + image.name, responseBlob);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const compressedFile = new File([responseBlob], image.name, {
            type: "application/octet-stream",
          });
          const downloadedUrl = window.URL.createObjectURL(compressedFile);

          const constructImageObject = {
            fileName: image.name,
            error: false,
            originalSize: image.size,
            resultantFile: reader.result,
            resultantFileSize: returnSizeBytes(reader.result),
            calculation: returnPngCompressCalc(
              image.size,
              returnSizeBytes(reader.result)
            ),
            downloadedUrl: downloadedUrl,
            donwloadedFileName: image.name,
          };

          resolve(constructImageObject);
        };
        reader.readAsDataURL(responseBlob);
      });
    };

    const qualities = [85, 70, 50];
    setImageProgressBar((prevProgress) => ({
      ...prevProgress,
      [itemId]: 0,
    }));
    const interval = setInterval(() => {
      setImageProgressBar((prevProgress) => ({
        ...prevProgress,
        [itemId]: Math.min(prevProgress[itemId] + 5, 99),
      }));
    }, image.size / 3000);

    let result;
    try {
      for (let quality of qualities) {
        result = await tryApiRequest(quality);
        if (result.calculation > 0) break;
      }
    } finally {
      clearInterval(interval);
      const smoothTransition = setInterval(() => {
        setImageProgressBar((prevProgress) => {
          const currentProgress = prevProgress[itemId] || 0;
          if (currentProgress >= 100) {
            clearInterval(smoothTransition);
            return prevProgress;
          }
          return {
            ...prevProgress,
            [itemId]: Math.min(currentProgress + 1, 100),
          };
        });
      }, 30);
    }

    return result;
  };

  const apiHit = async (imageFiles) => {
    try {
      setLoading(true);
      const zip = new JSzip();
      let freeImagesAtAtime = config?.freeImagesAtAtime ?? 50;
      let paidImagesAtAtime = config?.paidImagesAtAtime ?? 1000;

      const limit = licenseKey ? paidImagesAtAtime : freeImagesAtAtime;

      const promises = imageFiles
        .filter((img) => parseInt(img.id) < limit)
        .map((item) => {
          setResponseImages((prevImages) => [
            ...prevImages,
            {
              ...item.image,
              fileName: item.image.name,
              originalSize: item.image.size,
              resultantFileSize: item.image.size,
              inProgress: true,
              id: item.id,
              downloadedUrl: window.URL.createObjectURL(item.image),
              donwloadedFileName: item.image.name,
            },
          ]);

          return processImage(item.image, zip, item.id)
            .then((result) => {
              setResponseImages((prevImages) => {
                const newImages = [...prevImages];
                const index = newImages.findIndex((i) => i.id == item.id);
                newImages[index] = result;
                return newImages;
              });
              setProcessedImages((prevProcessed) => {
                const newProcessed = new Set(prevProcessed);
                newProcessed.add(parseInt(item.id));
                return newProcessed;
              });
            })
            .catch((error) => {
              console.error(
                `Error processing image ${item.image.name}:`,
                error
              );
              const errorObject = {
                image: item.image,
                message: licenseKey ? (
                  "Error during image compression"
                ) : (
                  <span>
                    You've reached your daily limit of {limit} images. Upgrade
                    to{" "}
                    <a
                      href="/auth/sign-up"
                      className="compressed-img-step-two-go-pro-para"
                    >
                      Pro
                    </a>{" "}
                    for unlimited compression!
                  </span>
                ),
                goPro: licenseKey ? false : true,
                fileName: item.image.name,
                originalSize: item.image.size,
                error: true,
                resultantFileSize: item.image.size,
                downloadedUrl: window.URL.createObjectURL(item.image),
              };
              setResponseImages((prevImages) => {
                const newImages = [...prevImages];
                const index = newImages.findIndex((i) => i.id == item.id);
                newImages[index] = errorObject;
                return newImages;
              });

              setProcessedImages((prevProcessed) => {
                const newProcessed = new Set(prevProcessed);
                newProcessed.add(parseInt(item.id));
                return newProcessed;
              });
            });
        });

      await Promise.all(promises);

      for (const item of imageFiles.filter(
        (img) => parseInt(img.id) >= limit
      )) {
        const errorObject = {
          image: item.image,
          message: (
            <span>
              Oops! Maximum upload reached (max {limit}) {" "}
              <a
                href="/auth/sign-up"
                className="compressed-img-step-two-go-pro-para"
              >
                Go Pro
              </a>{" "}
              for unlimited file compression{" "}
            </span>
          ),
          fileName: item.image.name,
          originalSize: item.image.size,
          moreThanFive: true,
          goPro: licenseKey ? false : true,
          imageSize: null,
          error: true,
          downloadedUrl: window.URL.createObjectURL(item.image),
        };

        setResponseImages((prevImages) => {
          const newImages = [...prevImages];
          const index = newImages.findIndex((i) => i.id == item.id);
          if (index == -1) {
            newImages.push(errorObject);
          } else {
            newImages[index] = errorObject;
          }
          return newImages;
        });
        setProcessedImages((prevProcessed) => {
          const newProcessed = new Set(prevProcessed);
          newProcessed.add(parseInt(item.id));
          return newProcessed;
        });
      }

      const zipFileBlob = await zip.generateAsync({ type: "blob" });
      const compressedFileUrl = URL.createObjectURL(zipFileBlob);
      setCompressionFile(compressedFileUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isUnsupportedFormat = (imageData) => {
    const supportedFormats = ["png", "jpg", "jpeg", "webp"];
    const fileExtension = (imageData?.name || "")
      .split(".")
      .pop()
      .toLowerCase();
    return !supportedFormats.includes(fileExtension);
  };

  return (
    <>
      <section className="compressed-img-hero-section">
        <div className="wrapper-compressed-img-step-two">
          <div className="compressed-img-step-two-main-content">
            <div className="compressed-imgs-header">
              {loading ? (
                <div className="below-download-compressed">
                  {totalImageSizes?.totalPercentage > 0 ? (
                    <div
                      role="progressbar"
                      aria-valuenow={totalImageSizes?.totalPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        "--value": totalImageSizes?.totalPercentage,
                      }}
                    >
                      <span>SAVED</span>
                    </div>
                  ) : (
                    <div
                      role="progressbar-0"
                      aria-valuenow={0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        "--value": 0,
                      }}
                    ></div>
                  )}
                  <div className="compression-details">
                    <div className="pdf-smaller-para">
                      Please wait while the images are compressing
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <>
                    <div className="below-download-compressed">
                      <div
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                          "--value": totalImageSizes?.totalPercentage,
                        }}
                        className="loader-progress-bar"
                      >
                        <span>SAVED</span>
                      </div>
                      <div className="compression-details">
                        <div className="pdf-smaller-para">
                          Compressify saved you
                        </div>
                        <div className="mb-text">
                          <span className="compression-original-mb">
                            {returnSizeFormat(
                              parseFloat(
                                totalImageSizes?.orignalSizeTotal
                              ) -
                              parseFloat(
                                totalImageSizes?.resultantSizeTotal
                              )
                            )}{" "}
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  </>
                  <a
                    href={zipCompressedFile}
                    download={"compressfile.zip"}
                    className="download-pdf"
                  >
                    Download All
                  </a>
                </>
              )}
            </div>

            {/* Compressed Images Container Wrap Starts */}
            <div className="compressed-imgs-container">
              {finalImageBlob.length ? (
                finalImageBlob.map((imageData, index) => (
                  <div
                    className="compressed-img-step-two-info-content"
                    key={index}
                  >
                    <div className="compressed-img-step-two-info-download-content">
                      <div className="compressed-card-left-details">
                        <Image
                          src={imageData.downloadedUrl}
                          alt={imageData.fileName}
                          width={60}
                          height={60}
                        />
                        <div className="left-imgs-info">
                          <p className=" soon-parent">
                            <span className="step-two-info-para oneLine">
                              {imageData.fileName}
                            </span>
                            <span className="soon">{imageData?.fileName}</span>
                          </p>
                          <div className="file-type-size-info">
                            {(() => {
                              const extension = imageData.fileName
                                ?.split(".")
                                .pop()
                                .toLowerCase();
                              if (extension === "png") {
                                return <span className="ext-info">PNG</span>;
                              } else if (
                                extension === "jpg" ||
                                extension === "jpeg"
                              ) {
                                return <span className="ext-info">JPEG</span>;
                              } else {
                                return (
                                  <span className="ext-info">{extension}</span>
                                );
                              }
                            })()}
                            <span className="compressed-img-step-two-info-mb">
                              {returnSizeFormat(imageData.originalSize)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {imageData.goPro ? (
                        <div className="compressed-card-right-details">
                          <div className="compressed-img-step-two-download-button">
                            <div className="compressed-img-lock-icon">
                              <Image
                                src="/images/lock-icon.svg"
                                alt="PNG Icon"
                                width="20"
                                height="20"
                              />
                            </div>
                          </div>

                          <div className="error-section-right-dtl">
                            <div className="progress-many-files-images-step-two">
                              <div className="progress-value-many-files-img">
                                <h4>{imageData.message}</h4>
                              </div>
                            </div>
                            <a
                              href="/auth/sign-up"
                              className="compressed-img-step-two-go-pro-para"
                            >
                              Optimize now? Go Pro!
                            </a>
                          </div>
                        </div>
                      ) : imageData.error ? (
                        <div className="compressed-card-right-details">
                          <div className="compressed-img-step-two-download-button">
                            <div className="compressed-img-lock-icon">
                              <Image
                                src="/images/unsupport-format.svg"
                                alt="PNG Icon"
                                width="20"
                                height="20"
                              />
                            </div>
                          </div>

                          <div className="error-section-right-dtl">
                            <div className="progress-many-files-images-step-two">
                              <div className="progress-value-many-files-img">
                                <h4>{imageData.message}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : !imageData.inProgress ? (
                        <div className="compressed-card-right-details">
                          <div className="compressed-img-step-two-download-button">
                            <a
                              download={
                                "compressed_" + imageData.donwloadedFileName
                              }
                              href={imageData.downloadedUrl}
                            >
                              <div className="right-after-compressed-dtl">
                                {!imageData.inProgress ? (
                                  <p className="compressed-img-step-two-percentage-content">
                                    {imageData.calculation < 1
                                      ? imageData.calculation
                                      : `-${imageData.calculation}`}
                                    %
                                  </p>
                                ) : (
                                  <></>
                                )}

                                <span className="compressed-img-step-two-info-kb">
                                  {imageData.resultantFileSize <=
                                    imageData.originalSize
                                    ? returnSizeFormat(
                                      imageData.resultantFileSize
                                    )
                                    : returnSizeFormat(imageData.originalSize)}
                                </span>
                              </div>
                              {(() => {
                                const extension = imageData.fileName
                                  ?.split(".")
                                  .pop()
                                  .toLowerCase();
                                if (extension === "png") {
                                  return (
                                    <div className="compressed-img-extension-icon">
                                      <Image
                                        src="/images/image-icon.svg"
                                        alt="PNG Icon"
                                        width="20"
                                        height="20"
                                      />
                                      PNG
                                    </div>
                                  );
                                } else if (
                                  extension === "jpg" ||
                                  extension === "jpeg"
                                ) {
                                  return (
                                    <div className="compressed-img-extension-icon">
                                      <Image
                                        src="/images/image-icon.svg"
                                        alt="JPEG Icon"
                                        width="20"
                                        height="20"
                                      />
                                      JPEG
                                    </div>
                                  );
                                } else {
                                  return null;
                                }
                              })()}
                            </a>
                          </div>
                          <div className="compressed-right-lbl">
                            <span style={{ marginBottom: "7px" }}>
                              Savings:{" "}
                            </span>
                            <span>New Size: </span>
                          </div>
                        </div>
                      ) : (
                        <div className="compressed-card-right-details">
                          <p>Optimizing...</p>
                        </div>
                      )}
                    </div>
                    {imageData.inProgress ? (
                      <CustomLinearProgress
                        value={imageProgressBar[imageData.id] || 0}
                        max={100}
                        indeterminate={false}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            {(!loading && finalImageBlob.length > 10) ? <div className="compressed-imgs-footer">
              <>
                <>
                  <div className="below-download-compressed">
                    <div
                      role="progressbar"
                      aria-valuenow={0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        "--value": totalImageSizes?.totalPercentage,
                      }}
                      className="loader-progress-bar"
                    >
                      <span>SAVED</span>
                    </div>
                    <div className="compression-details">
                      <div className="pdf-smaller-para">
                        Compressify saved you
                      </div>
                      <div className="mb-text">
                        <span className="compression-original-mb">
                          {returnSizeFormat(
                            parseFloat(
                              totalImageSizes?.orignalSizeTotal
                            ) -
                            parseFloat(
                              totalImageSizes?.resultantSizeTotal
                            )
                          )}{" "}
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </>
                <a
                  href={zipCompressedFile}
                  download={"compressfile.zip"}
                  className="download-pdf"
                >
                  Download All
                </a>
              </>
            </div> : <></>}
          </div>
        </div>
      </section>
    </>
  );
}
