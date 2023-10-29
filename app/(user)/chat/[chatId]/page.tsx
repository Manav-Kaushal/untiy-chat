import { authOptions } from "@/auth";
import AdminControls from "@/components/Chats/AdminControls";
import ChatInput from "@/components/Chats/ChatInput";
import ChatMembersBadges from "@/components/Chats/ChatMembersBadges";
import ChatMessages from "@/components/Chats/ChatMessages";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const SingleChatPage = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
      <AdminControls chatId={chatId} />
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
