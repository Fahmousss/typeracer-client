import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { AvatarCarousel } from "./AvatarCarousel";

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
            <DialogTitle>Developer</DialogTitle>
            <DialogDescription>Meet the developer</DialogDescription>
          </DialogHeader>
          <AvatarCarousel />
        </DialogContent>
      </Dialog>
    </div>
  );
}
