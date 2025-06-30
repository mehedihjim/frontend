"use client";
import {
  ADMIN,
  BUYER,
  DOCTOR,
  FARM_FORCE,
  FARMER,
  FEED_SELLER,
} from "@/constants/roles";
import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi";
import { setDashboardData } from "@/redux/features/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiAchievement, GiCancel } from "react-icons/gi";
import {
  MdCastForEducation,
  MdOutlinePendingActions,
  MdOutlineSportsCricket,
  MdRememberMe,
} from "react-icons/md";
import { SiClubforce } from "react-icons/si";
import { TbBrandStocktwits } from "react-icons/tb";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import Loading from "../loading/Loading";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = React.useState<string>(
    user?.user_type || "admin",
  );
  const { data, isLoading } = useGetDashboardDataQuery(selectedTab);

  useEffect(() => {
    if (data) {
      dispatch(setDashboardData(data.data));
    }
  }, [data, dispatch]);
  if (isLoading) return <Loading />;
  const tabHandler = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      {user?.user_type === ADMIN && (
        <div
          role="tablist"
          className=" tab-custom sm tabs tabs-lifted  tabs-sm my-5 font-bold  md:tabs-lg "
        >
          Admin Dashboard
        </div>
      )}
      {user?.user_type === FARMER && (
        <div
          role="tablist"
          className=" tab-custom sm tabs tabs-lifted  tabs-sm my-5 font-bold  md:tabs-lg "
        >
          Farmer Dashboard
        </div>
      )}
      {user?.user_type === FARM_FORCE && (
        <div
          role="tablist"
          className=" tab-custom sm tabs tabs-lifted  tabs-sm my-5 font-bold  md:tabs-lg "
        >
          Farm Force Dashboard
        </div>
      )}
      {user?.user_type === FEED_SELLER && (
        <div
          role="tablist"
          className=" tab-custom sm tabs tabs-lifted  tabs-sm my-5 font-bold  md:tabs-lg "
        >
          Feed Seller Dashboard
        </div>
      )}
      {user?.user_type === DOCTOR && (
        <div
          role="tablist"
          className=" tab-custom sm tabs tabs-lifted  tabs-sm my-5 font-bold  md:tabs-lg "
        >
          Doctor Dashboard
        </div>
      )}
      {user?.user_type === BUYER && (
        <div
          role="tablist"
          className=" tab-custom sm tabs tabs-lifted  tabs-sm my-5 font-bold  md:tabs-lg "
        >
          Buyer Dashboard
        </div>
      )}
    </>
  );
};

export default Dashboard;
