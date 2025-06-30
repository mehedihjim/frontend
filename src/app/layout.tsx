"use client";
import Loader from "@/components/common/Loader";
import "@/css/satoshi.css";
import "@/css/style.css";
import { store } from "@/redux/store";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/css/jsvectormap.css";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Provider store={store}>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="toster-index">
              {" "}
              <Toaster position="bottom-right" />
            </div>
            {loading ? <Loader /> : children}
          </div>
        </body>
      </html>
    </Provider>
  );
}
