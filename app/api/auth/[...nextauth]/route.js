import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/Users' // Corrected import path
import Payment from '@/models/Payment'

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn callback triggered");
      if (account.provider === "github") {
        try {
          // Connect to the database
          console.log("Connecting to MongoDB...");
          await mongoose.connect("mongodb://localhost:27017/chai");
          console.log("MongoDB connected successfully.");

          // Check if user already exists in the database
          console.log(`Checking if user exists with email: ${user.email}`);
          const currentUser = await User.findOne({ email: user.email }); // Access email from user object
          console.log(`currentUser: ${JSON.stringify(currentUser)}`);

          if (!currentUser) {
            console.log(`Creating new user with email: ${user.email}`);
            const newUser = new User({ // Corrected to User
              email: user.email, // Access email from user object
              username: user.email.split("@")[0], // Access email from user object
            });
            console.log(`newUser: ${JSON.stringify(newUser)}`);
            await newUser.save();
            console.log("New user saved successfully.");
            user.name = newUser.username;
          } else {
            user.name = currentUser.username;
          }
          console.log("Sign-in successful.");
          return true;
        } catch (error) {
          console.error("Sign-in error:", error);
          return false; // Return false to prevent sign-in
        }
      }
      console.log("Not a github provider");
      return false; // Return false for other providers
    },
    async session({ session, user, token }) {
      try {
        const dbUser = await User.findOne({ email: session.user.email }); // Corrected to User
        if (dbUser) {
          session.user.name = dbUser.username;
        }
        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session;
      }
    },
  }
})

export { authoptions as GET, authoptions as POST }