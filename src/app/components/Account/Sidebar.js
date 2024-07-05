"use client";
import Link from "next/link";
import React from "react";
import ProtectedRoute from "../Auth/ProtectedRoute";
import { useAuth } from "../../../context/AuthContext";

export default function Sidebar() {
  const { handleLogout} = useAuth()
  return (
    <ProtectedRoute>
      <aside>
        <ul>
          <li>
            <Link className="header-main-logo" href="/account/webpro">
              Web <span>Pro</span>
            </Link>
          </li>
          <li>
            <Link className="header-main-logo" href="/account/figma">
              Figma <span>Plugin</span>
            </Link>
          </li>
          <li>
            <Link className="header-main-logo" href="/account/wp-plugin">
              WordPress <span>Plugin</span>
            </Link>
          </li>
          <li>
            <Link className="header-main-logo" href="/account/">
              Account
            </Link>
          </li>
          <li>
            <span className="header-main-logo link" onClick={handleLogout}>
              Logout
            </span>
          </li>
        </ul>
      </aside>
    </ProtectedRoute>
  );
}
