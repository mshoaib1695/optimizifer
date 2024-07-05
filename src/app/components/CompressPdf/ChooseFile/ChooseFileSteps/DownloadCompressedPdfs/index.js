import JSzip from "jszip";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { pdfApi } from "../../../../../../helpers/api.function";
import {
  returnPdfCompressCalc,
  isPdfSizeExceedsLimit,
  returnPdfSizeBytes,
} from "../../../../../../helpers/helpers";
import CustomLinearProgress from "../../../../SharedComponents/CustomLinearProgress";
import { useConfig } from "../../../../../../context/ConfigContext";

export default function DownloadCompressedPdfs({
  finalPdfBlob,
  zipCompressedFile,
  pdfs,
  setResponsePdfs,
  stepChanger,
  setCompressionFile,
  renderErrors,
  fingerprint,
  licenseKey,
}) {
  const [totalPdfSizes, setTotalPdfSize] = useState({});
  const [compressionButtonVisibility, setCompressionButtonVisibility] =
    useState(false);
  const [progressBar, setProgressBar] = useState({});
  const config = useConfig();

  useEffect(() => {
    if (finalPdfBlob.length) {
      let sum = 0;
      let sum2 = 0;
      finalPdfBlob.forEach((pdf) => {
        sum = sum + (pdf.resultantFileSize || 0);
        sum2 = sum2 + (pdf.originalSize || 0);
      });
      const resultantSizeTotal = returnSizeFormat(sum);
      const originalSizeTotal = returnSizeFormat(sum2);
      const totalPercentage = returnPdfCompressCalc(sum2, sum) || 0;
      const savedSize = returnSizeFormat(sum2 - sum);
      const resultantObject = {
        resultantSizeTotal,
        originalSizeTotal,
        totalPercentage,
        savedSize,
      };
      console.log('resultantObject', resultantObject)
      setTotalPdfSize({ ...resultantObject });
    }
  }, [finalPdfBlob]);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  let inprogress = false;
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    if (pdfs.length && !inprogress) {
      inprogress = true;
      let errorObject = {};
      let slicedPdfs = pdfs.map((pdf, index) => ({
        pdf: pdf,
        id: `${lastId + index}`,
        inProgress: false,
      }));
      const highestId = Math.max(...slicedPdfs.map((pdf) => Number(pdf.id)));
      let freePdfAtAtime = config?.freePdfAtAtime ?? 10;
      let paidPdfAtAtime = config?.paidPdfAtAtime ?? 500;
      const limit = licenseKey ? paidPdfAtAtime : freePdfAtAtime;
      slicedPdfs = slicedPdfs.filter((i) => parseInt(i.id) < limit);
      if (highestId >= limit) {
        errorObject = {
          message: (
            <span>
              Oops! Daily limit exceeded!{" "}
              <a
                href="/auth/sign-up"
                className="compressed-img-step-two-go-pro-para pro"
              >
                Go Pro
              </a>{" "}
              for unlimited file compression{" "}
            </span>
          ),
          moreThanFive: true,
          goPro: true,
          pdfSize: i.size,
          error: true,
        };
      }
      setLastId((prevLastId) => prevLastId + pdfs.length);
      apiHit(slicedPdfs, errorObject);
    }
  }, [pdfs]);


  const handlePdfProcessing = async (item, zip, totalPdfs) => {
    const pdf = item.pdf;
    let freePdfFileSize = config?.freePdfFileSize ?? 250;
    let paidPdfFileSize = config?.paidPdfFileSize ?? 500;
    const limit = licenseKey ? paidPdfFileSize : freePdfFileSize;
    if (isPdfSizeExceedsLimit(pdf.size, limit)) {
      const errorObject = createErrorObject(
        pdf.name,
        pdf.size,
        `Size of image ${pdf.name} exceed ${limit}MB`,
        true
      );
      updateResponsePdfs(errorObject);
      return errorObject;
    }
    if (isUnsupportedFormat(pdf)) {
      const errorObject = createErrorObject(
        pdf.name,
        pdf.size,
        `Invalid file format.`,
        false
      );
      updateResponsePdfs(errorObject);
      return errorObject;
    }

    addPdfToResponse(item, pdf);
    return processPdf(item, zip, totalPdfs);
  };

  const createErrorObject = (name, size, message, goPro) => ({
    error: true,
    inProgress: false,
    name,
    pdfSize: size,
    message,
    goPro,
  });

  const addPdfToResponse = (item, pdf) => {
    setResponsePdfs((prev) => [
      ...prev,
      {
        id: item.id,
        inProgress: true,
        fileName: pdf.name,
        error: false,
        originalSize: pdf.size,
        resultantFile: pdf.size,
        resultantFileSize: pdf.size,
        calculation: returnPdfCompressCalc(
          pdf.size,
          returnPdfSizeBytes(new Intl.NumberFormat().format(pdf.size))
        ),
        downloadedUrl: "",
        downloadedFileName: pdf.name,
      },
    ]);
  };

  const apiHit = async (allowedPdfs, extraPdfError) => {
    try {
      setLoading(true);
      const zip = new JSzip();
      const pdfPromises = allowedPdfs.map((item) => {
        return handlePdfProcessing(item, zip, allowedPdfs.length);
      });

      const results = await Promise.all(pdfPromises);

      results.forEach((result, index) => {
        if (result.error) {
          updateResponsePdfsWithError(allowedPdfs[index].id, result);
        } else {
          updateResponsePdfsWithSuccess(allowedPdfs[index].id, result);
        }
      });

      if (extraPdfError.error) {
        updateResponsePdfs(extraPdfError);
      }

      const zipFileBlob = await zip.generateAsync({ type: "blob" });
      const compressedFileUrl = URL.createObjectURL(zipFileBlob);
      setCompressionFile(compressedFileUrl);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const processPdf = async (item, zip, totalPdfs) => {
    const pdf = item.pdf;
    const qualities = [85, 70, 50];

    setProgressBar((prevProgress) => ({
      ...prevProgress,
      [item.id]: 2,
    }));

    const interval = setInterval(() => {
      setProgressBar((prevProgress) => ({
        ...prevProgress,
        [item.id]: Math.min(prevProgress[item.id] + 5, 99),
      }));
    }, pdf.size / 3000);

    let result;

    try {
      for (const quality of qualities) {
        result = await tryApiRequest(quality, pdf, zip, item.id, totalPdfs);
        console.log("try ", result)
        if (result && (result.error || result.calculation > 0)) break;
        console.log("try not here it already break")
      }
    } catch (e) {
      console.log(e);
      clearInterval(interval);
      const smoothTransition = setInterval(() => {
        setProgressBar((prevProgress) => {
          const currentProgress = prevProgress[item.id] || 0;
          if (currentProgress >= 100) {
            clearInterval(smoothTransition);
            return prevProgress;
          }
          return {
            ...prevProgress,
            [item.id]: Math.min(currentProgress + 1, 100),
          };
        });
      }, 0);
      const errorObject = createErrorObject(
        pdf.name,
        pdf.size,
        licenseKey
          ? e.message
          : (
            <span>
              You've reached your daily limit of ${config?.pdfLimit} PDFs.
              Upgrade to{" "}
              <a
                href="/auth/sign-up"
                className="compressed-img-step-two-go-pro-para pro"
              >
                Pro
              </a>{" "}
              for unlimited compression!
            </span>
          )
      );
      result = errorObject;
    } finally {
      clearInterval(interval);
      const smoothTransition = setInterval(() => {
        setProgressBar((prevProgress) => {
          const currentProgress = prevProgress[item.id] || 0;
          if (currentProgress >= 100) {
            clearInterval(smoothTransition);
            return prevProgress;
          }
          return {
            ...prevProgress,
            [item.id]: Math.min(currentProgress + 1, 100),
          };
        });
      }, 30);
    }
    console.log("break ", result)

    return result;
  };

  const tryApiRequest = async (quality, pdf, zip, itemId, totalPdfs) => {
    const formData = createFormData(pdf, quality);
    let response;

    try {
      response = await sendPdfRequest(formData);
      console.log('response', response)
      if (response.status != 200) {
        let error = await response.json();
        console.log(error)
        const errorObject = createErrorObject(
          pdf.name,
          pdf.size,
          response.status == 401 || response.status == 403 ? (
            <span>
              You've reached your daily limit of {config?.pdfLimit} PDFs.
              Upgrade to{" "}
              <a
                href="/auth/sign-up"
                className="compressed-img-step-two-go-pro-para pro"
              >
                Pro
              </a>{" "}
              for unlimited compression!
            </span>
          ) : (
            error.message || "Unknown error occurred"
          ),
          response.status == 401 || response.status == 403 ? true : false
        );
        console.log("errorObject line 298", errorObject)
        return errorObject;
      }
      const responseBlob = await response.blob();
      zip.file("compressed_" + pdf.name, responseBlob);
      return handlePdfResponse(responseBlob, pdf, itemId, totalPdfs);
    } catch (error) {
      console.log("line 256 ---- ", error)
      const errorObject = createErrorObject(
        pdf.name,
        pdf.size,
        licenseKey
          ? error.message
          : (
            <span>
              You've reached your daily limit of ${config?.pdfLimit} PDFs.
              Upgrade to{" "}
              <a
                href="/auth/sign-up"
                className="compressed-img-step-two-go-pro-para pro"
              >
                Pro
              </a>{" "}
              for unlimited compression!
            </span>
          )``
      );
      updateResponsePdfsWithError(itemId, errorObject);
      return errorObject;
    }
  };

  const createFormData = (pdf, quality) => {
    const blob = new Blob([pdf]);
    const formData = new FormData();
    formData.append("quality", quality);
    formData.append("file", blob);
    return formData;
  };

  const sendPdfRequest = (formData) => {
    return pdfApi(formData, {
      "x-source-id": fingerprint,
      "x-license-key": licenseKey,
      "x-source-key": "COMPRESSIFY",
    });
  };

  const handlePdfResponse = (responseBlob, pdf, itemId, totalPdfs) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const compressedFile = new File([responseBlob], pdf.name, {
          type: "application/octet-stream",
        });
        const downloadedUrl = window.URL.createObjectURL(compressedFile);
        const resultantFileSize = returnPdfSizeBytes(reader.result);

        const pdfObject = {
          fileName: pdf.name,
          error: false,
          originalSize: pdf.size,
          resultantFile: reader.result,
          resultantFileSize,
          calculation: returnPdfCompressCalc(pdf.size, resultantFileSize),
          downloadedUrl,
          downloadedFileName: compressedFile.name,
        };

        updateProgress(totalPdfs);
        resolve(pdfObject);
      };
      reader.readAsDataURL(responseBlob);
    });
  };

  const updateProgress = (totalPdfs) => {
    setProgress((prev) => Math.floor(prev + 100 / totalPdfs));
  };

  const updateResponsePdfsWithError = (itemId, errorObject) => {
    setResponsePdfs((prev) => {
      const updatedPdfs = [...prev];
      const index = updatedPdfs.findIndex((item) => item.id === itemId);
      updatedPdfs[index] = errorObject;
      return updatedPdfs;
    });
  };

  const updateResponsePdfsWithSuccess = (itemId, pdfObject) => {
    console.log("result: line 341", itemId, pdfObject)

    setResponsePdfs((prev) => {
      const updatedPdfs = [...prev];
      const index = updatedPdfs.findIndex((item) => item.id === itemId);
      updatedPdfs[index] = pdfObject;
      return updatedPdfs;
    });
  };

  const updateResponsePdfs = (pdf) => {
    setResponsePdfs((prev) => [...prev, pdf]);
  };

  const returnSizeFormat = (bytes) => {
    const kilobyte = 1024;
    const megabyte = kilobyte * kilobyte;
    if (bytes <= 0) {
      return "0 Bytes";
    }
    if (bytes >= megabyte) {
      return (bytes / megabyte).toFixed(1) + " MB";
    } else if (bytes >= kilobyte) {
      return (bytes / kilobyte).toFixed(1) + " KB";
    } else {
      return bytes + " Bytes";
    }
  };

  useEffect(() => {
    finalPdfBlob.forEach((pdf) => {
      if (!pdf.error) {
        setCompressionButtonVisibility(true);
      }
    });
  }, [finalPdfBlob]);

  const isUnsupportedFormat = (imageData) => {
    const supportedFormats = ["pdf"];
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
              {
                <div className="below-download-compressed">
                  {loading ? (
                    <div
                      role="progressbar"
                      aria-valuenow={totalPdfSizes?.totalPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        "--value":
                          totalPdfSizes?.totalPercentage > 0
                            ? totalPdfSizes?.totalPercentage
                            : 0,
                      }}
                    >
                      {" "}
                      <span>Optimizing...</span>
                    </div>
                  ) : (
                    <div
                      role="progressbar"
                      aria-valuenow={totalPdfSizes?.totalPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ "--value": totalPdfSizes?.totalPercentage }}
                    >
                      <span>SAVED</span>
                    </div>
                  )}
                  <div className="compression-details">
                    <div className="pdf-smaller-para">
                      {loading
                        ? "Please wait while the pdfs are compressing"
                        : " Compressify saved you"}
                    </div>
                    {loading ? <> </> : <div className="mb-text">
                      <span className="compression-original-mb">
                        {totalPdfSizes?.orignalSizeTotal < 0 ? 0 : totalPdfSizes?.orignalSizeTotal}
                      </span>
                      <span className="compression-original-mb">
                        {totalPdfSizes?.savedSize < 0 ? 0 : totalPdfSizes?.savedSize}
                      </span>
                    </div>}
                  </div>
                </div>
              }
              {compressionButtonVisibility ? (
                <a
                  href={zipCompressedFile}
                  download={"compressfile.zip"}
                  className="download-pdf"
                >
                  Download PDFs
                </a>
              ) : null}
            </div>
            {/*  */}

            {/*  */}
            <div className="compressed-imgs-container">
              {finalPdfBlob.length ? (
                finalPdfBlob.map((pdfData) =>
                  pdfData?.error ? (
                    <div className="compressed-img-step-two-info-content">
                      <div className="compressed-img-step-two-info-download-content with-error">
                        <div className="compressed-card-left-details">
                          <div className="pdf-icon-wrap">
                            <Image
                              src="/images/pdf-icon.svg"
                              alt={pdfData.name}
                              width={30}
                              height={30}
                            />
                          </div>
                          <div className="left-imgs-info">
                            <>
                              <p className="step-two-info-para oneLine soon-parent">
                                {pdfData?.name}
                                <span className="soon">{pdfData?.name}</span>
                              </p>
                              <span className="compressed-img-step-two-info-mb">
                                {pdfData?.pdfSize
                                  ? returnSizeFormat(pdfData?.pdfSize)
                                  : null}
                              </span>
                            </>
                          </div>
                        </div>

                        {pdfData.goPro ? (
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
                                  <h4>{pdfData.message}</h4>
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
                        ) : pdfData?.error ? (
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
                                  <h4>{pdfData.message}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="compressed-img-step-two-info-content">
                      <div className="compressed-img-step-two-info-download-content">
                        <div className="compressed-card-left-details">
                          <div className="pdf-icon-wrap">
                            <Image
                              src="/images/pdf-icon.svg"
                              alt={pdfData.name}
                              width={30}
                              height={30}
                            />
                          </div>
                          <div className="left-imgs-info">
                            <p className="soon-parent">
                              <span className="step-two-info-para oneLine">
                                {pdfData.fileName}
                              </span>
                              <span className="soon">{pdfData?.fileName}</span>
                            </p>
                            <div className="file-type-size-info">
                              <span className="ext-info">PDF</span>
                              <span className="compressed-img-step-two-info-mb">
                                {returnSizeFormat(pdfData.originalSize)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Add a check to conditionally render elements */}
                        {/* {console.log('pdfData', pdfData)} */}
                        {
                          pdfData?.inProgress ?
                            <div className="compressed-card-right-details">
                              <p>Optimizing...</p>
                            </div> :
                            <div className="compressed-card-right-details">
                              <div className="compressed-img-step-two-download-button">
                                <a
                                  download={
                                    "compressed_" + pdfData.downloadedFileName
                                  }
                                  href={pdfData.downloadedUrl}
                                >
                                  <div className="right-after-compressed-dtl">
                                    <p className="compressed-img-step-two-percentage-content">
                                      {pdfData.calculation < 1
                                        ? pdfData.calculation
                                        : `-${pdfData.calculation}`}{" "}
                                      %
                                    </p>
                                    <span className="compressed-img-step-two-info-kb">
                                      {pdfData.resultantFileSize <=
                                        pdfData.originalSize
                                        ? returnSizeFormat(
                                          pdfData.resultantFileSize
                                        )
                                        : returnSizeFormat(pdfData.originalSize)}
                                    </span>
                                  </div>
                                  <div className="compressed-img-extension-icon">
                                    <Image
                                      src="/images/pdf-icon.svg"
                                      alt="PDF Icon"
                                      width="20"
                                      height="20"
                                    />
                                    PDF
                                  </div>
                                </a>
                              </div>
                              <div className="compressed-right-lbl">
                                <span style={{ marginBottom: "7px" }}>
                                  Savings:{" "}
                                </span>
                                <span>New Size: </span>
                              </div>
                            </div>

                        }
                        {/* <div className="progress-bar-compressed-images-sec">
                        <div className="progress-compressed-images-step-two">
                          <div className="progress-value-compressed-img"></div>
                          <h4>
                            {pdfData.resultantFileSize <= pdfData.originalSize
                              ? "Finished"
                              : "Already Compressed"}
                          </h4>
                        </div>
                      </div> */}
                      </div>
                      {pdfData.inProgress ? (
                        <CustomLinearProgress
                          value={progressBar[pdfData.id] || 0}
                          max={100}
                          indeterminate={false}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  )
                )
              ) : (
                <></>
              )}
            </div>
            {
              (!loading && finalPdfBlob.length > 10) ?
                <div className="compressed-imgs-footer">
                  {
                    <div className="below-download-compressed">
                      {loading ? (
                        <div
                          role="progressbar"
                          aria-valuenow={totalPdfSizes?.totalPercentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            "--value":
                              totalPdfSizes?.totalPercentage > 0
                                ? totalPdfSizes?.totalPercentage
                                : 0,
                          }}
                        >
                          {" "}
                          <span>Optimizing...</span>
                        </div>
                      ) : (
                        <div
                          role="progressbar"
                          aria-valuenow={totalPdfSizes?.totalPercentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ "--value": totalPdfSizes?.totalPercentage }}
                        >
                          <span>SAVED</span>
                        </div>
                      )}
                      <div className="compression-details">
                        <div className="pdf-smaller-para">
                          {loading
                            ? "Please wait while the pdfs are compressing"
                            : " Compressify saved you"}
                        </div>
                        {loading ? <> </> : <div className="mb-text">
                          <span className="compression-original-mb">
                            {totalPdfSizes?.orignalSizeTotal < 0 ? 0 : totalPdfSizes?.orignalSizeTotal}
                          </span>
                          <span className="compression-original-mb">
                            {totalPdfSizes?.savedSize < 0 ? 0 : totalPdfSizes?.savedSize}
                          </span>
                        </div>}
                      </div>
                    </div>
                  }
                  {compressionButtonVisibility ? (
                    <a
                      href={zipCompressedFile}
                      download={"compressfile.zip"}
                      className="download-pdf"
                    >
                      Download PDFs
                    </a>
                  ) : null}
                </div>
                : <></>
            }
          </div>
          {/* <div className="comressed-section-four step-4-download-compressed-pdf">
            <div className="step-six-content">
              
              <a href="/compress-pdf-online" className="download-pdf">
                <Image
                  src={CompressedButtonIcon}
                  alt="compressed-images-button-icon"
                />
                Compress More PDFs
              </a>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
