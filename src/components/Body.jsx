import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);

      if (response.status >= 200 && response.status < 300) {
        navigate('/search', { replace: true });
      } else {
        console.error('Upload failed with status:', response.status);
        alert('Upload failed, please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during file upload.');
    }
  };

  return (
    <div>
      <section>
        <div className="body1">
          <img
            id="image-8-12"
            alt="Example image"
            src="https://srpsychologicalservices.com/wp-content/uploads/2024/06/Scroll-Group-1.png"
            className="ct-image"
            srcSet="https://srpsychologicalservices.com/wp-content/uploads/2024/06/Scroll-Group-1.png 674w, https://srpsychologicalservices.com/wp-content/uploads/2024/06/Scroll-Group-1-300x225.png 300w"
            sizes="(max-width: 674px) 100vw, 674px"
          />
          <div className="button-text">
            <h1 className="home-text">Having doubts on your bill??</h1>

            <form>
              <input type="file" onChange={handleFileChange} className="button-90" />
              <input type="submit" value="Upload" onClick={handleUploadClick} className="submit" />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
