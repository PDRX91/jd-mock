import Image from "next/image";
// import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

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
    <div className={cn("w-[200px] space-y-3", className)}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={small_img}
          alt={gem_type}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-auto object-cover transition-all hover:scale-110 aspect-square"
        />
      </div>
      <div className="space-y-1 text-sm h-[80px] flex flex-col justify-between">
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
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">${price}</p>
        <button className="text-xs text-blue-500 hover:underline">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
