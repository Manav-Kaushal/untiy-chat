import React from "react";
import InviteUserButton from "../InviteUserButton";
import DeleteChatButton from "./DeleteChatButton";

type Props = {
  chatId: string;
};

const AdminControls = ({ chatId }: Props) => {
  return (
    <div className="flex justify-end space-x-2">
      <InviteUserButton chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  );
};

export default AdminControls;
