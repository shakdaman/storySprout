import React from 'react';
import N8NTestComponent from '../components/N8NTestComponent';

const N8NTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <N8NTestComponent />
      </div>
    </div>
  );
};

export default N8NTestPage;
