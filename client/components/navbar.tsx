import Image from "next/image";
import SpfLogo from "@/public/spf-logo.png";
import { MessageSquareWarningIcon } from "lucide-react";

export default function NavBar() {
  return (
    // Make Image scale to fit within the navbar height
    <div className="w-full h-32 flex items-center justify-center shadow-md">
      <div className="flex items-center w-full max-w-[1200px] min-[670px]:px-8 lg:px-0 py-2">
        <Image
          src={SpfLogo}
          alt="SPF Logo"
          className="h-28 w-56 object-contain"
        />
        <div className="flex-1"/>
        <div className="flex items-center">
          <MessageSquareWarningIcon className="w-8 h-8 text-gray-600 mr-2" />
          <div className="font-bold text-lg text-gray-600">
            This is an unmanned kiosk. If you are in need of immediate assistance, please call 999.
          </div>
        </div>
      </div>
    </div>
  );
}
