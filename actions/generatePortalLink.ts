"use server";

import { authOptions } from "@/auth";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { adminDb } from "@/firebase-admin";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function generatePortalLink() {
  const session = await getServerSession(authOptions);
  const host = headers().get("host");

  if (!session?.user.id) return console.error("No user id found");

  const {
    user: { id },
  } = session;

  const returnUrl =
    process.env.NODE_ENV === "development"
      ? `http://${host}/subscribe`
      : `https://${host}/subscribe`;

  const doc = await adminDb.collection("customers").doc(id).get();

  if (!doc.data)
    return console.error("No customer record found with user id: ", id);

  const stripeId = doc.data()!.stripeId;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });

  redirect(stripeSession.url);
}
