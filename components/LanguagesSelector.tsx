"use client";

import {
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { LanguagesSupported } from "@/typings";
import Spinner from "./Spinner";
import Link from "next/link";

type Props = {};

const LanguagesSelector = (props: Props) => {
  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");

  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro = subscription?.status === "active";

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>
          <SelectContent>
            {subscription === undefined ? (
              <div className="my-1">
                <Spinner />
              </div>
            ) : (
              <>
                {getLanguages(isPro).map((language) => (
                  <SelectItem key={language} value={language}>
                    {LanguagesSupportedMap[language as LanguagesSupported]}
                  </SelectItem>
                ))}
                {getNotSupportedLanguages(isPro).map((language) => (
                  <Link href="/subscribe" key={language} prefetch={false}>
                    <SelectItem
                      value={language}
                      className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                      disabled
                    >
                      {LanguagesSupportedMap[language as LanguagesSupported]}
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
};

export default LanguagesSelector;
