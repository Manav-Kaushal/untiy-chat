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
      <p>Chats</p>
      {/* Chat permission error */}
      {/* Chat list */}
      <ChatList />
    </div>
  );
};

export default ChatsPage;
