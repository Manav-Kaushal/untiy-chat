"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";

type Props = { chatId: string };

const formSchema = z.object({
  email: z.string().email("PLease enter a valid email address"),
});

const InviteUserButton = ({ chatId }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);

  const [open, setOpen] = useState<boolean>(false);
  const [openInviteLink, setOpenInviteLink] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user?.id) return;

    toast({
      title: "Sending invite",
      description: "Please wait while we send the invite...",
    });

    // We need to get current members in the chat
    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    // Check if user is about the exceed the PRO plan which is 3 chats
    const isPro = subscription?.status === "active";

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You have exceeded the limit of users in a single chat for the FREE plan. Please upgrade to PRO plan to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="upgrade"
            onClick={() => router.push("/subscribe")}
          >
            Upgrade To PRO
          </ToastAction>
        ),
      });

      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));

    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email address of a registered user OR resend the invitation once they have signed up!",
        variant: "destructive",
      });

      return;
    } else {
      const user = querySnapshot.docs[0].data();

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      })
        .then(() => {
          setOpen(false);

          toast({
            title: "Added to chat",
            description: "The user has been added to the chat successfully!",
            className: "bg-green-600 text-white",
            duration: 3000,
          });

          setOpenInviteLink(true);
        })
        .catch((error) => {
          console.error(error?.message);
          toast({
            title: "Error",
            description:
              "Whoops... there was an error adding the user to the chat! Check console for more information.",
            variant: "destructive",
          });
        });
    }

    form.reset();
  };

  return (
    adminId === session?.user?.id && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-1" />
            Add User To Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add User to Chat</DialogTitle>
            <DialogDescription>
              Simply enter another user&apos;s email address to invite them to
              this chat:{" "}
              <span className="text-indigo-600 font-bold">
                (Note: they must be registered!)
              </span>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="flex flex-col space-y-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="john@doe.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="ml-auto sm:w-fit w-full" type="submit">
                Add To Chat
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  );
};

export default InviteUserButton;
