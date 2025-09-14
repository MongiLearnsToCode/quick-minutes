"use client";

import { UnifiedAuthForm } from "@/components/auth/unified-auth-form";
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
            Secure authentication with Better Auth
          </p>
        </div>

        {session ? (
          <div className="flex justify-center">
            <UserProfile />
          </div>
        ) : (
          <div className="flex justify-center">
            <UnifiedAuthForm />
          </div>
        )}
      </div>
    </div>
  );
}
