import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Table = ({ handleEdit }) => {
  const [record, setRecord] = useState([]);
  const [msg, setMsg] = useState('');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6OCwiaWF0IjoxNzE5OTgwMTIyLCJleHAiOjE3MjI1NzIxMjJ9.vYDhLDe8bbvRog_rspgI8RdaTZSG1lqIdlKN0WJgbt0";
  const token1 = token.replace(/"/g, '');
  const fetchData = () => {
    axios.get('https://deepvecto.com/api/classes', {
      headers: {
        token: token1
      }
    })
      .then(response => {
        console.log("Raw data received:", response.data);
        if (response.data.status === 200) {
          setRecord(response.data.data);
        } else {
          setMsg('Data received is not in the expected format');
          console.log(msg);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMsg('Error fetching data');
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = (classid) => {
    console.log('Deleting item with classid:', classid);

    axios.delete(`https://deepvecto.com/api/classes/${classid}`, {
      headers: {
        token: token1
      }
    })
      .then(response => {
        console.log('Item deleted:', classid);
        const updatedRecord = record.filter(item => item.classid !== classid);
        setRecord(updatedRecord);
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Class List</h2>
      <Link to='/' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">Add Class</Link>
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
                    onClick={() => handleEdit(item.classid)}
                  >
                    Edit
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
