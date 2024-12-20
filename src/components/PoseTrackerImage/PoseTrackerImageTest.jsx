import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './PoseTrackerImageTest.scss';
import upload from '../../assets/images/upload.jpg';

const PoseTrackerImageTest = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'Please log in to upload an image.',
        icon: 'error',
        confirmButtonText: 'Login',
      });
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.data && response.data.imageUrl) {
        Swal.fire({
          title: 'Upload Successful!',
          text: 'Do you want to analyze this image?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Yes, analyze it!',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/analyze', { state: { imageUrl: response.data.imageUrl } });
          }
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire({
        title: 'Upload Failed',
        text: error.response?.data?.message || 'An error occurred while uploading the image.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
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
