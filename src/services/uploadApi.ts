// API Upload
export interface UploadedFile {
  id: string;
  url: string;
  filename: string;
  sizeBytes: number;
  uploadedAt: string;
}

export const uploadApi = {
  getFiles: async (sectionId: string): Promise<UploadedFile[]> => {
    const response = await fetch(`/api/upload.php?section_id=${sectionId}`);
    if (!response.ok) throw new Error('Failed to fetch files');
    const data = await response.json();
    return data.map((f: any) => ({
      id: f.id,
      url: f.url,
      filename: f.filename,
      sizeBytes: f.size,
      uploadedAt: new Date(f.timestamp * 1000).toISOString()
    }));
  },

  uploadFile: async (file: File, sectionId: string): Promise<{ url: string; name: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('section_id', sectionId);
    formData.append('user_name', 'Art Director'); // Заглушка до внедрения Битрикс-авторизации

    const response = await fetch('/api/upload.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed: Server error');
    }

    const result = await response.json();
    
    if (result.status === 'error') {
      throw new Error(result.message);
    }

    return {
      url: result.data.url,
      name: result.data.filename
    };
  }
};
