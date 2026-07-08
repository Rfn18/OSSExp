"use client";

import { useState } from "react";
import { MasonryPhotoAlbum, type Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

const photos: Photo[] = [
  { src: "https://picsum.photos/seed/mpls1/400/400", width: 400, height: 400 },
  { src: "https://picsum.photos/seed/mpls2/400/400", width: 400, height: 400 },
  { src: "https://picsum.photos/seed/mpls3/400/400", width: 400, height: 400 },
  { src: "https://picsum.photos/seed/mpls4/400/400", width: 400, height: 400 },
  { src: "https://picsum.photos/seed/mpls5/800/400", width: 800, height: 400 },
  { src: "https://picsum.photos/seed/mpls6/400/400", width: 400, height: 400 },
  { src: "https://picsum.photos/seed/mpls7/400/400", width: 400, height: 400 },
];

export default function DocGrid() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="w-full mt-10">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-bold text-lg text-foreground">
              Apel Pembukaan
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Pembukaan resmi kegiatan
          </p>
        </div>
        <span className="text-xs font-semibold text-muted-foreground bg-muted rounded-full px-3 py-1 self-start">
          {photos.length} foto
        </span>
      </div>

      <MasonryPhotoAlbum
        photos={photos}
        columns={(containerWidth) => {
          if (containerWidth < 640) return 2;
          if (containerWidth < 1024) return 3;
          return 4;
        }}
        spacing={12}
        onClick={({ index }) => setIndex(index)}
        render={{
          image: (props, { photo, width, height }) => (
            <div
              className="group relative overflow-hidden rounded-xl bg-muted cursor-pointer"
              style={{ width, height }}
            >
              <img
                {...props}
                src={photo.src}
                alt={photo.alt ?? "Dokumentasi"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 rounded-xl" />
            </div>
          ),
        }}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          scrollToZoom: true,
        }}
      />
    </div>
  );
}
