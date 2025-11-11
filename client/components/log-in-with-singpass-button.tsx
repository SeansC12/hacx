"use client";

import Image from "next/image";
import singpassImg from "@/public/retrieve-info-w-singpass.png";
import * as React from "react";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function LogInWithSingpassButton({
  onClick,
  className = "",
}: Props) {
  return (
    <div>
      <Image
        src={singpassImg}
        alt="Log in with Singpass"
        className={className + " w-64"}
        onClick={onClick}
      />
    </div>
  );
}
