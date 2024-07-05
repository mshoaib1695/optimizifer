import React, { useEffect, useState } from 'react';
import { isImageSizeExceedsLimit, returnPngCompressCalc, returnSizeBytes } from '../../../../../../helpers/helpers';
import JSzip from "jszip"
import { jpgApi, pngApi, webpApi } from '../../../../../../helpers/api.function';
import { Ads } from '../../../../Ads';


export default function CompressingImages({ images, setResponseImages, responseImage, stepChanger, setCompressionFile, setErrors }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (images.length) {
      let errorObject = {}
      let slicedImages = [...images]
      if (slicedImages.length > 20) {
        slicedImages = [...images.slice(0, 20)]

        errorObject = {
          message: "Not more than 20 images are allowed",
          moreThanFive: true, // Set the moreThanFive property
          goPro: true,
          imageSize: null,
          error: true,
        };
      }
      apiHit(slicedImages, errorObject);
    }
  }, [])

  let apiHit = async (allowedImages, extraImageError) => {
    try {
      const pngType = "image/png"
      const jpgType = "image/jpg"
      const jpegType = "image/jpeg"
      const webpType = "image/webp"

      const zip = new JSzip();

      // const errors = [];

      const promises = allowedImages.map(async (image) => {


        if (isImageSizeExceedsLimit(image.size)) {
          const errorObject = {
            error: true,
            name: image.name,
            imageSize: image.size,
            message: `Size of image ${image.name} exceed 10MB`,
            goPro: true,
          }
          // errors.push(errorObject);
          return errorObject
        }

        const blob = new Blob([image]);

        const formData = new FormData();
        formData.append("quality", 85);
        formData.append('file', blob);

        let response;
        if (image.type == pngType) response = await pngApi(formData)
        else if (image.type == jpgType || image.type == jpegType) response = await jpgApi(formData)
        else if (image.type == webpType) response = await webpApi(formData)
        else {
          const errorObject = {
            error: true,
            message: "No other formant than png, webp & jpg is allowed for images",
            goPro: false
          }
          // errors.push(errorObject);
          return errorObject
        }

        if (!response.ok) {
          throw new Error('Request failed');
        }


        const responseBlob = await response.blob();
        zip.file("compressed_" + image.name, responseBlob)

        const reader = new FileReader();

        return new Promise((resolve, reject) => {

          const compressedFile = new File([responseBlob], image.name, { type: 'application/octet-stream' });
          const downloadedUrl = window.URL.createObjectURL(compressedFile);

          reader.onload = () => {
            const constructImageObject = {
              fileName: image.name,
              error: false,
              originalSize: image.size,
              resultantFile: reader.result,
              resultantFileSize: returnSizeBytes(reader.result),
              calculation: returnPngCompressCalc(image.size, returnSizeBytes(reader.result)),
              downloadedUrl: downloadedUrl,
              donwloadedFileName: image.name
            }
            setProgress((prevValue) => Math.floor(prevValue + (100 / allowedImages.length)))
            resolve(constructImageObject); // resolve the promise after completing the operations
          };
          reader.readAsDataURL(responseBlob);
        });
      });


      const resolved_promises = await Promise.all(promises);
      if (extraImageError.error) resolved_promises.push(extraImageError)

      const zipFileBlob = await zip.generateAsync({ type: "blob" });
      const compressedFileUrl = URL.createObjectURL(zipFileBlob);

      setCompressionFile(compressedFileUrl)
      setResponseImages([...resolved_promises])
      setTimeout(() => {
        stepChanger(4);

      }, 2000)

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <section className="compressing-pdf-sec step-3-compressing-pdf">
        <div className="sec-three-background">
          <div className="step-five-content">
            <h4>Compressing Image</h4>
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
    </>
  );
}
