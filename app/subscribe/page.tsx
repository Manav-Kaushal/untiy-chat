import { authOptions } from "@/auth";
import PricingCards from "@/components/PricingCards";
import { appConfig } from "@/lib/appConfig";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata: Metadata = {
  title: appConfig.name + " | Subscribe",
};

const Register = async () => {
  const session = await getServerSession(authOptions);

  return (
    session && (
      <div className="isolate overflow-hidden bg-white dark:bg-gray-900 pb-24">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              {appConfig.name} Subscription
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-black dark:text-white  sm:text-5xl">
              Let&apos;s handle your Membership{" "}
              {session.user?.name?.split(" ")[0]}!
            </p>
          </div>
          <div
            className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PricingCards />
        </div>
      </div>
    )
  );
};

export default Register;
