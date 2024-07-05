import React from "react";
import { useEffect } from "react";

export const Ads = (props) => {
  const { propsData } = props;
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {}
  });
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3013359728164509"
      data-ad-slot={propsData}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
