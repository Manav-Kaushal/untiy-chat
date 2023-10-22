"use client";

import { useSession } from "next-auth/react";
import React from "react";

const CheckoutButton = () => {
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    if (!session?.user) {
      return;
    }
  };

  return (
    <button onClick={() => createCheckoutSession()} className="mt-8 btn">
      Subscribe
    </button>
  );
};

export default CheckoutButton;
