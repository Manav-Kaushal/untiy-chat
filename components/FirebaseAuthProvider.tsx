"use client";

import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

async function syncFirebaseAuth(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error("Error signing in with custom token ->", error);
    }
  } else {
    auth.signOut();
  }
}

const FirebaseAuthProvider = ({ children }: Props) => {
  const { data: session } = useSession();

  // Sync next-auth session with firebase
  useEffect(() => {
    if (!session) return;

    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
};

export default FirebaseAuthProvider;
