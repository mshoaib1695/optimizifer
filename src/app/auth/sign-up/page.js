"use client";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { signUp } from "../../../helpers/api.function";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState("/");

  const router = useRouter();
  const { user } = useAuth();

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

  const signUpHandler = async (event) => {
    event.preventDefault();
    if ((email && password, name)) {
      setLoading(true);
      setError(null);
      try {
        const resp = await signUp({ email, password, username: name });
        const data = await resp.json();
        setLoading(false);
        toast.success("Sign-up complete! Check your email to verify and get started with Compressify!");
        router.push(
          `/auth/sign-in?redirect=${encodeURIComponent(redirectUrl)}`
        );
      } catch (err) {
        setError("Something went wrong");
        toast.error();
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
      case "name":
        setName(value);
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
            <h2 className="sign-heading">Sign Up</h2>
            <p className="premium-users-txt">
              <span className="premium-blue">Premium</span> users can process up
              to 100 files per task
            </p>
          </div>
          <form className="form-fields-wrap">
            <div className="field-wrap">
              <label htmlFor="name">Name:</label>
              <input
                type="name"
                id="name"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={handleChange}
              />
            </div>
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
            <button type="submit" className="login-btn" onClick={signUpHandler}>
              Sign Up
            </button>
          </form>
          <p className="premium-users-txt">
            Already a member?{" "}
            <Link
              href={`/auth/sign-in?redirect=${encodeURIComponent(redirectUrl)}`}
            >
              Sign In
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

export default function SignUpWrapper(props) {
  return (
    <Suspense>
      <SignUp {...props} />
    </Suspense>
  );
}
