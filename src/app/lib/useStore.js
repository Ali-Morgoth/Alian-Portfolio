// src/app/lib/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  isFirstVisit: true,
  setFirstVisit: () => set({ isFirstVisit: false }),
}));

export default useStore;
