import React from 'react';

const Badge = ({ text, color = 'bg-blue-500' }) => {
  return (
    <span className={`absolute top-0 right-0 px-3 py-1 text-white rounded-full bg-red-500`}>
      4
    </span>
  );
};

export default Badge;
