import React, { useState, useEffect } from 'react';

function App() {
  const [applications, setApplications] = useState([]);
	const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({
    company: '',
    position: '',
    status: '',
    appliedDate: ''
  });

  useEffect(() => {
    const mockData = [
      { company: 'Google', position: 'SWE Intern', status: 'Applied', appliedDate: '2025-04-15' },
      { company: 'Meta', position: 'Backend Engineer', status: 'Interview', appliedDate: '2025-04-10' }
    ];
    setApplications(mockData);
  }, []);

	const filteredApplications = applications.filter(app => {
    return filter === 'All' || app.status === filter;
  });

	const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplications(prev => [...prev, form]);
    setForm({ company: '', position: '', status: '', appliedDate: '' });
  };

  // Format date from YYYY-MM-DD to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>

      {/* Filter Dropdown */}
      <select
        className="mb-4 p-2 border rounded bg-white"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredApplications.map((app, idx) => (
  				<div
    				key={idx}
    				className="bg-white rounded-xl shadow-md p-5 mb-4 transition-transform transform hover:scale-[1.02]"
  				>
    				<div className="flex items-center justify-between mb-2">
      				<h3 className="text-xl font-semibold">{app.company} - {app.position}</h3>
      				<span className={`text-sm px-2 py-1 rounded-full font-medium
        				${app.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
          			app.status === 'Interview' ? 'bg-yellow-100 text-yellow-700' :
          			app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
          			'bg-green-100 text-green-700'}`}>
        				{app.status}
      				</span>
    				</div>
    				<p className="text-sm text-gray-600">Applied On: {formatDate(app.appliedDate)}</p>
  				</div>
				))}
			</div>


      {/* Form to Add New Application */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 p-4 bg-white rounded shadow-md border space-y-3"
      >
        <input
          className="w-full p-2 border rounded"
          placeholder="Company"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Position"
          value={form.position}
          onChange={e => setForm({ ...form, position: e.target.value })}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          required
        >
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={form.appliedDate}
          onChange={e => setForm({ ...form, appliedDate: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Application
        </button>
      </form>
    </div>
  );
}

export default App;
