"use client";

import ButtonCard from "@/components/button-card";

import LostItemImage from "@/public/homepage/lost-item.jpg";
import TrafficMatterImage from "@/public/homepage/traffic-matters.png";
import LodgeReportImage from "@/public/homepage/lodge-report.webp";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <Banner />
      <div className="max-w-5xl w-full flex">
        <ButtonCard
          title="Traffic Matters"
          image={TrafficMatterImage}
          link={"/incident"}
        />
        <ButtonCard
          title="Lost Items"
          image={LostItemImage}
          link={"/lost-items"}
        />
        <ButtonCard
          title="Lodge a Report"
          image={LodgeReportImage}
          link={"/report"}
        />
      </div>
    </div>
  );
}
