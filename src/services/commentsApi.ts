// API Comments
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export const commentsApi = {
  getComments: async (sectionId: string): Promise<Comment[]> => {
    const response = await fetch(`/api/comments.php?section_id=${sectionId}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    
    const data = await response.json();
    return data.map((c: any) => ({
      ...c,
      // PHP отдает timestamp в секундах, переводим в миллисекунды для фронта
      timestamp: new Date(c.timestamp * 1000).toISOString()
    }));
  },

  addComment: async (sectionId: string, text: string, author: string = "User"): Promise<Comment> => {
    const response = await fetch('/api/comments.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ section_id: sectionId, text, author })
    });

    if (!response.ok) throw new Error('Failed to add comment');
    
    const result = await response.json();
    if (result.status === 'error') throw new Error(result.message);
    
    return {
      ...result.data,
      timestamp: new Date(result.data.timestamp * 1000).toISOString()
    };
  }
};
