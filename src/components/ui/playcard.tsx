import React from "react";
import { cn } from "@/lib/utils";

export interface PlayCardProps {
  image: string;
  className?: string;
  style?: React.CSSProperties;
}

const PlayCard: React.FC<PlayCardProps> = ({ image, className, style }) => {
  return (
    <div
      className={cn(
        "playcard relative rounded-xl shadow-lg bg-cover bg-center transition-transform duration-700",
        className
      )}
      style={{ backgroundImage: `url(${image})`, ...style }}
    />
  );
};

export default PlayCard;
