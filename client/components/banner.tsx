import { ArrowRight } from "lucide-react";
import { MessageCircleWarning } from "lucide-react";

export default function Banner() {
  return (
    <div className="from-blue-dark to-blue-dark flex h-24 w-full items-center justify-start gap-10 bg-gradient-to-r px-10 py-3 shadow-md">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-white">
          <MessageCircleWarning className="mr-2 inline-block h-8 w-8" />
          This is a 24/7 unmanned kiosk.
        </p>
      </div>
      <button className="h-max bg-white/10 p-3 text-lg font-bold text-white">
        Learn more
        <ArrowRight className="ml-2 inline-block h-5 w-5" />
      </button>
      {/* <Image
        src={bannerSvg}
        alt="Woodleigh NPP Logo"
        className="h-20 max-h-20"
      /> */}
    </div>
  );
}
