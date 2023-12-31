import { authOptions } from "@/auth";
import AdminControls from "@/components/Chats/AdminControls";
import ChatInput from "@/components/Chats/ChatInput";
import ChatMembersBadges from "@/components/Chats/ChatMembersBadges";
import ChatMessages from "@/components/Chats/ChatMessages";
import { appConfig } from "@/lib/appConfig";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

export const metadata: Metadata = {
  title: appConfig.name + " | Chat",
  description: "Single chat page",
};

const SingleChatPage = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id);

  if (!hasAccess) {
    redirect("/chat?error=permission");
  }

  return (
    <>
      <div className="sticky top-20 bg-white dark:bg-gray-900 z-20 p-4">
        <AdminControls chatId={chatId} />
      </div>
      <ChatMembersBadges chatId={chatId} />
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
};

export default SingleChatPage;
