import type { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt'
import { authConfig } from './auth.config';

const getUser = async (email: string): Promise<User | undefined> => {
  try {
    const user = await sql<User>`Select * from users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    // just logging error into the console. sometime can be overlooked, by throwing a new error with "throw new Error", we ensure that the error propagates up the call stack, making it impossible to ignore, such as by displaying an error message to user, retrying hte operation, or performing necessary error-handling logic. this leads to more robust and maintainable application.
    throw new Error('Failed to fetch user.');
  }
};

// exporting auth, signIn, and signOut from the NextAuth instance
export const { auth, signIn, signOut } = NextAuth({
  // spreading the authConfig object into the NextAuth configuration
  ...authConfig,

  // adding provider configuration for authentication
  providers: [
    // adding a credentials provider for custom login logic
    Credentials({
      // Defining the authorize function to handle login
      async authorize(credentials) {
        // parsing and validating credentials using Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        // if credentials are successfully parsed and validated
        if (parsedCredentials.success) {
          // Destructure email and password from the parsedCredentials
          const { email, password } = parsedCredentials.data;
          // fetching the user based on the email
          const user = await getUser(email);
          // if user is not found, return null
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user;
        }

        // if parsing fails or user is not found, return null
        return null;
      },
    }),
  ],
});

//  NOTE: Credential provider allow the user to log in with a username and password.

// GOOD to know: although we are using credential providers, it is generally recommended to use alternative provider such as Oauth or email provider

// adding the sign in functionality
// we can use the authorize function to handle the authentication logic. Similarly to Server Action, you can use zod to validate the email and password before checking if the user exist in the database.
