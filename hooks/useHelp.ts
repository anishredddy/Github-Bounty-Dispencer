import { create } from "zustand";

interface useHelpInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useHelp = create<useHelpInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
