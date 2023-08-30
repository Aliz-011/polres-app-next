import { create } from 'zustand';

interface useUpdateModalInterface {
  isOpen: boolean;
  id: string;
  data: Record<string, any>;
  setData: (by: any) => void;
  setId: (by: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useUpdateModal = create<useUpdateModalInterface>((set) => ({
  isOpen: false,
  id: '',
  data: {},
  setData: (by: any) => set(() => ({ data: by })),
  setId: (by) => set(() => ({ id: by })),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
