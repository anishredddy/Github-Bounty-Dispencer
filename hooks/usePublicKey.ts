import { create } from "zustand";

interface usePublicKeyInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePublicKey = create<usePublicKeyInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
