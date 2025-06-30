"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

// icons
import SidebarLinkGroup from "@/components/Sidebar/SidebarLinkGroup";
import { ADMIN, CLUB, INSTITUTE, MP, SPORTS_OFFICER } from "@/constants/roles";
import { useAppSelector } from "@/redux/hooks";
import { FaFileSignature } from "react-icons/fa6";
import { FiSettings, FiUser } from "react-icons/fi";
import { GrAchievement, GrDocumentText } from "react-icons/gr";
import { LuArchive, LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

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
            {role === CLUB
              ? "Club"
              : role === ADMIN
                ? "Admin"
                : role === INSTITUTE
                  ? "Institution"
                  : role === SPORTS_OFFICER
                    ? "Sports Officer"
                    : role === MP
                      ? "MP"
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

                {role === ADMIN && hasPermission("users") && (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/users" || pathname.includes("users")
                    }
                  >
                    {(handleClick: () => any, open: any) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              (pathname === "/users" ||
                                pathname.includes("users")) &&
                              "bg-graydark dark:bg-meta-4"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            {/* <HiOutlineDocumentReport size={20} /> */}
                            <FiUser size={20} />
                            Users
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && "rotate-180"
                              }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg>
                          </Link>
                          {/* <!-- Dropdown Menu Start --> */}
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && "hidden"
                            }`}
                          >
                            <ul className="mb-3 mt-2 flex flex-col gap-2.5 pl-6">
                              <>
                                {hasPermission("user list") && (
                                  <Link
                                    href={`/${role}/users`}
                                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname === `/${role}/users` &&
                                      "bg-graydark text-white dark:bg-meta-4"
                                    } `}
                                  >
                                    User List
                                  </Link>
                                )}
                              </>
                              {hasPermission("admin user") && (
                                <ol>
                                  <Link
                                    href={`/${role}/users/admin-user`}
                                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname ===
                                        `/${role}/users/admin-user` &&
                                      "bg-graydark text-white dark:bg-meta-4"
                                    } `}
                                  >
                                    Admin User
                                  </Link>
                                </ol>
                              )}
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                )}
              </ol>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/settings" || pathname.includes("settings")
                }
              >
                {(handleClick: () => any, open: any) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/settings" ||
                            pathname.includes("settings")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FiSettings size={20} />
                        Settings
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-3 mt-2 flex flex-col gap-2.5 pl-6">
                          <>
                            {hasPermission("permissions") && (
                              <ol>
                                <Link
                                  href={`/${role}/settings/permissions`}
                                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white${
                                    pathname.includes(
                                      `/${role}/settings/permissions`,
                                    ) && "bg-graydark text-white dark:bg-meta-4"
                                  }`}
                                >
                                  {/* <SiAuth0 size={20} /> */}
                                  Roles & Permissions
                                </Link>
                              </ol>
                            )}
                          </>
                          <ol>
                            <Link
                              href={`/${role}/settings/change-password`}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname ===
                                  `/${role}/settings/change-password` &&
                                "bg-graydark text-white dark:bg-meta-4"
                              } `}
                            >
                              Change Password
                            </Link>
                          </ol>
                          {role === ADMIN && (
                            <ol>
                              <Link
                                href={`/${role}/settings/activity-log`}
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname ===
                                    `/${role}/settings/activity-log` &&
                                  "bg-graydark text-white dark:bg-meta-4"
                                } `}
                              >
                                Activity Log
                              </Link>
                            </ol>
                          )}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
