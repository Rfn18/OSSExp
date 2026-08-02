// lib/photoAlbum.ts (atau taruh di file yang sama sebelum komponen)

/**
 * Hitung jumlah kolom masonry ideal berdasarkan lebar container.
 * Semakin lebar layar, semakin banyak kolom, biar tiap foto tetap
 * berukuran wajar (gak melar terlalu besar).
 */
export function getIdealColumns(containerWidth: number): number {
  const breakpoints: [number, number][] = [
    [400, 2], // < 400px  -> 2 kolom
    [640, 3], // < 640px  -> 3 kolom
    [900, 4], // < 900px  -> 4 kolom
    [1200, 5], // < 1200px -> 5 kolom
    [1600, 6], // < 1600px -> 6 kolom
  ];

  for (const [maxWidth, columns] of breakpoints) {
    if (containerWidth < maxWidth) return columns;
  }

  return 7; // >= 1600px -> 7 kolom
}
