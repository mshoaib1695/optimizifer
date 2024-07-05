"use client";
import React, { useEffect, useState } from "react";
import ChoosePdfFile from "./ChooseFile";
import OnlinePdfCompressor from "./OnlinePdfCompressor";
import DownloadCompressedPdfs from "./ChooseFile/ChooseFileSteps/DownloadCompressedPdfs";
import {
  getFingerprint,
  isValidKey,
  getLatestFigmaLicenseKey,
} from "../../../helpers/helpers";
import { useAuth } from "../../../context/AuthContext";

export default function CompressPdf() {
  const [steps, setSteps] = useState(0);
  const [pdf, setPdf] = useState([]);
  const [responsePdf, setResponsePdf] = useState([]);
  const [errors, setErrors] = useState([]);
  const [zipCompressionFile, setZipCompressionFile] = useState(null);
  const [fingerprint, setFingerprint] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const { user } = useAuth();

  const key = getLatestFigmaLicenseKey(
    user?.subcription.filter((key) => key.source === "COMPRESSIFY")
  );

  const stepChanger = (value) => {
    setSteps(value);
  };

  useEffect(() => {
    getUserUniqueKey();
  }, []);

  const getUserUniqueKey = async () => {
    const fingerprintTmp = await getFingerprint();
    setFingerprint(fingerprintTmp);
  };

  useEffect(() => {
    if (isValidKey(key?.nextRenew)) {
      setLicenseKey(key?.licenseKey);
    } else {
      setLicenseKey("");
    }
    return () => {
      setLicenseKey("");
    };
  }, [user]);

  return (
    <>
      <ChoosePdfFile
        existingPdfs={pdf}
        propSetPdfs={setPdf}
        stepChanged={stepChanger}
      />
      {pdf.length ? (
        <DownloadCompressedPdfs
          finalPdfBlob={responsePdf}
          zipCompressedFile={zipCompressionFile}
          renderErrors={errors}
          pdfs={pdf}
          responsePdf={responsePdf}
          setResponsePdfs={setResponsePdf}
          stepChanger={stepChanger}
          setCompressionFile={setZipCompressionFile}
          fingerprint={fingerprint}
          licenseKey={licenseKey}
        />
      ) : (
        <></>
      )}
      <OnlinePdfCompressor />
    </>
  );
}
