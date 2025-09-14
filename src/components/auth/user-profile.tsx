"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfile() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!session) {
    return <div>Not logged in</div>;
  }

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>
              {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{session.user.name}</p>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
          </div>
        </div>
        <Button onClick={handleLogout} variant="outline" className="w-full">
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}