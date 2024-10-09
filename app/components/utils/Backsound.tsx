"use client";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Backsound() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    // Initialize background music
    musicRef.current = new Audio("/audio/background-music-3.mp3");
    musicRef.current.currentTime = 20;
    musicRef.current.loop = true; // Loop the music
    musicRef.current.volume = isMuted ? 0 : 0.5; // Set volume (0.0 to 1.0)

    // Play the music when the component mounts
    musicRef.current.play().catch((error) => {
      console.error("Error playing music:", error);
    });

    return () => {
      musicRef.current?.pause(); // Pause music on component unmount
    };
  }, [isMuted]);
  const handleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <Button variant="outline" size="icon" onClick={handleMute}>
      {isMuted ? (
        <Play className="h-[1.2rem] w-[1.2rem] transition-all " />
      ) : (
        <Pause className="h-[1.2rem] w-[1.2rem]  transition-all " />
      )}
    </Button>
  );
}
