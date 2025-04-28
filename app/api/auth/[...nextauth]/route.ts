import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const baseURL = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.post(`${baseURL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200) {
            console.log("🚀 ~ authorize ~ response.data:", response.data);

            const { token, ...user } = response.data;
            return { ...user, token }; // Include accessToken in the returned user object
          }

          return null;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT to store the session
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; // Store the access token in the JWT token
        token.id = user.id; // Store the user id in the JWT token
        token.email = user.email; // Store the user's email if available
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the token values to the session
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.accessToken = token.accessToken as string; // Attach access token to session
      return session;
    },
  },
});

export { handler as GET, handler as POST };
