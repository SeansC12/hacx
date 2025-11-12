"use client";

import ButtonCard from "@/components/button-card";

import reportImage from "@/public/homepage/edit.svg";
import CarsCrash from "@/public/homepage/cars-crash.svg";
import Image from "next/image";
import SpfLogo from "@/public/spf-logo.png";
import backgroundImage from "@/public/homepage/Police-patrolling.jpg";

export default function Home() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-28 overflow-hidden">
      {/* Subtle pattern overlay */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url('${crestImage.src}')`,
        }}
      ></div> */}

      <div className="z-10 flex flex-col items-center justify-center gap-5">
        <Image
          src={SpfLogo}
          alt="SPF Logo"
          height={150}
          className="object-contain"
        />
        <div className="text-blue-dark text-5xl font-extrabold">
          Woodleigh Neighbourhood Police Post
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-4 px-10">
        <ButtonCard
          title="Lodge a report"
          image={reportImage}
          link={"/incident"}
          description="Report traffic-related incidents."
        />
        <ButtonCard
          title="Traffic Matters"
          image={CarsCrash}
          link={"/incident"}
          description="Lodge a general police report."
        />
      </div>
      <Image
        src={backgroundImage}
        alt="background-image"
        className="absolute -z-10 h-full w-full object-cover opacity-10"
      />
    </div>
  );
}
