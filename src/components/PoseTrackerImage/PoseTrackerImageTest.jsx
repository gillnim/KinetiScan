import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PoseTrackerImageTest.scss'
import upload from '../../assets/images/upload.jpg'

const PoseTrackerImageTest = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.imageUrl) {
        setUploadSuccess(true);
        // Open a modal or alert to prompt the user to analyze
        const analyze = window.confirm('Upload successful! Do you want to analyze this image?');
        if (analyze) {
          navigate('/analyze', { state: { imageUrl: response.data.imageUrl } });
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='upload'>
      <h1 className='upload__title'>Upload Image for Pose Analysis</h1>
      <img src={upload} alt="upload" className="upload__image" />
      <div className='upload__stuff'>
        <input className='upload__input' type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default PoseTrackerImageTest;
