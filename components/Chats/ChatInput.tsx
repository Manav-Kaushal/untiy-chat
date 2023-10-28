"use client";

import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  User,
  limitedMessagesRef,
  messagesRef,
} from "@/lib/converters/Message";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";

type Props = { chatId: string };

const formSchema = z.object({
  input: z.string().max(1000),
});

const ChatInput = ({ chatId }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const inputCopy = values.input.trim();
    form.reset();

    if (inputCopy.length === 0) {
      return;
    }
    if (!session?.user) {
      return;
    }

    // Check if user is about to expire the pro plan
    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro = subscription?.status === "active";

    if (!isPro && messages >= 20) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
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
    }

    const userToStore: User = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  };

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex space-x-2 p-2 rounded-t-xl max-w-7xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in any language..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-indigo-600 text-white hover:bg-indigo-500 "
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
