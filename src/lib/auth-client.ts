import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined'
    ? window.location.origin
    : process.env.BETTER_AUTH_URL || "http://localhost:3000",
  fetchOptions: {
    onRequest: (context) => {
      console.log("Auth request:", context.url, context.method);
    },
    onResponse: (context) => {
      console.log("Auth response:", context.response.status);
    },
    onError: (context) => {
      console.error("Auth error:", context.error);
    },
  },
});