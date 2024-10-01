"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
// import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import Marquee from "react-fast-marquee";

export const AvatarCarousel = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Marquee
      autoFill
      pauseOnHover
      gradient
      gradientWidth={200}
      gradientColor={theme === "light" ? "white" : "#09090b"}
    >
      <Avatar className="w-16 h-auto mx-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <Skeleton className="rounded-full w-16 h-auto" />
        </AvatarFallback>
      </Avatar>
      <Avatar className="w-16 h-auto mx-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <Skeleton className="rounded-full w-16 h-auto" />
        </AvatarFallback>
      </Avatar>
      <Avatar className="w-16 h-auto mx-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <Skeleton className="rounded-full w-16 h-auto" />
        </AvatarFallback>
      </Avatar>
      <Avatar className="w-16 h-auto mx-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <Skeleton className="rounded-full w-16 h-auto" />
        </AvatarFallback>
      </Avatar>
    </Marquee>
  );
};
