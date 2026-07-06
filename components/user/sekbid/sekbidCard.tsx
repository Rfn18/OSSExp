export function PeopleCard({
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
          className={`font-outfit text-sm sm:text-base font-semibold text-gray-900 tracking-wide leading-snug`}
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

export function ProkerCard({
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
      <div className="shrink-0 h-9 w-9 rounded-lg bg-primary-blue flex items-center justify-center text-white text-sm font-bold">
        {index}
      </div>
      <div>
        <h5
          className={`font-outfit font-semibold text-gray-900 text-base leading-snug`}
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

export function SekbidHeader({
  sekbid,
  description,
}: {
  sekbid: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-2 mb-12">
      <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase rounded-full px-4">
        OSIS
      </span>
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
        {sekbid}
      </h1>
      <p className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function SekbidWelcoming({
  message,
  role,
  name,
}: {
  message: string[];
  role: string;
  name: string;
}) {
  return (
    <section className="flex flex-col items-center gap-5 max-w-2xl mx-auto">
      <div className="text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          Pesan &amp; Harapan
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
          Kata Sambutan
        </h2>
      </div>

      <h3 className="font-bold text-xl text-gray-800">Halo Sobat Bhakta!</h3>

      <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed text-justify">
        {message.map((msg, i) => (
          <p key={i} className="indent-8">
            {msg}
          </p>
        ))}
      </div>

      <div className="self-end flex items-center gap-3 mt-2">
        <div className="h-px w-8 bg-gray-300" />
        <p className="italic text-sm text-gray-500">
          {role},{" "}
          <span className="font-semibold not-italic text-gray-700">{name}</span>
        </p>
      </div>
    </section>
  );
}
