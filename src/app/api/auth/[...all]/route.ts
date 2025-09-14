import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { GET, POST } = toNextJsHandler(auth);

export { GET, POST };

// Handle other methods with a generic handler
export async function PUT(request: Request) {
  return auth.handler(request);
}

export async function DELETE(request: Request) {
  return auth.handler(request);
}

export async function PATCH(request: Request) {
  return auth.handler(request);
}

export async function HEAD(request: Request) {
  return auth.handler(request);
}

export async function OPTIONS(request: Request) {
  return auth.handler(request);
}