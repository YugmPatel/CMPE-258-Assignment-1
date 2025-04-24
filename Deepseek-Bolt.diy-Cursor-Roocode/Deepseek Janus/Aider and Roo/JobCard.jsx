import React from 'react';

const statusColors = {
  Saved: 'bg-blue-100 text-blue-800',
  Applied: 'bg-yellow-100 text-yellow-800',
  Interview: 'bg-purple-100 text-purple-800',
  Offer: 'bg-green-100 text-green-800'
};

const JobCard = ({ job, onStatusChange, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(job._id, { ...job, status: newStatus });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border-l-4 border-gray-300 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800">{job.company}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>
      
      <h4 className="text-md font-medium text-gray-700 mt-1">{job.position}</h4>
      
      <div className="mt-2 text-sm text-gray-600">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {job.location}
        </div>
        
        <div className="flex items-center mt-1">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Applied: {formatDate(job.appliedDate)}
        </div>
      </div>
      
      {job.notes && (
        <p className="mt-2 text-sm text-gray-500 italic">{job.notes}</p>
      )}
      
      <div className="mt-3 flex justify-between">
        <div className="flex space-x-2">
          {job.status !== 'Saved' && (
            <button 
              onClick={() => handleStatusChange('Saved')}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            >
              Saved
            </button>
          )}
          {job.status !== 'Applied' && (
            <button 
              onClick={() => handleStatusChange('Applied')}
              className="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100"
            >
              Applied
            </button>
          )}
          {job.status !== 'Interview' && (
            <button 
              onClick={() => handleStatusChange('Interview')}
              className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
            >
              Interview
            </button>
          )}
          {job.status !== 'Offer' && (
            <button 
              onClick={() => handleStatusChange('Offer')}
              className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
            >
              Offer
            </button>
          )}
        </div>
        
        <button 
          onClick={() => onDelete(job._id)}
          className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
