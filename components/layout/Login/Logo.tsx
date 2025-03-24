import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2 mb-12">
      <Image
        src="/logo.png"
        alt="Aventure-alpine"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="text-white text-xl font-semibold">Aventure-alpine</span>
    </div>
  );
}
