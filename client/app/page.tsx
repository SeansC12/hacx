"use client";

import ButtonCard from "@/components/button-card";
import { useState } from "react";
import reportImage from "@/public/homepage/edit.svg";
import CarsCrash from "@/public/homepage/cars-crash.svg";
import Image from "next/image";
import SpfLogo from "@/public/spf-logo.png";
import backgroundImage from "@/public/homepage/Police-patrolling.jpg";

export default function Home() {
  const [msg, setMsg] = useState("");

  async function sendValue(value: "0" | "1") {
    const res = await fetch("http://localhost:8080/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    const data = await res.json();
    console.log(data);
  }

  async function turnOff() {
    await fetch("/api/sendToArduino", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "0" }),
    });
  }
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
      <div className="flex flex-col items-center gap-6 w-full">
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
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => sendValue("1")}
              className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
            >
              Turn LED On
            </button>
            <button
              onClick={() => sendValue("0")}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
            >
              Turn LED Off
            </button>
          </div>
        </div>
      </div>
      <Image
        src={backgroundImage}
        alt="background-image"
        className="absolute -z-10 h-full w-full object-cover opacity-10"
      />
    </div>
  );
}
