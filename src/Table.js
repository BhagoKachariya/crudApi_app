import React from 'react';

const Table = ({ record, edit, editingId, handleEditUpdate, deleteHandler }) => {
  return (
    <div>
      <h2>Data</h2>
      <table className="table-auto w-full bg-white border border-gray-300">
        <thead className="thead-dark">
          <tr>
            <th className='border border-slate-600'>Class ID</th>
            <th className='border border-slate-600'>Class Name</th>
            <th className='border border-slate-600'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {record.map(item => (
            <tr key={item.classid}>
              <td className='border border-slate-600'>{item.classid}</td>
              <td className='border border-slate-600'>{item.class}</td>
              <td className='border border-slate-600'>
                <button className="btn btn-primary mr-2" onClick={() => handleEditUpdate(item.classid)}>
                  {editingId === item.classid && edit ? 'Save' : 'Edit'}
                </button>
                <button className="btn btn-danger" onClick={() => deleteHandler(item.classid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
