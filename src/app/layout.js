import React from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "./globals.css";
import "./index.css";
import "./responsive.css";
import Header from "./components/SharedComponents/Header/index.js";
import Footer from "./components/SharedComponents/Footer";
import MobileMenu from "./components/SharedComponents/MobileMenu";
import NotificationBar from "./components/SharedComponents/NotificationBar";
import { AuthProvider } from "../context/AuthContext";
import { ConfigProvider } from "../context/ConfigContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Compressify - Online Image & PDF Compression + Figma Plugi",
  description:
    "Compressify - Your one-stop solution for online image and PDF compression. Compress images and PDF files easily and efficiently. Also, try our Figma plugin for seamless image and PDF compression directly in Figma",
  keywords:
    "compressify, image compression, PDF compression, online compression, Figma plugin, image compression in Figma, PDF compression in Figma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ConfigProvider>
        <AuthProvider>
          <Head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:keywords" content={metadata.keywords} />
            <meta
              name="google-adsense-account"
              content="ca-pub-3013359728164509"
            />

            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              charset="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js"></script>
          </Head>
          <body className={inter.className}>
            <div className="wrapper">
              <MobileMenu />
              <Header />
              <NotificationBar />
              {children}
              <Footer />
              <ToastContainer position="top-center" />
            </div>
          </body>
          <Script id="windows-smartlook">
            {`
window.smartlook||(function(d) {
   var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
   var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
   c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
   })(document);
   smartlook('init', '80d82a479ddd9ca1dc661e867fbb7892992a249d', { region: 'eu' });
          `}
          </Script>
          <Script id="slick-slider">
            {`
          var acc = document.getElementsByClassName("accordion");
          var i;
    
          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("accordion-active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }
          `}
          </Script>
        </AuthProvider>
      </ConfigProvider>
    </html>
  );
}
