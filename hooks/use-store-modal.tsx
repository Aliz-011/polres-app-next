import { create } from 'zustand';

interface useWelcomeModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useWelcomeModal = create<useWelcomeModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
