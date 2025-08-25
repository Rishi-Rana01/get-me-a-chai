import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';
import bcrypt from 'bcryptjs';


export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // Credentials provider for email/password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDb();

        try {
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user || !user.password) {
            return null;
          }

          // Check if password matches
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            username: user.username
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      }
    }),
    //   AppleProvider({
    //     clientId: process.env.APPLE_ID,
    //     clientSecret: process.env.APPLE_SECRET
    //   }),
    //   FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    //   }),
    //   GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET
    //   }),
    //   // Passwordless / email sign in
    //   EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    //   }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "github") {
        await connectDb()
        // Check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          // Create a new user
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
            name: profile?.name || user.name || user.email.split("@")[0], // <-- fallback chain
            githubId: profile?.id?.toString()
          });
          await User.findOneAndUpdate(
            { email: user.email },
            {
              $setOnInsert: {
                username: user.email.split("@")[0],
                name: profile?.name || user.name || user.email.split("@")[0],
                githubId: profile?.id?.toString()
              }
            },
            { upsert: true, new: true }
          );
        }
        return true
      }
      
      // For credentials provider, we've already validated in the authorize function
      if (account?.provider === "credentials") {
        return true;
      }
      
      return false;
    },

    async session({ session, user, token }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.name = dbUser.username
        session.user.id = dbUser._id.toString()
      }
      return session
    },
  }
})

export { authoptions as GET, authoptions as POST }