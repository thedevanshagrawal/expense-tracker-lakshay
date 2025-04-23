import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from '@/lib/mongodb';
import userModel from "@/models/userModel";

export const authOptions = NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectMongoDB();
          const { email, password } = credentials;

          const user = await userModel.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.fullName,
            email: user.email,
            accessToken: user.accessToken || "",
          };
        } catch (error) {
          console.error("Error during login:", error.message);
          throw new Error(error.message || "Error during login");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.fullName = token.fullName;
        session.user.email = token.email;
      }

      const headers = new Headers();
      headers.set("Authorization", `Bearer ${token.accessToken}`);

      session.headers = headers;

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    },
  },
});

export { authOptions as GET, authOptions as POST }