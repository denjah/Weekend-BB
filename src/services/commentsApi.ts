// Mock Comments API
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export const commentsApi = {
  getComments: async (sectionId: string): Promise<Comment[]> => {
    // Simulating network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: `mock-1-${sectionId}`,
            author: "Art Director",
            text: "Нужно добавить больше примеров для этого раздела.",
            timestamp: new Date().toISOString(),
          }
        ]);
      }, 500);
    });
  },

  addComment: async (_sectionId: string, text: string, author: string = "User"): Promise<Comment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          author,
          text,
          timestamp: new Date().toISOString(),
        });
      }, 300);
    });
  }
};
