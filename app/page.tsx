import { Metadata } from "next";
// import Image from "next/image";
// import { PlusCircledIcon } from "@radix-ui/react-icons";

// import { Button } from "../components/ui/button";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../components/ui/tabs";

import { GemCard } from "./components/gem-card";
import { Sidebar } from "../components/ui/sidebar";
import gemsData from "./gems.json";

export const metadata: Metadata = {
  title: "Gem Store",
  description: "Example gem store using the components.",
};

export default function GemStorePage() {
  return (
    <div className="md:block">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      All Gems
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Explore our collection of precious gems.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <ScrollArea>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {gemsData.map((gem) => (
                        <GemCard
                          key={gem.item_num}
                          gem_type={gem.gem_type}
                          cut={gem.cut || ""}
                          small_img={gem.small_img}
                          item_num={gem.item_num}
                          price={gem.price}
                          size_carats={gem.size_carats}
                          dimensions={{
                            width: parseFloat(gem.dimensions.width),
                            height: parseFloat(gem.dimensions.height),
                          }}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
