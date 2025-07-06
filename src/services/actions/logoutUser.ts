import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("permissions");
  localStorage.removeItem("user_data");
  router.push("/auth/login");
  router.refresh();
};
