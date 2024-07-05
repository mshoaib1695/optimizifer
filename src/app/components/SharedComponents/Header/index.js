"use client";
import HeaderLogo from "../../../../../public/images/header-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import AccountDropdown from "./accountDropdown";

export default function Header() {
  const { user } = useAuth();

  return (
    <>
      <div className="main-header">
        <Link className="header-main-logo" href="/">
          <Image src={HeaderLogo} alt="header-logo" />
        </Link>
        <ul className="menu-bar">
          <li>
            <Link href="/figma-plugin-compressify">Figma Plugin</Link>
          </li>
          <li>
            <Link href="/compress-images-online">Compress Images </Link>
          </li>
          <li>
            <Link href="/compress-pdf-online">
              Compress PDF<span id="lowercase">s</span>
            </Link>
          </li>
          <li>
            {user ? (
              <AccountDropdown />
            ) : (
              <Link href="/auth/sign-in">Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
