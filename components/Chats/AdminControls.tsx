import React from "react";
import InviteUserButton from "../InviteUserButton";

type Props = {
  chatId: string;
};

const AdminControls = ({ chatId }: Props) => {
  return (
    <div className="fle justify-end space-x-2 m-5 mb-0">
      <InviteUserButton chatId={chatId} />
      {/* <DeleteChatButton /> */}
    </div>
  );
};

export default AdminControls;
