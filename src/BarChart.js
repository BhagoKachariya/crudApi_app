import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function StackBars() {
  const [record, setRecord] = useState([]);
  const [error, setError] = useState(null); // State to store fetch error

  const fetchData = () => {
    axios.get('https://gist.githubusercontent.com/Jverma/887877fc5c2c2d99be10/raw/f0e3c9c19aeb7125b5bf5707c031cc45d8697c80/data.json')
      .then(response => {
        console.log("Raw data received:", response.data);
        if (response.status === 200) {
          setRecord(response.data);
        } else {
          setError('Error fetching data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const transformDataToSeries = (data) => {
    const series = [];
    if (data && data.length > 0) {
      data.forEach((item, index) => {
        series.push({ data: [item.Freq], label: item.Letter });
      });
    }
    return series;
  };

  return (
    <div className='my-5'>
    <Link to='/bar2' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">Next</Link>
    <Link to='/chart' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded no-underline">Previous</Link>
      {error && <p>Error fetching data: {error}</p>}
      {record.length > 0 && (
        <BarChart
          series={transformDataToSeries(record)}
          width={800}
          height={450}
          
        />
      )}
    </div>
    
  );
}

