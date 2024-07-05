"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { resetPassword } from "../../../../helpers/api.function";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";

export default function ResetPassword({ params }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter()

  const { token } = params

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user]);


  useEffect(() => {
    if(token === undefined) {
      router.push('/')
    }
  }, [])

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setLoading(true);
      setError(null);
      try {
        const resp = await resetPassword({ password: newPassword, token: token, confirmPassword });
        const data = await resp.json();
        toast.success("Your password has been updated successfully.");
        setLoading(false);
      } catch (err) {
        toast.error(
          "Oops! Something went wrong. Please try resetting your password again."
        );
        setError(
          "Oops! Something went wrong. Please try resetting your password again."
        );
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  return (
    <div className="sign-form-main-wrap">
      <div className="form-box-wrap">
        <div className="form-content">
          <div className="form-header">
            <h2 className="sign-heading">Reset Password</h2>
          </div>
          <form className="form-fields-wrap" onSubmit={resetPasswordHandler}>
            <div className="field-wrap">
              <label htmlFor="newPassword">Enter New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Create a new password"
                value={newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="field-wrap">
              <label htmlFor="confirmPassword">Re-enter New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
