export default function DocGrid() {
  return (
    <div className="w-full h-full mt-4">
      <h4 className="font-bold text-xl">Apel Pembukaan</h4>
      <p className="text-sm opacity-50">Pembukaan resmi kegiatan</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <img
          src="https://picsum.photos/seed/mpls/400/400"
          alt="MPLS 2025"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="https://picsum.photos/seed/mpls/400/400"
          alt="MPLS 2025"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="https://picsum.photos/seed/mpls/400/400"
          alt="MPLS 2025"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="https://picsum.photos/seed/mpls/400/400"
          alt="MPLS 2025"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="https://picsum.photos/seed/mpls/400/200"
          alt="MPLS 2025"
          className="w-full object-cover rounded-lg col-span-1 lg:col-span-2 "
        />
        <img
          src="https://picsum.photos/seed/mpls/400/400"
          alt="MPLS 2025"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="https://picsum.photos/seed/mpls/400/400"
          alt="MPLS 2025"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
