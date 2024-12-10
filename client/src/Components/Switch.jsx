import React, { useState } from 'react';

const ToggleSwitch = ({ onChange }) => {
  const [isOwner, setIsOwner] = useState(true);

  const toggleSwitch = () => {
    setIsOwner((prev) => {
      const newValue = !prev;
      onChange(newValue ? "Owner" : "Renter"); // Notify parent
      return newValue;
    });
  };

  return (
    <div className="flex w-44 h-12 rounded-2xl bg-superLgrey shadow-custom-inner relative">
      {/* Background circle */}
      <div className={`absolute top-1 left-1 w-20 h-10 rounded-full bg-white transition-transform duration-300 z-0 ${isOwner ? 'translate-x-0' : 'translate-x-22'}`}/>
      {/* Owner button */}
      <button 
        type="button"
        onClick={toggleSwitch}
        className={`flex-1 p-0 pl-1 text-base font-semibold text-center rounded-2xl relative z-10 transition-all duration-300}`} >
        Owner
      </button>
      
      {/* Renter button */}
      <button
        type="button"
        onClick={toggleSwitch}
        className={`flex-1 p-2 pl-3 text-base font-semibold rounded-2xl relative z-10 transition-all duration-300}`} >
        Renter
      </button>
    </div>
  );
};

export default ToggleSwitch;
