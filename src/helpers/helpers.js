export const returnPngCompressCalc = (orignalSize, resultantFileSize) => {
  const calc = Math.floor(
    ((orignalSize - resultantFileSize) / orignalSize) * 100
  );
  if (calc < 1) return 0;
  return calc;
};
export const isImageSizeExceedsLimit = (imageSizeInBytes,limit) => {
  const limitInBytes = limit * 1024 * 1024;
  return imageSizeInBytes > limitInBytes;
};

export const returnSizeBytes = (image) => {
  const base64Data = image;
  const binaryData = atob(base64Data.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: "application/octet-stream" });
  const fileSize = blob.size;
  return fileSize;
};

//FOR PDF COMPRESSIONS
export const returnPdfCompressCalc = (originalSize, resultantFileSize) => {
  const calc = Math.floor(
    ((originalSize - resultantFileSize) / originalSize) * 100
  );
  if (calc < 1) return 0;
  return calc;
};

export const isPdfSizeExceedsLimit = (pdfSizeInBytes, limit) => {
  const limitInBytes = limit * 1024 * 1024; // Set limit to 5MB for PDF files
  return pdfSizeInBytes > limitInBytes;
};

export const returnPdfSizeBytes = (pdf) => {
  const binaryData = atob(pdf.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: "application/pdf" });
  const fileSize = blob.size;
  return fileSize;
};

export const dateFormatter = (d) => {
  const date = new Date(d);

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export const getFingerprint = async () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText("", 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText("compressify.io", 4, 17);
  const canvasHash = canvas.toDataURL();

  const fingerprintPayload = {
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    plugins: Array.from(navigator.plugins)
      .map((plugin) => plugin.name)
      .join(","),
    canvasHash: canvasHash,
  };

  const fingerprintString = JSON.stringify(fingerprintPayload);
  const fingerprintHash = await sha256(fingerprintString);
  return fingerprintHash;
};

export function isValidKey(nextRenewDate) {
  if (nextRenewDate === undefined || nextRenewDate === null) {
    return false;
  }
  const nextRenew = new Date(nextRenewDate);
  const currentDate = new Date();
  return nextRenew > currentDate;
}

export function getLatestFigmaLicenseKey(licenseKeys) {
  if (licenseKeys) {
    licenseKeys?.sort((a, b) => new Date(b.nextRenew) - new Date(a.nextRenew));
    return licenseKeys[0];
  } else {
    return null;
  }
}
