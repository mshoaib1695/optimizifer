"use client";
import React from "react";

export default function Component({ params }) {
  return (
    <div className="sign-form-main-wrap">
      <div className="form-box-wrap">
        <div className="form-content">
          <div className="form-header">
            <h2 className="sign-heading">Payment Failed!</h2>
            <h4 className="premium-users-txt">
              We're sorry, but we encountered an issue processing your
              subscription payment for Complexify. 😔
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
