"use client";

import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { UserProfile } from "@/components/auth/user-profile";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Quick Minutes</h1>
          <p className="text-lg text-muted-foreground">
            Authentication demo with Better Auth
          </p>
        </div>

        {session ? (
          <div className="flex justify-center">
            <UserProfile />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <LoginForm />
            </div>
            <div className="flex justify-center">
              <SignupForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
