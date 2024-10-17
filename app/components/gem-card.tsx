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
        "min-w-[250px] rounded-lg border border-gray-200 group hover:border-gray-300 hover:shadow-md transition-all duration-1000 bg-zinc-100 hover:bg-zinc-50 relative",
        className
      )}
    >
      <FlickeringGrid width={250} height={250} />
      {/* <div className="flex justify-center"> */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <Image
          src={small_img}
          alt={gem_type}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-auto object-cover transition-all duration-500 group-hover:scale-150 scale-125 aspect-square"
        />
      </div>
      <div className="space-y-1 text-sm flex flex-col justify-between p-4">
        <div>
          <h3 className="font-medium leading-tight line-clamp-2">{gem_type}</h3>
          <p className="text-xs text-muted-foreground">{cut}</p>
        </div>
        <div>
          <div>
            <p className="text-xs text-muted-foreground">
              {dimensions.width} mm x {dimensions.height} mm
            </p>
            <p className="text-xs text-muted-foreground">{size_carats}</p>
          </div>
          <p className="text-sm font-medium">Item # {item_num}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">${price}</p>
          <ShinyButton>Add to Cart</ShinyButton>
        </div>
      </div>
    </div>
  );
}
