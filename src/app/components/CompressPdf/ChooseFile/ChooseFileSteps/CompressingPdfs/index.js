import React, { useEffect, useState } from "react";
import { returnPdfCompressCalc, isPdfSizeExceedsLimit, returnPdfSizeBytes } from "../../../../../../helpers/helpers";
import JSzip from "jszip";
import { pdfApi } from "../../../../../../helpers/api.function";
import { Ads } from "../../../../Ads";


export default function CompressingPdfs({
  pdfs,
  setResponsePdfs,
  stepChanger,
  setCompressionFile,
  responsePdf,
  setErrors,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pdfs.length) {
      let errorObject = {};
      let slicedPdfs = [...pdfs];
      if (slicedPdfs.length > 5) {
        slicedPdfs = [...pdfs.slice(0, 5)];
        errorObject = {
          message: "Not more than 5 PDFs are allowed",
          moreThanFive: true, // Set the moreThanFive property
          goPro: true,
          pdfSize: null,
          error: true,
        };
      }
      
      apiHit(slicedPdfs, errorObject);
    }
  }, [pdfs]);

  let apiHit = async (allowedPdfs, extraPdfError) => {
    try {
      const pdfType = "application/pdf";
      const zip = new JSzip();
      const promises = allowedPdfs.map(async (pdf) => {
        if (isPdfSizeExceedsLimit(pdf.size)) {
          const errorObject = {
            error: true,
            name: pdf.name,
            imageSize: pdf.size,
            message: `Size of image ${pdf.name} exceed 30MB`,
            goPro: true,
          };
          return errorObject;
        }
        const blob = new Blob([pdf]);

        const formData = new FormData();
        formData.append("quality", 85);
        formData.append("file", blob);

        let response;
        if (pdf.type == pdfType) response = await pdfApi(formData);
        else {
          const errorObject = {
            error: true,
            message: "No other format than PDF is allowed",
            goPro: false,
          };
          // errors.push(errorObject);
          return errorObject;
        }

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const responseBlob = await response.blob();
        zip.file("compressed_" + pdf.name, responseBlob);

        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          const compressedFile = new File([responseBlob], pdf.name, {
            type: "application/octet-stream",
          });
          const downloadedUrl = window.URL.createObjectURL(compressedFile);

          reader.onload = () => {
            const constructPdfObject = {
              fileName: pdf.name,
              error: false,
              originalSize: pdf.size,
              resultantFile: reader.result,
              resultantFileSize: returnPdfSizeBytes(reader.result),
              calculation: returnPdfCompressCalc(
                pdf.size,
                returnPdfSizeBytes(reader.result)
              ),
              downloadedUrl: downloadedUrl,
              downloadedFileName: pdf.name,
            };
            setProgress((prevValue) =>
              Math.floor(prevValue + 100 / allowedPdfs.length)
            );
            resolve(constructPdfObject); // resolve the promise after completing the operations
          };
          reader.readAsDataURL(responseBlob);
        });
      });

      const resolved_promises = await Promise.all(promises);
      if (extraPdfError.error) resolved_promises.push(extraPdfError);

      const zipFileBlob = await zip.generateAsync({ type: "blob" });
      const compressedFileUrl = URL.createObjectURL(zipFileBlob);

      setCompressionFile(compressedFileUrl);
      setResponsePdfs([...resolved_promises]);

      setTimeout(() => {
        stepChanger(4);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="compressing-pdf-sec step-3-compressing-pdf">
      <div className="sec-three-background">
        <div className="step-five-content">
          <h4>Compressing PDF</h4>
        </div>
        <div className="step-five-radial-bar">
          <div
            className="progressbar"
            role="progressbar-1"
            aria-valuenow={{ progress }}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ "--value": progress }}
          ></div>
        </div>
        <Ads propsData="5722485996" />
      </div>
    </section>
  );
}