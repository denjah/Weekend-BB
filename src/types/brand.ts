export type DesignTheme = 'ethereal-glass' | 'editorial-luxury' | 'soft-structuralism';
export type ColorMode = 'light' | 'dark';

export interface UploadedFile {
  id: string;
  url: string;
  filename: string;
  sizeBytes: number;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Subsection {
  id: string;
  title: string;
  description: string;
  contentStatus: 'done' | 'pending' | 'in-progress';
  files: UploadedFile[];
  comments: Comment[];
}

export interface Chapter {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: string;
  colorVar: string; // e.g., 'var(--th-ch1)'
  subsections: Subsection[];
}
