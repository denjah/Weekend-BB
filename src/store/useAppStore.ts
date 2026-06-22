import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DesignTheme, ColorMode } from '../types/brand';

interface AppState {
  designTheme: DesignTheme;
  colorMode: ColorMode;
  sidebarOpen: boolean;
  searchQuery: string;
  setDesignTheme: (theme: DesignTheme) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      designTheme: 'ethereal-glass',
      colorMode: 'dark', // Default to dark since ethereal glass is dark
      sidebarOpen: true,
      searchQuery: '',
      setDesignTheme: (theme) => set({ designTheme: theme }),
      setColorMode: (mode) => set({ colorMode: mode }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'brandbook-app-storage',
    }
  )
);
