import ChatList from "@/components/Chats/ChatList";
import React from "react";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

const ChatsPage = ({ searchParams: { error } }: Props) => {
  return (
    <div>
      <ChatList />
    </div>
  );
};

export default ChatsPage;
