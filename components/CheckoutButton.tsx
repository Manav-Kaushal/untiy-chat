"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

//Now import this
import "firebase/firestore";
import Spinner from "./Spinner";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";

const CheckoutButton = () => {
  const { data: session } = useSession();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = subscription?.status === "active";

  const [loading, setLoading] = useState<boolean>(false);

  const createCheckoutSession = async () => {
    if (!session?.user?.id) return;

    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1O3ymRSI1ZnOmbrE9lWxO20i", // From stripe products dashboard
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    // Strip extension will create a checkout session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occurred: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });
  };

  return (
    <div className="mt-8 btn flex-center">
      {isSubscribed ? (
        <ManageAccountButton />
      ) : isLoadingSubscription || loading ? (
        <Spinner />
      ) : (
        <button onClick={() => createCheckoutSession()}>Subscribe</button>
      )}
    </div>
  );
};

export default CheckoutButton;
