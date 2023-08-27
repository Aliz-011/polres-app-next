import { create } from 'zustand';

interface useUpdateModalInterface {
  isOpen: boolean;
  id: string;
  setId: (by: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useUpdateModal = create<useUpdateModalInterface>((set) => ({
  isOpen: false,
  id: '',
  setId: (by) => set(() => ({ id: by })),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
