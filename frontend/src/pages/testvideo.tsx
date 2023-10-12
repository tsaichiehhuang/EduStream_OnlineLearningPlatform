// /pages/upload.js

import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('請選擇一個影片文件');
      return;
    }

    const chunkSize = 100 * 1024 * 1024; // 10MB per chunk

    // Calculate the number of chunks
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('totalChunks', totalChunks);
      formData.append('chunkIndex', i);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          console.error(`Chunk ${i + 1} upload failed`);
        } else {
          console.log(`Chunk ${i + 1} uploaded successfully`);
        }
      } catch (error) {
        console.error(`Error uploading chunk ${i + 1}: ${error.message}`);
      }
    }

    // Notify the server that all chunks have been uploaded
    // Implement server-side logic to assemble and process the chunks.
  };

  return (
    <div>
      <h1>影片上傳</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>上傳影片</button>
    </div>
  );
}
