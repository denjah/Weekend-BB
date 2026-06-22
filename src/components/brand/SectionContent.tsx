import { useState, useEffect } from "react";
import { PlaceholderBlock } from "./PlaceholderBlock";
import { CommentThread } from "./CommentThread";
import { uploadApi, type UploadedFile } from "../../services/uploadApi";
import { commentsApi, type Comment } from "../../services/commentsApi";
import { useBrandStore } from "../../store/useBrandStore";

interface SectionContentProps {
  sectionId: string;
  title?: string;
  description?: string;
}

export const SectionContent = ({ sectionId, title = "Материалы раздела", description = "Загрузите необходимые файлы" }: SectionContentProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const refreshStats = useBrandStore(state => state.refreshStats);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [fetchedFiles, fetchedComments] = await Promise.all([
        uploadApi.getFiles(sectionId),
        commentsApi.getComments(sectionId)
      ]);
      setFiles(fetchedFiles);
      setComments(fetchedComments);
    } catch (e) {
      console.error("Failed to load section data", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [sectionId]);

  const handleUpload = async (file: File) => {
    try {
      await uploadApi.uploadFile(file, sectionId);
      await loadData(); // Reload files to show the new one
      if (refreshStats) refreshStats(); // Update global stats
    } catch (e) {
      console.error("Upload error", e);
      alert("Ошибка при загрузке файла");
    }
  };

  const handleAddComment = async (text: string) => {
    try {
      await commentsApi.addComment(sectionId, text, "Author");
      await loadData();
      if (refreshStats) refreshStats(); // Update global stats
    } catch (e) {
      console.error("Comment error", e);
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center text-text-tertiary">Загрузка данных...</div>;
  }

  return (
    <div className="space-y-8 mt-4">
      <PlaceholderBlock 
        title={title} 
        description={description} 
        files={files}
        onUpload={handleUpload}
      />
      <CommentThread 
        comments={comments} 
        onAddComment={handleAddComment} 
      />
    </div>
  );
};
