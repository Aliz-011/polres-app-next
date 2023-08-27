import { create } from 'zustand';

interface useUploadModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUploadModal = create<useUploadModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
