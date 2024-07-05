import React from 'react';
import Image from 'next/image'; // Import Image component for optimized image handling
import Link from 'next/link';

export default function CheckoutOurTools() {
  return (
    <section className="main-home-sec">
      <div className="home-hero-sec">
        <div className="home-hero-sec-content">
          <h1>Save time, optimize files with Compressify!</h1>
          <p>
            Get tiny files without losing quality. Compressify reduces JPG, PNG, SVG, WebP, and PDF up to <span>90%</span>.
          </p>
          <Link href="#compressify-tools" className="hero-btn">🤩 Checkout our tools</Link>
        </div>
        <div className="home-hero-sec-img">
          <Image src="/images/hero-img.png" width={327} height={490} alt="hero-img" />
        </div>
      </div>
    </section>
  );
}
