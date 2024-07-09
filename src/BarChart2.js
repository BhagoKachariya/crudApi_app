import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import from 'chart.js/auto' for version 3.x
import { Link } from 'react-router-dom';

const BarChart2 = () => {
    const [chartData, setChartData] = useState({ xValues: [], yValues: [] });

    useEffect(() => {
        // Fetch data from API endpoint
        const fetchData = async () => {
            try {
                const response = await fetch('https://gist.githubusercontent.com/Jverma/887877fc5c2c2d99be10/raw/f0e3c9c19aeb7125b5bf5707c031cc45d8697c80/data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Assuming API response structure is an array of objects with 'Letter' and 'Freq' properties
                const xValues = data.map(item => item.Letter);
                const yValues = data.map(item => item.Freq);
                setChartData({ xValues, yValues });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetch data function

    }, []); // Empty dependency array means this effect runs once after initial render

    useEffect(() => {
        const grapharea = document.getElementById("myChart");
        if (!grapharea || chartData.xValues.length === 0 || chartData.yValues.length === 0) return;

        if (grapharea.chart) {
            grapharea.chart.destroy();
        }

        grapharea.chart = new Chart(grapharea, {
            type: "bar",
            data: {
                labels: chartData.xValues,
                datasets: [{
                    backgroundColor: ["red", "green", "blue", "orange", "brown"], // Example colors
                    data: chartData.yValues
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Bar Chart Example"
                    }
                }
            }
        });

        return () => {
            if (grapharea.chart) {
                grapharea.chart.destroy();
            }
        };
    }, [chartData]);

    return (
        <div className='my-5'>
            <Link to='/pie2' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">Next</Link>
            <Link to='/bar' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded no-underline">Previous</Link>
            <canvas id="myChart" style={{ maxWidth: "600px", maxHeight:"400px" }}></canvas>
        </div>
    );
}

export default BarChart2;
