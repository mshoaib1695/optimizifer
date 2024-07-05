"use client";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

function SignIn() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState("/account");

  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/account");
      }
    }
  }, [user]);

  const signinHandler = async (event) => {
    event.preventDefault();
    if (email && password) {
      setLoading(true);
      setError(null);
      try {
        const resp = await handleLogin({ email, password });
        setLoading(false);
        toast.success("Login successful! Redirecting...");
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push("/account");
        }
      } catch (err) {
        toast.error("Failed to sign in. Please check your credentials.");
        setError("Failed to sign in. Please check your credentials.");
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  return (
    <div className="sign-form-main-wrap">
      <div className="form-box-wrap">
        <div className="form-content">
          <div className="form-header">
            <h2 className="sign-heading">Sign In</h2>
            <p className="premium-users-txt">
              <span className="premium-blue">Premium</span> users can process up
              to 100 files per task
            </p>
          </div>
          <form className="form-fields-wrap" onSubmit={signinHandler}>
            <div className="field-wrap">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="field-wrap">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <Link
              href={`/auth/forgotPassword?redirect=${encodeURIComponent(
                redirectUrl
              )}`}
              className="forgot-pass-link"
            >
              Forgot Password?
            </Link>
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
          <p className="premium-users-txt">
            If you are not a member?{" "}
            <Link
              href={`/auth/sign-up?redirect=${encodeURIComponent(redirectUrl)}`}
            >
              Sign Up
            </Link>
          </p>
          {/* <p className="terms-wrap">
            By creating an account. You agree to compressify.io{" "}
            <Link href="/auth/sign-in">Terms & Condition</Link> and{" "}
            <Link href="/auth/sign-in">Privacy Policy</Link>.
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default function SignInWrapper(props) {
  return (
    <Suspense>
      <SignIn {...props} />
    </Suspense>
  );
}
