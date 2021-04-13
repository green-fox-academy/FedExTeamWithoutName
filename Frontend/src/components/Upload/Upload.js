import React, { useState } from 'react';

const Upload = () => {
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource , setPreviewSource] = useState();

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  }
  /*
  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({data: base64EncodedImage}),
        headers: {'Content-type': 'application/json'}
      })
    } catch (error) {
      console.error(error);
    }
  }
  */
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if(!previewSource) return;
    //uploadImage(previewSource);
  }
  
  return (
    <div>
      <h1 className="">Upload</h1>
      <form className="" onSubmit={handleSubmitFile}>
        <input
          className=""
          type="file"
          name="image"
          value={fileInputState}
          onChange={handleFileInputChange}
        />
        <button
          className=""
          type="submit">
            Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="" style={{height: '450px'}} />
      )}
    </div>
  )
}

export default Upload;
