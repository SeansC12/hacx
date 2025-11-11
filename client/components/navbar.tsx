import Image from "next/image";
import SpfLogo from "@/public/spf-logo.png";
import { MessageSquareWarningIcon } from "lucide-react";
import bannerSvg from "@/public/homepage/brand-isolated.svg";

export default function NavBar() {
  return (
    // Make Image scale to fit within the navbar height
    <div className="flex h-32 w-full items-center justify-center shadow-md">
      <div className="flex w-full max-w-[1200px] items-center py-2 min-[670px]:px-8 lg:px-4">
        <Image
          src={SpfLogo}
          alt="SPF Logo"
          className="h-28 w-56 object-contain"
        />
        <div className="text-blue-primary flex grow items-center justify-center gap-4 text-3xl font-bold">
          Woodleigh Neighbourhood Police Post
          <Image src={bannerSvg} alt="Woodleigh NPP Logo" className="h-48" />
          {/* <MessageSquareWarningIcon className="w-8 h-8 text-gray-600 mr-2" />
          <div className="font-bold text-gray-600 text-xl">
            This is an unmanned kiosk. Learn more.
          </div> */}
        </div>
      </div>
    </div>
  );
}
