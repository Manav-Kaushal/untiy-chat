"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const ClientProviders = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientProviders;
