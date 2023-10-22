import React from "react";
import LogoDark from "@logos/black.svg";
import Link from "next/link";
import { appConfig } from "../lib/appConfig";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link
      href="/"
      prefetch={false}
      className={"relative overflow-hidden w-32 aspect-video"}
    >
      <Image
        src={LogoDark}
        alt={appConfig.name + " logo"}
        className="object-contain dark:filter dark:invert"
        fill
        priority
      />
    </Link>
  );
};

export default Logo;
