"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "../../../context/AuthContext";
import { createSession } from "../../../helpers/api.function";
import ProtectedRoute from "../../components/Auth/ProtectedRoute";
import Sidebar from "../../components/Account/Sidebar";
import { dateFormatter, isValidKey, getLatestFigmaLicenseKey } from "../../../helpers/helpers";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function ResetPassword({ params }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isYearly, setIsYearly] = useState(false);

  const toggleSwitch = () => {
    setIsYearly((prevState) => !prevState); // Toggle the state
  };

  const handleSubscription = async () => {
    const stripe = await stripePromise;
    let token = sessionStorage.getItem("token");
    const data = await createSession({
      token,
      sessionType: "FIGMA",
      planType: isYearly ? "yearly" : "monthly",
    });
    const jsonData = await data.json();
    if (jsonData.responseStatus.isError) {
      toast.error(
        "Payment Failed. please contact support to report this issue."
      );
      return;
    }
    const sessionId = jsonData?.responseBody?.session?.id;
    if (sessionId == undefined || sessionId == null) {
      toast.error(
        "Payment Failed. please contact support to report this issue."
      );
      return;
    }
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      toast.error(
        "Payment Failed. please contact support to report this issue."
      );
    }
  };

  const key = getLatestFigmaLicenseKey(
    user?.subcription.filter((key) => key.source === "FIGMA")
  );
  const heading = "Figma Pro";
  return (
    <ProtectedRoute>
      <div className="profile-page-wrapper">
        <div className="profile-container">
          <Sidebar />
          <section>
            <div className="profile-page-heading">{heading}</div>

            <div className="subscription-box">
              <h3>Subscription Type</h3>

              <div className="subscription-module-row">
                <div>Monthly</div>

                <div>
                  <button
                    className={`switch ${isYearly ? "__active" : ""}`}
                    onClick={toggleSwitch}
                  >
                    <div className="switch_inner">
                      <div className="switch_left"></div>
                      <div className="switch_ring"></div>
                    </div>
                  </button>
                </div>

                <div>Yearly</div>
              </div>

              <div className="subscription-details-box">
                <div className="subscription-details-box-heading">
                  {isYearly ? "Yearly" : "Monthly"} Plan
                </div>
                {isYearly ? (
                  <div className="subscription-price-row">
                    $28<span>/yearly</span>
                  </div>
                ) : (
                  <div className="subscription-price-row">
                    $3<span>/monthly</span>
                  </div>
                )}

                <div className="subscription-features-row">
                  <ul>
                    <li>
                      {" "}
                      <img src="/images/blue-tick.png" />
                      Unlimited JPG, PNG, WebP Exports
                    </li>
                    <li>
                      {" "}
                      <img src="/images/blue-tick.png" />
                      Unlimited PDFs Exports
                    </li>
                    <li>
                      {" "}
                      <img src="/images/blue-tick.png" />
                      Unlimited SVG Exports
                    </li>
                  </ul>
                </div>
              </div>
              <div className="profile-form">
                {key?.licenseKey ? (
                  <div className="license-keys-row">
                    License Key
                    <input
                      id="licenseKeyField"
                      type="tel"
                      maxlength="64"
                      value={key?.licenseKey}
                    ></input>
                    <br />
                    <p>
                      Your license key is valid until{" "}
                      {dateFormatter(key?.nextRenew) ?? ""}.{" "}
                      <br />
                      Please note that your transaction will occur on{" "}
                      {dateFormatter(key?.nextRenew) ?? ""}.
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <Elements stripe={stripePromise}>
                  <div className="pay-row">
                    <button
                      className={isValidKey(key?.nextRenew) ? 'disabled' : ''}
                      onClick={handleSubscription}
                      disabled={isValidKey(key?.nextRenew)}
                    >
                      Pay {isYearly ? "$28" : "$3"}
                    </button>
                  </div>
                </Elements>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
