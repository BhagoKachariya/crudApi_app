import React from 'react';

const Form = ({ handleSubmit, newClassName, setNewClassName }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-6 font-semibold text-center">Add New Class</h2>
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
