import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newPrompt, setNewPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState(null);

  useEffect(() => {
    const fileName = searchParams.get('fileName');
    const encodedResponse = searchParams.get('geminiResponse');
    setGeminiResponse(encodedResponse ? JSON.parse(decodeURIComponent(encodedResponse)) : null);
  }, [searchParams]);

  const handleSubmitNewPrompt = async (event) => {
    event.preventDefault();

    if (!newPrompt) {
      alert('Please enter a prompt!');
      return;
    }

    const formData = new FormData();
    formData.append('filePath', searchParams.get('fileName'));
    formData.append('prompt', newPrompt);

    try {
      const response = await axios.post('/submit-new-prompt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setGeminiResponse(response.data);
      setNewPrompt('');
    } catch (error) {
      console.error('Error submitting new prompt:', error);
    }
  };

  return (
    <div>
      <h1>Search Results</h1>
      {searchParams.get('fileName') && (
        <p>Uploaded file: {searchParams.get('fileName')}</p>
      )}
      {geminiResponse && (
        <div>
          <h2>Generated Text from Gemini (Based on Uploaded File):</h2>
          <p>{geminiResponse}</p>
        </div>
      )}
      <form onSubmit={handleSubmitNewPrompt}>
        <label htmlFor="newPrompt">Enter a new prompt:</label>
        <input
          type="text"
          id="newPrompt"
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
        />
        <button type="submit">Submit Prompt</button>
      </form>
    </div>
  );
};

export default Search;
