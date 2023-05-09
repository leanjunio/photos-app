import { create } from 'zustand';

export type Photo = {
  id: string;
  url: string;
  filename: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions: {
    height: number;
    width: number;
  },
  resolution: {
    height: number;
    width: number;
  },
  sizeInBytes: number;
  sharedWith: {
    id: string;
    name: string;
    avatar: string;
  }[];
  favorited: boolean;
};

type PhotosState = {
  current: string;
  loading: boolean;
  photos: Photo[];
  deletePhoto: (id: string) => void;
  toggleLike: (id: string) => void;
  fetch: () => Promise<void>;
  focus: (id: string) => void;
};

export const usePhotosStore = create<PhotosState>((set) => ({
  current: '',
  loading: false,
  photos: [],
  deletePhoto: (id: string) => set((state) => ({
    photos: state.photos.filter((photo) => photo.id !== id),
  })),
  toggleLike: (id: string) => set((state) => ({
    photos: state.photos.map((photo) => {
      if (photo.id === id) {
        return {
          ...photo,
          favorited: !photo.favorited,
        };
      }
      return photo;
    })
  })),
  fetch: async () => {
    console.log('fetching photos');
    set({ loading: true });
    const response = await fetch('https://agencyanalytics-api.vercel.app/images.json');
    const photos: Photo[] = await response.json();
    const sortedArray = photos.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
    set({ photos: sortedArray, loading: false });
  },
  focus: (id: string) => set(() => ({ current: id })),
}));