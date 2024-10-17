import { Gems } from "./components/gems";
import { Metadata } from "next";
import { Separator } from "../components/ui/separator";
import { Sidebar } from "../components/ui/sidebar";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../components/ui/tabs";

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
                  <Gems />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
