export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  caption: string;
  platform: string;
  verified: boolean;
}

// Ships empty by design. Only items with verified: true may be rendered.
export const galleryItems: GalleryItem[] = [];
