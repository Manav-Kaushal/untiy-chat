import { PricingTier } from "@/typings";
import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

type Props = {
  redirect?: boolean;
};

const tiers: PricingTier[] = [
  {
    name: "Starter",
    id: null,
    href: "/subscribe",
    priceMonthly: null,
    description: "Get chatting right away with anyone, anywhere!",
    features: [
      "20 Message chat limit in chats",
      "2 Participant limit in chat",
      "3 Chat rooms limit",
      "Supports 2 languages",
      "48-hour support response time",
    ],
    checkout: false,
  },
  {
    name: "Pro",
    id: "pro",
    href: "/subscribe",
    priceMonthly: "₹1",
    description: "Unlock the full potential with Pro!",
    features: [
      "Unlimited messages in chats",
      "Unlimited participants in chats",
      "Unlimited chat rooms",
      "Supports up to 10 languages",
      "1-hour, dedicated support response time",
      "Early access to new features",
      "Multimedia support in chats (coming soon)",
    ],
    checkout: true,
  },
];

const PricingCards = ({ redirect }: Props) => {
  return (
    <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
        >
          <div>
            <h3
              id={tier.id + tier.name}
              className="text-base font-semibold leading-7 text-indigo-600"
            >
              {tier.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-x-2">
              {tier.priceMonthly ? (
                <>
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                  </span>

                  <span className="text-base font-semibold leading-7 text-gray-600">
                    /month
                  </span>
                </>
              ) : (
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  Free
                </span>
              )}
            </div>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {tier.description}
            </p>
            <ul
              role="list"
              className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {redirect ? (
            <Link
              href={tier.href}
              aria-describedby={tier.id || tier.name}
              className="mt-8 btn"
            >
              Get started today
            </Link>
          ) : (
            tier.id && <CheckoutButton />
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
