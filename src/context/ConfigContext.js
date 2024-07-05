"use client";
import React, { useEffect, useState, useContext, createContext } from "react";
import { getConfigs } from "../helpers/api.function";

const ConfigContext = createContext({
  freeImageFileSize: 30,
  freeImagesAtAtime: 50,
  freePdfAtAtime: 10,
  freePdfFileSize: 250,
  limit: 100,
  paidImageFileSize: null,
  paidImagesAtAtime: null,
  paidPdfAtAtime: null,
  paidPdfFileSize: null,
  pdfLimit: 30,
});

export const ConfigProvider = ({ children, initialData }) => {
  const [data, setData] = useState(initialData);

  const refreshData = async () => {
    try {
      const res = await getConfigs();
      const newData = await res.json();
      if (newData.data) {
        setData(newData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!data) {
      refreshData();
    }
  }, []);

  return (
    <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};

export default ConfigContext;
