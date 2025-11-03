import Image from "next/image";
import bannerSvg from "@/public/homepage/brand-isolated.svg";

export default function Banner() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-primary to-blue-secondary flex items-center justify-between px-72">
      <h1 className="text-7xl text-white font-extrabold">
        Woodleigh Neighbourhood Police Post
      </h1>
      <Image src={bannerSvg} alt="Woodleigh NPP Logo" />
    </div>
  );
}
