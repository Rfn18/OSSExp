import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardEvent } from "@/components/card-event";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-full  flex flex-1 items-center justify-between font-sans dark:bg-black px-20">
        <div className="flex flex-col gap-8 max-w-xl">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Mudah lihat dan <br /> cari{" "}
              <span className="relative inline-block">
                <span className="absolute bottom-2 left-0 -z-10 h-4 w-full -rotate-1  bg-yellow-400"></span>
                dokumentasi
              </span>
              <br />
              event OSIS
            </h1>
            <h2 className="text-lg lg:text-xl opacity-50">
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
      <div className="w-full min-h-screen flex flex-1 items-center justify-between font-sans dark:bg-black px-20">
        <div className="flex flex-col gap-8 max-w-xl">
          <p className="font-light text-primary-blue">SEKILAS TENTANG OSIS</p>
          <h1 className="text-4xl font-bold leading-tight">
            OSS67, Terampil Mandiri <br />
            <span className="relative inline-block">
              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1  bg-yellow-400"></span>
              Bersahaja
            </span>
          </h1>
          <p className="text-base font-normal leading-relaxed max-w-prose">
            Organisasi Siswa Intra Sekolah (OSIS) adalah wadah resmi bagi siswa
            untuk berorganisasi, berkreasi, dan menyelenggarakan kegiatan yang
            memperkaya pengalaman belajar di sekolah. seluruh program kerja OSIS
            menjadi lebih transparan dan mudah diikuti.
          </p>
          <div className="flex items-center gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gradient">8</h3>
              <p className="opacity-50">Seksi Bidang</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gradient">30</h3>
              <p className="opacity-50">Pengurus</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gradient">2020</h3>
              <p className="opacity-50">Tahun Berdiri</p>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-xl flex flex-col gap-4">
          <div className="flex items-center gap-6 border border-border rounded-3xl p-6">
            <div className="bg-primary-blue/10 rounded-2xl p-4">
              <svg
                width="44"
                height="41"
                viewBox="0 0 44 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  width="43.118"
                  height="40.1999"
                  rx="20"
                  fill="url(#pattern0_2030_48)"
                />
                <defs>
                  <pattern
                    id="pattern0_2030_48"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_2030_48"
                      transform="matrix(0.0103591 0 0 0.0111111 0.0338395 0)"
                    />
                  </pattern>
                  <image
                    id="image0_2030_48"
                    width="90"
                    height="90"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl">Visi</h3>
              <p className="opacity-50 text-md">
                Mewujudkan OSIS sebagai organisasi yang aktif aktif, disiplin,
                dan adaptif....
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 border border-border rounded-3xl p-6">
            <div className="bg-alert/10 rounded-2xl p-4">
              <svg
                width="45"
                height="53"
                viewBox="0 0 45 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="45" height="53" fill="url(#pattern0_2030_101)" />
                <defs>
                  <pattern
                    id="pattern0_2030_101"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_2030_101"
                      transform="matrix(0.0111111 0 0 0.00943396 0 0.0754717)"
                    />
                  </pattern>
                  <image
                    id="image0_2030_101"
                    width="90"
                    height="90"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl">Misi 1</h3>
              <p className="opacity-50 text-md">
                Menggunakan teknologi yang relevan di era digital.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 border border-border rounded-3xl p-6">
            <div className="bg-primary-blue/10 rounded-2xl p-4">
              <svg
                width="45"
                height="53"
                viewBox="0 0 45 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="45" height="53" fill="url(#pattern0_2030_81)" />
                <defs>
                  <pattern
                    id="pattern0_2030_81"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_2030_81"
                      transform="matrix(0.0111111 0 0 0.00943396 0 0.0754717)"
                    />
                  </pattern>
                  <image
                    id="image0_2030_81"
                    width="90"
                    height="90"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl">Misi 2</h3>
              <p className="opacity-50 text-md">
                Menciptakan budaya disiplin dimulai dari pengurus OSIS itu
                sendiri.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col gap-8 font-sans dark:bg-black px-20">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Event Hightlight</h1>
          <p className="flex items-center gap-2 text-primary-blue">
            Lihat Semua Event <MoveRight />
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
        </div>
      </div>
      <div className="w-full h-auto gap-8 dark:bg-black px-20 mt-20">
        <div className="w-full h-full flex flex-col items-center justify-between bg-[#F1F2F3] rounded-3xl p-10 gap-6">
          <div className="flex flex-col items-center gap-4">
            <p className="opacity-50 text-sm">Pesan Ketua OSIS</p>
            <img
              src="https://avatar.vercel.sh/shadcn1"
              alt="Ketua OSIS"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <h3 className="text-center text-md font-medium max-w-xl">
            Saya berharap OSIS Bhakti Wiyata & TI Pelita Nusantara dapat
            mengerjakan seluruh visi misi dari OSIS yang sudah di buat diawal
            dengan efisien dan objektif.
          </h3>
          <div className="text-center">
            <p className="font-bold text-lg">Fasterino Rafael V.</p>
            <p className="opacity-50 text-sm">Ketua OSIS Periode 2025-2026</p>
          </div>
        </div>
      </div>
      
    </>
  );
}
