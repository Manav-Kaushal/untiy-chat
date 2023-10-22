import React from "react";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import CreateChatButton from "./CreateChatButton";

type Props = {};

const Header = async (props: Props) => {
  const session = await getServerSession(authOptions);

  console.log("session ->", session);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Language selector */}
          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <MessagesSquare className="text-black dark:text-white" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
        <div />
      </nav>
      {/* Upgrade banner */}
    </header>
  );
};

export default Header;
