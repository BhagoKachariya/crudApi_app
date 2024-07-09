import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Table from './Table';
import Form from './Form';  
import StackBars from './BarChart';
import PieeChart from './PieChart';
import BarChart2 from './BarChart2';
import PieChart2 from './PieChart2';
import Pie3d from './Pie3d';

function App() {
  const [record, setRecord] = useState([]);
  const [newClassid, setNewClassid] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6OCwiaWF0IjoxNzE5OTgwMTIyLCJleHAiOjE3MjI1NzIxMjJ9.vYDhLDe8bbvRog_rspgI8RdaTZSG1lqIdlKN0WJgbt0";
  const token1 = token.replace(/"/g, '');

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
        navigate('/data'); 
        setNewClassid('');
        setNewClassName('');
      })
      .catch(error => {
        console.error('Error creating new class:', error);
      });
  };

  const handleEditUpdate = (editingId) => {
    const updatedClass = {
      classid: newClassid,
      class: newClassName
    };

    axios.put(`https://deepvecto.com/api/classes/${editingId}`, updatedClass, {
      headers: {
        token: token1
      }
    })
      .then(response => {
        console.log('Class updated:', response.data);
        const updatedRecords = record.map(item => {
          if (item.classid === editingId) {
            return response.data;
          }
          return item;
        });
        navigate('/data');
        setRecord(updatedRecords);
        setEditingId(null);
        setNewClassid('');
        setNewClassName('');
        setEdit(false); // Exit edit mode

      })
      .catch(error => {
        console.error('Error updating class:', error);
      });
  };

  const handleEdit = (classid) => {

    navigate('/');
    setEditingId(classid);
    setNewClassid(classid);
    axios.get(`https://deepvecto.com/api/classes/${classid}`, {
      headers: {
        token: token1
      }
    })
      .then(response => {
        console.log("Updating record:", response.data.data.class);
        //setNewClassid(response.data.classid);
        setNewClassName(response.data.data.class);
        setEdit(true); // Enter edit mode
      })
      .catch(error => {
        console.error('Error fetching record to edit:', error);
      });
  };
  return (
    <div className="App">
      <Routes>
        <Route path='/data' element={<Table
          record={record}
          edit={edit}
          editingId={editingId}
          handleEdit={handleEdit}
        />}
        />
        <Route path='/' element={<Form
          handleSubmit={handleSubmit}
          newClassName={newClassName}
          setNewClassName={setNewClassName}
          editingId={editingId}
          handleEditUpdate={handleEditUpdate} />}
          newClassid={newClassid}
        />
        <Route path='/chart' element={<PieeChart />} />
        <Route path='/bar' element={<StackBars />} />
        <Route path='/bar2' element={<BarChart2 />} />
        <Route path='/pie2' element={<PieChart2 />} />
        <Route path='/pie3d' element={<Pie3d />} />
      </Routes>
    </div>
  );
}

export default App;
