"use client";

import {
  ChatMembers,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React from "react";
import { MessagesSquare } from "lucide-react";
import CreateChatButton from "../CreateChatButton";
import ChatListRow from "./ChatListRow";

type Props = {
  initialChats: ChatMembers[];
};

const ChatListRows = ({ initialChats }: Props) => {
  const { data: session } = useSession();

  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id),
    {
      initialValue: initialChats,
    }
  );

  if (members?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-48 space-y-2">
        <MessagesSquare />
        <h1>Welcome!</h1>
        <h2>Let&apos;s get you started by creating your first chat!</h2>
        <CreateChatButton isLarge />
      </div>
    );
  }
  return (
    <div>
      {members?.map((m, i) => (
        <ChatListRow key={m.chatId} chatId={m.chatId} />
      ))}
    </div>
  );
};

export default ChatListRows;
