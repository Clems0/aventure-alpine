import Image from "next/image";

export function GamePreview() {
  return (
    <div className="flex-1 relative overflow-hidden">
      <Image
        src="/montagne.webp"
        alt="Game Preview"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent flex flex-col justify-end p-12">
        <div className="relative">
          <div className="absolute -left-8 w-1 h-16 bg-sky-400" />
          <h2 className="text-white text-3xl font-bold mb-4">
            Survivre à l&apos;apocalypse des zombies
          </h2>
          <p className="text-gray-200 max-w-2xl">
            Dans le{" "}
            <span className="text-sky-400 font-semibold">Contagion</span>, pour
            gagner vous devez survivre pendant 15 minutes aux vagues de zombies
            tout en évitant de se faire contaminer
          </p>
        </div>
      </div>
    </div>
  );
}
