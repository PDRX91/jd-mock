import Image from "next/image";
// import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/shiny-button";
import FlickeringGrid from "@/components/ui/flickering-grid";
interface GemCardProps {
  className?: string;
  cut: string;
  dimensions: { width: number; height: number };
  gem_type: string;
  item_num: string;
  price: number;
  size_carats: string;
  small_img: string;
}

export function GemCard({
  className,
  cut,
  dimensions,
  gem_type,
  item_num,
  price,
  size_carats,
  small_img,
}: GemCardProps) {
  const imageWidth = 150;
  const imageHeight = 150;

  return (
    <div
      className={cn(
        "w-[250px] rounded-lg border border-gray-200 group hover:border-gray-300 hover:shadow-md transition-all duration-700 bg-zinc-100 hover:bg-zinc-50 relative",
        className
      )}
    >
      <FlickeringGrid width={250} height={250} />
      {/* Image positioning */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <Image
          src={small_img}
          alt={gem_type}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-auto object-cover transition-all ease-in-out duration-700 group-hover:scale-150 scale-125 aspect-square"
        />
      </div>
      {/* Content layout */}
      <div className="flex flex-col p-4 border-t border-gray-200 h-[200px] space-y-3">
        {/* Gem title and cut */}
        <div className="basis-1/3">
          <h3 className="font-medium leading-tight line-clamp-2">{gem_type}</h3>
          <p className="text-xs">{cut}</p>
        </div>
        {/* Dimensions and item number */}
        <div className="basis-1/3">
          <p className="text-xs text-muted-foreground">
            {dimensions.width} mm x {dimensions.height} mm
          </p>
          <p className="text-xs text-muted-foreground">{size_carats}</p>
          <p className="text-xs text-muted-foreground">Item # {item_num}</p>
        </div>
        {/* Price and add to cart button */}
        <div className="basis-1/3 flex items-center justify-between">
          <p className="text-xl font-bold text-violet-800">${price}</p>
          <ShinyButton>Add to Cart</ShinyButton>
        </div>
      </div>
    </div>
  );
}
