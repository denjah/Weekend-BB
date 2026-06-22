// Mock Upload API
export const uploadApi = {
  uploadFile: async (file: File, sectionId: string): Promise<{ url: string; name: string }> => {
    // Simulating file upload network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: URL.createObjectURL(file), // create temporary local url
          name: file.name
        });
      }, 1000);
    });
  }
};
