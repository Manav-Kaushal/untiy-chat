"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import Spinner from "./Spinner";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";

type Props = {
  isLarge?: boolean;
};

const CreateChatButton = ({ isLarge }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const [loading, setLoading] = useState<boolean>(false);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);

    // Check if user is pro and limit them creating a new chat
    const noOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.status === "active";

    if (!isPro && noOfChats >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the limit of chats for the FREE plan. Please upgrade to PRO to create more chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/subscribe")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });

      setLoading(false);

      return;
    }

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: error?.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge) {
    return (
      <div>
        <Button variant="default" onClick={createNewChat}>
          {loading ? <Spinner /> : "Create a New Chat"}
        </Button>
      </div>
    );
  }

  return (
    <Button variant="ghost" onClick={createNewChat}>
      <MessageSquarePlus />
    </Button>
  );
};

export default CreateChatButton;
