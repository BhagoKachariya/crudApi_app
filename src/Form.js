import React from 'react';

const Form = ({ handleSubmit, newClassName, setNewClassName }) => {
  return (
    <div className='mt-3'>
      <h2>Add New Class:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="className" className='mx-2'>Class Name:</label>
          <input
            type="text"
            className="border-2 px-2"
            id="className"
            name="className"
            value={newClassName}
            onChange={e => setNewClassName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Add Class</button>
      </form>
    </div>
  );
};

export default Form;
