import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Link } from 'react-router-dom';

export default function PieeChart() {
   const data = [
		{ id: 0, value: 10, label: 'series A', color:'orange' },
		{ id: 1, value: 15, label: 'series B', color:'pink' },
		{ id: 2, value: 20, label: 'series C', color:'yellow' },
		{ id: 3, value: 25, label: 'series D', color:'black' },
		{ id: 4, value: 30, label: 'series E', color:'blue' },
		{ id: 5, value: 35, label: 'series F', color:'grey' },
		{ id: 6, value: 40, label: 'series G', color:'green' },
		{ id: 7, value: 45, label: 'series H', color:'pink' },
		{ id: 8, value: 50, label: 'series I', color:'blue' },
		{ id: 9, value: 55, label: 'series J', color:'yellow' },
		{ id: 10, value: 60, label: 'series K', color:'orange' },
		{ id: 11, value: 65, label: 'series L', color:'black' },
	  ];
  return (
	<div className='my-5'>
	<Link to='/bar' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">Next</Link>
	<Link to='/' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded no-underline">Previous</Link>
    <PieChart
	 colors={['black','orange','blue','green','grey','yellow','pink']}
      series={[
        {
		
          data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        
		  innerRadius: 10,
		  outerRadius: 100,
		  paddingAngle: 2,
		  cornerRadius: 3,
		  startAngle: -90,
		  endAngle: 360,
		//   cx: 100,
		//   cy: 100,
        },
      ]}
      width={600}
      height={200}
    />
	</div>
  );
}