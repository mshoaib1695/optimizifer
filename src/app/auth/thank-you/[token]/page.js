"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../../../helpers/api.function";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ResetPassword({ params }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  let requestSent = false;
  const [tokenVerified, setTokenVerified] = useState(null);

  const { token } = params;
  const decodedToken = decodeURIComponent(token);
  const [counter, setCounter] = useState(5)
  useEffect(() => {
    if (token) {
      if (!requestSent) {
        setLoading(true);
        verifyToken();
        requestSent = true;
      }
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    let interval;
    if (tokenVerified) {
      interval = setInterval(() => {
        setCounter((prevCount) => {
          if (prevCount === 1) {
            clearInterval(interval);
            router.push("/account");
          }
          return prevCount - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tokenVerified, router]);

  const verifyToken = async () => {
    if (!loading) {
      setLoading(true);
      setError(null);
      try {
        const resp = await verifyEmail({
          token: decodedToken,
        });
        const data = await resp.json();
        if (resp.status != 200) {
          throw data.msg
          return
        }
        toast.success(
          "Your email has been successfully verified, and your account is now active. Welcome to Compressify!"
        );
        setLoading(false);
        setTokenVerified(true)
      } catch (err) {
        setTokenVerified(false)
        toast.error(
          "Oops! Something went wrong. Please try contact our support for more information!"
        );
        setError(
          "Oops! Something went wrong. Please try contact our support for more information!"
        );
        setLoading(false);
      }
    }
  };

  return (
    <div className="sign-form-main-wrap">
      <div className="form-box-wrap">
        <div className="form-content">
          {
            tokenVerified ?
              <div className="form-header">
                <h2 className="sign-heading"> Account verified!</h2>
                <h4 className="premium-users-txt">
                  Redirecting to your dashboard in {counter} seconds. Welcome to Compressify!
                </h4>
              </div> :
              tokenVerified == false ?
                <div className="form-header">
                  <h2 className="sign-heading"> Account verification failed!</h2>
                  <h4 className="premium-users-txt">
                    Please try contact our support for more information!
                  </h4>
                </div>
                : <div className="form-header">
                  <h2 className="sign-heading"> Verifying Your Account ..... </h2>
                </div>
          }
        </div>
      </div>
    </div>
  );
}
