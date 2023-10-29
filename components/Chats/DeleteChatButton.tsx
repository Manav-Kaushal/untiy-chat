"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import useAdminId from "@/hooks/useAdminId";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = {
  chatId: string;
};

const DeleteChatButton = ({ chatId }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });

  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    toast({
      title: "Deleting chat",
      description: "Please wait while we delete the chat...",
    });
    console.log("Deleting :: ", chatId);

    await fetch("/api/chat/delete", {
      method: "DELETE",
      body: JSON.stringify({ chatId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast({
          title: "Success",
          description: `Your chat has been deleted successfully!`,
          className: "bg-green-600 text-white",
          duration: 3000,
        });
        router.replace("/chat");
      })
      .catch((err) => {
        console.error(err.message);
        toast({
          title: "Error",
          description:
            "There was an error deleting your chat! Please check console for more information.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    adminId === session?.user.id && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Chat</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DeleteChatButton;
