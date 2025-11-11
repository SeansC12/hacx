import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface ButtonCardProps {
  title: string;
  image: StaticImageData | React.ComponentType<{ className?: string }>;
  link: string;
  description?: string;
}

export default function ButtonCard({
  title,
  image,
  link,
  description,
}: ButtonCardProps) {
  const isComponent = typeof image === "function";

  return (
    <Link href={link} className="group block flex-1 cursor-pointer">
      <div className="bg-blue-dark relative flex h-[30rem] flex-col overflow-hidden transition-all duration-300">
        <div className="flex flex-1 flex-col items-center justify-center gap-20 p-8">
          <div className="relative aspect-square h-48">
            <Image
              src={image as StaticImageData}
              alt={title}
              className="h-full w-full object-contain transition-all group-hover:scale-[1.08]"
            />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
