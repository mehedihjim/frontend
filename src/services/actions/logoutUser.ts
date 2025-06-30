import { authKey } from "@/constants/authKey";
import { deleteCookies } from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem("data");
  localStorage.removeItem(authKey);
  deleteCookies(["auth_token", "user_data", "permissions"]);
  router.push("/auth/login");
  router.refresh();
};
