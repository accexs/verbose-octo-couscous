"use client";
import React, { ReactNode } from "react";
import Logo from "@/components/Header/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const renderLinks = (): ReactNode => {
  const pathname = usePathname();
  const activeState = "active border border-warning";
  return (
    <>
      <li>
        <Link
          className={pathname === "/characters" ? activeState : ""}
          href={"/characters"}
        >
          Characters
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/movies" ? activeState : ""}
          href={"/movies"}
        >
          Movies
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/starships" ? activeState : ""}
          href={"/starships"}
        >
          Starships
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/planets" ? activeState : ""}
          href={"/planets"}
        >
          Planets
        </Link>
      </li>
    </>
  );
};

const Header: React.FC = () => {
  return (
    <header className={"flex w-full items-center justify-between p-4 lg:px-10"}>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {renderLinks()}
            </ul>
          </div>
          <div className={"hidden lg:flex"}>
            <Logo />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-lg menu-horizontal px-1 gap-2">
            {renderLinks()}
          </ul>
        </div>
        <div className={"navbar-end sm:flex md:flex lg:hidden"}>
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
