import React from 'react';

const Table = ({ record, edit, editingId, handleEditUpdate, deleteHandler }) => {
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Table Form Data</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Class ID</th>
              <th className="border border-gray-400 px-4 py-2">Class Name</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {record.map(item => (
              <tr key={item.classid}>
                <td className="border border-gray-400 px-4 py-2">{item.classid}</td>
                <td className="border border-gray-400 px-4 py-2">{item.class}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEditUpdate(item.classid)}
                  >
                    {editingId === item.classid && edit ? 'Save' : 'Edit'}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteHandler(item.classid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
