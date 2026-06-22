import { useState, useRef } from "react";
import { Badge } from "../ui/Badge";
import type { UploadedFile } from "../../types/brand";

interface PlaceholderBlockProps {
  title: string;
  description: string;
  files?: UploadedFile[];
  onUpload?: (file: File) => void;
  onDelete?: (fileId: string) => void;
}

export const PlaceholderBlock = ({ title, description, files = [], onUpload, onDelete }: PlaceholderBlockProps) => {
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
        className={`border-dashed border-2 rounded-xl bg-bg-secondary/50 flex flex-col items-center justify-center text-center py-12 transition-colors cursor-pointer ${
          isDragging ? 'border-accent-primary bg-accent-primary/5' : 'border-border-subtle hover:border-accent-primary/50 hover:bg-bg-secondary'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-6 text-text-secondary transition-transform duration-300 group-hover:scale-110">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        
        <Badge variant="pending" className="mb-4">Ожидает заполнения</Badge>
        
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary max-w-md mb-8">{description}</p>
        
        <div className="px-6 py-3 bg-text-primary text-bg-primary font-bold rounded-sm text-sm tracking-wide transition-colors inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Загрузить материалы
        </div>

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
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(file.id);
                  }} 
                  className="text-text-tertiary hover:text-red-500 transition-colors"
                >
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

