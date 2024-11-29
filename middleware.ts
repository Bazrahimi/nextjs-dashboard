// import the NextAuth function to handle authentication flow'
import NextAuth from "next-auth";

import { authConfig } from "./auth.config"; // import configuration object

// export the default NextAuth handler using the 'authConfig'
// This setup the authentication logic using the provided configuration
export default NextAuth(authConfig).auth;

// Define and export the 'config' object to customize middleware behavior
export const config = {
  // exclude API routes, static assets
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
