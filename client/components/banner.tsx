import Image from "next/image";
import bannerSvg from "@/public/homepage/brand-isolated.svg";

export default function Banner() {
  return (
    <div className="w-full h-48 bg-gradient-to-r from-blue-primary to-blue-secondary flex items-center justify-between px-10 shadow-md">
      <div className="text-white flex flex-col gap-4">
        <h1 className="text-7xl  font-extrabold">
          Woodleigh Neighbourhood Police Post
        </h1>
        <h2 className="text-2xl">
          Please select an option below to continue.
        </h2>
      </div>
      <div className="flex-1"/>
      <Image src={bannerSvg} alt="Woodleigh NPP Logo" className="h-48" />
    </div>
  );
}
