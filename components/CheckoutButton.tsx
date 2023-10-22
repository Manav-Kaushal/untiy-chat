"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

//Now import this
import "firebase/firestore";

const CheckoutButton = () => {
  const { data: session } = useSession();
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
      console.log("data -->", data);
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
    <button onClick={() => createCheckoutSession()} className="mt-8 btn">
      {loading ? "Loading..." : "Subscribe"}
    </button>
  );
};

export default CheckoutButton;
