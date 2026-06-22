import { useState } from "react";
import type { Comment } from "../../types/brand";

interface CommentThreadProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
}

export const CommentThread = ({ comments, onAddComment }: CommentThreadProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="bg-bg-tertiary/10 rounded-xl p-6 border border-border-subtle mt-8">
      <h4 className="text-sm font-bold text-text-primary mb-6 uppercase tracking-widest font-mono">Обсуждение</h4>
      
      <div className="space-y-6 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold shrink-0">
              {comment.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-text-primary text-sm">{comment.author}</span>
                <span className="text-xs text-text-tertiary">
                  {new Date(comment.timestamp).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{comment.text}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-sm text-text-tertiary italic">Пока нет комментариев.</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Написать комментарий..."
          className="flex-1 bg-bg-secondary border border-border-subtle rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
        />
        <button 
          type="submit"
          disabled={!newComment.trim()}
          className="px-6 py-2 bg-text-primary text-bg-primary font-bold text-sm rounded-sm disabled:opacity-50 transition-opacity"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

