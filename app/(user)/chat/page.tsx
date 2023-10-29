import ChatList from "@/components/Chats/ChatList";
import ChatPermissionError from "@/components/Chats/ChatPermissionError";
import { appConfig } from "@/lib/appConfig";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

export const metadata: Metadata = {
  title: appConfig.name + " | Chats",
  description: "Chats listing page",
};

const ChatsPage = ({ searchParams: { error } }: Props) => {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      <ChatList />
    </div>
  );
};

export default ChatsPage;
