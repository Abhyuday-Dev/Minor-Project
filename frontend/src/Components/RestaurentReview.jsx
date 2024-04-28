import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const RestaurantReview = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await handleFileUpload();
    } else {
      await handleTextSubmit();
    }
  };

  const handleFileUpload = async () => {
    let formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('YOUR_FILE_UPLOAD_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTextSubmit = async () => {
    try {
      const response = await axios.post('YOUR_TEXT_UPLOAD_ENDPOINT', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter text"
          variant="outlined"
          value={text}
          onChange={handleTextChange}
          multiline
          rows={4}
          fullWidth
        />
        <br />
        <input type="file" onChange={handleFileChange} accept=".txt" />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {result && (
        <div>
          {file ? (
            <div>
              <Typography variant="body1">
                Number of positive sentiments: {result.positive}
              </Typography>
              <Typography variant="body1">
                Number of negative sentiments: {result.negative}
              </Typography>
            </div>
          ) : (
            <Typography variant="body1">Sentiment: {result.sentiment}</Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantReview;
