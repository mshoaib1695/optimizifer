"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";

const AccountDropdown = () => {
  const { handleLogout} = useAuth()

  return (
    <div className="account-dropdown">
      <span>Account</span>
      <ul className="dropdown-menu">
        <li>
          <Link href="/account">Profile</Link>
        </li>
        <li onClick={handleLogout}>
          <span>Logout</span>
        </li>
      </ul>

    
    </div>
  );
};

export default AccountDropdown;
