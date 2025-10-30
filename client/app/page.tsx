"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PageContainer,
  MainContentContainer,
  BottomContentContainer,
} from "@/components/page-container";
import LostItemImage from "@/public/homepage/lost-item.jpg";
import TrafficMatterImage from "@/public/homepage/traffic-matters.png";
import LodgeReportImage from "@/public/homepage/lodge-report.webp";
import Image from "next/image";
import SpeakIndicator from "@/components/ui/SpeakIndicator";
import HeaderText from "@/components/header-text";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface ButtonCardProps {
  title: string;
  image: StaticImageData;
  link: string;
}

function ButtonCard({ title, image, link }: ButtonCardProps) {
  return (
    <Link href={link} className="flex-1 w-full block group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        {/* Top area used as visual pane with color tint */}
        <div className="relative h-60 w-full">
          <Image
            className="object-cover"
            src={image}
            alt={title}
            layout="fill"
          />
          <div
            className={`absolute inset-0 bg-blue-300/45 mix-blend-multiply`}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-blue-200 px-4 py-3 transition-colors duration-300 group-hover:bg-blue-800">
          <h2 className="text-lg font-medium text-gray-900 group-hover:text-white transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "ms" | "ta" | "zh">("en");

  const langLabels: Record<string, string> = {
    en: "English",
    ms: "Malay",
    ta: "Tamil",
    zh: "Mandarin",
  };

  return (
    <PageContainer>
      <MainContentContainer>
        <HeaderText>How May I Help You?</HeaderText>

        <div className="flex flex-row gap-5 w-full max-w-4xl px-3 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
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

        <SpeakIndicator />
      </MainContentContainer>

      <BottomContentContainer>
        <div className="w-full flex justify-center gap-3 p-3">
          {(["en", "ms", "ta", "zh"] as const).map((l) => (
            <Button
              key={l}
              onClick={() => setLang(l)}
              className={`cursor-pointer min-w-20 text-center ${
                lang === l
                  ? "border-none bg-blue-500 text-white"
                  : "border hover:bg-blue-200 border-black/12 bg-transparent text-gray-900"
              }`}
              aria-pressed={lang === l}
              title={langLabels[l]}
            >
              {langLabels[l]}
              <br />
            </Button>
          ))}
        </div>
      </BottomContentContainer>
    </PageContainer>
  );
}
