import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ADMIN_API = 'http://localhost:5900/api/admin';

const AdminDashboard = () => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [bookings, setBookings] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [careers, setCareers] = useState([]);
    const [earnWithUs, setEarnWithUs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [editData, setEditData] = useState({});
    const [showJobForm, setShowJobForm] = useState(false);
    const [showContactReplyModal, setShowContactReplyModal] = useState(false);
    const [replyingToContact, setReplyingToContact] = useState(null);
    const [contactReply, setContactReply] = useState('');
    const [jobForm, setJobForm] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        experience: '0-2',
        salary: 'Competitive',
        jobType: 'Full-time'
    });

    // Handle logout (used for token expiration or invalid auth)
    const handleLogout = (message) => {
        setAdminToken('');
        localStorage.removeItem('adminToken');
        if (message) {
            alert(message);
        }
    };

    // Login
    const handleAdminLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post(`${ADMIN_API}/login`, { email, password });
            setAdminToken(response.data.token);
            localStorage.setItem('adminToken', response.data.token);
            alert('Login successful!');
        } catch (error) {
            alert('Login failed: ' + error.response?.data?.message);
        }
    };

    // Fetch Dashboard Summary
    const fetchDashboard = async () => {
        if (!adminToken) return;
        setLoading(true);
        try {
            const response = await axios.get(`${ADMIN_API}/dashboard`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setSummary(response.data.summary);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                console.error('Error fetching dashboard:', error.message);
            }
        }
        setLoading(false);
    };

    // Fetch Bookings
    const fetchBookings = async () => {
        if (!adminToken) return;
        setLoading(true);
        try {
            const response = await axios.get(`${ADMIN_API}/bookings`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setBookings(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                console.error('Error fetching bookings:', error.message);
            }
        }
        setLoading(false);
    };

    // Fetch Contacts
    const fetchContacts = async () => {
        if (!adminToken) return;
        setLoading(true);
        try {
            const response = await axios.get(`${ADMIN_API}/contacts`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setContacts(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                console.error('Error fetching contacts:', error.message);
            }
        }
        setLoading(false);
    };

    // Fetch Careers
    const fetchCareers = async () => {
        if (!adminToken) return;
        setLoading(true);
        try {
            const response = await axios.get(`${ADMIN_API}/careers`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setCareers(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                console.error('Error fetching careers:', error.message);
            }
        }
        setLoading(false);
    };

    // Fetch Earn With Us Applications
    const fetchEarnWithUs = async () => {
        if (!adminToken) return;
        setLoading(true);
        try {
            const response = await axios.get(`${ADMIN_API}/earnwithus`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setEarnWithUs(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                console.error('Error fetching Earn With Us applications:', error.message);
            }
        }
        setLoading(false);
    };

    // Delete Earn With Us Application
    const deleteEarnWithUs = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await axios.delete(`${ADMIN_API}/earnwithus/${id}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                fetchEarnWithUs();
                alert('Application deleted successfully!');
            } catch (error) {
                if (error.response?.status === 401) {
                    handleLogout('Session expired. Please login again.');
                } else {
                    alert('Error deleting application: ' + error.message);
                }
            }
        }
    };

    // Delete All Earn With Us Applications
    const deleteAllEarnWithUs = async () => {
        if (window.confirm('Are you sure you want to delete ALL Earn With Us applications? This cannot be undone.')) {
            try {
                setLoading(true);
                // Delete all applications one by one
                for (const application of earnWithUs) {
                    await axios.delete(`${ADMIN_API}/earnwithus/${application._id}`, {
                        headers: { Authorization: `Bearer ${adminToken}` }
                    });
                }
                fetchEarnWithUs();
                alert('All applications deleted successfully!');
            } catch (error) {
                if (error.response?.status === 401) {
                    handleLogout('Session expired. Please login again.');
                } else {
                    alert('Error deleting applications: ' + error.message);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    // Update Booking Status
    const updateBookingStatus = async (id, status, notes) => {
        try {
            await axios.put(`${ADMIN_API}/bookings/${id}`, { status, notes }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            fetchBookings();
            alert('Booking updated successfully!');
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                alert('Error updating booking: ' + error.message);
            }
        }
    };

    // Delete Booking
    const deleteBooking = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await axios.delete(`${ADMIN_API}/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                fetchBookings();
                alert('Booking deleted successfully!');
            } catch (error) {
                if (error.response?.status === 401) {
                    handleLogout('Session expired. Please login again.');
                } else {
                    alert('Error deleting booking: ' + error.message);
                }
            }
        }
    };

    // Update Contact Reply
    const updateContactReply = async (id, reply) => {
        try {
            const response = await axios.put(`${ADMIN_API}/contacts/${id}`, { reply, status: 'replied' }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setShowContactReplyModal(false);
            setContactReply('');
            setReplyingToContact(null);
            fetchContacts();
            alert(`✅ Reply sent successfully to ${replyingToContact?.email}!`);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                alert('❌ Error sending reply: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    // Update Career Status
    const updateCareerStatus = async (id, status, feedback) => {
        try {
            await axios.put(`${ADMIN_API}/careers/${id}`, { status, feedback }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            fetchCareers();
            alert('Career status updated successfully!');
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                alert('Error updating career: ' + error.message);
            }
        }
    };

    // Fetch Jobs
    const fetchJobs = async () => {
        if (!adminToken) return;
        setLoading(true);
        try {
            const response = await axios.get(`${ADMIN_API}/jobs`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setJobs(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                console.error('Error fetching jobs:', error.message);
            }
        }
        setLoading(false);
    };

    // Create Job
    const createJob = async (e) => {
        e.preventDefault();
        if (!jobForm.title || !jobForm.description || !jobForm.requirements || !jobForm.location) {
            alert('All fields are required!');
            return;
        }

        try {
            await axios.post(`${ADMIN_API}/jobs`, jobForm, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            alert('Job posting created successfully!');
            setJobForm({
                title: '',
                description: '',
                requirements: '',
                location: '',
                experience: '0-2',
                salary: 'Competitive',
                jobType: 'Full-time'
            });
            setShowJobForm(false);
            fetchJobs();
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                const errorMsg = error.response?.data?.message || error.message || 'Unknown error occurred';
                console.error('Create Job Error:', error);
                alert('❌ Error creating job: ' + errorMsg);
            }
        }
    };

    // Update Job Status (Active/Inactive)
    const updateJobStatus = async (id, isActive) => {
        try {
            await axios.put(`${ADMIN_API}/jobs/${id}`, { isActive }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            fetchJobs();
            alert('Job posting updated successfully!');
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout('Session expired. Please login again.');
            } else {
                alert('Error updating job: ' + error.message);
            }
        }
    };

    // Delete Job
    const deleteJob = async (id) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await axios.delete(`${ADMIN_API}/jobs/${id}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                fetchJobs();
                alert('Job posting deleted successfully!');
            } catch (error) {
                if (error.response?.status === 401) {
                    handleLogout('Session expired. Please login again.');
                } else {
                    alert('Error deleting job: ' + error.message);
                }
            }
        }
    };

    // Get valid status transitions for bookings
    const getValidBookingStatuses = (currentStatus) => {
        const transitions = {
            'pending': ['pending', 'contacted', 'completed'],
            'contacted': ['contacted', 'completed'],
            'completed': ['completed']
        };
        return transitions[currentStatus] || [];
    };

    // Load data when tab changes
    useEffect(() => {
        if (!adminToken) return;

        if (activeTab === 'dashboard') fetchDashboard();
        else if (activeTab === 'bookings') fetchBookings();
        else if (activeTab === 'contacts') fetchContacts();
        else if (activeTab === 'earnwithus') fetchEarnWithUs();
        else if (activeTab === 'careers') fetchCareers();
        else if (activeTab === 'jobs') fetchJobs();
    }, [activeTab, adminToken]);

    // Initial load: fetch bookings and contacts when user logs in
    useEffect(() => {
        if (!adminToken) return;

        // Load initial data
        fetchDashboard();
        fetchBookings();
        fetchContacts();
        fetchEarnWithUs();
    }, [adminToken]);

    // Auto-refresh data every 5 seconds
    useEffect(() => {
        if (!adminToken) return;

        const interval = setInterval(() => {
            if (activeTab === 'dashboard') fetchDashboard();
            else if (activeTab === 'bookings') fetchBookings();
            else if (activeTab === 'contacts') fetchContacts();
            else if (activeTab === 'earnwithus') fetchEarnWithUs();
            else if (activeTab === 'careers') fetchCareers();
            else if (activeTab === 'jobs') fetchJobs();
        }, 5000);

        return () => clearInterval(interval);
    }, [activeTab, adminToken]);

    // If not logged in, show login form
    if (!adminToken) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center text-red-600 mb-6">SolarARK Admin</h1>
                    <form onSubmit={handleAdminLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="admin@solarark.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Main Dashboard
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-red-600 text-white p-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">SolarARK Admin Panel</h1>
                    <button
                        onClick={() => handleLogout()}
                        className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto flex gap-4 p-4">
                    {['dashboard', 'bookings', 'contacts', 'earnwithus', 'careers', 'jobs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-bold rounded-t-lg transition ${activeTab === tab
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {tab === 'earnwithus' ? 'Earn With Us' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto p-4">
                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
                                <h3 className="text-gray-600 text-sm font-semibold uppercase">Total Bookings</h3>
                                <p className="text-4xl font-bold text-red-600 mt-2">{summary.totalBookings || 0}</p>
                                <p className="text-sm text-gray-500 mt-2">📌 {summary.pendingBookings || 0} pending</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                                <h3 className="text-gray-600 text-sm font-semibold uppercase">Total Contacts</h3>
                                <p className="text-4xl font-bold text-green-600 mt-2">{summary.totalContacts || 0}</p>
                                <p className="text-sm text-gray-500 mt-2">📭 {summary.unreadContacts || 0} unread</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                                <h3 className="text-gray-600 text-sm font-semibold uppercase">Career Apps</h3>
                                <p className="text-4xl font-bold text-blue-600 mt-2">{summary.totalCareers || 0}</p>
                                <p className="text-sm text-gray-500 mt-2">📝 {summary.pendingCareers || 0} pending</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Bookings</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="bg-white rounded-lg shadow overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-red-600 text-white">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Name</th>
                                            <th className="px-4 py-2 text-left">Email</th>
                                            <th className="px-4 py-2 text-left">City</th>
                                            <th className="px-4 py-2 text-left">Bill</th>
                                            <th className="px-4 py-2 text-left">Status</th>
                                            <th className="px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking._id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{booking.fullName}</td>
                                                <td className="px-4 py-2">{booking.email}</td>
                                                <td className="px-4 py-2">{booking.city}</td>
                                                <td className="px-4 py-2">₹{booking.electricBill}</td>
                                                <td className="px-4 py-2">
                                                    <span className={`px-3 py-1 rounded text-sm font-bold ${booking.status === 'pending' ? 'bg-yellow-200' :
                                                        booking.status === 'contacted' ? 'bg-blue-200' :
                                                            'bg-green-200'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex gap-2">
                                                        <select
                                                            value={booking.status}
                                                            onChange={(e) => updateBookingStatus(booking._id, e.target.value, booking.notes)}
                                                            className="px-2 py-1 border rounded text-sm"
                                                        >
                                                            {getValidBookingStatuses(booking.status).map((status) => (
                                                                <option key={status} value={status}>
                                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {booking.status === 'completed' && (
                                                            <button
                                                                onClick={() => deleteBooking(booking._id)}
                                                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm font-bold"
                                                                title="Delete completed booking"
                                                            >
                                                                🗑️ Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* CONTACTS TAB */}
                {activeTab === 'contacts' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Contacts</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="bg-white rounded-lg shadow overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-red-600 text-white">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Name</th>
                                            <th className="px-4 py-2 text-left">Company</th>
                                            <th className="px-4 py-2 text-left">Email</th>
                                            <th className="px-4 py-2 text-left">Status</th>
                                            <th className="px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map((contact) => (
                                            <tr key={contact._id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{contact.name}</td>
                                                <td className="px-4 py-2">{contact.companyName}</td>
                                                <td className="px-4 py-2">{contact.email}</td>
                                                <td className="px-4 py-2">
                                                    <span className={`px-3 py-1 rounded text-sm font-bold ${contact.status === 'unread' ? 'bg-red-200' :
                                                        contact.status === 'read' ? 'bg-yellow-200' :
                                                            'bg-green-200'
                                                        }`}>
                                                        {contact.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => {
                                                            setReplyingToContact(contact);
                                                            setShowContactReplyModal(true);
                                                            setContactReply('');
                                                        }}
                                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                                    >
                                                        Reply
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* EARN WITH US TAB */}
                {activeTab === 'earnwithus' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Manage Earn With Us Applications</h2>
                            {earnWithUs.length > 0 && (
                                <button
                                    onClick={deleteAllEarnWithUs}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
                                >
                                    🗑️ Delete All
                                </button>
                            )}
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="bg-white rounded-lg shadow overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-red-600 text-white">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Name</th>
                                            <th className="px-4 py-2 text-left">Email</th>
                                            <th className="px-4 py-2 text-left">Phone</th>
                                            <th className="px-4 py-2 text-left">City</th>
                                            <th className="px-4 py-2 text-left">Status</th>
                                            <th className="px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {earnWithUs.map((application) => (
                                            <tr key={application._id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{application.fullName}</td>
                                                <td className="px-4 py-2">{application.email}</td>
                                                <td className="px-4 py-2">{application.phoneNumber}</td>
                                                <td className="px-4 py-2">{application.address}</td>
                                                <td className="px-4 py-2">
                                                    <span className={`px-3 py-1 rounded text-sm font-bold ${application.status === 'new' ? 'bg-yellow-200' :
                                                        application.status === 'contacted' ? 'bg-blue-200' :
                                                            'bg-green-200'
                                                        }`}>
                                                        {application.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => deleteEarnWithUs(application._id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-bold"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {earnWithUs.length === 0 && (
                                    <div className="p-4 text-center text-gray-500">
                                        No Earn With Us applications yet.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* CAREERS TAB */}
                {activeTab === 'careers' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Career Applications</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="bg-white rounded-lg shadow overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-red-600 text-white">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Name</th>
                                            <th className="px-4 py-2 text-left">Position</th>
                                            <th className="px-4 py-2 text-left">Experience</th>
                                            <th className="px-4 py-2 text-left">Status</th>
                                            <th className="px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {careers.map((career) => (
                                            <tr key={career._id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{career.name}</td>
                                                <td className="px-4 py-2">{career.jobPosition}</td>
                                                <td className="px-4 py-2">{career.experience}</td>
                                                <td className="px-4 py-2">
                                                    <span className={`px-3 py-1 rounded text-sm font-bold ${career.status === 'pending' ? 'bg-yellow-200' :
                                                        career.status === 'reviewed' ? 'bg-blue-200' :
                                                            career.status === 'accepted' ? 'bg-green-200' :
                                                                'bg-red-200'
                                                        }`}>
                                                        {career.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <select
                                                        value={career.status}
                                                        onChange={(e) => updateCareerStatus(career._id, e.target.value, '')}
                                                        className="px-2 py-1 border rounded text-sm"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="reviewed">Reviewed</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* JOBS TAB */}
                {activeTab === 'jobs' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Manage Career Opportunities</h2>
                            <button
                                onClick={() => setShowJobForm(!showJobForm)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                {showJobForm ? 'Cancel' : 'Post New Job'}
                            </button>
                        </div>

                        {showJobForm && (
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Create Job Posting</h3>
                                <form onSubmit={createJob} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Job Title</label>
                                        <input
                                            type="text"
                                            value={jobForm.title}
                                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            placeholder="e.g., Senior Solar Engineer"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Location</label>
                                            <input
                                                type="text"
                                                value={jobForm.location}
                                                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                placeholder="e.g., Mumbai, India"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Job Type</label>
                                            <select
                                                value={jobForm.jobType}
                                                onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            >
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Experience</label>
                                            <select
                                                value={jobForm.experience}
                                                onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            >
                                                <option value="0-2">0-2 years</option>
                                                <option value="2-5">2-5 years</option>
                                                <option value="5-10">5-10 years</option>
                                                <option value="10+">10+ years</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Salary</label>
                                            <input
                                                type="text"
                                                value={jobForm.salary}
                                                onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                placeholder="e.g., 5,00,000 - 10,00,000 PA"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Job Description</label>
                                        <textarea
                                            value={jobForm.description}
                                            onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg h-32"
                                            placeholder="Describe the job responsibilities..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Requirements</label>
                                        <textarea
                                            value={jobForm.requirements}
                                            onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg h-32"
                                            placeholder="List the required qualifications and skills..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Post Job
                                    </button>
                                </form>
                            </div>
                        )}

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {jobs.length === 0 ? (
                                    <p className="text-gray-600 text-center py-8">No job postings yet. Click "Post New Job" to create one.</p>
                                ) : (
                                    jobs.map((job) => (
                                        <div key={job._id} className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                                                    <p className="text-gray-600">
                                                        📍 {job.location} • 💼 {job.jobType} • ⏱️ {job.experience}
                                                    </p>
                                                    <p className="text-gray-600 mt-1">💰 {job.salary}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded text-sm font-bold ${job.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                    {job.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>

                                            <div className="mb-4 border-t pt-4">
                                                <h4 className="font-bold text-gray-700 mb-2">Description:</h4>
                                                <p className="text-gray-600 text-sm">{job.description}</p>
                                            </div>

                                            <div className="mb-4 border-t pt-4">
                                                <h4 className="font-bold text-gray-700 mb-2">Requirements:</h4>
                                                <p className="text-gray-600 text-sm whitespace-pre-wrap">{job.requirements}</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => updateJobStatus(job._id, !job.isActive)}
                                                    className={`px-4 py-2 rounded text-white font-bold ${job.isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                                                >
                                                    {job.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button
                                                    onClick={() => deleteJob(job._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* CONTACT REPLY MODAL */}
            {showContactReplyModal && replyingToContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Reply to Contact</h2>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-red-600">
                            <p><strong>From:</strong> {replyingToContact.name}</p>
                            <p><strong>Email:</strong> {replyingToContact.email}</p>
                            <p><strong>Company:</strong> {replyingToContact.companyName}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Your Reply:</label>
                            <textarea
                                value={contactReply}
                                onChange={(e) => setContactReply(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 h-32"
                                placeholder="Type your reply here... This will be sent to the contact via email."
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    if (!contactReply.trim()) {
                                        alert('Please enter a reply message');
                                        return;
                                    }
                                    updateContactReply(replyingToContact._id, contactReply);
                                }}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                ✓ Send Reply & Email
                            </button>
                            <button
                                onClick={() => {
                                    setShowContactReplyModal(false);
                                    setContactReply('');
                                    setReplyingToContact(null);
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
