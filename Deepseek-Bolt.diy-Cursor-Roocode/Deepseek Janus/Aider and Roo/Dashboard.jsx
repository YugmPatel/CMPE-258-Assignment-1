import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import ApplicationForm from './ApplicationForm';
import { fetchApplications, createApplication, updateApplication, deleteApplication } from '../services/api';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    loadApplications();
  }, []);
  
  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError('Failed to load applications. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateApplication = async (applicationData) => {
    try {
      const newApplication = await createApplication(applicationData);
      setApplications(prev => [newApplication, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create application. Please try again.');
      console.error(err);
    }
  };
  
  const handleUpdateApplication = async (id, applicationData) => {
    try {
      const updatedApplication = await updateApplication(id, applicationData);
      setApplications(prev => 
        prev.map(app => app._id === id ? updatedApplication : app)
      );
    } catch (err) {
      setError('Failed to update application. Please try again.');
      console.error(err);
    }
  };
  
  const handleDeleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(id);
        setApplications(prev => prev.filter(app => app._id !== id));
      } catch (err) {
        setError('Failed to delete application. Please try again.');
        console.error(err);
      }
    }
  };
  
  // Group applications by status
  const savedApplications = applications.filter(app => app.status === 'Saved');
  const appliedApplications = applications.filter(app => app.status === 'Applied');
  const interviewApplications = applications.filter(app => app.status === 'Interview');
  const offerApplications = applications.filter(app => app.status === 'Offer');
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Application Tracker</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showForm ? 'Cancel' : 'Add New Application'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {showForm && (
        <div className="mb-6">
          <ApplicationForm 
            onSubmit={handleCreateApplication} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saved Column */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3 text-gray-700 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Saved
            <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded-full">{savedApplications.length}</span>
          </h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {savedApplications.map(job => (
              <JobCard 
                key={job._id} 
                job={job} 
                onStatusChange={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            ))}
            {savedApplications.length === 0 && (
              <p className="text-gray-500 text-sm italic">No saved applications</p>
            )}
          </div>
        </div>
        
        {/* Applied Column */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3 text-gray-700 flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            Applied
            <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded-full">{appliedApplications.length}</span>
          </h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {appliedApplications.map(job => (
              <JobCard 
                key={job._id} 
                job={job} 
                onStatusChange={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            ))}
            {appliedApplications.length === 0 && (
              <p className="text-gray-500 text-sm italic">No applications in this stage</p>
            )}
          </div>
        </div>
        
        {/* Interview Column */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3 text-gray-700 flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
            Interview
            <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded-full">{interviewApplications.length}</span>
          </h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {interviewApplications.map(job => (
              <JobCard 
                key={job._id} 
                job={job} 
                onStatusChange={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            ))}
            {interviewApplications.length === 0 && (
              <p className="text-gray-500 text-sm italic">No applications in this stage</p>
            )}
          </div>
        </div>
        
        {/* Offer Column */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3 text-gray-700 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Offer
            <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded-full">{offerApplications.length}</span>
          </h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {offerApplications.map(job => (
              <JobCard 
                key={job._id} 
                job={job} 
                onStatusChange={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            ))}
            {offerApplications.length === 0 && (
              <p className="text-gray-500 text-sm italic">No applications in this stage</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
