"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

// icons
import SidebarLinkGroup from "@/components/Sidebar/SidebarLinkGroup";
import {
  ADMIN,
  FARMER,
  FARM_FORCE,
  FEED_SELLER,
  DOCTOR,
  BUYER,
} from "@/constants/roles";
import { useAppSelector } from "@/redux/hooks";
import { FiPieChart, FiSettings, FiUser } from "react-icons/fi";
import { RiSurveyLine } from "react-icons/ri";
import { LuArchive, LuLayoutDashboard } from "react-icons/lu";
import { PiFolderNotchPlusBold, PiHouseBold } from "react-icons/pi";
import { FaFilePrescription, FaShopLock, FaWpforms } from "react-icons/fa6";
import { GiGrain } from "react-icons/gi";
import {
  BiDetail,
  BiInjection,
  BiServer,
  BiSolidCart,
  BiSolidFactory,
} from "react-icons/bi";
import { MdDataThresholding, MdOutlineInventory } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import {
  BsDeviceHdd,
  BsDeviceHddFill,
  BsDeviceSsd,
  BsHouseCheck,
} from "react-icons/bs";
import { CiShop } from "react-icons/ci";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const pathPermissionsMap = {
  "stock-in": ["stock-in"],
  "stock-adjustment": ["stock-out"],
  permissions: ["role list", "edit role", "create role"],
  applications: ["requisition list", "edit requisition"],
  users: [
    "user list",
    "create user",
    "edit user",
    "admin list",
    "create admin",
    "edit admin",
    "mp list",
    "create mp",
    "edit mp",
    "sports-officer list",
    "create sports-officer",
    "edit sports-officer",
    "institution list",
    "create institution",
    "edit institution",
    "club list",
    "create club",
    "edit club",
  ],
  admin: ["admin list", "create admin", "edit admin"],
  "user list": ["user list", "create user", "edit user"],
  mp: ["mp list", "create mp", "edit mp"],
  club: ["club list", "create club", "edit club"],
  institution: ["institution list", "create institution", "edit institution"],

  requisition: ["create requisition"],
  "sports officer": [
    "create sports-officer",
    "edit sports-officer",
    "sports-officer list",
  ],
  organization: [
    "create organization",
    "edit organization",
    "organization list",
  ],
  fiscalYear: ["finance-year list", "create finance-year", "edit finance-year"],
  "add-sports-type": [
    "create sports-type",
    "edit sports-type",
    "sports-type list",
  ],
  "add-sports-item": [
    "create sports-item",
    "edit sports-item",
    "sports-item list",
  ],
  "admin user": ["admin list", "create admin", "edit admin"],
  "profile-completion": ["profile-completion"],
  achievements: ["achievement list", "create achievement", "edit achievement"],
  "general-report": ["general-report"],
  "closing-report": ["closing-report"],
  "stock-in-report": ["stock-in report"],
  "stock-adjustment-report": ["stock-adjustment report"],
  "current-stock-report": ["stock report"],
  "reserved-item": [
    "reserved item list",
    "create reserved item",
    "edit reserved item",
  ],
};
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const user = useAppSelector((state) => state.auth.user);
  const role = user && user.user_type;

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  const { permissions } = useAppSelector((state) => state.permissions);

  const hasPermission = (path: string) => {
    try {
      const requiredPermissions: any =
        pathPermissionsMap[path as keyof typeof pathPermissionsMap];

      if (!requiredPermissions) return false;
      const a = requiredPermissions.some((permission: string) =>
        permissions?.find((p: string) => p === permission),
      );

      return requiredPermissions.some((permission: string) =>
        permissions?.find((p: string) => p === permission),
      );
    } catch (e) {}
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2.5 lg:py-3.5">
        <Link href="/">
          <h1 className="mb-0 ml-4 text-lg font-bold text-bodydark2">
            {role === FARMER
              ? "Farmer"
              : role === ADMIN
                ? "Admin"
                : role === FARM_FORCE
                  ? "Farm Force"
                  : role === FEED_SELLER
                    ? "Feed Seller"
                    : role === DOCTOR
                      ? "Doctor"
                      : role === BUYER
                        ? "Buyer"
                        : null}{" "}
            Panel
          </h1>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-0 px-4 pb-4 lg:mt-0 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5">
              <ol>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/" || pathname.includes("dashboard")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <LuLayoutDashboard size={20} />
                  Dashboard
                </Link>

                {role === FARMER && (
                  <Link
                    href="/farmer/shed"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      (pathname === "/farmer/shed" ||
                        pathname.includes("shed")) &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <PiHouseBold size={20} />
                    Shed Create
                  </Link>
                )}

                {role === FARMER && (
                  <Link
                    href="/farmer/batch"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      (pathname === "/farmer/batch" ||
                        pathname.includes("batch")) &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <PiFolderNotchPlusBold size={20} />
                    Batch Create
                  </Link>
                )}

                {role === FARMER && (
                  <Link
                    href="/farmer/tracebility"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      (pathname === "/farmer/tracebility" ||
                        pathname.includes("tracebility")) &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <RiSurveyLine size={20} />
                    Tracebility Form
                  </Link>
                )}
                {role === FARMER && (
                  <Link
                    href="/farmer/testing"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      (pathname === "/farmer/testing" ||
                        pathname.includes("testing")) &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <PiHouseBold size={20} />
                    Shed v2.0
                  </Link>
                )}
              </ol>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
