import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function Divider() {
  return (
    <div className="flex items-center gap-3 w-full my-8">
      <div className="flex-1 h-px bg-gray-200" />
      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function PeopleCard({
  img,
  name,
  role,
}: {
  img: string;
  name: string;
  role: string;
}) {
  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="relative overflow-hidden rounded-2xl w-full aspect-square ring-1 ring-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h2
          className={`${outfit.className} text-sm sm:text-base font-semibold text-gray-900 tracking-wide leading-snug`}
        >
          {name}
        </h2>
        <span className="inline-block mt-1 text-xs font-medium text-blue-500 rounded-full px-2.5 py-0.5">
          {role}
        </span>
      </div>
    </div>
  );
}

function ProkerCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-border bg-white p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-primary-blue flex items-center justify-center text-white text-sm font-bold">
        {index}
      </div>
      <div>
        <h5
          className={`${outfit.className} font-semibold text-gray-900 text-base leading-snug`}
        >
          {title}
        </h5>
        <p className="mt-1 text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SekbidPage() {
  const members = [
    {
      img: "https://avatar.vercel.sh/shadcn1",
      name: "Fasterino Rafael V.",
      role: "Ketua OSIS",
    },
    {
      img: "https://avatar.vercel.sh/shadcn2",
      name: "Fasterino Rafael V.",
      role: "Wakil Ketua",
    },
    {
      img: "https://avatar.vercel.sh/shadcn3",
      name: "Fasterino Rafael V.",
      role: "Sekretaris",
    },
    {
      img: "https://avatar.vercel.sh/shadcn4",
      name: "Fasterino Rafael V.",
      role: "Bendahara",
    },
    {
      img: "https://avatar.vercel.sh/shadcn5",
      name: "Fasterino Rafael V.",
      role: "Koordinator",
    },
    {
      img: "https://avatar.vercel.sh/shadcn6",
      name: "Fasterino Rafael V.",
      role: "Anggota",
    },
  ];

  const proker = [
    {
      title: "Go!Go!Go! OSS67",
      description:
        "Classmeeting yang semua perlombaannya adalah olahraga yang bertujuan untuk mengasah bakat dan minat warga SMK Bhakta dalam bidang olahraga.",
    },
    {
      title: "Go!Go!Go! OSS67",
      description:
        "Classmeeting yang semua perlombaannya adalah olahraga yang bertujuan untuk mengasah bakat dan minat warga SMK Bhakta dalam bidang olahraga.",
    },
    {
      title: "Go!Go!Go! OSS67",
      description:
        "Classmeeting yang semua perlombaannya adalah olahraga yang bertujuan untuk mengasah bakat dan minat warga SMK Bhakta dalam bidang olahraga.",
    },
  ];

  return (
    <div className={`${outfit.className} min-h-screen bg-white`}>
      <div className="max-w-full px-5 pt-2 sm:px-8 md:px-12 py-14">
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase rounded-full px-4">
            OSIS
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
            BPH
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed">
            Badan Pengurus Harian Internal OSIS SMK Bhakti Wiyata &amp; SMK TI
            Pelita Nusantara Kediri
          </p>
        </div>

        {/* ── MEMBERS GRID ── */}
        <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {members.map((m, i) => (
            <PeopleCard key={i} img={m.img} name={m.name} role={m.role} />
          ))}
        </section>

        <Divider />

        <section className="flex flex-col items-center gap-5 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Pesan &amp; Harapan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              Kata Sambutan
            </h2>
          </div>

          <h3 className="font-bold text-xl text-gray-800">
            Halo Sobat Bhakta!
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed text-justify">
            <p className="indent-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              molestiae accusamus incidunt cumque, expedita explicabo enim
              temporibus rerum, iure nostrum, autem voluptas earum saepe
              distinctio sit nobis? Ipsam, officia obcaecati distinctio
              consequatur placeat numquam soluta ipsa repellat in rem vero earum
              architecto dicta! Ipsa molestias harum, rerum quia reiciendis
              doloremque eveniet unde nemo possimus nostrum cupiditate non
              asperiores blanditiis eligendi.
            </p>
            <p className="indent-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              molestiae accusamus incidunt cumque, expedita explicabo enim
              temporibus rerum, iure nostrum, autem voluptas earum saepe
              distinctio sit nobis? Ipsam, officia obcaecati distinctio
              consequatur placeat numquam soluta ipsa repellat in rem vero earum
              architecto dicta! Ipsa molestias harum, rerum quia reiciendis
              doloremque eveniet unde nemo possimus nostrum cupiditate non
              asperiores blanditiis eligendi.
            </p>
            <p className="indent-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              molestiae accusamus incidunt cumque, expedita explicabo enim
              temporibus rerum, iure nostrum, autem voluptas earum saepe
              distinctio sit nobis? Ipsam, officia obcaecati distinctio
              consequatur placeat numquam soluta ipsa repellat in rem vero earum
              architecto dicta! Ipsa molestias harum, rerum quia reiciendis
              doloremque eveniet unde nemo possimus nostrum cupiditate non
              asperiores blanditiis eligendi.
            </p>
          </div>

          <div className="self-end flex items-center gap-3 mt-2">
            <div className="h-px w-8 bg-gray-300" />
            <p className="italic text-sm text-gray-500">
              Ketua OSIS,{" "}
              <span className="font-semibold not-italic text-gray-700">
                Fasterino Rafael V.
              </span>
            </p>
          </div>
        </section>

        <Divider />

        <section className="flex flex-col items-center gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Agenda
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              Program Kerja
            </h2>
          </div>

          <div className="w-full flex flex-col gap-3">
            {proker.map((p, i) => (
              <ProkerCard
                key={i}
                index={i + 1}
                title={p.title}
                description={p.description}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
