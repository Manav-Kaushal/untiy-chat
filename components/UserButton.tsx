"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import Spinner from "./Spinner";
import { Star } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";

type Props = { session: Session | null };

const UserButton = ({ session }: Props) => {
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session) {
    return (
      <Button variant="outline" onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }
  
  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={session.user?.name} image={session.user?.image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-center">
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {subscription === undefined && (
            <DropdownMenuItem>
              <Spinner />
            </DropdownMenuItem>
          )}
          {subscription?.status === "active" && (
            <>
              <DropdownMenuLabel className="text-sm flex-center space-x-1 text-[#E935C1] animate-pulse">
                <Star fill="#E935C1" />
                <p>PRO</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex-center">
                <ManageAccountButton />
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem className="flex-center" onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};

export default UserButton;
