"use client";

import ButtonCard from "@/components/button-card";

import LostItemImage from "@/public/homepage/lost-item.jpg";
import TrafficMatterImage from "@/public/homepage/traffic-matters.png";
import LodgeReportImage from "@/public/homepage/lodge-report.webp";
import Banner from "@/components/banner";
import { MessageSquareWarningIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-full h-dvh">
      <Banner />
      <div className="flex flex-col items-center pt-10 gap-4">
        <p className="text-4xl font-semibold">
          Welcome to the Singapore Police Force Kiosk!
        </p>
        <h2>
          Please select an option below to continue:
        </h2>
      </div>
      <div className="flex-1 w-full flex items-center justify-between gap-4 px-16">
        <ButtonCard
          title="Traffic Matters"
          image={TrafficMatterImage}
          link={"/incident"}
          description="Report traffic-related incidents or violations."
        />
        <ButtonCard
          title="Lost Items"
          image={LostItemImage}
          link={"/lost-items"}
          description="Report or search for lost items."
        /> 
        <ButtonCard
          title="Lodge a Report"
          image={LodgeReportImage}
          link={"/report"}
          description="Lodge a general police report."
        />
      </div>
      <div className="py-10">

      </div>
    </div>
  );
}
