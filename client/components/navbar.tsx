import Image from "next/image";
import bannerSvg from "@/public/homepage/brand-isolated.svg";

export default function NavBar() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-primary to-blue-dark flex items-center justify-between px-72">
      <h1 className="text-7xl text-white font-extrabold ">
        Woodleigh Neighbourhood Police Post
      </h1>
      <Image src={bannerSvg} alt="Woodleigh NPP Logo" />
    </div>
  );
}
