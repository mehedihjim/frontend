"use client";
import Sidebar from "@/app";
import Header from "@/components/Header";
import React, { useState } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState("club");
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {/* {userType === "mp" && (
          <SidebarMp
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          ></SidebarMp>
        )}
        {userType === "admin" && (
          <SidebarAdmin
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          ></SidebarAdmin>
        )}
        {userType === "club" && (
          <SidebarClub
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          ></SidebarClub>
        )}
        {userType === "institute" && (
          <SidebarInstitute
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          ></SidebarInstitute>
        )} */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
