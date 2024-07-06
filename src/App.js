import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Table from './Table';
import Form from './Form';

function App() {
  const [record, setRecord] = useState([]);
  const [msg, setMsg] = useState('');
  const [newClassid, setNewClassid] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [edit, setEdit] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6OCwiaWF0IjoxNzE5OTgwMTIyLCJleHAiOjE3MjI1NzIxMjJ9.vYDhLDe8bbvRog_rspgI8RdaTZSG1lqIdlKN0WJgbt0";
  const token1 = token.replace(/"/g, '');

  useEffect(() => {
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
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMsg('Error fetching data');
      });
  }, [newClassName, token1]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newClassName.trim()) {
      console.error('Class Name cannot be empty');
      return;
    }
    const newClass = {
      classid: newClassid,
      class: newClassName
    };

    axios.post('https://deepvecto.com/api/classes', newClass, {
      headers: {
        token: token1
      }
    })
      .then(response => {
        console.log('New class created:', response.data);

        setRecord([...record, response.data]);
        setNewClassid('');
        setNewClassName('');
      })
      .catch(error => {
        console.error('Error creating new class:', error);
      });
  };

  const handleEditUpdate = (classid) => {
    if (editingId === classid && edit) {
      // Perform update operation
      const updatedClass = {
        classid: newClassid,
        class: newClassName
      };

      axios.put(`https://deepvecto.com/api/classes/${classid}`, updatedClass, {
        headers: {
          token: token1
        }
      })
        .then(response => {
          console.log('Class updated:', response.data);

          const updatedRecords = record.map(item => {
            if (item.classid === classid) {
              return response.data;
            }
            return item;
          });
          setRecord(updatedRecords);
          setEditingId(null);
          setNewClassid('');
          setNewClassName('');
          setEdit(false); // Exit edit mode
        })
        .catch(error => {
          console.error('Error updating class:', error);
        });
    } else {
      // Fetch record to edit
      setEditingId(classid);
      axios.get(`https://deepvecto.com/api/classes/${classid}`, {
        headers: {
          token: token1
        }
      })
        .then(response => {
          console.log("Updating record:", response.data.data.class);
          setNewClassid(response.data.classid);
          setNewClassName(response.data.data.class);
          setEdit(true); // Enter edit mode
        })
        .catch(error => {
          console.error('Error fetching record to edit:', error);
        });
    }
  };

  return (
    <div className="App">
      {record.length > 0 ? (
        <Table
          record={record}
          edit={edit}
          editingId={editingId}
          handleEditUpdate={handleEditUpdate}
          deleteHandler={deleteHandler}
        />
      ) : (
        <p>{msg || 'Loading...'}</p>
      )}

      {/* Insertion Form */}
      <Form
        handleSubmit={handleSubmit}
        newClassName={newClassName}
        setNewClassName={setNewClassName}
      />
    </div>
  );
}

export default App;
