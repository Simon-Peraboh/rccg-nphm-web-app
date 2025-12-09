import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-5">Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;