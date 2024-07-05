"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { forgotPassword } from "../../../helpers/api.function";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user]);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      setError(null);
      try {
        const resp = await forgotPassword({ email });
        const data = await resp.json();
        toast.success("Success. Check your email for reset password.");
        setLoading(false);
        setEmail("");
      } catch (err) {
        toast.error(
          "Failed. Please check your email address is correct or not."
        );
        setError("Failed. Please check your email address is correct or not.");
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <div className="sign-form-main-wrap">
      <div className="form-box-wrap">
        <div className="form-content">
          <div className="form-header">
            <h2 className="sign-heading">Forget Password</h2>
          </div>
          <form className="form-fields-wrap" onSubmit={forgotPasswordHandler}>
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
            <button type="submit" className="login-btn">
              Send Link
            </button>
            <Link className="resend-link" href="#">
              Resend Link
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
