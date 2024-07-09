import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const GooglePieChart = () => {
    useEffect(() => {
        // Function to load Google Charts library
        const loadGoogleCharts = () => {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.async = true;
            script.onload = () => {
                // Load the visualization package and set a callback
                window.google.charts.load('current', { packages: ['corechart'] });
                window.google.charts.setOnLoadCallback(drawChart);
            };
            document.body.appendChild(script);
        };

        // Call the function to load Google Charts library
        loadGoogleCharts();

        // Clean up function to remove the script tag
        return () => {
            const scripts = document.getElementsByTagName('script');
            for (let script of scripts) {
                if (script.src === 'https://www.gstatic.com/charts/loader.js') {
                    document.body.removeChild(script);
                }
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const drawChart = async () => {
        try {
            // Fetch data from API endpoint
            const response = await fetch('https://gist.githubusercontent.com/Jverma/887877fc5c2c2d99be10/raw/f0e3c9c19aeb7125b5bf5707c031cc45d8697c80/data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Check if Google Charts library and visualization module are loaded
            if (window.google && window.google.visualization) {
                const dataTable = new window.google.visualization.DataTable();
                dataTable.addColumn('string', 'Country');
                dataTable.addColumn('number', 'Mhl');

                // Assuming data structure from API is an array of objects with 'country' and 'production' fields
                const rows = data.map(item => [item.Letter, item.Freq]);
                dataTable.addRows(rows);

                const options = {
                    title: 'World Wide Wine Production',
                    is3D: true
                };

                const chart = new window.google.visualization.PieChart(document.getElementById('myChart'));
                chart.draw(dataTable, options);
            } else {
                console.error('Google Charts library or visualization module not loaded.');
            }
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    };

    return (
        <div className='my-5'>
        <Link to='/pie2' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">Previous</Link>
        <div id="myChart" style={{ width: '100%', maxWidth: '900px', height: '500px' }}></div>
        </div>
    );
};

export default GooglePieChart;
