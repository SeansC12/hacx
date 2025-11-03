import Image from "next/image";
import SpfLogo from "@/public/spf-logo.png";

export default function NavBar() {
  return (
    // Make Image scale to fit within the navbar height
    <div className="w-full h-32 px-72 flex items-center">
      <Image
        src={SpfLogo}
        alt="SPF Logo"
        className="h-28 w-56 object-contain"
      />
      <div className="font-bold text-xl">
        This is an unmanned kiosk. Learn more.
      </div>
    </div>
  );
}
