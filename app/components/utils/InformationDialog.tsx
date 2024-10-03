import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { InfoIcon } from "lucide-react";
import { AvatarCarousel } from "./AvatarCarousel";
import { Separator } from "@/components/ui/separator";

export function InformationDialog() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <InfoIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Developer</DialogTitle>
          </DialogHeader>
          <Separator className="mb-4" />
          <AvatarCarousel />
        </DialogContent>
      </Dialog>
    </div>
  );
}
