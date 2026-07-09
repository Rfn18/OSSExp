import { Divider } from "@/components/ui/divider";
import { FadeInSection } from "@/lib/fadeInSection";

export default function OSS67Page() {
  const bphMembers = [
    {
      initial: "Sekbid 1",
      standFor: "Divisi Iman & Taqwa",
      desc: "Membina keimanan dan ketakwaan siswa",
      img: "/images/foto-osis.JPG",
    },
    {
      initial: "Sekbid 2",
      standFor: "Divisi Tata Tertib",
      desc: "Mengawasi kedisiplinan dan tata tertib sekolah",
      img: "/images/foto-osis.JPG",
    },
    {
      initial: "Sekbid 3",
      standFor: "Divisi Kepribadian & Berbudi Pekerti Luhur",
      desc: "Membentuk karakter dan budi pekerti siswa",
      img: "/images/foto-osis.JPG",
    },
    {
      initial: "Sekbid 4",
      standFor: "Divisi Apresiasi Seni & Budaya",
      desc: "Mengembangkan bakat seni dan budaya siswa",
      img: "/images/foto-osis.JPG",
    },
    {
      initial: "Sekbid 5",
      standFor: "Divisi Teknologi Informasi",
      desc: "Meningkatkan literasi digital dan inovasi siswa",
      img: "/images/foto-osis.JPG",
    },
    {
      initial: "Sekbid 6",
      standFor: "Divisi Apresiasi Olahraga & Kesehatan",
      desc: "Membina minat olahraga dan gaya hidup sehat",
      img: "/images/foto-osis.JPG",
    },
    {
      initial: "Sekbid 7",
      standFor: "Divisi Analisis & Wawasan Politik",
      desc: "Melatih wawasan dan berpikir kritis politik",
      img: "/images/foto-osis.JPG",
    },
    {
      initial: "Sekbid 8",
      standFor: "Divisi Hubungan Masyarakat",
      desc: "Membangun komunikasi dan relasi antar warga sekolah",
      img: "/images/foto-osis.JPG",
    },
  ];
  return (
    <div className="w-full font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 pt-0">
        <section className="w-full flex flex-col items-center px-6 sm:px-12 md:px-20 pt-4">
          <div className="w-full max-w-4xl">
            <img
              src="/images/foto-osis.JPG"
              alt="OSS67 Banner"
              className="w-full h-56 sm:h-72 md:h-96 object-cover object-center rounded-2xl sm:rounded-3xl"
            />
          </div>

          <div className="flex flex-col justify-center items-center text-center mt-6 sm:mt-8 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              We Are OSSBHAKTA67
            </h3>
            <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-muted-foreground leading-relaxed">
              Organisasi Siswa Intra Sekolah <br className="hidden sm:block" />
              SMK Kesehatan Bhakti Wiyata dan SMK TI Pelita Nusantara.
            </p>
          </div>
          <Divider />
        </section>
        <section className="px-6 sm:px-12 md:px-20 py-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group rounded-2xl border border-border bg-white p-7 0">
              <h3 className="text-xl font-bold mb-2">Visi Kami</h3>
              <p className="text-sm opacity-75 leading-relaxed">
                Mewujudkan OSSBHAKTA67 sebagai organisasi yang inovatif,
                inklusif, dan berdampak bagi seluruh civitas sekolah.
              </p>
            </div>
            <div className="group rounded-2xl border border-border bg-white p-7 ">
              <h3 className="text-xl font-bold mb-3">Misi Kami</h3>
              <ul className="space-y-2.5">
                {[
                  "Mendorong partisipasi aktif siswa dalam kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat mereka.",
                  "Menyelenggarakan berbagai kegiatan yang mendukung pengembangan karakter, kepemimpinan, dan keterampilan sosial siswa.",
                  "Membangun lingkungan yang inklusif dan mendukung bagi semua siswa untuk berkontribusi dan berkembang.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm opacity-75 leading-relaxed"
                  >
                    <span className="mt-1 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <section className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-[#003399] to-[#243061] text-white p-8">
        <span className="hidden md:block absolute z-10 -translate-x-120 -translate-y-114 animate-floating">
          <span className="block bg-gradient border-2 border-blue-600 p-2 -rotate-14 rounded-2xl">
            <img
              src="/images/logo.svg"
              alt="oss"
              className="w-[80px] h-[80px] object-cover object-center select-none"
            />
          </span>
        </span>
        <span className="hidden md:block absolute z-10 translate-x-120 -translate-y-132  animate-floating">
          <span className="block bg-gradient border-2 border-blue-600 p-2 rotate-14 rounded-2xl">
            <img
              src="/images/smk.svg"
              alt="oss"
              className="w-[120px] h-[60px] object-cover object-center select-none"
            />
          </span>
        </span>
        <h3 className="text-3xl font-bold my-6 mb-10 text-white">
          Struktur Organisasi
        </h3>
        <div className="group relative inline-block cursor-pointer overflow-hidden rounded-xl">
          <h3 className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-black text-white transition-all duration-700 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-sm">
            BPH
          </h3>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100" />
          <img
            src="/images/foto-osis.JPG"
            alt="OSS67 Activities"
            className="h-60 w-[720px] object-cover object-center grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute bottom-4 left-6 z-20 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white select-none">
              Badan Pengurus Harian
            </h4>
            <p className="text-sm text-white/80 select-none">
              Penggerak utama organisasi
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:px-4 lg:px-20 mt-6">
          {bphMembers.map((member, i) => (
            <FadeInSection
              delay={i * 100}
              className="group relative inline-block cursor-pointer overflow-hidden rounded-xl"
            >
              <h3 className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl text-center font-black text-white transition-all duration-700 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-sm select-none">
                {member.initial}
              </h3>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 select-none" />
              <img
                src={member.img}
                alt="OSS67 Activities"
                className="h-60 w-[720px] object-cover object-center grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 select-none"
              />
              <div className="absolute bottom-4 left-6 z-20 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 select-none">
                <h4 className="text-lg md:text-xl font-bold text-white">
                  {member.standFor}
                </h4>
                <p className="text-xs md:text-sm text-white/80 select-none">
                  {member.desc}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>
    </div>
  );
}
