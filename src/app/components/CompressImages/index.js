"use client";
import React, { useState, useEffect } from "react";
import ChooseImageFile from "../CompressImages/ChooseFile";
import DownloadCompressedImages from "../CompressImages/ChooseFile/ChooseFileSteps/DownloadCompressedImages/index";
import OnlineImagesCompressor from "../CompressImages/OnlineImagesCompressor";
import FigmaExport from "../FigmaPlugin/FigmaExport";
import {
  getFingerprint,
  isValidKey,
  getLatestFigmaLicenseKey,
} from "../../../helpers/helpers";
import { useAuth } from "../../../context/AuthContext";

export default function CompressImages() {
  const [steps, setSteps] = useState(0);
  const [image, setImages] = useState([]);
  const [responseImage, setResponseImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [zipCompressionFile, setZipCompressionFile] = useState(null);
  const [fingerprint, setFingerprint] = useState("");
  const { user } = useAuth();
  const [licenseKey, setLicenseKey] = useState("");
  const key = getLatestFigmaLicenseKey(
    user?.subcription.filter((key) => key.source === "COMPRESSIFY")
  );

  const stepChanger = (value) => {
    setSteps(value);
  };

  useEffect(() => {
    if (isValidKey(key?.nextRenew)) {
      setLicenseKey(key?.licenseKey);
    } else {
      setLicenseKey("");
    }
    return () => {
      setLicenseKey("");
    }
  }, [user]);

  useEffect(() => {
    getUserUniqueKey();
  }, []);

  const getUserUniqueKey = async () => {
    const fingerprintTmp = await getFingerprint();
    setFingerprint(fingerprintTmp);
  };

  const handleImageUpload = (newImages) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <>
      <ChooseImageFile
        existingImages={image}
        //propSetImages={setImages}
        propSetImages={handleImageUpload}
        stepChanged={stepChanger}
      />
      {image.length > 0 && (
        <DownloadCompressedImages
          images={image}
          setResponseImages={setResponseImages}
          setCompressionFile={setZipCompressionFile}
          finalImageBlob={responseImage}
          zipCompressedFile={zipCompressionFile}
          renderErrors={errors}
          fingerprint={fingerprint}
          licenseKey={licenseKey}
        />
      )}

      <FigmaExport />
      <OnlineImagesCompressor />
    </>
  );
}
