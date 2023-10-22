import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/chat", "/chat/:id*", "/subscribe"],
};

export default withAuth;
