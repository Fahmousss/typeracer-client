"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import React from "react";
import Marquee from "react-fast-marquee";

export const AvatarCarousel = () => {
  const { theme } = useTheme();

  const avatarImage = [
    {
      src: "/image/adzka.jpg",
      alt: "adzka",
    },
    {
      src: "/image/audi.jpg",
      alt: "audi",
    },
    {
      src: "/image/dejet.jpg",
      alt: "dejet",
    },
    {
      src: "/image/feli.jpg",
      alt: "feli",
    },
    {
      src: "/image/nazif.jpg",
      alt: "nazif",
    },
    {
      src: "/image/octa.jpg",
      alt: "octa",
    },
  ];

  return (
    <Marquee
      pauseOnHover
      gradient
      gradientColor={theme === "light" ? "white" : "#09090b"}
    >
      {avatarImage.map((image, index) => {
        return (
          <Avatar className="w-16 h-auto mx-3" key={index}>
            <AvatarImage src={image.src} alt={image.alt} />
            <AvatarFallback>
              <Skeleton className="rounded-full w-16 h-auto" />
            </AvatarFallback>
          </Avatar>
        );
      })}
    </Marquee>
  );
};
