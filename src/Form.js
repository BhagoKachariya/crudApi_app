import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Form = ({ handleSubmit, newClassName, setNewClassName, editingId, handleEditUpdate, newClassid }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploaded File:', file.name);
      // Perform upload logic here
    } else {
      console.log('No file selected.');
    }
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };
  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-6 font-semibold text-center">{editingId ? 'Edit Class' : 'Add New Class'}</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="className" className="block text-gray-700 text-sm font-bold mb-2">Class Name:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="className"
            name="className"
            placeholder="Enter class name"
            value={newClassName}
            onChange={e => setNewClassName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          {editingId ? (
            <button
              type="button"
              onClick={() => handleEditUpdate(editingId)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Class
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
            >
              Add Class
            </button>
          )}
          <Link to='/data' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">View Data</Link>
          <Link to='/chart' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 ml-2 rounded no-underline">View Chart</Link>
        </div>
      </form>
      <div
        className="border border-gray-300 p-4 m-3 rounded-md"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h3 className="text-lg font-semibold mb-2 ">Drag and Drop File Here <span style={{fontSize:"30px"}}>/</span></h3>
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-lg font-semibold mb-4"
        >
          Select File
        </label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, text/plain"
            className="hidden"
            onChange={handleInputChange}
            id="fileInput"
          /><br/>
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Upload
        </button>
      </div>
      {previewUrl && (
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">Preview:</p>
            {file.type.startsWith('image/') ? (
              <img src={previewUrl} alt="File Preview" className="max-w-xs max-h-40 rounded-lg shadow-md" />
            ) : (
              <p>{file.name}</p>
            )}
          </div>
        )}
    </div>

  );
};

export default Form;
