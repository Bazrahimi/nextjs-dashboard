import type { User } from "@/app/lib/definitions"; // import the User type definitions for TypeScript type checking.
import { sql } from "@vercel/postgres"; // import postgres library for SQL queries.
import bcrypt from "bcrypt"; // import bcrypt library for hashing and verifying passwords.
import NextAuth from "next-auth"; // import NextAuth Library
import Credentials from "next-auth/providers/credentials"; // Import Credentials Provider for username/password authentication
import { z } from "zod"; // import zod library for schema validation
import { authConfig } from "./auth.config"; // import custom authentication configuration

// function to fetch user by email from the database
const getUser = async (email: string): Promise<User | undefined> => {
  try {
    // query the database for as user with the given email
    const user = await sql<User>`
      SELECT * FROM users WHERE email=${email}
    `;
    // returning the first username found
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw new Error("Failed to fetch user.");
  }
};

// exporting authentication-related functions and configuration from NextAuth.
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, // spreading custom authentication configuration
  providers: [
    // configuring the Credentials provider for handling username/password-based login.
    Credentials({
      async authorize(credentials) {
        // validating the incoming credentials using Zod Schema.
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null; // Returning null if the credentials are invalid
      },
    }),
  ],
});
