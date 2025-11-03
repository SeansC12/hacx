import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface ButtonCardProps {
  title: string;
  image: StaticImageData;
  link: string;
}

export default function ButtonCard({ title, image, link }: ButtonCardProps) {
  return (
    <Link href={link} className="flex-1 w-full block group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
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
