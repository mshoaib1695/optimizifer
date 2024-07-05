import React from 'react';
import GoogleLogo from "../../../../../public/images/google-logo.svg"; 
import MicrosoftLogo from "../../../../../public/images/microsoft-logo.svg"; 
import AirbnbLogo from "../../../../../public/images/airbnb-logo.svg"; 
import NasaLogo from "../../../../../public/images/nasa-logo.svg"; 
import IbmLogo from "../../../../../public/images/ibm-logo.svg"; 
import GithubLogo from "../../../../../public/images/github-logo.svg"; 
import AmazonLogo from "../../../../../public/images/amazon-logo.svg"; 
import NikeLogo from "../../../../../public/images/nike-logo.svg"; 
import EbayLogo from "../../../../../public/images/ebay-logo.svg"; 
import NetflixLogo from "../../../../../public/images/netflix-logo.svg"; 
import LyftLogo from "../../../../../public/images/lyft-logo.svg"; 
import TiktokLogo from "../../../../../public/images/tiktok-logo.svg";
import Image from 'next/image';


export default function TaskAutomated({text}) {

  return (
    <> 
 <section className="compress-pdf-tasks-automated">
 <div className="compress-pdf-tasks-automated-content">
     <h3>{text}</h3>
    </div>
     <div className="tasks-container">
     {/* <ul className="logogrid">
      <li className="logogrid__item">
      <Image className="logogrid__img" src={GoogleLogo} alt="google-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={MicrosoftLogo} alt="microsoft-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={AirbnbLogo} alt="airbnb-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={NasaLogo} alt="nasa-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={IbmLogo} alt="Ibm-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={GithubLogo} alt="Github-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={AmazonLogo} alt="Amazon-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={NikeLogo} alt="nike-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={EbayLogo} alt="ebay-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={NetflixLogo} alt="netflix-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={LyftLogo} alt="lyft-logo" />
      </li>
      <li className="logogrid__item">
      <Image className="logogrid__img" src={TiktokLogo} alt="tiktok-logo" />
      </li>
     </ul> */}
    </div> 
   </section>
    </>
  );
}