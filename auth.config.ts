import next from "next";
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Define the authorized callback function
    authorized({ auth, request: { nextUrl }}) {
      // Check if the user is logged in by evaluating the auth object 
      const isLoggedIn = !!auth?.user;
      //check if the current path starts with '/dashboard'
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        // if the user is on the dashboard page
        if (isLoggedIn) return true; // Allow access if logged in
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // if the user is logged in but not on the dashboard page
        return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect to dashboard
      }
      return true; // allow access to non-dashboard pages for unauthenticated users
    },
  },
  // Define providers for authentication (currently empty)
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig; // Ensure the configuration satisfies the NextAuthConfig type



// NOTE: we can use the pages option inside the authConfig object to specify the route for custom sign-in, sign-out and error pages. 
// This is not required, but by the adding signIn: '/login' into our pages option, the user will be redirected to our custom login page, rather than the NextAuth.js default page.


// Protecting routes with Next.js middleware 
// add the logic to protect the routes, this will prevent the user from accessing the dashboard pages unless they are logged in.

// the authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware. it is called before a request. it is called before a request is completed. and it receive an object with the auth and request properties. The auth property contains the user'session, and the request property contains teh incoming request. 

// The providers option is an array where you list different login options, for now, it is an empty array to satisfy NextAuth config. you will learn more about in the the adding credential provider section.

