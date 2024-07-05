"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { updatePassword } from "../../helpers/api.function";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Sidebar from "../components/Account/Sidebar";

export default function ResetPassword({ params }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token')
    if (newPassword === confirmPassword) {
      setLoading(true);
      setError(null);
      try {
        const resp = await updatePassword({ password: newPassword, token: token, confirmPassword });
        const data = await resp.json();
        toast.success("Your password has been updated successfully.");
        setLoading(false);
      } catch (err) {
        toast.error(
          "Oops! Something went wrong. Please try updating your password again."
        );
        setError(
          "Oops! Something went wrong. Please try updating your password again."
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
    <ProtectedRoute>
      <div className="profile-page-wrapper">
        <div className="profile-container">
          <Sidebar />
          <section>
            <div className="profile-page-heading">Account</div>

            <div className="profile-form">
              <div className="profile-form-row">
                <label> Full name</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={user?.username}
                  disabled
                />
              </div>
              <div className="profile-form-row">
                <label>Email Address</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={user?.email}
                  disabled
                />
              </div>
              <div className="profile-form-row">
                <label>Password</label>
                <input
                  type="password"
                  id="fname"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-row">
                <label>Re-type Password</label>
                <input
                  type="password"
                  id="fname"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-row">
                <button onClick={updatePasswordHandler}>Save</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
