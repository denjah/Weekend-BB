import { create } from 'zustand';
import type { Chapter } from '../types/brand';

interface BrandStats {
  totalFiles: number;
  totalComments: number;
}

interface BrandState {
  chapters: Chapter[];
  isLoading: boolean;
  stats: BrandStats;
  setChapters: (chapters: Chapter[]) => void;
  updateSubsectionStatus: (chapterId: string, subsectionId: string, status: 'done' | 'pending' | 'in-progress') => void;
  refreshStats: () => Promise<void>;
}

export const useBrandStore = create<BrandState>()((set) => ({
  chapters: [],
  isLoading: true,
  stats: { totalFiles: 0, totalComments: 0 },
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
  })),
  refreshStats: async () => {
    try {
      // Fetch all files and comments to get the count
      const [filesRes, commentsRes] = await Promise.all([
        fetch('/api/upload.php'),
        fetch('/api/comments.php')
      ]);
      const files = await filesRes.json();
      const comments = await commentsRes.json();
      set({ stats: { totalFiles: files.length || 0, totalComments: comments.length || 0 } });
    } catch (e) {
      console.error("Failed to refresh stats", e);
    }
  }
}));
