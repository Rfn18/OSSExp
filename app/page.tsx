import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-between font-sans dark:bg-black px-20">
      <div className="flex flex-col gap-8 max-w-lg">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-bold">
            Mudah lihat dan <br /> cari dokumentasi event OSIS
          </h1>
          <h2 className="text-xl opacity-50">
            Cari dokumentasi terbaru dan terbaik dari event organisasi kami,
            kepoin kami juga. Don’t Forget To Remindss.
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-gradient text-lg text-white font-bold flex items-center gap-2 rounded-full px-6 h-12">
            Explore Event <MoveRight size={24} strokeWidth={3} />
          </Button>
          <Button className="text-lg bg-transparent text-foreground border border-foreground font-bold flex items-center gap-2 rounded-full px-6 h-12 ml-4">
            Tentang OSIS
          </Button>
        </div>
      </div>
      <div className="relative w-full max-w-lg">
        <img
          src="https://picsum.photos/seed/picsum/530/300"
          alt="Hero Image"
          className="relative w-full max-w-md mt-8 rounded-3xl z-1 shadow-lg ml-6 -rotate-6"
        />
        <img
          src="https://picsum.photos/seed/picsum/530/300"
          alt="Hero Image"
          className="relative w-full max-w-md rounded-3xl z-10 shadow-lg mt-0"
        />
      </div>
    </div>
  );
}
