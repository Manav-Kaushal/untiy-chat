"use client";

import { subscriptionRef } from "@/lib/converters/Subscription";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const SubscriptionProvider = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
      if (snapshot.empty) {
        console.log("User has no subscription");
      } else {
        console.log("User has subscription");
      }
    });
  }, [session]);

  return <div>{children}</div>;
};

export default SubscriptionProvider;
