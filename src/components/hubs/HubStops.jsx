import React from "react";

import { useLanguage } from "@/context/LanguageContext";

import SectionHead from "../Layouts/SectionHead";
import HubCard from "@/components/hubs/HubCard";


const HubStops = ({ hubs = [] }) => {
  const { t } = useLanguage();

  if (!hubs.length) return null;

  const max = Math.max(...hubs.map((hub) => hub.n), 1);

  return (
    <section aria-labelledby="hubs" className="mt-20">
      
      <SectionHead
        id="hubs"
        eyebrow={t("Dhaka transit network")}
        title={t("Where the city connects.")}
        subtitle={t(
          "Explore Dhaka's busiest interchange points and discover the bus services connecting different parts of the city."
        )}
        href="#all-buses"
        hrefLabel={t("Explore all routes")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {hubs.map((hub, index) => (
          <HubCard key={hub.key} hub={hub} index={index} max={max} />
        ))}
      </div>
    </section>
  );
};

export default HubStops;