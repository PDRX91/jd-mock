import gemsData from "../app/gems.json";

import { GemCard } from "./gem-card";

export const Gems = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
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
  );
};
