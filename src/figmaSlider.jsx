import React, { useState } from 'react';

const MinimalGreenSlider = ({ initialValue = 100 }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="relative h-1.5 w-full bg-gray-200 rounded-full">

      <div 
        className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
      
    </div>
  );
};


const SliderGroup = () => {
  return (
    <div className="space-y-4 p-4 max-w-md">
      <div className='flex justify-between text-sm pt-5'>
        <span>Food and Drinks</span>
        <span>872,400</span>
      </div>
      <MinimalGreenSlider initialValue={50} />
      <div className='flex justify-between text-sm pt-5'>
        <span>Shoping</span>
        <span>1,132,200</span>
      </div>
      <MinimalGreenSlider initialValue={70} />
      <div className='flex justify-between text-sm pt-5'>
        <span>Housing</span>
        <span>912,400</span>
      </div>
      <MinimalGreenSlider initialValue={55} />
      <div className='flex justify-between text-sm pt-5'>
        <span>Transportation</span>
        <span>432,100</span>
      </div>
      <MinimalGreenSlider initialValue={20} />
      <div className='flex justify-between text-sm pt-5'>
        <span>Vehicle</span>
        <span>539,900</span>
      </div>
      <MinimalGreenSlider initialValue={40} />
      
    </div>
  );
};

export default SliderGroup;