import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { Artwork, Artist, Exhibition } from "@shared/schema";

interface ArtworkModalProps {
  artwork: Artwork;
  artist: Artist;
  exhibition: Exhibition;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  visual: "Visual Arts",
  literary: "Literary Arts",
  applied: "Applied Arts",
  performance: "Performance Arts",
};

export default function ArtworkModal({ artwork, artist, exhibition, onClose }: ArtworkModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 bg-card z-10 p-6 border-b flex flex-row items-center justify-end">
          <DialogClose ref={closeButtonRef} className="rounded-full hover:bg-muted p-2" data-testid="button-modal-close">
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="grid md:grid-cols-[1.5fr,1fr] gap-8 p-8">
          <div>
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full rounded-md"
            />
          </div>

          <div>
            <h2 className="text-3xl font-light mb-6" id="modal-title" data-testid="text-modal-artwork-title">
              {artwork.title}
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex">
                <span className="font-medium min-w-[120px]">Artist:</span>
                <span className="opacity-80">{artist.name}</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Year:</span>
                <span className="opacity-80">{artwork.year}</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Medium:</span>
                <span className="opacity-80">{artwork.medium}</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Dimensions:</span>
                <span className="opacity-80">{artwork.dimensions}</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Category:</span>
                <span className="opacity-80">{categoryLabels[artwork.category]}</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Exhibition:</span>
                <span className="opacity-80">{exhibition.title}</span>
              </div>
            </div>

            <p className="leading-relaxed opacity-85">{artwork.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
