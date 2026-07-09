import { Divider } from "@/components/ui/divider";
import {
  PeopleCard,
  ProkerCard,
  SekbidHeader,
  SekbidWelcoming,
} from "@/components/user/sekbid/sekbidCard";

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

  const message = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque molestias accusamus incidunt cumque, expedita explicabo enim temporibus rerum, iure nostrum, autem voluptas earum saepe distinctio sit nobis? Ipsam, officia obcaecati distinctio consequatur placeat numquam soluta ipsa repellat in rem vero earum architecto dicta! Ipsa molestias harum, rerum quia reiciendis doloremque eveniet unde nemo possimus nostrum cupiditate non asperiores blanditiis eligendi.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque molestias accusamus incidunt cumque, expedita explicabo enim temporibus rerum, iure nostrum, autem voluptas earum saepe distinctio sit nobis? Ipsam, officia obcaecati distinctio consequatur placeat numquam soluta ipsa repellat in rem vero earum architecto dicta! Ipsa molestias harum, rerum quia reiciendis doloremque eveniet unde nemo possimus nostrum cupiditate non asperiores blanditiis eligendi.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque molestias accusamus incidunt cumque, expedita explicabo enim temporibus rerum, iure nostrum, autem voluptas earum saepe distinctio sit nobis? Ipsam, officia obcaecati distinctio consequatur placeat numquam soluta ipsa repellat in rem vero earum architecto dicta! Ipsa molestias harum, rerum quia reiciendis doloremque eveniet unde nemo possimus nostrum cupiditate non asperiores blanditiis eligendi.",
  ];

  return (
    <div className="w-full font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 pt-4">
        <SekbidHeader
          sekbid="BPH"
          description="Badan Pengurus Harian Osis SMK Bhakti Wiyata & SMK Ti Pelita Nusantara"
        />

        <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {members.map((m, i) => (
            <PeopleCard key={i} img={m.img} name={m.name} role={m.role} />
          ))}
        </section>

        <div className="flex items-center justify-center w-full my-4">
          <Divider />
        </div>

        <SekbidWelcoming
          message={message}
          role="Ketua OSIS"
          name="Fasterino Rafael V."
        />

        <section className="flex flex-col items-center gap-6">
          <Divider />
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
