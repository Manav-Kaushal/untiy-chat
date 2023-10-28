"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { useLanguageStore } from "@/store/store";
import { MessageCircle } from "lucide-react";
import { Session } from "next-auth";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Spinner from "../Spinner";
import UserAvatar from "../UserAvatar";
import { messagesRef } from "../../lib/converters/Message";

type Props = {
  chatId: string;
  session: Session | null;
  initialMessages: Message[];
};

const ChatMessages = ({ chatId, session, initialMessages }: Props) => {
  const language = useLanguageStore((state) => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  // Real time listener for messages on the server
  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    { initialValue: initialMessages }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center items-center p-20 rounded-xl space-y-2 bg-indigo-600 text-white font-extralight text-center">
          <MessageCircle className="w-10 h-10" />

          <h2 className="font-bold">
            Invite a friend & Send your first message in ANY language below to
            get started!
          </h2>
          <p className="font-semibold">
            The AI will auto-detect and translate it all for you.
          </p>
        </div>
      )}

      {/* Render messages below */}
      {messages?.map((message) => {
        const isSender = message.user.id === session?.user.id;

        return (
          <div key={message.id} className="flex my-2 items-end">
            <div
              className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                isSender
                  ? "ml-auto bg-indigo-600 text-white roudned-br-none"
                  : "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"
              }`}
            >
              <p
                className={`text-xs italic font-extralight line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {message.user.name.split(" ")[0]}
              </p>
              <div className="flex space-x-2">
                <p>{message.translated?.[language] || message.input}</p>
                {!message.translated && <Spinner />}
              </div>
            </div>

            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${!isSender && "-order-1"} `}
            />
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
