import { create } from 'zustand';
import type { Chapter } from '../types/brand';

interface BrandState {
  chapters: Chapter[];
  isLoading: boolean;
  setChapters: (chapters: Chapter[]) => void;
  updateSubsectionStatus: (chapterId: string, subsectionId: string, status: 'done' | 'pending' | 'in-progress') => void;
  // TODO: Add file upload and comment actions
}

export const useBrandStore = create<BrandState>()((set) => ({
  chapters: [],
  isLoading: true,
  setChapters: (chapters) => set({ chapters, isLoading: false }),
  updateSubsectionStatus: (chapterId, subsectionId, status) => set((state) => ({
    chapters: state.chapters.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          subsections: ch.subsections.map(sub => 
            sub.id === subsectionId ? { ...sub, contentStatus: status } : sub
          )
        };
      }
      return ch;
    })
  }))
}));
