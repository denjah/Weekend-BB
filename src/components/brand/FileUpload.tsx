import { useState, useRef } from "react";
import type { UploadedFile } from "../../types/brand";

interface FileUploadProps {
  files?: UploadedFile[];
  onUpload?: (file: File) => void;
  onDelete?: (fileId: string) => void;
}

export const FileUpload = ({ files = [], onUpload, onDelete }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (onUpload) onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onUpload) onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="mt-6">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging ? 'border-accent-primary bg-accent-primary/5' : 'border-border-subtle bg-bg-secondary'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg className="w-8 h-8 text-text-tertiary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-text-secondary mb-2">Перетащите файлы сюда или</p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="text-accent-primary hover:text-text-primary transition-colors text-sm font-bold"
        >
          выберите на компьютере
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleChange}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-bg-tertiary/20 border border-border-subtle rounded-sm">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary hover:text-accent-primary hover:underline">
                  {file.filename}
                </a>
                <span className="text-xs text-text-tertiary">
                  {(file.sizeBytes / 1024).toFixed(1)} KB
                </span>
              </div>
              {onDelete && (
                <button onClick={() => onDelete(file.id)} className="text-text-tertiary hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

