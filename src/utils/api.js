import axios from 'axios';

// Update with your backend server URL
const GEMINI_API_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: GEMINI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const uploadFileToGemini = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const submitNewPromptToGemini = async (filePath, prompt) => {
  try {
    const response = await apiClient.post('/submit-new-prompt', {
      filePath,
      prompt
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting new prompt:', error);
    throw error;
  }
};
