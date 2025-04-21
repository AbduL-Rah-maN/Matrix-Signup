import React from 'react';
import Badge from './Badge'; 

const Profile = () => {
  return (
    <div className="relative w-24 h-24">
      
      <img
        src="https://mighty.tools/mockmind-api/content/abstract/49.jpg"
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover "
      />
      
      <Badge />
    </div>
  );
};

export default Profile;