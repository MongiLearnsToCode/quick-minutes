import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

console.log("Google OAuth Config:", {
  clientId: googleClientId ? "Set" : "Not set",
  clientSecret: googleClientSecret ? "Set" : "Not set",
});

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: googleClientId && googleClientSecret ? {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  } : {},
  trustedOrigins: [
    "https://accounts.google.com",
    "https://oauth2.googleapis.com",
  ],
});
