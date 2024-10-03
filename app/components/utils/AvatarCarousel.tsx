"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import React from "react";
import Marquee from "react-fast-marquee";

export const AvatarCarousel = () => {
  const { theme } = useTheme();

  const avatarImage = [
    {
      src: "/image/adzka.jpg",
      alt: "adzka",
      tooltip: "Adzka Fahmi Aulia Hakim",
    },
    {
      src: "/image/audi.jpg",
      alt: "audi",
      tooltip: "Audia Faradisa Anshori",
    },
    {
      src: "/image/dejet.jpg",
      alt: "dejet",
      tooltip: "Dzakiyya Nur Fadhilahrizka",
    },
    {
      src: "/image/feli.jpg",
      alt: "feli",
      tooltip: "Fellycia Hikmahwarani",
    },
    {
      src: "/image/nazif.jpg",
      alt: "nazif",
      tooltip: "Muhammad Afdhal Nadzif",
    },
    {
      src: "/image/octa.JPG",
      alt: "octa",
      tooltip: "Octa Dwiansyah",
    },
  ];

  return (
    <Marquee
      gradient
      gradientColor={theme === "light" ? "white" : "#09090b"}
      className="pt-10 pb-0 overflow-hidden"
    >
      {avatarImage.map((image, index) => {
        return (
          <TooltipProvider key={index}>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <Avatar className="w-24 h-24 mx-3" key={index}>
                  <AvatarImage
                    src={image.src}
                    className="object-cover"
                    alt={image.alt}
                  />
                  <AvatarFallback>
                    <Skeleton className="rounded-full w-16 h-auto" />
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent align="center" side="top">
                <p>{image.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </Marquee>
  );
};
