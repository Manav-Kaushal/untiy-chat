import { generatePortalLink } from "@/actions/generatePortalLink";
import React from "react";

type Props = {};

const ManageAccountButton = (props: Props) => {
  return (
    <form action={generatePortalLink}>
      <button type="submit">Manage Billing</button>
    </form>
  );
};

export default ManageAccountButton;
