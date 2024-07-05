import React from "react";
import RootLayout from "../layout";
import TryFigmaPlugin from "../components/FigmaPlugin/TryFigmaPlugin";
import SelectPluginPlan from "../components/FigmaPlugin/SelectPluginPlan";
import EfficientlyCompressWithinFigma from "../components/FigmaPlugin/EfficientlyCompress";
import FigmaExport from "../components/FigmaPlugin/FigmaExport";
import FileOptimized from "../components/SharedComponents/FileOptimized";
import Testimonials from "../components/SharedComponents/Testimonials";

export const metadata = {
  title: "Compressify Figma Plugin - Export Compressed Images & PDFs + Merge Frames",
  description:
    "Compressify Figma Plugin - Export compressed images and PDFs directly from Figma. Merge multiple frames into a single PDF for free. Enhance your Figma workflow with efficient image and PDF compression",
  keywords:
    "Compressify Figma plugin, Figma plugin, image compression in Figma, PDF compression in Figma, export compressed images from Figma, export PDF from Figma, merge frames into PDF",
};

export default function FigmaPlugin() {
  return (
    <>
      <TryFigmaPlugin />
      <SelectPluginPlan />
      <EfficientlyCompressWithinFigma />
      <FigmaExport />
      <FileOptimized
        text={
          "Greetings, pal! We're delighted you could make it to the gathering! Over 25k individuals have chosen to utilize our plugin."
        }
        paragraph={
          "Want to be a design superhero? Let our Figma Plugins be your trusty sidekicks and help you save the day (and your precious time)!"
        }
      />
      <Testimonials />
    </>
  );
}
