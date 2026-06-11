export default function OSS67Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <div>
        <img
          src="/images/foto-osis.JPG"
          alt="OSS67 Banner"
          className="w-max-60 w-250 h-100 object-center object-cover rounded-xl mb-6"
        />
        <div className="flex flex-col justify-center items-center mt-4">
          <h3 className="text-5xl font-bold">We Are OSSBHAKTA67</h3>
          <p className="text-center text-lg mt-4">
            Organisasi Siswa Intra Sekolah <br /> SMK Kesehatan Bhakti Wiyata
            dan SMK TI Pelita Nusantara.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 px-8 sm:px-16 md:px-32 mt-8 my-2 w-full">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <section className="px-6 sm:px-12 md:px-20 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group rounded-2xl border border-border bg-white p-7 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-2">Visi Kami</h3>
            <p className="text-sm opacity-75 leading-relaxed">
              Mewujudkan OSSBHAKTA67 sebagai organisasi yang inovatif, inklusif,
              dan berdampak bagi seluruh civitas sekolah.
            </p>
          </div>
          <div className="group rounded-2xl border border-border bg-white p-7  hover:shadow-md transition-shadow duration-300">
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
                  <span className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center mt-10 min-h-screen bg-linear-to-br from-[#003399] to-[#243061] text-white p-8">
        <h3 className="text-3xl font-bold my-6 mb-6 text-white">
          Struktur Organisasi
        </h3>
        <div className="group relative inline-block cursor-pointer overflow-hidden rounded-xl">
          <h3 className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-white transition-all duration-700 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-sm">
            BPH
          </h3>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100" />
          <img
            src="/images/foto-osis.JPG"
            alt="OSS67 Activities"
            className="h-60 w-[720px] object-cover object-center grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute bottom-4 left-6 z-20 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <h4 className="text-2xl font-bold text-white">
              Badan Pengurus Harian
            </h4>
            <p className="text-sm text-white/80">Penggerak utama organisasi</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 px-20 mt-6">
          <div className="group relative inline-block cursor-pointer overflow-hidden rounded-xl">
            <h3 className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-white transition-all duration-700 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-sm">
              BPH
            </h3>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100" />
            <img
              src="/images/foto-osis.JPG"
              alt="OSS67 Activities"
              className="h-60 w-[720px] object-cover object-center grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute bottom-4 left-6 z-20 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
              <h4 className="text-2xl font-bold text-white">
                Badan Pengurus Harian
              </h4>
              <p className="text-sm text-white/80">
                Penggerak utama organisasi
              </p>
            </div>
          </div>
          <div className="group relative inline-block cursor-pointer overflow-hidden rounded-xl">
            <h3 className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-white transition-all duration-700 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-sm">
              BPH
            </h3>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100" />
            <img
              src="/images/foto-osis.JPG"
              alt="OSS67 Activities"
              className="h-60 w-[720px] object-cover object-center grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute bottom-4 left-6 z-20 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
              <h4 className="text-2xl font-bold text-white">
                Badan Pengurus Harian
              </h4>
              <p className="text-sm text-white/80">
                Penggerak utama organisasi
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
