import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const pathPermissionsMap = {
  "stock-in": ["stock-in"],
  "stock-out": ["stock-out"],
  permissions: ["role list", "edit role", "create role"],
  applications: ["requisition list", "edit requisition"],
  users: ["user list", "create user", "edit user"],
  requisition: ["create requisition"],
  "add-sports-officer": [
    "create sports-officer",
    "edit sports-officer",
    "sports-officer list",
  ],
  "add-organization": [
    "create organization",
    "edit organization",
    "organization list",
  ],
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
  achievements: ["achievement list", "create achievement", "edit achievement"],
};

const AuthRoutes = ["/auth/login", "/auth/registration", "/auth/otp"];
const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];
const roleBasedPrivateRoutes = {
  MP: [/^\/mp/],
  CLUB: [/^\/club/],
  INSTITUTE: [/^\/institute/],
  "SPORTS-OFFICER": [/^\/sports-officer/],
  ADMIN: [/^\/admin/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get("auth_token")?.value;
  const userJson = cookies().get("user_data")?.value;
  const user = JSON.parse(userJson || "{}");
  const permissions = JSON.parse(cookies().get("permissions")?.value || "[]");

  for (const [path, requiredPermissions] of Object.entries(
    pathPermissionsMap,
  )) {
    if (pathname.endsWith(path)) {
      const hasPermission = requiredPermissions.some((permission) =>
        permissions?.find((p: string) => p === permission),
      );
      return hasPermission
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (
    accessToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  let decodedData = null;

  if (accessToken) {
    try {
      decodedData = JSON.parse(userJson || "");
    } catch (error) {}
  }

  const role = decodedData?.user_type?.toUpperCase();
  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(
    new URL(`/${decodedData?.user_type}/dashboard`, request.url),
  );
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/registration",
    "/dashboard/:page*",
    "/mp/:page*",
    "/club/:page*",
    "/institute/:page*",
    "/sports-officer/:page*",
    "/admin/:page*",
  ],
};
