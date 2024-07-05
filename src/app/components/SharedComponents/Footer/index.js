import React from 'react';
import FooterHead from "../../../../../public/images/footer-head-img.svg"; 
import FooterNxtLogo from "../../../../../public/images/footer-nxt-icon.png"; 
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
      <footer id="footer-section">
        <div className="footer-header">
          <Image src={FooterHead} alt="footer-head-img" />
          <p>
            <Link href="mailto:nxtx@nxtlabs.com">nxtx@nxtlabs.com</Link> 
          </p>
        </div>
        <div className="footer-heading">
          <h5>Lorem ipsum adipiscing elit.</h5>
          <form action="#" method="post">
            <input type="email" name="" id="" placeholder="Enter email address"/>
            <button type="submit">Join Newsletter</button>
          </form>
        </div>
        <div className="footer-main-content">
          <ul>
            <li>
              <Link href="/figma-plugin-compressify">Figma Plugin</Link> 
            </li>
            <li>
              <Link href="#">Compressed PDF <span className="soon-footer">Coming Soon</span></Link> 
            </li>
            <li>
              <Link href="#">Compressed Image <span className="soon-footer">Coming Soon</span></Link> 
            </li>
            {/* <li>
              <Link href="#">Desktop App <span className="soon-footer">Coming Soon</span></Link> 
            </li> */}
          </ul>
        </div>
        <div className="footer-bottom-content">
          <div className="copyright">
            <h4>Created by <Link href="https://nxtlabs.com/" target="_blank"> <Image src={FooterNxtLogo} alt="footer-nxt-icon" /></Link> </h4>
          </div>
          <div className="social-icons">
            <ul>
              <li>
                <Link href="https://twitter.com/Compressifyio" target="_blank">
                  <div className="twitter"></div>
                </Link> 
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/compressify/" target="_blank">
                  <div className="linkedin"></div>
                </Link> 
              </li>
            </ul>
          </div>
        </div>
      </footer>
  );
}
