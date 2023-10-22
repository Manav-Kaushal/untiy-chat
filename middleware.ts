import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/chat", "/chat/:id*", "/register"],
};

export default withAuth;
